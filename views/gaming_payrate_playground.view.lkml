view: gaming_payrate_playground {
  derived_table: {
    sql:
      WITH activity AS (
        SELECT DATE '2026-01-01' AS report_date, 'u1' AS account_id, 'iOS' AS platform, 10 AS active_sessions UNION ALL
        SELECT DATE '2026-01-01', 'u1', 'Android', 4 UNION ALL
        SELECT DATE '2026-01-01', 'u2', 'iOS', 8 UNION ALL
        SELECT DATE '2026-01-01', 'u3', 'Android', 6 UNION ALL
        SELECT DATE '2026-01-01', 'u4', 'Web', 5 UNION ALL
        SELECT DATE '2026-01-01', 'u4', 'iOS', 1 UNION ALL
        SELECT DATE '2026-01-01', 'u5', 'Web', 7
      ),
      payments AS (
        SELECT DATE '2026-01-01' AS report_date, 'u1' AS account_id, 'p1' AS payment_id, 100 AS payment_amount, CAST(NULL AS STRING) AS payment_platform UNION ALL
        SELECT DATE '2026-01-01', 'u2', 'p2', 50, 'iOS' UNION ALL
        SELECT DATE '2026-01-01', 'u3', 'p3', 70, CAST(NULL AS STRING) UNION ALL
        SELECT DATE '2026-01-01', 'u4', 'p4', 120, 'Web' UNION ALL
        SELECT DATE '2026-01-01', 'u5', 'p5', 30, CAST(NULL AS STRING)
      ),
      active_platform_count AS (
        SELECT report_date, account_id, COUNT(DISTINCT platform) AS active_platform_count
        FROM activity
        GROUP BY 1, 2
      ),
      primary_platform AS (
        SELECT report_date, account_id, platform
        FROM activity
        QUALIFY ROW_NUMBER() OVER (
          PARTITION BY report_date, account_id
          ORDER BY active_sessions DESC, platform
        ) = 1
      ),
      policies AS (
        SELECT 'Observed Only: Missing Payment Platform Excluded' AS attribution_policy UNION ALL
        SELECT 'Primary Active Platform' UNION ALL
        SELECT 'Full Credit to Every Active Platform' UNION ALL
        SELECT 'Fractional Credit Across Active Platforms'
      ),
      attributed_payment_rows AS (
        SELECT
          p.report_date,
          p.account_id,
          'Observed Only: Missing Payment Platform Excluded' AS attribution_policy,
          p.payment_platform AS platform,
          1.0 AS payer_credit,
          p.payment_amount AS revenue_credit
        FROM payments p
        WHERE p.payment_platform IS NOT NULL

        UNION ALL

        SELECT
          p.report_date,
          p.account_id,
          'Primary Active Platform' AS attribution_policy,
          COALESCE(p.payment_platform, pp.platform) AS platform,
          1.0 AS payer_credit,
          p.payment_amount AS revenue_credit
        FROM payments p
        LEFT JOIN primary_platform pp
          ON p.report_date = pp.report_date
          AND p.account_id = pp.account_id

        UNION ALL

        SELECT
          p.report_date,
          p.account_id,
          'Full Credit to Every Active Platform' AS attribution_policy,
          p.payment_platform AS platform,
          1.0 AS payer_credit,
          p.payment_amount AS revenue_credit
        FROM payments p
        WHERE p.payment_platform IS NOT NULL

        UNION ALL

        SELECT
          p.report_date,
          p.account_id,
          'Full Credit to Every Active Platform' AS attribution_policy,
          a.platform AS platform,
          1.0 AS payer_credit,
          p.payment_amount AS revenue_credit
        FROM payments p
        INNER JOIN activity a
          ON p.report_date = a.report_date
          AND p.account_id = a.account_id
        WHERE p.payment_platform IS NULL

        UNION ALL

        SELECT
          p.report_date,
          p.account_id,
          'Fractional Credit Across Active Platforms' AS attribution_policy,
          p.payment_platform AS platform,
          1.0 AS payer_credit,
          p.payment_amount AS revenue_credit
        FROM payments p
        WHERE p.payment_platform IS NOT NULL

        UNION ALL

        SELECT
          p.report_date,
          p.account_id,
          'Fractional Credit Across Active Platforms' AS attribution_policy,
          a.platform AS platform,
          1.0 / apc.active_platform_count AS payer_credit,
          p.payment_amount / apc.active_platform_count AS revenue_credit
        FROM payments p
        INNER JOIN activity a
          ON p.report_date = a.report_date
          AND p.account_id = a.account_id
        INNER JOIN active_platform_count apc
          ON p.report_date = apc.report_date
          AND p.account_id = apc.account_id
        WHERE p.payment_platform IS NULL
      ),
      attributed_payments AS (
        SELECT
          report_date,
          account_id,
          attribution_policy,
          platform,
          MAX(payer_credit) AS payer_credit,
          SUM(revenue_credit) AS revenue_credit
        FROM attributed_payment_rows
        GROUP BY 1, 2, 3, 4
      ),
      platform_policy_base AS (
        SELECT
          p.attribution_policy,
          a.report_date,
          a.account_id,
          a.platform,
          1.0 AS active_account_credit,
          COALESCE(ap.payer_credit, 0.0) AS payer_credit,
          COALESCE(ap.revenue_credit, 0.0) AS revenue_credit
        FROM activity a
        CROSS JOIN policies p
        LEFT JOIN attributed_payments ap
          ON a.report_date = ap.report_date
          AND a.account_id = ap.account_id
          AND a.platform = ap.platform
          AND p.attribution_policy = ap.attribution_policy
      ),
      account_level_base AS (
        SELECT
          'Account Level: No Platform Attribution' AS attribution_policy,
          a.report_date,
          a.account_id,
          'All Platforms' AS platform,
          1.0 AS active_account_credit,
          CASE WHEN COUNT(DISTINCT p.payment_id) > 0 THEN 1.0 ELSE 0.0 END AS payer_credit,
          COALESCE(SUM(p.payment_amount), 0.0) AS revenue_credit
        FROM (
          SELECT DISTINCT report_date, account_id
          FROM activity
        ) a
        LEFT JOIN payments p
          ON a.report_date = p.report_date
          AND a.account_id = p.account_id
        GROUP BY 1, 2, 3, 4, 5
      )
      SELECT * FROM platform_policy_base
      UNION ALL
      SELECT * FROM account_level_base ;;
  }

  dimension: row_key {
    hidden: yes
    primary_key: yes
    type: string
    sql: CONCAT(${TABLE}.attribution_policy, '|', CAST(${TABLE}.report_date AS STRING), '|', ${TABLE}.account_id, '|', ${TABLE}.platform) ;;
  }

  dimension_group: report {
    label: "Report Date"
    group_label: "Time"
    description: "Synthetic reporting date for the gaming payrate playground."
    type: time
    timeframes: [raw, date, week, month, year]
    convert_tz: no
    datatype: date
    sql: ${TABLE}.report_date ;;
    synonyms: ["date", "business date", "统计日期", "日期"]
  }

  dimension: account_id {
    label: "Account ID"
    group_label: "Account"
    description: "Synthetic game account id. Some accounts are active on more than one platform."
    type: string
    sql: ${TABLE}.account_id ;;
    synonyms: ["user id", "player id", "玩家", "账号", "账户"]
  }

  dimension: platform {
    label: "Platform"
    group_label: "Platform"
    description: "Attributed reporting platform. All Platforms is used only for the account-level governed payrate."
    type: string
    sql: ${TABLE}.platform ;;
    synonyms: ["channel", "device platform", "game platform", "平台", "端"]
  }

  dimension: attribution_policy {
    label: "Attribution Policy"
    group_label: "Governed Metric Definition"
    description: "Governed rule for assigning payments with missing platform to reporting platforms."
    type: string
    sql: ${TABLE}.attribution_policy ;;
    synonyms: ["metric definition", "business rule", "归因口径", "统计口径", "指标定义"]
  }

  dimension: attribution_policy_note {
    label: "Attribution Policy Note"
    group_label: "Governed Metric Definition"
    description: "Human-readable explanation of the selected attribution policy."
    type: string
    sql:
      CASE ${attribution_policy}
        WHEN 'Account Level: No Platform Attribution' THEN 'Recommended global payrate: count active and paying accounts once, without platform attribution.'
        WHEN 'Observed Only: Missing Payment Platform Excluded' THEN 'Only payments with explicit platform are counted at platform level; missing-platform payments are excluded from platform payrate.'
        WHEN 'Primary Active Platform' THEN 'Missing-platform payments are assigned to the account primary active platform by session volume.'
        WHEN 'Full Credit to Every Active Platform' THEN 'Missing-platform payments are fully credited to every active platform, which can inflate platform payrate.'
        WHEN 'Fractional Credit Across Active Platforms' THEN 'Missing-platform payments are split across active platforms, preserving total payer and revenue credit.'
        ELSE 'Undefined attribution policy.'
      END ;;
    synonyms: ["口径解释", "规则说明", "metric note"]
  }

  measure: active_accounts {
    label: "Active Accounts"
    group_label: "Payrate Metrics"
    description: "Active account credit under the selected platform and attribution policy."
    type: sum
    sql: ${TABLE}.active_account_credit ;;
    value_format_name: decimal_1
    synonyms: ["active users", "active players", "活跃账号", "活跃用户", "AU"]
  }

  measure: paying_accounts {
    label: "Paying Accounts"
    group_label: "Payrate Metrics"
    description: "Attributed paying account credit under the selected policy. Fractional policy may produce decimal payer credit."
    type: sum
    sql: ${TABLE}.payer_credit ;;
    value_format_name: decimal_1
    synonyms: ["payers", "paying users", "付费账号", "付费用户"]
  }

  measure: attributed_revenue {
    label: "Attributed Revenue"
    group_label: "Payrate Metrics"
    description: "Revenue attributed to the selected platform under the selected policy."
    type: sum
    sql: ${TABLE}.revenue_credit ;;
    value_format: "$#,##0.0"
    synonyms: ["payment amount", "revenue", "充值金额", "收入", "流水"]
  }

  measure: payrate {
    label: "Payrate"
    group_label: "Payrate Metrics"
    description: "Paying accounts divided by active accounts using the selected governed attribution policy."
    type: number
    sql: ${paying_accounts} / NULLIF(${active_accounts}, 0) ;;
    value_format_name: percent_1
    synonyms: ["payer conversion", "payment rate", "付费率", "付费转化率"]
  }

  measure: arppu {
    label: "ARPPU"
    group_label: "Payrate Metrics"
    description: "Attributed revenue divided by paying account credit."
    type: number
    sql: ${attributed_revenue} / NULLIF(${paying_accounts}, 0) ;;
    value_format: "$#,##0.0"
    synonyms: ["average revenue per paying user", "付费用户平均收入", "客单价"]
  }
}

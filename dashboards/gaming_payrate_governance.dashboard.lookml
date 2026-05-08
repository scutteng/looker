- dashboard: gaming_payrate_governance
  title: Gaming Payrate Governance Playground
  description: A synthetic gaming dashboard that demonstrates how governed LookML definitions resolve payrate disputes when payment platform is missing and accounts are active across multiple platforms.
  layout: newspaper
  preferred_viewer: dashboards-next
  crossfilter_enabled: true
  filters_location_top: true

  filters:
  - name: Attribution Policy
    title: Attribution Policy
    type: field_filter
    default_value: Fractional Credit Across Active Platforms
    allow_multiple_values: false
    required: false
    ui_config:
      type: dropdown_menu
      display: inline
    model: superstore_en
    explore: gaming_payrate_playground
    field: gaming_payrate_playground.attribution_policy

  elements:
  - title: Payrate
    name: payrate
    model: superstore_en
    explore: gaming_payrate_playground
    type: single_value
    fields: [gaming_payrate_playground.payrate]
    filters:
      gaming_payrate_playground.platform: "-All Platforms"
    listen:
      Attribution Policy: gaming_payrate_playground.attribution_policy
    limit: 500
    width: 6
    height: 3
    row: 0
    col: 0

  - title: Active Accounts
    name: active_accounts
    model: superstore_en
    explore: gaming_payrate_playground
    type: single_value
    fields: [gaming_payrate_playground.active_accounts]
    filters:
      gaming_payrate_playground.platform: "-All Platforms"
    listen:
      Attribution Policy: gaming_payrate_playground.attribution_policy
    limit: 500
    width: 6
    height: 3
    row: 0
    col: 6

  - title: Paying Accounts
    name: paying_accounts
    model: superstore_en
    explore: gaming_payrate_playground
    type: single_value
    fields: [gaming_payrate_playground.paying_accounts]
    filters:
      gaming_payrate_playground.platform: "-All Platforms"
    listen:
      Attribution Policy: gaming_payrate_playground.attribution_policy
    limit: 500
    width: 6
    height: 3
    row: 0
    col: 12

  - title: Attributed Revenue
    name: attributed_revenue
    model: superstore_en
    explore: gaming_payrate_playground
    type: single_value
    fields: [gaming_payrate_playground.attributed_revenue]
    filters:
      gaming_payrate_playground.platform: "-All Platforms"
    listen:
      Attribution Policy: gaming_payrate_playground.attribution_policy
    limit: 500
    width: 6
    height: 3
    row: 0
    col: 18

  - title: Platform Payrate by Governed Policy
    name: platform_payrate_by_policy
    model: superstore_en
    explore: gaming_payrate_playground
    type: looker_column
    fields: [gaming_payrate_playground.platform, gaming_payrate_playground.payrate]
    filters:
      gaming_payrate_playground.platform: "-All Platforms"
    listen:
      Attribution Policy: gaming_payrate_playground.attribution_policy
    sorts: [gaming_payrate_playground.payrate desc]
    limit: 500
    x_axis_gridlines: false
    y_axis_gridlines: true
    show_view_names: false
    show_y_axis_labels: true
    show_y_axis_ticks: true
    y_axis_tick_density: default
    show_x_axis_label: true
    show_x_axis_ticks: true
    y_axis_combined: true
    show_value_labels: true
    label_density: 25
    legend_position: center
    width: 12
    height: 8
    row: 3
    col: 0

  - title: Why the Answer Changes
    name: why_the_answer_changes
    model: superstore_en
    explore: gaming_payrate_playground
    type: looker_grid
    fields: [
      gaming_payrate_playground.attribution_policy,
      gaming_payrate_playground.attribution_policy_note,
      gaming_payrate_playground.platform,
      gaming_payrate_playground.active_accounts,
      gaming_payrate_playground.paying_accounts,
      gaming_payrate_playground.payrate,
      gaming_payrate_playground.attributed_revenue
    ]
    sorts: [gaming_payrate_playground.attribution_policy, gaming_payrate_playground.platform]
    limit: 500
    show_view_names: false
    width: 12
    height: 8
    row: 3
    col: 12

  - title: All Policies Side by Side
    name: all_policies_side_by_side
    model: superstore_en
    explore: gaming_payrate_playground
    type: looker_grid
    fields: [
      gaming_payrate_playground.attribution_policy,
      gaming_payrate_playground.platform,
      gaming_payrate_playground.active_accounts,
      gaming_payrate_playground.paying_accounts,
      gaming_payrate_playground.payrate,
      gaming_payrate_playground.attributed_revenue,
      gaming_payrate_playground.arppu
    ]
    filters:
      gaming_payrate_playground.platform: "-All Platforms"
    sorts: [gaming_payrate_playground.platform, gaming_payrate_playground.attribution_policy]
    limit: 500
    show_view_names: false
    width: 24
    height: 8
    row: 11
    col: 0

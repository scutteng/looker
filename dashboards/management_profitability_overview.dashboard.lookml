- dashboard: management_profitability_overview
  title: "管理层概述 - 盈利能力"
  description: "面向管理层的盈利能力总览，包含核心经营指标、州级盈利地图、客群月度趋势和品类月度趋势。"
  layout: grid
  preferred_viewer: dashboards-next
  crossfilter_enabled: true
  filters_location_top: false
  auto_run: true

  filters:
  - name: "区域"
    title: "区域"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.region
  - name: "订单日期"
    title: "订单日期"
    type: date_filter
    default_value: "2021/01/01 to 2021/12/31"
  - name: "州/省"
    title: "州/省"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.state
  - name: "利润状态"
    title: "利润状态"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.profit_status

  rows:
  - elements: [mgmt_sales, mgmt_profit, mgmt_profit_margin, mgmt_profit_per_order, mgmt_sales_per_customer, mgmt_average_discount, mgmt_quantity]
    height: 120
  - elements: [mgmt_state_profitability_map]
    height: 520
  - elements: [mgmt_segment_context_title, mgmt_category_context_title]
    height: 60
  - elements: [mgmt_segment_monthly_trend, mgmt_category_monthly_trend]
    height: 360
  - elements: [mgmt_profitability_detail]
    height: 380

  elements:
  - name: mgmt_sales
    title: "销售额"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_compact]
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_profit
    title: "利润"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_compact]
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_profit_margin
    title: "利润率"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_margin]
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_profit_per_order
    title: "每订单利润"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_per_order]
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_sales_per_customer
    title: "每个客户的销售额"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_per_customer]
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_average_discount
    title: "平均值 折扣"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.discount]
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_quantity
    title: "数量"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.quantity]
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_state_profitability_map
    title: "按州/省划分的盈利能力地图 - 区域: 全部"
    type: looker_map
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.state]
    measures: [superstore_en.profit_margin, superstore_en.sales, superstore_en.profit]
    sorts: ["superstore_en.profit_margin desc"]
    limit: 50
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_segment_monthly_trend
    title: "细分月度销售额趋势"
    type: looker_area
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month, superstore_en.segment]
    pivots: [superstore_en.segment]
    measures: [superstore_en.sales]
    sorts: [superstore_en.order_month]
    limit: 500
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_category_monthly_trend
    title: "产品类别月度销售额趋势"
    type: looker_area
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month, superstore_en.category]
    pivots: [superstore_en.category]
    measures: [superstore_en.sales]
    sorts: [superstore_en.order_month]
    limit: 500
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

  - name: mgmt_segment_context_title
    title: ""
    type: single_value
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.segment_trend_context_title]
    limit: 1
    listen: {州/省: superstore_en.state}

  - name: mgmt_category_context_title
    title: ""
    type: single_value
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category_trend_context_title]
    limit: 1
    listen: {州/省: superstore_en.state}

  - name: mgmt_profitability_detail
    title: "盈利能力明细 - 重点州/省、客群与品类"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.state, superstore_en.region, superstore_en.segment, superstore_en.category, superstore_en.profit_status]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin, superstore_en.profit_per_order, superstore_en.sales_per_customer, superstore_en.discount, superstore_en.quantity]
    sorts: ["superstore_en.profit_margin"]
    limit: 30
    listen: {区域: superstore_en.region, 订单日期: superstore_en.order_date, 州/省: superstore_en.state, 利润状态: superstore_en.profit_status}

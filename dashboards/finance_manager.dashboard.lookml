- dashboard: finance_manager
  title: "Finance Manager Dashboard"
  description: "Margin governance view for revenue quality, discount exposure, loss drivers, and financial exceptions."
  layout: grid
  preferred_viewer: dashboards-next
  crossfilter_enabled: true
  filters_location_top: true
  auto_run: true

  filters:
  - name: "Order Date"
    title: "Order Date"
    type: date_filter
    default_value: "2021/01/01 to 2021/12/31"
  - name: "Region"
    title: "Region"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.region
  - name: "Profit Status"
    title: "Profit Status"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.profit_status
  - name: "Discount Tier"
    title: "Discount Tier"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.discount_tier

  rows:
  - elements: [finance_total_sales, finance_total_profit, finance_profit_margin, finance_loss_amount, finance_discount_ratio]
    height: 120
  - elements: [finance_margin_trend, finance_profit_status_mix]
    height: 360
  - elements: [finance_discount_tier_impact, finance_state_loss_map]
    height: 360
  - elements: [finance_exception_table]
    height: 420

  elements:
  - name: finance_total_sales
    title: "Recognized Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_compact]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_total_profit
    title: "Operating Profit"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_compact]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_profit_margin
    title: "Margin Rate"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_margin]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_loss_amount
    title: "Loss Amount"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.loss_amount_compact]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_discount_ratio
    title: "Discount Burden"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.discount_to_sales_ratio]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_margin_trend
    title: "Monthly Margin Control"
    type: looker_area
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.loss_amount]
    sorts: [superstore_en.order_month]
    limit: 500
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_profit_status_mix
    title: "Profit Status Mix"
    type: looker_pie
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.profit_status]
    measures: [superstore_en.sales]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_discount_tier_impact
    title: "Discount Tier Profit Impact"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.discount_tier]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.loss_amount, superstore_en.profit_margin]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_state_loss_map
    title: "Loss Exposure by State"
    type: looker_map
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.state]
    measures: [superstore_en.loss_amount]
    sorts: ["superstore_en.loss_amount desc"]
    limit: 50
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

  - name: finance_exception_table
    title: "Margin Exception Ledger"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.product_name, superstore_en.category, superstore_en.subcategory, superstore_en.discount_tier, superstore_en.profit_status]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.loss_amount, superstore_en.discount_amount, superstore_en.profit_margin]
    sorts: ["superstore_en.loss_amount desc"]
    limit: 30
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Profit Status: superstore_en.profit_status, Discount Tier: superstore_en.discount_tier}

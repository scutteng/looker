- dashboard: ceo
  title: "CEO Dashboard"
  description: "Board-style executive view for growth, market concentration, profitability, customer reach, and portfolio health."
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
  - name: "Customer Segment"
    title: "Customer Segment"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.segment

  rows:
  - elements: [ceo_sales, ceo_profit, ceo_margin, ceo_yoy_growth, ceo_customers]
    height: 120
  - elements: [ceo_national_map, ceo_growth_trend]
    height: 380
  - elements: [ceo_portfolio_mix, ceo_region_scorecard]
    height: 360
  - elements: [ceo_strategic_watchlist]
    height: 420

  elements:
  - name: ceo_sales
    title: "Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_profit
    title: "Profit"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_margin
    title: "Margin"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_margin]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_yoy_growth
    title: "YoY Growth"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_yoy_growth]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_customers
    title: "Customers"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.customer_count]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_national_map
    title: "National Performance Map"
    type: looker_map
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.state]
    measures: [superstore_en.sales, superstore_en.profit]
    sorts: ["superstore_en.sales desc"]
    limit: 50
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_growth_trend
    title: "Growth and Profitability Trend"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.sales_yoy_growth, superstore_en.profit_yoy_growth]
    sorts: [superstore_en.order_month]
    limit: 500
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_portfolio_mix
    title: "Portfolio Mix"
    type: looker_pie
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category]
    measures: [superstore_en.sales]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_region_scorecard
    title: "Regional Executive Scorecard"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.region]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.customer_count, superstore_en.profit_margin]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

  - name: ceo_strategic_watchlist
    title: "Strategic Watchlist"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.region, superstore_en.segment, superstore_en.category, superstore_en.profit_status]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.loss_amount, superstore_en.customer_count, superstore_en.profit_margin]
    sorts: ["superstore_en.sales desc"]
    limit: 30
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment}

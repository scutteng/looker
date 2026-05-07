- dashboard: ceo
  title: "CEO Dashboard"
  description: "Executive view focused on growth, profitability, customer reach, and portfolio concentration."
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
  - elements: [ceo_sales, ceo_profit, ceo_margin, ceo_yoy_growth]
    height: 120
  - elements: [ceo_growth_trend, ceo_region_scorecard]
    height: 360
  - elements: [ceo_segment_value, ceo_category_portfolio]
    height: 360

  elements:
  - name: ceo_sales
    title: "Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment

  - name: ceo_profit
    title: "Profit"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment

  - name: ceo_margin
    title: "Profit Margin"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_margin]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment

  - name: ceo_yoy_growth
    title: "Sales YoY Growth"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_yoy_growth]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment

  - name: ceo_growth_trend
    title: "Sales, Profit, and YoY Growth"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.sales_yoy_growth]
    sorts: [superstore_en.order_month]
    limit: 500
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment

  - name: ceo_region_scorecard
    title: "Regional Scorecard"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.region]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.customer_count, superstore_en.profit_margin]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment

  - name: ceo_segment_value
    title: "Customer Segment Value"
    type: looker_bar
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.segment]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.sales_per_customer]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment

  - name: ceo_category_portfolio
    title: "Portfolio Performance"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category, superstore_en.subcategory]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin, superstore_en.product_count]
    sorts: ["superstore_en.sales desc"]
    limit: 20
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment

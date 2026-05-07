- dashboard: superstore_executive_overview
  title: "Superstore Executive Overview"
  description: "AI-generated executive dashboard for governed Superstore sales, profitability, customer, product, and regional performance."
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
  - name: "Product Category"
    title: "Product Category"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.category

  rows:
  - elements: [total_sales, total_profit, profit_margin, average_order_value]
    height: 120
  - elements: [monthly_sales_and_profit, regional_sales]
    height: 360
  - elements: [category_profitability, segment_performance]
    height: 320
  - elements: [discount_risk_table]
    height: 380

  elements:
  - name: total_sales
    title: "Total Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: total_profit
    title: "Total Profit"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: profit_margin
    title: "Profit Margin"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_margin]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: average_order_value
    title: "Average Order Value"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.average_order_value]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: monthly_sales_and_profit
    title: "Monthly Sales and Profit"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.profit]
    sorts: [superstore_en.order_month]
    limit: 500
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: regional_sales
    title: "Sales by Region"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.region]
    measures: [superstore_en.sales, superstore_en.profit]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: category_profitability
    title: "Category Profitability"
    type: looker_bar
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category, superstore_en.subcategory]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin]
    sorts: ["superstore_en.profit desc"]
    limit: 20
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: segment_performance
    title: "Customer Segment Performance"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.segment]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.customer_count, superstore_en.sales_per_customer]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: discount_risk_table
    title: "Discount and Profit Risk"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.product_name, superstore_en.category, superstore_en.subcategory]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin, superstore_en.discount, superstore_en.discount_amount]
    sorts: ["superstore_en.discount_amount desc"]
    limit: 25
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

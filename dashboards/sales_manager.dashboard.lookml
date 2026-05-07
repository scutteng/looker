- dashboard: sales_manager
  title: "Sales Manager Dashboard"
  description: "Sales execution view focused on bookings, order volume, customer reach, regional performance, and sales momentum."
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
  - elements: [sales_total_sales, sales_order_count, sales_customer_count, sales_aov]
    height: 120
  - elements: [sales_monthly_momentum, sales_regional_performance]
    height: 360
  - elements: [sales_segment_performance, sales_top_customers]
    height: 360

  elements:
  - name: sales_total_sales
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

  - name: sales_order_count
    title: "Orders"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.order_count]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: sales_customer_count
    title: "Customers"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.customer_count]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: sales_aov
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

  - name: sales_monthly_momentum
    title: "Monthly Sales Momentum"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.sales_last_month, superstore_en.sales_mom_growth]
    sorts: [superstore_en.order_month]
    limit: 500
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: sales_regional_performance
    title: "Regional Sales Performance"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.region]
    measures: [superstore_en.sales, superstore_en.order_count, superstore_en.sales_per_customer]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: sales_segment_performance
    title: "Customer Segment Performance"
    type: looker_bar
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.segment]
    measures: [superstore_en.sales, superstore_en.customer_count, superstore_en.average_order_value]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: sales_top_customers
    title: "Top Customers by Sales"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.customer_name, superstore_en.segment, superstore_en.region]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.order_count, superstore_en.average_order_value]
    sorts: ["superstore_en.sales desc"]
    limit: 25
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

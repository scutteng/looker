- dashboard: vip_customer_care_manager
  title: "VIP Customer Care Manager Dashboard"
  description: "Customer care view focused on high-value customers, service context, purchase behavior, and retention-relevant profitability signals."
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
  - name: "Customer Segment"
    title: "Customer Segment"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.segment
  - name: "Region"
    title: "Region"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.region
  - name: "Ship Mode"
    title: "Ship Mode"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.ship_mode

  rows:
  - elements: [vip_sales, vip_customers, vip_sales_per_customer, vip_orders]
    height: 120
  - elements: [vip_customer_value_trend, vip_segment_care]
    height: 360
  - elements: [vip_ship_mode_experience, vip_customer_watchlist]
    height: 360

  elements:
  - name: vip_sales
    title: "VIP Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales]
    listen:
      Order Date: superstore_en.order_date
      Customer Segment: superstore_en.segment
      Region: superstore_en.region
      Ship Mode: superstore_en.ship_mode

  - name: vip_customers
    title: "Customers"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.customer_count]
    listen:
      Order Date: superstore_en.order_date
      Customer Segment: superstore_en.segment
      Region: superstore_en.region
      Ship Mode: superstore_en.ship_mode

  - name: vip_sales_per_customer
    title: "Sales per Customer"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_per_customer]
    listen:
      Order Date: superstore_en.order_date
      Customer Segment: superstore_en.segment
      Region: superstore_en.region
      Ship Mode: superstore_en.ship_mode

  - name: vip_orders
    title: "Orders"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.order_count]
    listen:
      Order Date: superstore_en.order_date
      Customer Segment: superstore_en.segment
      Region: superstore_en.region
      Ship Mode: superstore_en.ship_mode

  - name: vip_customer_value_trend
    title: "Customer Value Trend"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.customer_count, superstore_en.sales_per_customer]
    sorts: [superstore_en.order_month]
    limit: 500
    listen:
      Order Date: superstore_en.order_date
      Customer Segment: superstore_en.segment
      Region: superstore_en.region
      Ship Mode: superstore_en.ship_mode

  - name: vip_segment_care
    title: "Segment Care Priorities"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.segment]
    measures: [superstore_en.sales, superstore_en.customer_count, superstore_en.sales_per_customer, superstore_en.profit_margin]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Customer Segment: superstore_en.segment
      Region: superstore_en.region
      Ship Mode: superstore_en.ship_mode

  - name: vip_ship_mode_experience
    title: "Shipping Experience by Mode"
    type: looker_bar
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.ship_mode]
    measures: [superstore_en.sales, superstore_en.order_count, superstore_en.customer_count]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Customer Segment: superstore_en.segment
      Region: superstore_en.region
      Ship Mode: superstore_en.ship_mode

  - name: vip_customer_watchlist
    title: "VIP Customer Watchlist"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.customer_name, superstore_en.segment, superstore_en.region, superstore_en.ship_mode]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.order_count, superstore_en.sales_per_customer, superstore_en.profit_margin]
    sorts: ["superstore_en.sales desc"]
    limit: 30
    listen:
      Order Date: superstore_en.order_date
      Customer Segment: superstore_en.segment
      Region: superstore_en.region
      Ship Mode: superstore_en.ship_mode

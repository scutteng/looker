- dashboard: vip_customer_care_manager
  title: "VIP Customer Care Manager Dashboard"
  description: "Customer experience view for high-value accounts, service context, purchase behavior, and care prioritization."
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
  - name: "Ship Mode"
    title: "Ship Mode"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.ship_mode
  - name: "State"
    title: "State"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.state

  rows:
  - elements: [vip_revenue, vip_customers, vip_sales_per_customer, vip_orders, vip_profit_per_order]
    height: 120
  - elements: [vip_customer_density_map, vip_customer_value_trend]
    height: 380
  - elements: [vip_shipping_profile, vip_segment_value]
    height: 360
  - elements: [vip_care_watchlist]
    height: 440

  elements:
  - name: vip_revenue
    title: "Serviced Revenue"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales]
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_customers
    title: "Customers Served"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.customer_count]
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_sales_per_customer
    title: "Sales per Customer"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_per_customer]
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_orders
    title: "Orders"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.order_count]
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_profit_per_order
    title: "Profit per Order"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_per_order]
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_customer_density_map
    title: "Customer Value by State"
    type: looker_map
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.state]
    measures: [superstore_en.sales, superstore_en.customer_count]
    sorts: ["superstore_en.sales desc"]
    limit: 50
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_customer_value_trend
    title: "Customer Value Trend"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.customer_count, superstore_en.sales_per_customer]
    sorts: [superstore_en.order_month]
    limit: 500
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_shipping_profile
    title: "Shipping Mode Experience"
    type: looker_pie
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.ship_mode]
    measures: [superstore_en.order_count]
    sorts: ["superstore_en.order_count desc"]
    limit: 10
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_segment_value
    title: "Segment Value and Care Load"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.segment]
    measures: [superstore_en.sales, superstore_en.customer_count, superstore_en.sales_per_customer, superstore_en.profit_per_order]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

  - name: vip_care_watchlist
    title: "VIP Care Watchlist"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.customer_name, superstore_en.segment, superstore_en.city, superstore_en.state, superstore_en.ship_mode, superstore_en.profit_status]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.order_count, superstore_en.sales_per_customer, superstore_en.profit_per_order, superstore_en.loss_amount]
    sorts: ["superstore_en.sales desc"]
    limit: 35
    listen: {Order Date: superstore_en.order_date, Customer Segment: superstore_en.segment, Ship Mode: superstore_en.ship_mode, State: superstore_en.state}

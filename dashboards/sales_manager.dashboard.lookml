- dashboard: sales_manager
  title: "Sales Manager Dashboard"
  description: "Territory execution view for sales coverage, customer expansion, order productivity, and market focus."
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
  - name: "State"
    title: "State"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.state

  rows:
  - elements: [sales_bookings, sales_orders, sales_customers, sales_aov, sales_units_per_order]
    height: 120
  - elements: [sales_territory_map, sales_monthly_momentum]
    height: 380
  - elements: [sales_region_segment_matrix, sales_city_leaderboard]
    height: 360
  - elements: [sales_account_focus]
    height: 420

  elements:
  - name: sales_bookings
    title: "Sales Bookings"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_compact]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_orders
    title: "Orders"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.order_count]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_customers
    title: "Buying Customers"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.customer_count]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_aov
    title: "Average Order Value"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.average_order_value]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_units_per_order
    title: "Units per Order"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.units_per_order]
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_territory_map
    title: "US Territory Sales Map"
    type: looker_map
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.state]
    measures: [superstore_en.sales]
    sorts: ["superstore_en.sales desc"]
    limit: 50
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_monthly_momentum
    title: "Monthly Momentum and MoM Growth"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.sales_last_month, superstore_en.sales_mom_growth]
    sorts: [superstore_en.order_month]
    limit: 500
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_region_segment_matrix
    title: "Region by Segment Coverage"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.region, superstore_en.segment]
    pivots: [superstore_en.segment]
    measures: [superstore_en.sales]
    sorts: ["superstore_en.sales desc"]
    limit: 20
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_city_leaderboard
    title: "Top City Markets"
    type: looker_bar
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.city, superstore_en.state]
    measures: [superstore_en.sales, superstore_en.order_count, superstore_en.customer_count]
    sorts: ["superstore_en.sales desc"]
    limit: 20
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

  - name: sales_account_focus
    title: "Account Focus List"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.customer_name, superstore_en.segment, superstore_en.city, superstore_en.state]
    measures: [superstore_en.sales, superstore_en.order_count, superstore_en.average_order_value, superstore_en.profit_per_order]
    sorts: ["superstore_en.sales desc"]
    limit: 30
    listen: {Order Date: superstore_en.order_date, Region: superstore_en.region, Customer Segment: superstore_en.segment, State: superstore_en.state}

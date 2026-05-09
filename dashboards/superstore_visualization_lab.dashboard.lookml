- dashboard: superstore_visualization_lab
  title: "Superstore Visualization Lab"
  description: "Experiment dashboard combining the Enhanced Bar Chart custom visualization with native Looker visualizations and shared dashboard filters."
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
  - name: "State"
    title: "State"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.state
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
  - elements: [lab_sales, lab_profit, lab_margin, lab_orders]
    height: 110
  - elements: [lab_enhanced_product_profit, lab_state_profit_map]
    height: 520
  - elements: [lab_monthly_trend, lab_segment_region_mix]
    height: 360
  - elements: [lab_product_detail]
    height: 420

  elements:
  - name: lab_sales
    title: "Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales_compact]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: lab_profit
    title: "Profit"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_compact]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: lab_margin
    title: "Profit Margin"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_margin]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: lab_orders
    title: "Orders"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.order_count]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: lab_enhanced_product_profit
    title: "Enhanced Product Profitability: Sales Length, Profit Color"
    type: enhanced_barchart
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category, superstore_en.subcategory, superstore_en.product_name]
    measures: [superstore_en.sales, superstore_en.profit]
    sorts: ["superstore_en.sales desc"]
    limit: 50
    orientation: horizontal
    canvas_size_mode: fixed_height
    fixed_canvas_height: 900
    height_measure: "0"
    color_mode: measure
    color_measure: "1"
    sort_by: height
    sort_direction: desc
    show_value_labels: true
    value_label_measure: height
    value_label_position: outside
    value_label_format: compact
    show_gradient_legend: true
    show_grid: true
    show_axis_title: true
    axis_title: "Sales"
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: lab_state_profit_map
    title: "State Profitability Map"
    type: looker_map
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.state]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin]
    sorts: ["superstore_en.sales desc"]
    limit: 200
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: lab_monthly_trend
    title: "Monthly Sales and Profit Trend"
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
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: lab_segment_region_mix
    title: "Region by Customer Segment"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.region, superstore_en.segment]
    pivots: [superstore_en.segment]
    measures: [superstore_en.sales]
    sorts: ["superstore_en.sales desc"]
    limit: 20
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

  - name: lab_product_detail
    title: "Product Detail for Filter Verification"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category, superstore_en.subcategory, superstore_en.product_name, superstore_en.region, superstore_en.segment]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin, superstore_en.discount_amount]
    sorts: ["superstore_en.sales desc"]
    limit: 50
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      State: superstore_en.state
      Customer Segment: superstore_en.segment
      Product Category: superstore_en.category

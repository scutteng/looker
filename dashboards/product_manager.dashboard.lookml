- dashboard: product_manager
  title: "Product Manager Dashboard"
  description: "Product portfolio view focused on category health, SKU breadth, demand, profitability, and discount pressure."
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
  - name: "Product Category"
    title: "Product Category"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.category
  - name: "Product Subcategory"
    title: "Product Subcategory"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.subcategory
  - name: "Region"
    title: "Region"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.region

  rows:
  - elements: [product_total_sales, product_total_profit, product_count, product_units_sold]
    height: 120
  - elements: [product_category_trend, product_category_profitability]
    height: 360
  - elements: [product_subcategory_mix, product_sku_watchlist]
    height: 360

  elements:
  - name: product_total_sales
    title: "Product Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales]
    listen:
      Order Date: superstore_en.order_date
      Product Category: superstore_en.category
      Product Subcategory: superstore_en.subcategory
      Region: superstore_en.region

  - name: product_total_profit
    title: "Product Profit"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit]
    listen:
      Order Date: superstore_en.order_date
      Product Category: superstore_en.category
      Product Subcategory: superstore_en.subcategory
      Region: superstore_en.region

  - name: product_count
    title: "Active Products"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.product_count]
    listen:
      Order Date: superstore_en.order_date
      Product Category: superstore_en.category
      Product Subcategory: superstore_en.subcategory
      Region: superstore_en.region

  - name: product_units_sold
    title: "Units Sold"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.quantity]
    listen:
      Order Date: superstore_en.order_date
      Product Category: superstore_en.category
      Product Subcategory: superstore_en.subcategory
      Region: superstore_en.region

  - name: product_category_trend
    title: "Monthly Sales by Category"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month, superstore_en.category]
    measures: [superstore_en.sales]
    pivots: [superstore_en.category]
    sorts: [superstore_en.order_month]
    limit: 500
    listen:
      Order Date: superstore_en.order_date
      Product Category: superstore_en.category
      Product Subcategory: superstore_en.subcategory
      Region: superstore_en.region

  - name: product_category_profitability
    title: "Category Profitability"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Product Category: superstore_en.category
      Product Subcategory: superstore_en.subcategory
      Region: superstore_en.region

  - name: product_subcategory_mix
    title: "Subcategory Sales and Margin"
    type: looker_bar
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.subcategory]
    measures: [superstore_en.sales, superstore_en.profit_margin, superstore_en.discount]
    sorts: ["superstore_en.sales desc"]
    limit: 20
    listen:
      Order Date: superstore_en.order_date
      Product Category: superstore_en.category
      Product Subcategory: superstore_en.subcategory
      Region: superstore_en.region

  - name: product_sku_watchlist
    title: "SKU Watchlist"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.product_name, superstore_en.category, superstore_en.subcategory]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.quantity, superstore_en.discount, superstore_en.profit_margin]
    sorts: ["superstore_en.profit"]
    limit: 30
    listen:
      Order Date: superstore_en.order_date
      Product Category: superstore_en.category
      Product Subcategory: superstore_en.subcategory
      Region: superstore_en.region

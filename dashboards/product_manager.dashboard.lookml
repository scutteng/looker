- dashboard: product_manager
  title: "Product Manager Dashboard"
  description: "Portfolio strategy view for category mix, SKU productivity, discount pressure, and product risk."
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
  - name: "Discount Tier"
    title: "Discount Tier"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.discount_tier

  rows:
  - elements: [product_sales, product_profit, product_active_skus, product_units, product_margin]
    height: 120
  - elements: [product_category_share, product_category_trend]
    height: 360
  - elements: [product_subcategory_matrix, product_discount_pressure]
    height: 380
  - elements: [product_portfolio_watchlist]
    height: 420

  elements:
  - name: product_sales
    title: "Portfolio Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales]
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_profit
    title: "Portfolio Profit"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit]
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_active_skus
    title: "Active SKUs"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.product_count]
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_units
    title: "Units Sold"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.quantity]
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_margin
    title: "Portfolio Margin"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_margin]
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_category_share
    title: "Category Sales Mix"
    type: looker_pie
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category]
    measures: [superstore_en.sales]
    sorts: ["superstore_en.sales desc"]
    limit: 10
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_category_trend
    title: "Category Trend by Month"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month, superstore_en.category]
    pivots: [superstore_en.category]
    measures: [superstore_en.sales]
    sorts: [superstore_en.order_month]
    limit: 500
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_subcategory_matrix
    title: "Subcategory Productivity Matrix"
    type: looker_scatter
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.subcategory]
    measures: [superstore_en.sales, superstore_en.profit_margin, superstore_en.quantity]
    sorts: ["superstore_en.sales desc"]
    limit: 20
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_discount_pressure
    title: "Discount Pressure by Subcategory"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.subcategory, superstore_en.discount_tier]
    pivots: [superstore_en.discount_tier]
    measures: [superstore_en.high_discount_sales]
    sorts: ["superstore_en.high_discount_sales desc"]
    limit: 30
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

  - name: product_portfolio_watchlist
    title: "Product Portfolio Watchlist"
    type: looker_grid
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.product_name, superstore_en.category, superstore_en.subcategory, superstore_en.discount_tier, superstore_en.profit_status]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.loss_amount, superstore_en.quantity, superstore_en.discount, superstore_en.profit_margin]
    sorts: ["superstore_en.loss_amount desc"]
    limit: 35
    listen: {Order Date: superstore_en.order_date, Product Category: superstore_en.category, Product Subcategory: superstore_en.subcategory, Discount Tier: superstore_en.discount_tier}

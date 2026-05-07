- dashboard: finance_manager
  title: "Finance Manager Dashboard"
  description: "Financial control view focused on revenue, profit, margin, discount exposure, and category profitability."
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
  - name: "Product Category"
    title: "Product Category"
    type: field_filter
    allow_multiple_values: true
    model: superstore_en
    explore: superstore_en
    field: superstore_en.category

  rows:
  - elements: [finance_total_sales, finance_total_profit, finance_profit_margin, finance_discount_amount]
    height: 120
  - elements: [finance_monthly_profit_trend, finance_region_profitability]
    height: 360
  - elements: [finance_category_margin, finance_discount_risk]
    height: 360

  elements:
  - name: finance_total_sales
    title: "Total Sales"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.sales]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Product Category: superstore_en.category

  - name: finance_total_profit
    title: "Total Profit"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Product Category: superstore_en.category

  - name: finance_profit_margin
    title: "Profit Margin"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.profit_margin]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Product Category: superstore_en.category

  - name: finance_discount_amount
    title: "Discount Exposure"
    type: single_value
    model: superstore_en
    explore: superstore_en
    measures: [superstore_en.discount_amount]
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Product Category: superstore_en.category

  - name: finance_monthly_profit_trend
    title: "Monthly Sales and Profit"
    type: looker_line
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.order_month]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin]
    sorts: [superstore_en.order_month]
    limit: 500
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Product Category: superstore_en.category

  - name: finance_region_profitability
    title: "Profitability by Region"
    type: looker_column
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.region]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin]
    sorts: ["superstore_en.profit desc"]
    limit: 10
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Product Category: superstore_en.category

  - name: finance_category_margin
    title: "Category Margin Review"
    type: looker_bar
    model: superstore_en
    explore: superstore_en
    dimensions: [superstore_en.category, superstore_en.subcategory]
    measures: [superstore_en.sales, superstore_en.profit, superstore_en.profit_margin]
    sorts: ["superstore_en.profit_margin"]
    limit: 20
    listen:
      Order Date: superstore_en.order_date
      Region: superstore_en.region
      Product Category: superstore_en.category

  - name: finance_discount_risk
    title: "Discount and Margin Exceptions"
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
      Product Category: superstore_en.category

# Revenue Columns Colored by Profit

This experiment tests a custom Looker visualization where:

- Bar height is driven by the first measure, usually `superstore_en.sales`.
- Bar color is driven by the second measure, usually `superstore_en.profit`.
- Positive profit uses a blue scale.
- Negative profit uses an orange scale.
- Larger positive profit becomes deeper blue.
- Larger negative profit becomes deeper orange.

## Suggested Explore Query

Model: `superstore_en`

Explore: `superstore_en`

Fields:

- `superstore_en.subcategory` or `superstore_en.product_name`
- `superstore_en.sales`
- `superstore_en.profit`

Sort:

- `superstore_en.sales desc`

Limit:

- 20-30 rows

Visualization:

- `Revenue Columns Colored by Profit`

## Why This Needs a Custom Visualization

Looker's native column chart assigns colors primarily by series or palette. This experiment needs point-level coloring based on another measure. That is a semantic encoding rule rather than a normal series color rule, so it is implemented as a custom visualization in `visualizations/revenue_profit_columns.js`.

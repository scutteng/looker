# Enhanced Bar Chart

This experiment tests a custom Looker visualization where:

- Bar height is driven by the first measure.
- Bar height can be rebound to any queried measure in the visualization settings.
- Bar color can use a single configured color.
- Bar color can also be bound to a selected measure.
- When the bound color measure crosses zero, positive values use one color scale and negative values use another color scale.
- When the bound color measure is all positive or all negative, one continuous gradient is used from the minimum value to the maximum value.
- Zero values can use a dedicated zero color.

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

- `Enhanced Bar Chart`

Suggested settings:

- `Bar Length / Height Measure`: `Sales`
- `Bar Color Mode`: `Bind to Measure`
- `Color Measure`: `Profit`
- Positive colors: light blue to dark blue
- Negative colors: light orange to dark orange
- Zero color: gray

## Why This Needs a Custom Visualization

Looker's native column chart assigns colors primarily by series or palette. This experiment needs point-level coloring based on another measure. That is a semantic encoding rule rather than a normal series color rule, so it is implemented as a custom visualization in `visualizations/enhanced_barchart.js`.

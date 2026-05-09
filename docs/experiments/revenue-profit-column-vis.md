# Enhanced Bar Chart

This experiment tests a custom Looker visualization where:

- Bar height is driven by the first measure.
- Bar height can be rebound to any queried measure in the visualization settings.
- Bar color can use a single configured color.
- Bar color can also be bound to a selected measure.
- When the bound color measure crosses zero, positive values use one color scale and negative values use another color scale.
- When the bound color measure is all positive or all negative, one continuous gradient is used from the minimum value to the maximum value.
- Zero values can use a dedicated zero color.
- The chart can render as vertical columns or horizontal bars.
- Bars can optionally have borders.
- Value labels can be displayed inside or outside bars, using either the length/height measure or the color measure.
- Query results can be sorted by dimension, bar measure, color measure, or left in Looker's query order.
- Grid lines and axis titles can be toggled.
- Axis range can be automatic or fixed.
- Linear axes support positive and negative bar values with a zero baseline.
- Logarithmic axes are supported for positive-only bar values.
- A compact gradient legend can be shown for the color-bound measure.
- Configuration options are grouped into Data, Style, and Axis sections when supported by the Looker visualization editor.
- Multiple queried dimensions are rendered as grouped hierarchical category labels where chart space allows.
- Horizontal bars group child rows under the same parent dimension and render the parent as a merged Tableau-style row header.
- The grouped horizontal axis uses separate parent and child label columns instead of concatenating labels with a slash.
- Pivoted measures fall back to the row total when present, or sum the visible pivot cells when no row total exists.
- The SVG resizes with the Looker tile canvas through a `ResizeObserver`.
- Flat horizontal tiles compress row height and margins so bars do not overflow into the x-axis area.
- Inside value labels automatically choose light or dark text based on the bar color for readability.

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

- `Orientation`: `Vertical Columns` or `Horizontal Bars`
- `Bar Length / Height Measure`: `Sales`
- `Bar Color Mode`: `Bind to Measure`
- `Color Measure`: `Profit`
- Positive colors: light blue to dark blue
- Negative colors: light orange to dark orange
- Zero color: gray
- `Show Bar Border`: optional
- `Show Value Labels`: optional
- `Value Label Position`: outside, inside, or auto
- `Sort By`: optional
- `Show Grid Lines`: optional
- `Show Axis Title`: optional
- `Axis Range`: automatic or fixed
- `Axis Scale`: linear or logarithmic
- `Show Gradient Legend`: optional

For multi-level labels, add two dimensions such as `Category` and `Subcategory`; horizontal bars will group rows by the parent dimension and show the child dimension as the row label. Vertical columns will stack the parent and child labels on the bottom axis when there is enough bar width.

## Why This Needs a Custom Visualization

Looker's native column chart assigns colors primarily by series or palette. This experiment needs point-level coloring based on another measure. That is a semantic encoding rule rather than a normal series color rule, so it is implemented as a custom visualization in `visualizations/enhanced_barchart.js`.

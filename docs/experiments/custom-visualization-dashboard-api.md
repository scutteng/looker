# Custom Visualization Dashboard API Notes

## Correct `vis_config.type`

When a custom visualization is used in an API-created user dashboard, the dashboard
element should remain a normal visualization tile:

```json
{
  "type": "vis"
}
```

The custom visualization is selected through the query or result maker
`vis_config.type`.

For a custom visualization declared in `manifest.lkml`, Looker stores the
dashboard `vis_config.type` with the LookML project namespace:

```json
{
  "type": "superstore_en::enhanced_scatterplot"
}
```

Using only the bare visualization id, such as `enhanced_scatterplot`, can create
a tile through the API but may render as a type mismatch or broken custom
visualization in the dashboard UI.

## Enhanced Scatter Plot Example

```json
{
  "type": "superstore_en::enhanced_scatterplot",
  "x_measure": "0",
  "y_measure": "1",
  "size_mode": "measure",
  "size_measure": "2",
  "color_mode": "measure",
  "color_measure": "3",
  "quadrant_mode": "average",
  "point_opacity": 0.78,
  "min_radius": 4,
  "max_radius": 20,
  "show_labels": false,
  "show_legend": true
}
```

The index values refer to the measure order in the query result. For example:

```json
[
  "superstore_en.discount_to_sales_ratio",
  "superstore_en.profit_margin",
  "superstore_en.sales",
  "superstore_en.profit"
]
```

In this case:

- `x_measure: "0"` maps to discount-to-sales ratio.
- `y_measure: "1"` maps to profit margin.
- `size_measure: "2"` maps to sales.
- `color_measure: "3"` maps to profit.

## Enhanced Bar Chart Example

The current Enhanced Bar Chart implementation expects these option names:

```json
{
  "type": "superstore_en::enhanced_barchart",
  "height_measure": "0",
  "color_mode": "measure",
  "color_measure": "1",
  "orientation": "horizontal",
  "canvas_size_mode": "fixed_height",
  "fixed_canvas_height": 900,
  "show_value_labels": true,
  "value_label_position": "outside",
  "show_border": false,
  "positive_light": "#A7D8FF",
  "positive_dark": "#0B5CAD",
  "negative_light": "#FFD5A1",
  "negative_dark": "#C65F00",
  "zero_color": "#CBD5E1",
  "axis_scale": "linear",
  "axis_range_mode": "auto"
}
```

Avoid older or mismatched names such as `fixed_height`, `show_values`,
`value_position`, `show_bar_border`, `positive_light_color`, and
`negative_dark_color`. Those keys may be stored by Looker if passed through the
API, but the visualization code does not read them.

## Dashboard Filter Wiring

For dashboard filters to listen correctly, include `result_maker.filterables`
when creating the tile:

```json
{
  "filterables": [
    {
      "model": "superstore_en",
      "view": "superstore_en",
      "name": "",
      "listen": [
        {
          "dashboard_filter_name": "Order Date",
          "field": "superstore_en.order_date"
        },
        {
          "dashboard_filter_name": "Region",
          "field": "superstore_en.region"
        },
        {
          "dashboard_filter_name": "State",
          "field": "superstore_en.state"
        }
      ]
    }
  ]
}
```

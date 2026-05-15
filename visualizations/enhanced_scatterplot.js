looker.plugins.visualizations.add({
  id: "enhanced_scatterplot",
  label: "Enhanced Scatter Plot",
  options: {
    title: {
      type: "string",
      label: "Title",
      section: "Data",
      default: "Enhanced Scatter Plot"
    },
    max_points: {
      type: "number",
      label: "Max Points",
      section: "Data",
      default: 250
    },
    x_measure: {
      type: "string",
      label: "X Axis Measure",
      section: "Data",
      display: "select",
      values: [{ "First Measure": "0" }],
      default: "0"
    },
    y_measure: {
      type: "string",
      label: "Y Axis Measure",
      section: "Data",
      display: "select",
      values: [{ "Second Measure": "1" }],
      default: "1"
    },
    size_mode: {
      type: "string",
      label: "Point Size",
      section: "Data",
      display: "select",
      values: [{ "Fixed": "fixed" }, { "Bind to Measure": "measure" }],
      default: "measure"
    },
    size_measure: {
      type: "string",
      label: "Size Measure",
      section: "Data",
      display: "select",
      values: [{ "Third Measure": "2" }],
      default: "2"
    },
    color_mode: {
      type: "string",
      label: "Point Color",
      section: "Data",
      display: "select",
      values: [{ "Single Color": "single" }, { "Bind to Measure": "measure" }],
      default: "measure"
    },
    color_measure: {
      type: "string",
      label: "Color Measure",
      section: "Data",
      display: "select",
      values: [{ "Fourth Measure": "3" }],
      default: "3"
    },
    quadrant_mode: {
      type: "string",
      label: "Quadrant Reference",
      section: "Data",
      display: "select",
      values: [
        { "None": "none" },
        { "Zero": "zero" },
        { "Average": "average" },
        { "Median": "median" },
        { "Fixed Values": "fixed" }
      ],
      default: "average"
    },
    x_reference: {
      type: "number",
      label: "Fixed X Reference",
      section: "Data",
      default: 0
    },
    y_reference: {
      type: "number",
      label: "Fixed Y Reference",
      section: "Data",
      default: 0
    },
    single_color: {
      type: "string",
      label: "Single Color",
      section: "Style",
      display: "color",
      default: "#2563EB"
    },
    positive_light: {
      type: "string",
      label: "Positive Light Color",
      section: "Style",
      display: "color",
      default: "#9ECAE1"
    },
    positive_dark: {
      type: "string",
      label: "Positive Dark Color",
      section: "Style",
      display: "color",
      default: "#1F77B4"
    },
    negative_light: {
      type: "string",
      label: "Negative Light Color",
      section: "Style",
      display: "color",
      default: "#FDD0A2"
    },
    negative_dark: {
      type: "string",
      label: "Negative Dark Color",
      section: "Style",
      display: "color",
      default: "#FF7F0E"
    },
    zero_color: {
      type: "string",
      label: "Zero Color",
      section: "Style",
      display: "color",
      default: "#CBD5E1"
    },
    point_shape: {
      type: "string",
      label: "Point Shape",
      section: "Style",
      display: "select",
      values: [
        { "Circle": "circle" },
        { "Square": "square" },
        { "Diamond": "diamond" },
        { "Triangle": "triangle" },
        { "Cross": "cross" }
      ],
      default: "circle"
    },
    point_opacity: {
      type: "number",
      label: "Point Opacity",
      section: "Style",
      default: 0.82
    },
    min_radius: {
      type: "number",
      label: "Minimum Radius",
      section: "Style",
      default: 4
    },
    max_radius: {
      type: "number",
      label: "Maximum Radius",
      section: "Style",
      default: 18
    },
    show_labels: {
      type: "boolean",
      label: "Show Labels",
      section: "Style",
      default: false
    },
    label_limit: {
      type: "number",
      label: "Label Top N",
      section: "Style",
      default: 30
    },
    show_legend: {
      type: "boolean",
      label: "Show Legends",
      section: "Style",
      default: true
    },
    show_grid: {
      type: "boolean",
      label: "Show Grid Lines",
      section: "Axis",
      default: true
    },
    x_axis_range_mode: {
      type: "string",
      label: "X Axis Range",
      section: "Axis",
      display: "select",
      values: [{ "Automatic": "auto" }, { "Compact Dynamic": "compact" }, { "Fixed": "fixed" }],
      default: "auto"
    },
    x_compact_percentile: {
      type: "number",
      label: "X Compact Percentile",
      section: "Axis",
      default: 5
    },
    x_axis_min: {
      type: "number",
      label: "X Axis Minimum",
      section: "Axis",
      default: 0
    },
    x_axis_max: {
      type: "number",
      label: "X Axis Maximum",
      section: "Axis",
      default: 0
    },
    y_axis_range_mode: {
      type: "string",
      label: "Y Axis Range",
      section: "Axis",
      display: "select",
      values: [{ "Automatic": "auto" }, { "Compact Dynamic": "compact" }, { "Fixed": "fixed" }],
      default: "auto"
    },
    y_compact_percentile: {
      type: "number",
      label: "Y Compact Percentile",
      section: "Axis",
      default: 5
    },
    y_axis_min: {
      type: "number",
      label: "Y Axis Minimum",
      section: "Axis",
      default: 0
    },
    y_axis_max: {
      type: "number",
      label: "Y Axis Maximum",
      section: "Axis",
      default: 0
    }
  },

  create: function(element) {
    element.innerHTML = [
      "<style>",
      ".esc-root{font-family:Inter,Roboto,Arial,sans-serif;color:#1f2937;width:100%;height:100%;box-sizing:border-box;padding:16px;background:#fff;}",
      ".esc-title{font-size:18px;font-weight:700;margin:0 0 4px;}",
      ".esc-subtitle{font-size:12px;color:#64748b;margin:0 0 10px;}",
      ".esc-wrap{position:relative;width:100%;height:calc(100% - 48px);min-height:260px;}",
      ".esc-tooltip{position:absolute;pointer-events:none;display:none;background:#111827;color:#fff;border-radius:4px;padding:8px 10px;font-size:12px;line-height:1.35;box-shadow:0 8px 24px rgba(15,23,42,.22);z-index:2;}",
      ".esc-axis text{fill:#64748b;font-size:11px;}",
      ".esc-axis path,.esc-axis line{stroke:#cbd5e1;}",
      ".esc-grid{stroke:#e8edf3;stroke-width:1;}",
      ".esc-ref{stroke:#334155;stroke-width:1.4;stroke-dasharray:5 4;}",
      ".esc-ref-label{fill:#475569;font-size:11px;font-weight:600;}",
      ".esc-point{stroke:#fff;stroke-width:1.2;transition:opacity .15s ease,stroke-width .15s ease;}",
      ".esc-point:hover{opacity:1;stroke:#111827;stroke-width:2;}",
      ".esc-label{fill:#334155;font-size:11px;paint-order:stroke;stroke:#fff;stroke-width:3px;stroke-linejoin:round;}",
      ".esc-axis-title{fill:#475569;font-size:12px;font-weight:700;}",
      ".esc-legend{fill:#64748b;font-size:11px;}",
      "</style>",
      "<div class='esc-root'>",
      "<div class='esc-title'></div>",
      "<div class='esc-subtitle'></div>",
      "<div class='esc-wrap'><svg></svg><div class='esc-tooltip'></div></div>",
      "</div>"
    ].join("");
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    var dimensions = queryResponse.fields.dimension_like || [];
    var measures = queryResponse.fields.measure_like || [];
    if (measures.length < 2) {
      this.addError({
        title: "Need at least 2 measures",
        message: "Add one measure for X and one measure for Y. Dimensions are used only for point granularity and labels."
      });
      done();
      return;
    }

    escRegisterOptions(this, measures, config);

    var xIndex = escMeasureIndex(config.x_measure, measures, 0);
    var yIndex = escMeasureIndex(config.y_measure, measures, measures.length > 1 ? 1 : 0);
    var sizeIndex = escMeasureIndex(config.size_measure, measures, measures.length > 2 ? 2 : xIndex);
    var colorIndex = escMeasureIndex(config.color_measure, measures, measures.length > 3 ? 3 : yIndex);
    var xMeasure = measures[xIndex];
    var yMeasure = measures[yIndex];
    var sizeMeasure = config.size_mode === "measure" ? measures[sizeIndex] : null;
    var colorMeasure = config.color_mode === "measure" ? measures[colorIndex] : null;

    var maxPoints = Math.max(1, Number(config.max_points || 250));
    var rows = data.slice(0, maxPoints).map(function(row, index) {
      var label = dimensions.map(function(dimension) {
        return escCleanLabel(escCellValue(row, dimension.name));
      }).filter(Boolean).join(" / ");
      if (!label) label = "Row " + (index + 1);
      return {
        label: label,
        x: escMeasureValue(row, xMeasure.name),
        y: escMeasureValue(row, yMeasure.name),
        size: sizeMeasure ? escMeasureValue(row, sizeMeasure.name) : null,
        color: colorMeasure ? escMeasureValue(row, colorMeasure.name) : null
      };
    }).filter(function(row) {
      return Number.isFinite(row.x) && Number.isFinite(row.y);
    });

    if (!rows.length) {
      this.addError({
        title: "No plottable rows",
        message: "The query returned no rows with numeric X and Y measure values."
      });
      done();
      return;
    }

    var state = {
      rows: rows,
      config: config,
      xMeasure: xMeasure,
      yMeasure: yMeasure,
      sizeMeasure: sizeMeasure,
      colorMeasure: colorMeasure,
      colorStats: colorMeasure ? escStats(rows.map(function(row) { return row.color; })) : null,
      sizeStats: sizeMeasure ? escStats(rows.map(function(row) { return Math.abs(row.size); })) : null
    };
    element._escRender = function() {
      escRender(element, state);
    };
    escEnsureResizeObserver(element);
    element._escRender();
    done();
  }
});

function escRegisterOptions(vis, measures, config) {
  if (!vis || typeof vis.trigger !== "function") return;
  var values = measures.map(function(measure, index) {
    var option = {};
    option[escFieldLabel(measure)] = String(index);
    return option;
  });
  var options = {
    title: { type: "string", label: "Title", section: "Data", default: "Enhanced Scatter Plot" },
    max_points: { type: "number", label: "Max Points", section: "Data", default: 250 },
    x_measure: { type: "string", label: "X Axis Measure", section: "Data", display: "select", values: values, default: "0" },
    y_measure: { type: "string", label: "Y Axis Measure", section: "Data", display: "select", values: values, default: measures.length > 1 ? "1" : "0" },
    size_mode: { type: "string", label: "Point Size", section: "Data", display: "select", values: [{ "Fixed": "fixed" }, { "Bind to Measure": "measure" }], default: "measure" },
    color_mode: { type: "string", label: "Point Color", section: "Data", display: "select", values: [{ "Single Color": "single" }, { "Bind to Measure": "measure" }], default: "measure" },
    quadrant_mode: { type: "string", label: "Quadrant Reference", section: "Data", display: "select", values: [{ "None": "none" }, { "Zero": "zero" }, { "Average": "average" }, { "Median": "median" }, { "Fixed Values": "fixed" }], default: "average" }
  };
  if (config.size_mode !== "fixed") {
    options.size_measure = { type: "string", label: "Size Measure", section: "Data", display: "select", values: values, default: measures.length > 2 ? "2" : "0" };
  }
  if (config.color_mode !== "single") {
    options.color_measure = { type: "string", label: "Color Measure", section: "Data", display: "select", values: values, default: measures.length > 3 ? "3" : (measures.length > 1 ? "1" : "0") };
  }
  if (config.quadrant_mode === "fixed") {
    options.x_reference = { type: "number", label: "Fixed X Reference", section: "Data", default: 0 };
    options.y_reference = { type: "number", label: "Fixed Y Reference", section: "Data", default: 0 };
  }
  Object.assign(options, escStyleOptions(config), escAxisOptions(config));
  var signature = JSON.stringify(options);
  if (vis._escOptionsSignature === signature) return;
  vis._escOptionsSignature = signature;
  vis.trigger("registerOptions", options);
}

function escStyleOptions(config) {
  var options = {};
  if (config.color_mode === "single") {
    options.single_color = { type: "string", label: "Single Color", section: "Style", display: "color", default: "#2563EB" };
  } else {
    options.positive_light = { type: "string", label: "Positive Light Color", section: "Style", display: "color", default: "#9ECAE1" };
    options.positive_dark = { type: "string", label: "Positive Dark Color", section: "Style", display: "color", default: "#1F77B4" };
    options.negative_light = { type: "string", label: "Negative Light Color", section: "Style", display: "color", default: "#FDD0A2" };
    options.negative_dark = { type: "string", label: "Negative Dark Color", section: "Style", display: "color", default: "#FF7F0E" };
    options.zero_color = { type: "string", label: "Zero Color", section: "Style", display: "color", default: "#CBD5E1" };
  }
  options.point_opacity = { type: "number", label: "Point Opacity", section: "Style", default: 0.82 };
  options.point_shape = {
    type: "string",
    label: "Point Shape",
    section: "Style",
    display: "select",
    values: [{ "Circle": "circle" }, { "Square": "square" }, { "Diamond": "diamond" }, { "Triangle": "triangle" }, { "Cross": "cross" }],
    default: "circle"
  };
  options.min_radius = { type: "number", label: "Minimum Radius", section: "Style", default: 4 };
  options.max_radius = { type: "number", label: "Maximum Radius", section: "Style", default: 18 };
  options.show_labels = { type: "boolean", label: "Show Labels", section: "Style", default: false };
  if (config.show_labels) {
    options.label_limit = { type: "number", label: "Label Top N", section: "Style", default: 30 };
  }
  options.show_legend = { type: "boolean", label: "Show Legends", section: "Style", default: true };
  return options;
}

function escAxisOptions(config) {
  var options = {
    show_grid: { type: "boolean", label: "Show Grid Lines", section: "Axis", default: true },
    x_axis_range_mode: { type: "string", label: "X Axis Range", section: "Axis", display: "select", values: [{ "Automatic": "auto" }, { "Compact Dynamic": "compact" }, { "Fixed": "fixed" }], default: "auto" },
    y_axis_range_mode: { type: "string", label: "Y Axis Range", section: "Axis", display: "select", values: [{ "Automatic": "auto" }, { "Compact Dynamic": "compact" }, { "Fixed": "fixed" }], default: "auto" }
  };
  if (config.x_axis_range_mode === "compact") {
    options.x_compact_percentile = { type: "number", label: "X Compact Percentile", section: "Axis", default: 5 };
  }
  if (config.x_axis_range_mode === "fixed") {
    options.x_axis_min = { type: "number", label: "X Axis Minimum", section: "Axis", default: 0 };
    options.x_axis_max = { type: "number", label: "X Axis Maximum", section: "Axis", default: 0 };
  }
  if (config.y_axis_range_mode === "compact") {
    options.y_compact_percentile = { type: "number", label: "Y Compact Percentile", section: "Axis", default: 5 };
  }
  if (config.y_axis_range_mode === "fixed") {
    options.y_axis_min = { type: "number", label: "Y Axis Minimum", section: "Axis", default: 0 };
    options.y_axis_max = { type: "number", label: "Y Axis Maximum", section: "Axis", default: 0 };
  }
  return options;
}

function escRender(element, state) {
  var config = state.config;
  var root = element.querySelector(".esc-root");
  var wrap = element.querySelector(".esc-wrap");
  var svg = element.querySelector("svg");
  var tooltip = element.querySelector(".esc-tooltip");
  var title = element.querySelector(".esc-title");
  var subtitle = element.querySelector(".esc-subtitle");
  if (!root || !wrap || !svg || !tooltip) return;

  title.textContent = config.title || "Enhanced Scatter Plot";
  subtitle.textContent = escFieldLabel(state.xMeasure) + " vs " + escFieldLabel(state.yMeasure);
  var width = Math.max(360, wrap.clientWidth || element.clientWidth || 640);
  var height = Math.max(300, wrap.clientHeight || element.clientHeight - 48 || 420);
  var legendHeight = config.show_legend ? 28 : 0;
  var margin = { top: 18, right: 28, bottom: 54 + legendHeight, left: 72 };
  var innerWidth = Math.max(120, width - margin.left - margin.right);
  var innerHeight = Math.max(120, height - margin.top - margin.bottom);

  escClear(svg);
  escAttr(svg, { width: width, height: height, viewBox: "0 0 " + width + " " + height });

  var xDomain = escDomain(state.rows.map(function(row) { return row.x; }), config.x_axis_range_mode, config.x_axis_min, config.x_axis_max, config.x_compact_percentile);
  var yDomain = escDomain(state.rows.map(function(row) { return row.y; }), config.y_axis_range_mode, config.y_axis_min, config.y_axis_max, config.y_compact_percentile);
  var xScale = function(value) { return margin.left + escNormalize(value, xDomain) * innerWidth; };
  var yScale = function(value) { return margin.top + (1 - escNormalize(value, yDomain)) * innerHeight; };

  var g = escSvg("g", { transform: "translate(0,0)" });
  svg.appendChild(g);

  escDrawGridAndAxes(g, margin, innerWidth, innerHeight, xDomain, yDomain, xScale, yScale, state, config);
  escDrawQuadrants(g, margin, innerWidth, innerHeight, xDomain, yDomain, xScale, yScale, state, config);

  var labelRows = escLabelRows(state.rows, config, state.sizeMeasure);
  state.rows.forEach(function(row) {
    var cx = xScale(row.x);
    var cy = yScale(row.y);
    var radius = escRadius(row, state, config);
    var fill = escColor(row, state, config);
    var point = escPointShape(config.point_shape || "circle", cx, cy, radius, fill, escClamp(Number(config.point_opacity || 0.82), 0.1, 1));
    point.addEventListener("mousemove", function(event) {
      tooltip.innerHTML = escTooltip(row, state);
      tooltip.style.display = "block";
      tooltip.style.left = Math.min(event.offsetX + 12, width - 220) + "px";
      tooltip.style.top = Math.max(event.offsetY - 8, 4) + "px";
    });
    point.addEventListener("mouseleave", function() {
      tooltip.style.display = "none";
    });
    g.appendChild(point);
    if (labelRows.indexOf(row) >= 0) {
      g.appendChild(escText(row.label, cx + radius + 4, cy + 4, "esc-label"));
    }
  });

  if (config.show_legend) {
    escDrawLegend(g, margin, innerWidth, innerHeight, state, config);
  }
}

function escDrawGridAndAxes(g, margin, innerWidth, innerHeight, xDomain, yDomain, xScale, yScale, state, config) {
  var xTicks = escTicks(xDomain, 5);
  var yTicks = escTicks(yDomain, 5);
  xTicks.forEach(function(tick) {
    var x = xScale(tick);
    if (config.show_grid) g.appendChild(escSvg("line", { class: "esc-grid", x1: x, y1: margin.top, x2: x, y2: margin.top + innerHeight }));
    g.appendChild(escText(escFormat(tick), x, margin.top + innerHeight + 20, "esc-axis", "middle"));
  });
  yTicks.forEach(function(tick) {
    var y = yScale(tick);
    if (config.show_grid) g.appendChild(escSvg("line", { class: "esc-grid", x1: margin.left, y1: y, x2: margin.left + innerWidth, y2: y }));
    g.appendChild(escText(escFormat(tick), margin.left - 10, y + 4, "esc-axis", "end"));
  });
  g.appendChild(escSvg("line", { x1: margin.left, y1: margin.top + innerHeight, x2: margin.left + innerWidth, y2: margin.top + innerHeight, stroke: "#94a3b8" }));
  g.appendChild(escSvg("line", { x1: margin.left, y1: margin.top, x2: margin.left, y2: margin.top + innerHeight, stroke: "#94a3b8" }));
  g.appendChild(escText(escFieldLabel(state.xMeasure), margin.left + innerWidth / 2, margin.top + innerHeight + 42, "esc-axis-title", "middle"));
  var yTitle = escText(escFieldLabel(state.yMeasure), 18, margin.top + innerHeight / 2, "esc-axis-title", "middle");
  escAttr(yTitle, { transform: "rotate(-90 18 " + (margin.top + innerHeight / 2) + ")" });
  g.appendChild(yTitle);
}

function escDrawQuadrants(g, margin, innerWidth, innerHeight, xDomain, yDomain, xScale, yScale, state, config) {
  var ref = escReferenceValues(state.rows, config);
  if (!ref) return;
  if (ref.x >= xDomain[0] && ref.x <= xDomain[1]) {
    var x = xScale(ref.x);
    g.appendChild(escSvg("line", { class: "esc-ref", x1: x, y1: margin.top, x2: x, y2: margin.top + innerHeight }));
    g.appendChild(escText("X " + ref.label + ": " + escFormat(ref.x), x + 6, margin.top + 14, "esc-ref-label", "start"));
  }
  if (ref.y >= yDomain[0] && ref.y <= yDomain[1]) {
    var y = yScale(ref.y);
    g.appendChild(escSvg("line", { class: "esc-ref", x1: margin.left, y1: y, x2: margin.left + innerWidth, y2: y }));
    g.appendChild(escText("Y " + ref.label + ": " + escFormat(ref.y), margin.left + 6, y - 6, "esc-ref-label", "start"));
  }
}

function escDrawLegend(g, margin, innerWidth, innerHeight, state, config) {
  var y = margin.top + innerHeight + 68;
  var x = margin.left;
  if (state.colorMeasure && config.color_mode !== "single") {
    g.appendChild(escText("Color: " + escFieldLabel(state.colorMeasure), x, y, "esc-legend", "start"));
    x += 150;
    [-1, 0, 1].forEach(function(value, index) {
      g.appendChild(escSvg("circle", { cx: x + index * 26, cy: y - 4, r: 6, fill: escColor({ color: value }, state, config) }));
    });
    x += 95;
  }
  if (state.sizeMeasure && config.size_mode !== "fixed") {
    g.appendChild(escText("Size: " + escFieldLabel(state.sizeMeasure), x, y, "esc-legend", "start"));
  }
}

function escReferenceValues(rows, config) {
  var mode = config.quadrant_mode || "average";
  if (mode === "none") return null;
  if (mode === "zero") return { x: 0, y: 0, label: "zero" };
  if (mode === "fixed") return { x: Number(config.x_reference || 0), y: Number(config.y_reference || 0), label: "fixed" };
  var xs = rows.map(function(row) { return row.x; }).filter(Number.isFinite).sort(function(a, b) { return a - b; });
  var ys = rows.map(function(row) { return row.y; }).filter(Number.isFinite).sort(function(a, b) { return a - b; });
  if (mode === "median") return { x: escMedian(xs), y: escMedian(ys), label: "median" };
  return { x: escMean(xs), y: escMean(ys), label: "avg" };
}

function escRadius(row, state, config) {
  var minRadius = Math.max(1, Number(config.min_radius || 4));
  var maxRadius = Math.max(minRadius, Number(config.max_radius || 18));
  if (!state.sizeMeasure || config.size_mode === "fixed" || !state.sizeStats) return (minRadius + maxRadius) / 2;
  var value = Math.abs(row.size || 0);
  return minRadius + escNormalize(value, [state.sizeStats.min, state.sizeStats.max]) * (maxRadius - minRadius);
}

function escColor(row, state, config) {
  if (!state.colorMeasure || config.color_mode === "single" || row.color == null) return config.single_color || "#2563EB";
  var value = row.color;
  if (Math.abs(value) < 1e-12) return config.zero_color || "#CBD5E1";
  var stats = state.colorStats || escStats([value]);
  if (value > 0) {
    var posDenom = Math.max(Math.abs(stats.max), 1e-12);
    return escInterpolateColor(config.positive_light || "#9ECAE1", config.positive_dark || "#1F77B4", escClamp(value / posDenom, 0, 1));
  }
  var negDenom = Math.max(Math.abs(stats.min), 1e-12);
  return escInterpolateColor(config.negative_light || "#FDD0A2", config.negative_dark || "#FF7F0E", escClamp(Math.abs(value) / negDenom, 0, 1));
}

function escLabelRows(rows, config, sizeMeasure) {
  if (!config.show_labels) return [];
  var limit = Math.max(0, Number(config.label_limit || 30));
  if (limit >= rows.length) return rows;
  return rows.slice().sort(function(a, b) {
    if (sizeMeasure) return Math.abs(b.size || 0) - Math.abs(a.size || 0);
    return Math.abs(b.x) + Math.abs(b.y) - Math.abs(a.x) - Math.abs(a.y);
  }).slice(0, limit);
}

function escTooltip(row, state) {
  var lines = [
    "<strong>" + escHtml(row.label) + "</strong>",
    escHtml(escFieldLabel(state.xMeasure)) + ": " + escHtml(escFormat(row.x)),
    escHtml(escFieldLabel(state.yMeasure)) + ": " + escHtml(escFormat(row.y))
  ];
  if (state.sizeMeasure) lines.push(escHtml(escFieldLabel(state.sizeMeasure)) + ": " + escHtml(escFormat(row.size)));
  if (state.colorMeasure) lines.push(escHtml(escFieldLabel(state.colorMeasure)) + ": " + escHtml(escFormat(row.color)));
  return lines.join("<br>");
}

function escDomain(values, mode, fixedMin, fixedMax, compactPercentile) {
  if (mode === "fixed" && Number.isFinite(Number(fixedMin)) && Number.isFinite(Number(fixedMax)) && Number(fixedMin) !== Number(fixedMax)) {
    return [Number(fixedMin), Number(fixedMax)];
  }
  var numeric = values.filter(Number.isFinite).sort(function(a, b) { return a - b; });
  var stats = escStats(numeric);
  var min = stats.min;
  var max = stats.max;
  if (mode === "compact" && numeric.length > 3) {
    var percentile = escClamp(Number(compactPercentile || 5), 0, 40);
    min = escQuantile(numeric, percentile / 100);
    max = escQuantile(numeric, 1 - percentile / 100);
    if (min === max) {
      min = stats.min;
      max = stats.max;
    }
  }
  if (min === max) {
    var bump = Math.abs(min || 1) * 0.1;
    min -= bump;
    max += bump;
  }
  var padding = (max - min) * 0.08;
  return [min - padding, max + padding];
}

function escPointShape(shape, cx, cy, radius, fill, opacity) {
  var attrs = { class: "esc-point", fill: fill, opacity: opacity };
  if (shape === "square") {
    return escSvg("rect", Object.assign(attrs, {
      x: cx - radius,
      y: cy - radius,
      width: radius * 2,
      height: radius * 2,
      rx: Math.min(2, radius * 0.25)
    }));
  }
  if (shape === "diamond") {
    return escSvg("path", Object.assign(attrs, {
      d: "M " + cx + " " + (cy - radius) + " L " + (cx + radius) + " " + cy + " L " + cx + " " + (cy + radius) + " L " + (cx - radius) + " " + cy + " Z"
    }));
  }
  if (shape === "triangle") {
    var h = radius * 1.8;
    return escSvg("path", Object.assign(attrs, {
      d: "M " + cx + " " + (cy - h * 0.65) + " L " + (cx + radius * 1.15) + " " + (cy + h * 0.55) + " L " + (cx - radius * 1.15) + " " + (cy + h * 0.55) + " Z"
    }));
  }
  if (shape === "cross") {
    return escSvg("path", Object.assign(attrs, {
      d: "M " + (cx - radius) + " " + (cy - radius * 0.35) +
        " L " + (cx - radius * 0.35) + " " + (cy - radius * 0.35) +
        " L " + (cx - radius * 0.35) + " " + (cy - radius) +
        " L " + (cx + radius * 0.35) + " " + (cy - radius) +
        " L " + (cx + radius * 0.35) + " " + (cy - radius * 0.35) +
        " L " + (cx + radius) + " " + (cy - radius * 0.35) +
        " L " + (cx + radius) + " " + (cy + radius * 0.35) +
        " L " + (cx + radius * 0.35) + " " + (cy + radius * 0.35) +
        " L " + (cx + radius * 0.35) + " " + (cy + radius) +
        " L " + (cx - radius * 0.35) + " " + (cy + radius) +
        " L " + (cx - radius * 0.35) + " " + (cy + radius * 0.35) +
        " L " + (cx - radius) + " " + (cy + radius * 0.35) + " Z"
    }));
  }
  return escSvg("circle", Object.assign(attrs, { cx: cx, cy: cy, r: radius }));
}

function escTicks(domain, count) {
  var min = domain[0];
  var max = domain[1];
  var ticks = [];
  if (count <= 1 || min === max) return [min];
  for (var i = 0; i < count; i++) ticks.push(min + ((max - min) * i) / (count - 1));
  return ticks;
}

function escStats(values) {
  var numeric = values.filter(Number.isFinite);
  if (!numeric.length) return { min: 0, max: 0, hasPositive: false, hasNegative: false };
  var min = Math.min.apply(null, numeric);
  var max = Math.max.apply(null, numeric);
  return { min: min, max: max, hasPositive: max > 0, hasNegative: min < 0 };
}

function escNormalize(value, domain) {
  var min = domain[0];
  var max = domain[1];
  if (!Number.isFinite(value) || max === min) return 0.5;
  return escClamp((value - min) / (max - min), 0, 1);
}

function escMean(values) {
  if (!values.length) return 0;
  return values.reduce(function(total, value) { return total + value; }, 0) / values.length;
}

function escMedian(values) {
  if (!values.length) return 0;
  var mid = Math.floor(values.length / 2);
  return values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
}

function escQuantile(sortedValues, q) {
  if (!sortedValues.length) return 0;
  if (sortedValues.length === 1) return sortedValues[0];
  var pos = escClamp(q, 0, 1) * (sortedValues.length - 1);
  var lower = Math.floor(pos);
  var upper = Math.ceil(pos);
  var weight = pos - lower;
  return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
}

function escMeasureIndex(value, measures, fallback) {
  var index = Number(value);
  if (!Number.isFinite(index) || index < 0 || index >= measures.length) return fallback;
  return index;
}

function escCellValue(row, fieldName) {
  var cell = row[fieldName];
  if (!cell) return null;
  return cell.value == null ? cell.rendered || cell.html || "" : cell.value;
}

function escMeasureValue(row, fieldName) {
  var cell = row[fieldName];
  if (!cell) return 0;
  var direct = escNumericFromCell(cell);
  if (direct != null) return direct;
  var total = escPivotTotalValue(cell);
  if (total != null) return total;
  var sum = 0;
  var found = false;
  Object.keys(cell).forEach(function(key) {
    var value = escNumericFromCell(cell[key]);
    if (value != null) {
      sum += value;
      found = true;
    }
  });
  return found ? sum : 0;
}

function escPivotTotalValue(cell) {
  var keys = Object.keys(cell).filter(function(key) {
    return key.indexOf("row_total") >= 0 || key.indexOf("total") >= 0;
  });
  for (var i = 0; i < keys.length; i++) {
    var value = escNumericFromCell(cell[keys[i]]);
    if (value != null) return value;
  }
  return null;
}

function escNumericFromCell(cell) {
  if (cell == null) return null;
  if (typeof cell === "number") return Number.isFinite(cell) ? cell : null;
  if (typeof cell === "string") return escParseNumeric(cell);
  if (typeof cell !== "object") return null;
  if (cell.value != null) return escParseNumeric(cell.value);
  if (cell.rendered != null) return escParseNumeric(cell.rendered);
  if (cell.html != null) return escParseNumeric(cell.html);
  return null;
}

function escParseNumeric(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  var cleaned = String(value == null ? "" : value).replace(/<[^>]*>/g, "").replace(/,/g, "").replace(/[$¥￥%]/g, "").trim();
  if (cleaned === "") return null;
  var number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function escCleanLabel(value) {
  return String(value == null ? "" : value).trim();
}

function escFieldLabel(field) {
  return field.label_short || field.label || field.name;
}

function escFormat(value) {
  if (!Number.isFinite(Number(value))) return "";
  var number = Number(value);
  var abs = Math.abs(number);
  if (abs >= 1000000000) return (number / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  if (abs >= 1000000) return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (abs >= 1000) return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  if (abs > 0 && abs < 1) return number.toFixed(2);
  return number.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function escHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escSvg(tag, attrs) {
  var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  escAttr(node, attrs || {});
  return node;
}

function escText(text, x, y, className, anchor) {
  var node = escSvg("text", { x: x, y: y, class: className || "", "text-anchor": anchor || "start" });
  node.textContent = text;
  return node;
}

function escAttr(node, attrs) {
  Object.keys(attrs).forEach(function(key) {
    if (attrs[key] != null) node.setAttribute(key, attrs[key]);
  });
}

function escClear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function escClamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escInterpolateColor(start, end, ratio) {
  var a = escHexToRgb(start);
  var b = escHexToRgb(end);
  var t = escClamp(ratio, 0, 1);
  return "rgb(" + [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t)
  ].join(",") + ")";
}

function escHexToRgb(hex) {
  var clean = String(hex || "").replace("#", "");
  if (clean.length === 3) clean = clean.split("").map(function(c) { return c + c; }).join("");
  var value = parseInt(clean, 16);
  if (!Number.isFinite(value)) return [37, 99, 235];
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function escEnsureResizeObserver(element) {
  if (element._escResizeObserver) return;
  if (typeof ResizeObserver === "undefined") return;
  element._escResizeObserver = new ResizeObserver(function() {
    if (element._escResizeTimer) clearTimeout(element._escResizeTimer);
    element._escResizeTimer = setTimeout(function() {
      if (typeof element._escRender === "function") element._escRender();
    }, 80);
  });
  element._escResizeObserver.observe(element);
}

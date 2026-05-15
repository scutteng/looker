looker.plugins.visualizations.add({
  id: "visual_grammar_chart",
  label: "Visual Grammar Chart",
  options: {
    title: { type: "string", label: "Title", section: "Mark", default: "Visual Grammar Chart" },
    mark_type: {
      type: "string",
      label: "Mark Type",
      section: "Mark",
      display: "select",
      values: [{ "Auto": "auto" }, { "Point": "point" }, { "Bar": "bar" }, { "Line": "line" }, { "Heatmap Rect": "rect" }],
      default: "auto"
    },
    point_shape: {
      type: "string",
      label: "Default Point Shape",
      section: "Mark",
      display: "select",
      values: [{ "Circle": "circle" }, { "Square": "square" }, { "Diamond": "diamond" }],
      default: "circle"
    },
    x_field: { type: "string", label: "X Field", section: "Position", display: "select", values: [{ "First Field": "0" }], default: "0" },
    y_field: { type: "string", label: "Y Field", section: "Position", display: "select", values: [{ "Second Field": "1" }], default: "1" },
    color_field: { type: "string", label: "Color Field", section: "Color", display: "select", values: [{ "None": "none" }], default: "none" },
    size_field: { type: "string", label: "Size Field", section: "Size", display: "select", values: [{ "None": "none" }], default: "none" },
    shape_field: { type: "string", label: "Shape Field", section: "Shape", display: "select", values: [{ "None": "none" }], default: "none" },
    label_field: { type: "string", label: "Label Field", section: "Label & Tooltip", display: "select", values: [{ "None": "none" }], default: "none" },
    tooltip_field: { type: "string", label: "Extra Tooltip Field", section: "Label & Tooltip", display: "select", values: [{ "None": "none" }], default: "none" },
    x_scale_type: {
      type: "string",
      label: "X Scale Type",
      section: "Axis",
      display: "select",
      values: [{ "Auto": "auto" }, { "Discrete": "discrete" }, { "Continuous": "continuous" }],
      default: "auto"
    },
    y_scale_type: {
      type: "string",
      label: "Y Scale Type",
      section: "Axis",
      display: "select",
      values: [{ "Auto": "auto" }, { "Discrete": "discrete" }, { "Continuous": "continuous" }],
      default: "auto"
    },
    axis_range_mode: {
      type: "string",
      label: "Continuous Axis Range",
      section: "Axis",
      display: "select",
      values: [{ "Automatic": "auto" }, { "Compact Dynamic": "compact" }],
      default: "auto"
    },
    compact_percentile: { type: "number", label: "Compact Percentile", section: "Axis", default: 5 },
    show_grid: { type: "boolean", label: "Show Grid", section: "Axis", default: true },
    show_labels: { type: "boolean", label: "Show Labels", section: "Label & Tooltip", default: false },
    show_legend: { type: "boolean", label: "Show Legend", section: "Style", default: true },
    positive_light: { type: "string", label: "Positive Light", section: "Color", display: "color", default: "#9ECAE1" },
    positive_dark: { type: "string", label: "Positive Dark", section: "Color", display: "color", default: "#1F77B4" },
    negative_light: { type: "string", label: "Negative Light", section: "Color", display: "color", default: "#FDD0A2" },
    negative_dark: { type: "string", label: "Negative Dark", section: "Color", display: "color", default: "#FF7F0E" },
    zero_color: { type: "string", label: "Zero Color", section: "Color", display: "color", default: "#CBD5E1" }
  },

  create: function(element) {
    element.innerHTML = [
      "<style>",
      ".vgc-root{font-family:Inter,Roboto,Arial,sans-serif;width:100%;height:100%;box-sizing:border-box;padding:16px;background:#fff;color:#1f2937;}",
      ".vgc-title{font-size:18px;font-weight:700;margin:0 0 4px;}",
      ".vgc-subtitle{font-size:12px;color:#64748b;margin:0 0 10px;}",
      ".vgc-wrap{position:relative;width:100%;height:calc(100% - 48px);min-height:260px;}",
      ".vgc-tooltip{position:absolute;pointer-events:none;display:none;background:#111827;color:#fff;border-radius:4px;padding:8px 10px;font-size:12px;line-height:1.35;box-shadow:0 8px 24px rgba(15,23,42,.22);z-index:2;}",
      ".vgc-axis text{fill:#64748b;font-size:11px;}",
      ".vgc-grid{stroke:#e8edf3;stroke-width:1;}",
      ".vgc-axis-line{stroke:#94a3b8;stroke-width:1;}",
      ".vgc-mark{transition:opacity .15s ease,stroke-width .15s ease;}",
      ".vgc-mark:hover{opacity:.9;stroke:#111827;stroke-width:2;}",
      ".vgc-label{fill:#334155;font-size:11px;paint-order:stroke;stroke:#fff;stroke-width:3px;stroke-linejoin:round;}",
      ".vgc-axis-title{fill:#475569;font-size:12px;font-weight:700;}",
      ".vgc-legend{fill:#64748b;font-size:11px;}",
      "</style>",
      "<div class='vgc-root'>",
      "<div class='vgc-title'></div>",
      "<div class='vgc-subtitle'></div>",
      "<div class='vgc-wrap'><svg></svg><div class='vgc-tooltip'></div></div>",
      "</div>"
    ].join("");
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    var fields = vgcBuildFields(queryResponse);
    if (fields.length < 2) {
      this.addError({ title: "Need at least 2 fields", message: "Select at least two fields so the grammar chart can map X and Y." });
      done();
      return;
    }
    vgcRegisterOptions(this, fields, config);

    var xField = fields[vgcFieldIndex(config.x_field, fields, 0)];
    var yField = fields[vgcFieldIndex(config.y_field, fields, Math.min(1, fields.length - 1))];
    var colorField = vgcOptionalField(config.color_field, fields);
    var sizeField = vgcOptionalField(config.size_field, fields);
    var shapeField = vgcOptionalField(config.shape_field, fields);
    var labelField = vgcOptionalField(config.label_field, fields);
    var tooltipField = vgcOptionalField(config.tooltip_field, fields);
    var xScaleType = vgcResolveScale(config.x_scale_type, xField);
    var yScaleType = vgcResolveScale(config.y_scale_type, yField);
    var markType = vgcResolveMark(config.mark_type, xScaleType, yScaleType, xField, yField, colorField);

    var rows = data.map(function(row, index) {
      return {
        index: index,
        x: vgcReadField(row, xField),
        y: vgcReadField(row, yField),
        color: colorField ? vgcReadField(row, colorField) : null,
        size: sizeField ? vgcReadField(row, sizeField) : null,
        shape: shapeField ? vgcReadField(row, shapeField) : null,
        tooltip: tooltipField ? vgcReadField(row, tooltipField) : null,
        label: labelField ? vgcClean(vgcReadField(row, labelField).raw) : vgcDefaultLabel(row, fields, index)
      };
    }).filter(function(row) {
      return row.x.raw !== "" && row.y.raw !== "";
    });

    if (!rows.length) {
      this.addError({ title: "No plottable rows", message: "The query returned no usable X/Y values." });
      done();
      return;
    }

    var state = {
      fields: fields,
      rows: rows,
      config: config,
      xField: xField,
      yField: yField,
      colorField: colorField,
      sizeField: sizeField,
      shapeField: shapeField,
      labelField: labelField,
      tooltipField: tooltipField,
      xScaleType: xScaleType,
      yScaleType: yScaleType,
      markType: markType
    };
    element._vgcRender = function() { vgcRender(element, state); };
    vgcEnsureResizeObserver(element);
    element._vgcRender();
    done();
  }
});

function vgcBuildFields(queryResponse) {
  var dimensions = (queryResponse.fields.dimension_like || []).map(function(field) {
    return Object.assign({ vgcKind: "dimension" }, field);
  });
  var measures = (queryResponse.fields.measure_like || []).map(function(field) {
    return Object.assign({ vgcKind: "measure" }, field);
  });
  return dimensions.concat(measures);
}

function vgcRegisterOptions(vis, fields, config) {
  if (!vis || typeof vis.trigger !== "function") return;
  var values = fields.map(function(field, index) {
    var option = {};
    option[(index + 1) + ". " + vgcFieldLabel(field)] = String(index);
    return option;
  });
  var optionalValues = [{ "None": "none" }].concat(values);
  var options = {
    title: { type: "string", label: "Title", section: "Mark", default: "Visual Grammar Chart" },
    mark_type: { type: "string", label: "Mark Type", section: "Mark", display: "select", values: [{ "Auto": "auto" }, { "Point": "point" }, { "Bar": "bar" }, { "Line": "line" }, { "Heatmap Rect": "rect" }], default: "auto" },
    point_shape: { type: "string", label: "Default Point Shape", section: "Mark", display: "select", values: [{ "Circle": "circle" }, { "Square": "square" }, { "Diamond": "diamond" }], default: "circle" },
    x_field: { type: "string", label: "X Field", section: "Position", display: "select", values: values, default: "0" },
    y_field: { type: "string", label: "Y Field", section: "Position", display: "select", values: values, default: fields.length > 1 ? "1" : "0" },
    color_field: { type: "string", label: "Color Field", section: "Color", display: "select", values: optionalValues, default: "none" },
    size_field: { type: "string", label: "Size Field", section: "Size", display: "select", values: optionalValues, default: "none" },
    shape_field: { type: "string", label: "Shape Field", section: "Shape", display: "select", values: optionalValues, default: "none" },
    label_field: { type: "string", label: "Label Field", section: "Label & Tooltip", display: "select", values: optionalValues, default: "none" },
    tooltip_field: { type: "string", label: "Extra Tooltip Field", section: "Label & Tooltip", display: "select", values: optionalValues, default: "none" },
    x_scale_type: { type: "string", label: "X Scale Type", section: "Axis", display: "select", values: [{ "Auto": "auto" }, { "Discrete": "discrete" }, { "Continuous": "continuous" }], default: "auto" },
    y_scale_type: { type: "string", label: "Y Scale Type", section: "Axis", display: "select", values: [{ "Auto": "auto" }, { "Discrete": "discrete" }, { "Continuous": "continuous" }], default: "auto" },
    axis_range_mode: { type: "string", label: "Continuous Axis Range", section: "Axis", display: "select", values: [{ "Automatic": "auto" }, { "Compact Dynamic": "compact" }], default: "auto" },
    compact_percentile: { type: "number", label: "Compact Percentile", section: "Axis", default: 5 },
    show_grid: { type: "boolean", label: "Show Grid", section: "Axis", default: true },
    show_labels: { type: "boolean", label: "Show Labels", section: "Label & Tooltip", default: false },
    show_legend: { type: "boolean", label: "Show Legend", section: "Style", default: true },
    positive_light: { type: "string", label: "Positive Light", section: "Color", display: "color", default: "#9ECAE1" },
    positive_dark: { type: "string", label: "Positive Dark", section: "Color", display: "color", default: "#1F77B4" },
    negative_light: { type: "string", label: "Negative Light", section: "Color", display: "color", default: "#FDD0A2" },
    negative_dark: { type: "string", label: "Negative Dark", section: "Color", display: "color", default: "#FF7F0E" },
    zero_color: { type: "string", label: "Zero Color", section: "Color", display: "color", default: "#CBD5E1" }
  };
  var signature = JSON.stringify(options);
  if (vis._vgcOptionsSignature === signature) return;
  vis._vgcOptionsSignature = signature;
  vis.trigger("registerOptions", options);
}

function vgcRender(element, state) {
  var config = state.config;
  var title = element.querySelector(".vgc-title");
  var subtitle = element.querySelector(".vgc-subtitle");
  var wrap = element.querySelector(".vgc-wrap");
  var svg = element.querySelector("svg");
  var tooltip = element.querySelector(".vgc-tooltip");
  if (!title || !subtitle || !wrap || !svg || !tooltip) return;

  title.textContent = config.title || "Visual Grammar Chart";
  subtitle.textContent = state.markType + " | X: " + vgcFieldLabel(state.xField) + " | Y: " + vgcFieldLabel(state.yField);

  var width = Math.max(380, wrap.clientWidth || element.clientWidth || 760);
  var height = Math.max(300, wrap.clientHeight || element.clientHeight - 48 || 460);
  var legendHeight = config.show_legend ? 86 : 0;
  var margin = { top: 18, right: 28, bottom: 56 + legendHeight, left: 76 };
  var innerWidth = Math.max(120, width - margin.left - margin.right);
  var innerHeight = Math.max(120, height - margin.top - margin.bottom);
  vgcClear(svg);
  vgcAttr(svg, { width: width, height: height, viewBox: "0 0 " + width + " " + height });

  var xScale = vgcBuildScale(state.rows.map(function(row) { return row.x; }), state.xScaleType, margin.left, margin.left + innerWidth, config);
  var yScale = vgcBuildScale(state.rows.map(function(row) { return row.y; }), state.yScaleType, margin.top + innerHeight, margin.top, config);
  var color = vgcColorScale(state.rows.map(function(row) { return row.color; }), state.colorField, config);
  var size = vgcSizeScale(state.rows.map(function(row) { return row.size; }), state.sizeField);
  var shape = vgcShapeScale(state.rows.map(function(row) { return row.shape; }), state.shapeField, config.point_shape || "circle");
  var g = vgcSvg("g", {});
  svg.appendChild(g);

  vgcDrawAxes(g, xScale, yScale, margin, innerWidth, innerHeight, state, config);
  if (state.markType === "bar") vgcDrawBars(g, state, xScale, yScale, color, tooltip, width);
  else if (state.markType === "line") vgcDrawLine(g, state, xScale, yScale, color, size, shape, tooltip, width);
  else if (state.markType === "rect") vgcDrawRects(g, state, xScale, yScale, color, tooltip, width);
  else vgcDrawPoints(g, state, xScale, yScale, color, size, shape, tooltip, width);

  if (config.show_legend && (state.colorField || state.sizeField || state.shapeField)) {
    vgcDrawLegend(g, margin.left, margin.top + innerHeight + 68, state, color, size, shape);
  }
}

function vgcDrawAxes(g, xScale, yScale, margin, innerWidth, innerHeight, state, config) {
  if (config.show_grid) {
    xScale.ticks.forEach(function(tick) {
      var x = xScale.pos(tick.value);
      g.appendChild(vgcSvg("line", { class: "vgc-grid", x1: x, y1: margin.top, x2: x, y2: margin.top + innerHeight }));
    });
    yScale.ticks.forEach(function(tick) {
      var y = yScale.pos(tick.value);
      g.appendChild(vgcSvg("line", { class: "vgc-grid", x1: margin.left, y1: y, x2: margin.left + innerWidth, y2: y }));
    });
  }
  xScale.ticks.forEach(function(tick) {
    g.appendChild(vgcText(tick.label, xScale.pos(tick.value), margin.top + innerHeight + 20, "vgc-axis", "middle"));
  });
  yScale.ticks.forEach(function(tick) {
    g.appendChild(vgcText(tick.label, margin.left - 10, yScale.pos(tick.value) + 4, "vgc-axis", "end"));
  });
  g.appendChild(vgcSvg("line", { class: "vgc-axis-line", x1: margin.left, y1: margin.top + innerHeight, x2: margin.left + innerWidth, y2: margin.top + innerHeight }));
  g.appendChild(vgcSvg("line", { class: "vgc-axis-line", x1: margin.left, y1: margin.top, x2: margin.left, y2: margin.top + innerHeight }));
  g.appendChild(vgcText(vgcFieldLabel(state.xField), margin.left + innerWidth / 2, margin.top + innerHeight + 42, "vgc-axis-title", "middle"));
  var yTitle = vgcText(vgcFieldLabel(state.yField), 18, margin.top + innerHeight / 2, "vgc-axis-title", "middle");
  vgcAttr(yTitle, { transform: "rotate(-90 18 " + (margin.top + innerHeight / 2) + ")" });
  g.appendChild(yTitle);
}

function vgcDrawBars(g, state, xScale, yScale, color, tooltip, width) {
  var baseline = state.yScaleType === "continuous" ? yScale.pos(Math.max(0, Math.min(0, yScale.domain[1]))) : yScale.rangeStart;
  var barWidth = Math.max(4, (xScale.band || 18) * 0.72);
  state.rows.forEach(function(row) {
    var x = xScale.pos(row.x.value) - barWidth / 2;
    var y = yScale.pos(row.y.value);
    var h = Math.abs(baseline - y);
    var rect = vgcSvg("rect", { class: "vgc-mark", x: x, y: Math.min(y, baseline), width: barWidth, height: h, fill: color(row.color), opacity: 0.86 });
    vgcAttachTooltip(rect, tooltip, row, state, width);
    g.appendChild(rect);
    if (state.config.show_labels) g.appendChild(vgcText(row.label, x + barWidth / 2, Math.min(y, baseline) - 4, "vgc-label", "middle"));
  });
}

function vgcDrawLine(g, state, xScale, yScale, color, size, shape, tooltip, width) {
  var rows = state.rows.slice().sort(function(a, b) { return xScale.pos(a.x.value) - xScale.pos(b.x.value); });
  var path = rows.map(function(row, index) {
    return (index === 0 ? "M " : " L ") + xScale.pos(row.x.value) + " " + yScale.pos(row.y.value);
  }).join("");
  g.appendChild(vgcSvg("path", { d: path, fill: "none", stroke: "#2563EB", "stroke-width": 2 }));
  vgcDrawPoints(g, Object.assign({}, state, { rows: rows }), xScale, yScale, color, size, shape, tooltip, width);
}

function vgcDrawPoints(g, state, xScale, yScale, color, size, shape, tooltip, width) {
  state.rows.forEach(function(row) {
    var x = xScale.pos(row.x.value);
    var y = yScale.pos(row.y.value);
    var radius = size(row.size);
    var point = vgcShape(shape(row.shape), x, y, radius, color(row.color), 0.82);
    vgcAttachTooltip(point, tooltip, row, state, width);
    g.appendChild(point);
    if (state.config.show_labels) g.appendChild(vgcText(row.label, x + radius + 4, y + 4, "vgc-label", "start"));
  });
}

function vgcDrawRects(g, state, xScale, yScale, color, tooltip, width) {
  var rectWidth = Math.max(4, (xScale.band || 18) * 0.92);
  var rectHeight = Math.max(4, (yScale.band || 18) * 0.92);
  state.rows.forEach(function(row) {
    var x = xScale.pos(row.x.value) - rectWidth / 2;
    var y = yScale.pos(row.y.value) - rectHeight / 2;
    var rect = vgcSvg("rect", { class: "vgc-mark", x: x, y: y, width: rectWidth, height: rectHeight, fill: color(row.color), opacity: 0.9 });
    vgcAttachTooltip(rect, tooltip, row, state, width);
    g.appendChild(rect);
    if (state.config.show_labels) g.appendChild(vgcText(row.label, x + rectWidth / 2, y + rectHeight / 2 + 4, "vgc-label", "middle"));
  });
}

function vgcBuildScale(cells, scaleType, rangeStart, rangeEnd, config) {
  if (scaleType === "discrete") {
    var values = [];
    cells.forEach(function(cell) {
      var label = vgcClean(cell.raw);
      if (values.indexOf(label) < 0) values.push(label);
    });
    var step = values.length > 1 ? (rangeEnd - rangeStart) / values.length : (rangeEnd - rangeStart);
    var band = Math.abs(step);
    return {
      type: "discrete",
      band: band,
      rangeStart: rangeStart,
      rangeEnd: rangeEnd,
      ticks: values.map(function(value) { return { value: value, label: vgcTruncate(value, 18) }; }),
      pos: function(value) {
        var index = Math.max(0, values.indexOf(vgcClean(value)));
        return rangeStart + step * index + step / 2;
      }
    };
  }
  var numeric = cells.map(function(cell) { return cell.number; }).filter(Number.isFinite).sort(function(a, b) { return a - b; });
  var domain = vgcDomain(numeric, config.axis_range_mode, config.compact_percentile);
  return {
    type: "continuous",
    domain: domain,
    rangeStart: rangeStart,
    rangeEnd: rangeEnd,
    ticks: vgcTicks(domain, 5).map(function(value) { return { value: value, label: vgcFormat(value) }; }),
    pos: function(value) {
      var number = Number(value);
      if (!Number.isFinite(number)) number = domain[0];
      var t = domain[1] === domain[0] ? 0.5 : (number - domain[0]) / (domain[1] - domain[0]);
      return rangeStart + vgcClamp(t, 0, 1) * (rangeEnd - rangeStart);
    }
  };
}

function vgcColorScale(cells, field, config) {
  var fallback = "#2563EB";
  if (!field) {
    var noColor = function() { return fallback; };
    noColor.kind = "none";
    return noColor;
  }
  if (vgcResolveScale("auto", field) === "discrete") {
    var palette = ["#2563EB", "#F97316", "#16A34A", "#9333EA", "#DC2626", "#0891B2", "#CA8A04", "#475569"];
    var values = [];
    var categorical = function(cell) {
      var value = vgcClean(cell ? cell.raw : "");
      var index = values.indexOf(value);
      if (index < 0) {
        values.push(value);
        index = values.length - 1;
      }
      return palette[index % palette.length];
    };
    categorical.kind = "categorical";
    categorical.values = values;
    categorical.palette = palette;
    return categorical;
  }
  var numeric = cells.map(function(cell) { return cell ? cell.number : null; }).filter(Number.isFinite);
  var stats = vgcStats(numeric);
  var continuous = function(cell) {
    var value = cell ? cell.number : null;
    if (!Number.isFinite(value)) return fallback;
    if (Math.abs(value) < 1e-12) return config.zero_color || "#CBD5E1";
    if (value > 0) return vgcInterpolate(config.positive_light || "#9ECAE1", config.positive_dark || "#1F77B4", vgcClamp(value / Math.max(Math.abs(stats.max), 1e-12), 0, 1));
    return vgcInterpolate(config.negative_light || "#FDD0A2", config.negative_dark || "#FF7F0E", vgcClamp(Math.abs(value) / Math.max(Math.abs(stats.min), 1e-12), 0, 1));
  };
  continuous.kind = "continuous";
  continuous.stats = stats;
  return continuous;
}

function vgcShapeScale(cells, field, defaultShape) {
  if (!field) {
    var noShape = function() { return defaultShape || "circle"; };
    noShape.kind = "none";
    return noShape;
  }
  var shapes = ["circle", "square", "diamond"];
  var values = [];
  var scale = function(cell) {
    var value = vgcClean(cell ? cell.raw : "");
    var index = values.indexOf(value);
    if (index < 0) {
      values.push(value);
      index = values.length - 1;
    }
    return shapes[index % shapes.length];
  };
  scale.kind = "categorical";
  scale.values = values;
  scale.shapes = shapes;
  return scale;
}

function vgcSizeScale(cells, field) {
  if (!field || vgcResolveScale("auto", field) !== "continuous") {
    var noSize = function() { return 6; };
    noSize.kind = "none";
    return noSize;
  }
  var numeric = cells.map(function(cell) { return cell ? Math.abs(cell.number) : null; }).filter(Number.isFinite);
  var stats = vgcStats(numeric);
  var scale = function(cell) {
    var value = cell ? Math.abs(cell.number) : 0;
    var t = stats.max === stats.min ? 0.5 : (value - stats.min) / (stats.max - stats.min);
    return 4 + vgcClamp(t, 0, 1) * 14;
  };
  scale.kind = "continuous";
  scale.stats = stats;
  return scale;
}

function vgcResolveScale(configured, field) {
  if (configured === "discrete" || configured === "continuous") return configured;
  if (!field) return "discrete";
  if (field.vgcKind === "measure") return "continuous";
  if (field.is_numeric && field.type !== "zipcode") return "continuous";
  return "discrete";
}

function vgcResolveMark(configured, xScaleType, yScaleType, xField, yField, colorField) {
  if (configured && configured !== "auto") return configured;
  if (xField && /date|time/.test(String(xField.type || "")) && yScaleType === "continuous") return "line";
  if (xScaleType === "discrete" && yScaleType === "discrete" && colorField) return "rect";
  if (xScaleType === "discrete" && yScaleType === "continuous") return "bar";
  if (xScaleType === "continuous" && yScaleType === "discrete") return "point";
  return "point";
}

function vgcReadField(row, field) {
  var cell = row[field.name];
  var raw = vgcCellRaw(cell);
  var number = field.vgcKind === "measure" || field.is_numeric ? vgcMeasureNumber(cell) : vgcParseNumber(raw);
  return { raw: raw, value: vgcResolveScale("auto", field) === "continuous" ? number : vgcClean(raw), number: number };
}

function vgcCellRaw(cell) {
  if (cell == null) return "";
  if (typeof cell !== "object") return cell;
  if (cell.rendered != null) return cell.rendered;
  if (cell.value != null) return cell.value;
  if (cell.html != null) return cell.html;
  return "";
}

function vgcMeasureNumber(cell) {
  var direct = vgcNumericFromCell(cell);
  if (direct != null) return direct;
  if (!cell || typeof cell !== "object") return null;
  var sum = 0;
  var found = false;
  Object.keys(cell).forEach(function(key) {
    var value = vgcNumericFromCell(cell[key]);
    if (value != null) {
      sum += value;
      found = true;
    }
  });
  return found ? sum : null;
}

function vgcNumericFromCell(cell) {
  if (cell == null) return null;
  if (typeof cell === "number") return Number.isFinite(cell) ? cell : null;
  if (typeof cell === "string") return vgcParseNumber(cell);
  if (typeof cell !== "object") return null;
  if (cell.value != null) return vgcParseNumber(cell.value);
  if (cell.rendered != null) return vgcParseNumber(cell.rendered);
  if (cell.html != null) return vgcParseNumber(cell.html);
  return null;
}

function vgcParseNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  var cleaned = String(value == null ? "" : value).replace(/<[^>]*>/g, "").replace(/,/g, "").replace(/[$¥￥%]/g, "").trim();
  if (!cleaned) return null;
  var number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function vgcFieldIndex(value, fields, fallback) {
  var index = Number(value);
  if (!Number.isFinite(index) || index < 0 || index >= fields.length) return fallback;
  return index;
}

function vgcOptionalField(value, fields) {
  if (value == null || value === "none") return null;
  var index = Number(value);
  if (!Number.isFinite(index) || index < 0 || index >= fields.length) return null;
  return fields[index];
}

function vgcDefaultLabel(row, fields, index) {
  var dimensions = fields.filter(function(field) { return field.vgcKind === "dimension"; });
  if (!dimensions.length) return "Row " + (index + 1);
  return dimensions.slice(0, 2).map(function(field) { return vgcClean(vgcCellRaw(row[field.name])); }).filter(Boolean).join(" / ") || "Row " + (index + 1);
}

function vgcAttachTooltip(node, tooltip, row, state, width) {
  node.addEventListener("mousemove", function(event) {
    tooltip.innerHTML = vgcTooltip(row, state);
    tooltip.style.display = "block";
    tooltip.style.left = Math.min(event.offsetX + 12, width - 240) + "px";
    tooltip.style.top = Math.max(event.offsetY - 8, 4) + "px";
  });
  node.addEventListener("mouseleave", function() {
    tooltip.style.display = "none";
  });
}

function vgcTooltip(row, state) {
  var lines = [
    "<strong>" + vgcHtml(row.label) + "</strong>",
    vgcHtml(vgcFieldLabel(state.xField)) + ": " + vgcHtml(vgcDisplay(row.x)),
    vgcHtml(vgcFieldLabel(state.yField)) + ": " + vgcHtml(vgcDisplay(row.y))
  ];
  if (state.colorField) lines.push(vgcHtml(vgcFieldLabel(state.colorField)) + ": " + vgcHtml(vgcDisplay(row.color)));
  if (state.sizeField) lines.push(vgcHtml(vgcFieldLabel(state.sizeField)) + ": " + vgcHtml(vgcDisplay(row.size)));
  if (state.shapeField) lines.push(vgcHtml(vgcFieldLabel(state.shapeField)) + ": " + vgcHtml(vgcDisplay(row.shape)));
  if (state.tooltipField) lines.push(vgcHtml(vgcFieldLabel(state.tooltipField)) + ": " + vgcHtml(vgcDisplay(row.tooltip)));
  return lines.join("<br>");
}

function vgcDrawLegend(g, x, y, state, color, size, shape) {
  var cursorX = x;
  if (state.colorField) cursorX = vgcDrawColorLegend(g, cursorX, y, state, color) + 22;
  if (state.sizeField && size.kind === "continuous") cursorX = vgcDrawSizeLegend(g, cursorX, y, state, size) + 22;
  if (state.shapeField && shape.kind === "categorical") vgcDrawShapeLegend(g, cursorX, y, state, shape);
}

function vgcDrawColorLegend(g, x, y, state, color) {
  g.appendChild(vgcText("Color: " + vgcFieldLabel(state.colorField), x, y, "vgc-legend", "start"));
  if (color.kind === "categorical") {
    var maxItems = Math.min(color.values.length, 5);
    for (var i = 0; i < maxItems; i++) {
      var itemX = x + i * 82;
      g.appendChild(vgcSvg("circle", { cx: itemX + 6, cy: y + 18, r: 5, fill: color.palette[i % color.palette.length], stroke: "#fff", "stroke-width": 1 }));
      g.appendChild(vgcText(vgcTruncate(color.values[i], 10), itemX + 15, y + 22, "vgc-legend", "start"));
    }
    return x + Math.max(140, maxItems * 82);
  }
  var steps = 18;
  var rampX = x;
  var rampY = y + 12;
  for (var s = 0; s < steps; s++) {
    var value = color.stats.min + ((color.stats.max - color.stats.min) * s) / Math.max(steps - 1, 1);
    g.appendChild(vgcSvg("rect", { x: rampX + s * 5, y: rampY, width: 5, height: 9, fill: color({ number: value }) }));
  }
  g.appendChild(vgcText(vgcFormat(color.stats.min), rampX, rampY + 24, "vgc-legend", "start"));
  g.appendChild(vgcText(vgcFormat(color.stats.max), rampX + 90, rampY + 24, "vgc-legend", "end"));
  return x + 126;
}

function vgcDrawSizeLegend(g, x, y, state, size) {
  g.appendChild(vgcText("Size: " + vgcFieldLabel(state.sizeField), x, y, "vgc-legend", "start"));
  var samples = [size.stats.min, (size.stats.min + size.stats.max) / 2, size.stats.max];
  samples.forEach(function(value, index) {
    var cx = x + 14 + index * 38;
    var r = size({ number: value });
    g.appendChild(vgcSvg("circle", { cx: cx, cy: y + 18, r: r, fill: "none", stroke: "#64748b", "stroke-width": 1.2 }));
  });
  g.appendChild(vgcText(vgcFormat(size.stats.min), x, y + 43, "vgc-legend", "start"));
  g.appendChild(vgcText(vgcFormat(size.stats.max), x + 110, y + 43, "vgc-legend", "end"));
  return x + 132;
}

function vgcDrawShapeLegend(g, x, y, state, shape) {
  g.appendChild(vgcText("Shape: " + vgcFieldLabel(state.shapeField), x, y, "vgc-legend", "start"));
  var maxItems = Math.min(shape.values.length, 4);
  for (var i = 0; i < maxItems; i++) {
    var itemX = x + i * 80;
    g.appendChild(vgcShape(shape.shapes[i % shape.shapes.length], itemX + 6, y + 18, 6, "#64748b", 1));
    g.appendChild(vgcText(vgcTruncate(shape.values[i], 10), itemX + 17, y + 22, "vgc-legend", "start"));
  }
  return x + Math.max(120, maxItems * 80);
}

function vgcShape(shape, cx, cy, radius, fill, opacity) {
  var attrs = { class: "vgc-mark", fill: fill, opacity: opacity, stroke: "#fff", "stroke-width": 1.2 };
  if (shape === "square") return vgcSvg("rect", Object.assign(attrs, { x: cx - radius, y: cy - radius, width: radius * 2, height: radius * 2, rx: 2 }));
  if (shape === "diamond") return vgcSvg("path", Object.assign(attrs, { d: "M " + cx + " " + (cy - radius) + " L " + (cx + radius) + " " + cy + " L " + cx + " " + (cy + radius) + " L " + (cx - radius) + " " + cy + " Z" }));
  return vgcSvg("circle", Object.assign(attrs, { cx: cx, cy: cy, r: radius }));
}

function vgcDomain(values, mode, compactPercentile) {
  if (!values.length) return [0, 1];
  var min = values[0];
  var max = values[values.length - 1];
  if (mode === "compact" && values.length > 3) {
    var p = vgcClamp(Number(compactPercentile || 5), 0, 40) / 100;
    min = vgcQuantile(values, p);
    max = vgcQuantile(values, 1 - p);
  }
  if (min === max) {
    var bump = Math.abs(min || 1) * 0.1;
    min -= bump;
    max += bump;
  }
  var padding = (max - min) * 0.08;
  return [min - padding, max + padding];
}

function vgcTicks(domain, count) {
  var ticks = [];
  for (var i = 0; i < count; i++) ticks.push(domain[0] + ((domain[1] - domain[0]) * i) / (count - 1));
  return ticks;
}

function vgcStats(values) {
  if (!values.length) return { min: 0, max: 0 };
  return { min: Math.min.apply(null, values), max: Math.max.apply(null, values) };
}

function vgcQuantile(values, q) {
  var pos = vgcClamp(q, 0, 1) * (values.length - 1);
  var lower = Math.floor(pos);
  var upper = Math.ceil(pos);
  var weight = pos - lower;
  return values[lower] * (1 - weight) + values[upper] * weight;
}

function vgcFieldLabel(field) {
  return field.label_short || field.label || field.name;
}

function vgcDisplay(cell) {
  if (!cell) return "";
  return cell.number != null && Number.isFinite(cell.number) ? vgcFormat(cell.number) : vgcClean(cell.raw);
}

function vgcFormat(value) {
  var number = Number(value);
  var abs = Math.abs(number);
  if (abs >= 1000000) return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (abs >= 1000) return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  if (abs > 0 && abs < 1) return number.toFixed(2);
  return number.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function vgcClean(value) {
  return String(value == null ? "" : value).replace(/<[^>]*>/g, "").trim();
}

function vgcTruncate(value, max) {
  var text = vgcClean(value);
  return text.length > max ? text.slice(0, max - 1) + "..." : text;
}

function vgcHtml(value) {
  return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function vgcInterpolate(start, end, ratio) {
  var a = vgcHex(start);
  var b = vgcHex(end);
  var t = vgcClamp(ratio, 0, 1);
  return "rgb(" + [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)].join(",") + ")";
}

function vgcHex(hex) {
  var clean = String(hex || "").replace("#", "");
  if (clean.length === 3) clean = clean.split("").map(function(c) { return c + c; }).join("");
  var value = parseInt(clean, 16);
  if (!Number.isFinite(value)) return [37, 99, 235];
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function vgcSvg(tag, attrs) {
  var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  vgcAttr(node, attrs || {});
  return node;
}

function vgcText(text, x, y, className, anchor) {
  var node = vgcSvg("text", { x: x, y: y, class: className || "", "text-anchor": anchor || "start" });
  node.textContent = text;
  return node;
}

function vgcAttr(node, attrs) {
  Object.keys(attrs).forEach(function(key) {
    if (attrs[key] != null) node.setAttribute(key, attrs[key]);
  });
}

function vgcClear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function vgcClamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function vgcEnsureResizeObserver(element) {
  if (element._vgcResizeObserver || typeof ResizeObserver === "undefined") return;
  element._vgcResizeObserver = new ResizeObserver(function() {
    if (element._vgcResizeTimer) clearTimeout(element._vgcResizeTimer);
    element._vgcResizeTimer = setTimeout(function() {
      if (typeof element._vgcRender === "function") element._vgcRender();
    }, 80);
  });
  element._vgcResizeObserver.observe(element);
}

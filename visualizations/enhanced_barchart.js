looker.plugins.visualizations.add({
  id: "enhanced_barchart",
  label: "Enhanced Bar Chart",
  options: {
    title: {
      type: "string",
      label: "Title",
      section: "Data",
      default: "Enhanced Bar Chart"
    },
    max_bars: {
      type: "number",
      label: "Max Bars",
      section: "Data",
      default: 30
    },
    canvas_size_mode: {
      type: "string",
      label: "Canvas Size",
      section: "Data",
      display: "select",
      values: [
        { "Auto Fit Tile": "auto" },
        { "Fixed Height": "fixed_height" },
        { "Fixed Width": "fixed_width" },
        { "Fixed Width + Height": "fixed_both" }
      ],
      default: "auto"
    },
    fixed_canvas_height: {
      type: "number",
      label: "Fixed Canvas Height",
      section: "Data",
      default: 520
    },
    fixed_canvas_width: {
      type: "number",
      label: "Fixed Canvas Width",
      section: "Data",
      default: 960
    },
    orientation: {
      type: "string",
      label: "Orientation",
      section: "Data",
      display: "select",
      values: [
        { "Vertical Columns": "vertical" },
        { "Horizontal Bars": "horizontal" }
      ],
      default: "vertical"
    },
    sort_by: {
      type: "string",
      label: "Axis Sort By",
      section: "Data",
      display: "select",
      values: [
        { "Query Order": "query" },
        { "Dimension Label": "dimension" },
        { "Bar Measure": "height" },
        { "Color Measure": "color" }
      ],
      default: "height"
    },
    sort_direction: {
      type: "string",
      label: "Sort Direction",
      section: "Data",
      display: "select",
      values: [
        { "Descending": "desc" },
        { "Ascending": "asc" }
      ],
      default: "desc"
    },
    height_measure: {
      type: "string",
      label: "Bar Length / Height Measure",
      section: "Data",
      display: "select",
      values: [
        { "First Measure": "0" }
      ],
      default: "0"
    },
    color_mode: {
      type: "string",
      label: "Bar Color Mode",
      section: "Data",
      display: "select",
      values: [
        { "Single Color": "single" },
        { "Bind to Measure": "measure" }
      ],
      default: "measure"
    },
    color_measure: {
      type: "string",
      label: "Color Measure",
      section: "Data",
      display: "select",
      values: [
        { "First Measure": "0" },
        { "Second Measure": "1" },
        { "Third Measure": "2" },
        { "Fourth Measure": "3" }
      ],
      default: "1"
    },
    single_color: {
      type: "string",
      label: "Single Color",
      section: "Style",
      display: "color",
      default: "#2F80ED"
    },
    positive_light: {
      type: "string",
      label: "Positive Light Color",
      section: "Style",
      display: "color",
      default: "#A7D8FF"
    },
    positive_dark: {
      type: "string",
      label: "Positive Dark Color",
      section: "Style",
      display: "color",
      default: "#0B5CAD"
    },
    negative_light: {
      type: "string",
      label: "Negative Light Color",
      section: "Style",
      display: "color",
      default: "#FFD5A1"
    },
    negative_dark: {
      type: "string",
      label: "Negative Dark Color",
      section: "Style",
      display: "color",
      default: "#C65F00"
    },
    zero_color: {
      type: "string",
      label: "Zero Color",
      section: "Style",
      display: "color",
      default: "#CBD5E1"
    },
    show_gradient_legend: {
      type: "boolean",
      label: "Show Gradient Legend",
      section: "Style",
      default: true
    },
    show_border: {
      type: "boolean",
      label: "Show Bar Border",
      section: "Style",
      default: false
    },
    border_color: {
      type: "string",
      label: "Border Color",
      section: "Style",
      display: "color",
      default: "#1F2937"
    },
    border_width: {
      type: "number",
      label: "Border Width",
      section: "Style",
      default: 1
    },
    show_value_labels: {
      type: "boolean",
      label: "Show Value Labels",
      section: "Style",
      default: false
    },
    value_label_measure: {
      type: "string",
      label: "Value Label Measure",
      section: "Style",
      display: "select",
      values: [
        { "Bar Length / Height Measure": "height" },
        { "Color Measure": "color" }
      ],
      default: "height"
    },
    value_label_position: {
      type: "string",
      label: "Value Label Position",
      section: "Style",
      display: "select",
      values: [
        { "Outside Bar": "outside" },
        { "Inside Bar": "inside" },
        { "Auto": "auto" }
      ],
      default: "outside"
    },
    value_label_format: {
      type: "string",
      label: "Value Label Format",
      section: "Style",
      display: "select",
      values: [
        { "Compact": "compact" },
        { "Full": "full" }
      ],
      default: "compact"
    },
    value_label_color: {
      type: "string",
      label: "Value Label Color",
      section: "Style",
      display: "color",
      default: "#1F2937"
    },
    show_grid: {
      type: "boolean",
      label: "Show Grid Lines",
      section: "Axis",
      default: true
    },
    axis_scale: {
      type: "string",
      label: "Axis Scale",
      section: "Axis",
      display: "select",
      values: [
        { "Linear": "linear" },
        { "Logarithmic": "log" }
      ],
      default: "linear"
    },
    axis_range_mode: {
      type: "string",
      label: "Axis Range",
      section: "Axis",
      display: "select",
      values: [
        { "Automatic": "auto" },
        { "Fixed": "fixed" }
      ],
      default: "auto"
    },
    axis_min: {
      type: "number",
      label: "Axis Minimum",
      section: "Axis",
      default: 0
    },
    axis_max: {
      type: "number",
      label: "Axis Maximum",
      section: "Axis",
      default: 0
    },
    show_axis_title: {
      type: "boolean",
      label: "Show Axis Title",
      section: "Axis",
      default: true
    },
    axis_title: {
      type: "string",
      label: "Axis Title",
      section: "Axis",
      default: ""
    }
  },

  create: function(element) {
    element.innerHTML = [
      "<style>",
      ".ebc-root{font-family:Inter,Roboto,Arial,sans-serif;color:#1f2937;width:100%;height:100%;box-sizing:border-box;padding:16px;background:#fff;}",
      ".ebc-title{font-size:18px;font-weight:700;margin:0 0 4px;}",
      ".ebc-subtitle{font-size:12px;color:#64748b;margin:0 0 12px;}",
      ".ebc-chart-wrap{position:relative;width:100%;height:calc(100% - 52px);min-height:0;overflow:hidden;}",
      ".ebc-tooltip{position:absolute;pointer-events:none;display:none;background:#111827;color:#fff;border-radius:4px;padding:8px 10px;font-size:12px;line-height:1.35;box-shadow:0 8px 24px rgba(15,23,42,.22);z-index:2;}",
      ".ebc-axis text{fill:#64748b;font-size:11px;}",
      ".ebc-grid{stroke:#e8edf3;stroke-width:1;}",
      ".ebc-bar{transition:opacity .15s ease,stroke-width .15s ease;}",
      ".ebc-bar:hover{opacity:.82;stroke:#111827;stroke-width:1.5;}",
      ".ebc-label{fill:#334155;font-size:11px;}",
      ".ebc-label-parent{fill:#94a3b8;font-size:10px;}",
      ".ebc-label-child{fill:#334155;font-size:11px;font-weight:600;}",
      ".ebc-group-label{fill:#64748b;font-size:12px;}",
      ".ebc-group-divider{stroke:#cbd5e1;stroke-width:1;}",
      ".ebc-header{fill:#334155;font-size:12px;font-weight:700;}",
      ".ebc-header-rule{stroke:#cbd5e1;stroke-width:1;}",
      ".ebc-value-label{font-size:11px;font-weight:600;paint-order:stroke;stroke:#fff;stroke-width:3px;stroke-linejoin:round;}",
      ".ebc-legend{font-size:11px;fill:#64748b;}",
      ".ebc-axis-title{fill:#475569;font-size:12px;font-weight:600;}",
      "</style>",
      "<div class='ebc-root'>",
      "<div class='ebc-title'></div>",
      "<div class='ebc-subtitle'></div>",
      "<div class='ebc-chart-wrap'><svg></svg><div class='ebc-tooltip'></div></div>",
      "</div>"
    ].join("");
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    var dimensions = queryResponse.fields.dimension_like || [];
    var measures = queryResponse.fields.measure_like || [];
    var colorMode = config.color_mode || "measure";

    if (dimensions.length < 1 || measures.length < 1) {
      this.addError({
        title: "Need 1 dimension and at least 1 measure",
        message: "Use one category dimension and one measure for the bar height."
      });
      done();
      return;
    }

    var heightMeasureIndex = measureIndexFromConfig(config.height_measure, measures, 0);
    var defaultColorIndex = measures.length > 1 ? 1 : 0;
    var colorMeasureIndex = measureIndexFromConfig(config.color_measure, measures, defaultColorIndex);

    if (colorMode === "measure" && !measures[colorMeasureIndex]) {
      this.addError({
        title: "Color measure is missing",
        message: "Add the selected color measure to the query, or switch Bar Color Mode to Single Color."
      });
      done();
      return;
    }

    var heightMeasure = measures[heightMeasureIndex];
    var colorMeasure = colorMode === "measure" ? measures[colorMeasureIndex] : null;
    config._heightMeasure = heightMeasure;
    var maxBars = Math.max(1, Number(config.max_bars || 30));

    var rows = data.slice(0, maxBars).map(function(row) {
      var colorValue = colorMeasure ? measureCellValue(row, colorMeasure.name) : null;
      var labelParts = dimensions.map(function(dimension) {
        return cleanLabel(cellValue(row, dimension.name));
      }).filter(function(label) {
        return label !== "";
      });
      if (!labelParts.length) labelParts = ["(empty)"];
      return {
        label: labelParts.join(" / "),
        labelParts: labelParts,
        heightValue: measureCellValue(row, heightMeasure.name),
        colorValue: colorValue
      };
    });
    sortHierarchicalRows(rows, config);

    if (!rows.length) {
      this.addError({
        title: "No rows",
        message: "The query returned no data."
      });
      done();
      return;
    }

    var colorStats = colorMeasure ? measureStats(rows.map(function(d) { return d.colorValue; })) : null;
    registerDynamicOptions(this, measures, config, colorStats);
    config._dimensionFields = dimensions;

    var renderState = {
      rows: rows,
      config: config,
      colorMeasure: colorMeasure,
      colorStats: colorStats,
      addError: this.addError.bind(this)
    };
    element._ebcRender = function() {
      renderEnhancedBarChart(element, renderState);
    };
    ensureResizeObserver(element);
    element._ebcRender();
    done();
  }
});

function cellValue(row, fieldName) {
  var cell = row[fieldName];
  if (!cell) return null;
  return cell.value == null ? cell.rendered || cell.html || "" : cell.value;
}

function measureCellValue(row, fieldName) {
  var cell = row[fieldName];
  if (!cell) return 0;
  var direct = numericFromCell(cell);
  if (direct != null) return direct;

  var rowTotal = pivotTotalValue(cell);
  if (rowTotal != null) return rowTotal;

  var sum = 0;
  var found = false;
  Object.keys(cell).forEach(function(key) {
    var value = numericFromCell(cell[key]);
    if (value != null) {
      sum += value;
      found = true;
    }
  });
  return found ? sum : 0;
}

function pivotTotalValue(cell) {
  var totalKeys = Object.keys(cell).filter(function(key) {
    return key.indexOf("row_total") >= 0 || key.indexOf("total") >= 0;
  });
  for (var i = 0; i < totalKeys.length; i++) {
    var value = numericFromCell(cell[totalKeys[i]]);
    if (value != null) return value;
  }
  return null;
}

function numericFromCell(cell) {
  if (cell == null) return null;
  if (typeof cell === "number") return Number.isFinite(cell) ? cell : null;
  if (typeof cell === "string") return parseNumeric(cell);
  if (typeof cell !== "object") return null;
  if (cell.value != null) return parseNumeric(cell.value);
  if (cell.rendered != null) return parseNumeric(cell.rendered);
  if (cell.html != null) return parseNumeric(cell.html);
  return null;
}

function parseNumeric(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  var cleaned = String(value == null ? "" : value).replace(/<[^>]*>/g, "").replace(/,/g, "").replace(/[$¥￥%]/g, "").trim();
  if (cleaned === "") return null;
  var number = Number(cleaned);
  return Number.isFinite(number) ? number : null;
}

function cleanLabel(value) {
  return String(value == null ? "" : value).trim();
}

function fieldLabel(field) {
  return field.label_short || field.label || field.name;
}

function measureIndexFromConfig(value, measures, fallback) {
  var index = Number(value);
  if (!Number.isFinite(index) || index < 0 || index >= measures.length) return fallback;
  return index;
}

function registerDynamicOptions(vis, measures, config, colorStats) {
  if (!vis || typeof vis.trigger !== "function") return;

  var options = buildOptions(measures, config, colorStats);
  var signature = JSON.stringify(options);
  if (vis._lastOptionsSignature === signature) return;
  vis._lastOptionsSignature = signature;
  vis.trigger("registerOptions", options);
}

function buildOptions(measures, config, colorStats) {
  var measureValues = measureOptionValues(measures);
  var colorMode = config.color_mode || "measure";
  var options = {
    title: {
      type: "string",
      label: "Title",
      section: "Data",
      default: "Enhanced Bar Chart"
    },
    orientation: {
      type: "string",
      label: "Orientation",
      section: "Data",
      display: "select",
      values: [
        { "Vertical Columns": "vertical" },
        { "Horizontal Bars": "horizontal" }
      ],
      default: "vertical"
    },
    max_bars: {
      type: "number",
      label: "Max Bars",
      section: "Data",
      default: 30
    },
    canvas_size_mode: {
      type: "string",
      label: "Canvas Size",
      section: "Data",
      display: "select",
      values: [
        { "Auto Fit Tile": "auto" },
        { "Fixed Height": "fixed_height" },
        { "Fixed Width": "fixed_width" },
        { "Fixed Width + Height": "fixed_both" }
      ],
      default: "auto"
    },
    fixed_canvas_height: {
      type: "number",
      label: "Fixed Canvas Height",
      section: "Data",
      default: 520,
      hidden: config.canvas_size_mode !== "fixed_height" && config.canvas_size_mode !== "fixed_both"
    },
    fixed_canvas_width: {
      type: "number",
      label: "Fixed Canvas Width",
      section: "Data",
      default: 960,
      hidden: config.canvas_size_mode !== "fixed_width" && config.canvas_size_mode !== "fixed_both"
    },
    height_measure: {
      type: "string",
      label: "Bar Length / Height Measure",
      section: "Data",
      display: "select",
      values: measureValues,
      default: "0"
    },
    sort_by: {
      type: "string",
      label: "Axis Sort By",
      section: "Data",
      display: "select",
      values: [
        { "Query Order": "query" },
        { "Dimension Label": "dimension" },
        { "Bar Measure": "height" },
        { "Color Measure": "color" }
      ],
      default: "height"
    },
    sort_direction: {
      type: "string",
      label: "Sort Direction",
      section: "Data",
      display: "select",
      values: [
        { "Descending": "desc" },
        { "Ascending": "asc" }
      ],
      default: "desc"
    },
    color_mode: {
      type: "string",
      label: "Bar Color Mode",
      section: "Data",
      display: "select",
      values: [
        { "Single Color": "single" },
        { "Bind to Measure": "measure" }
      ],
      default: "measure"
    }
  };

  if (colorMode === "single") {
    options.single_color = {
      type: "string",
      label: "Single Color",
      section: "Style",
      display: "color",
      default: "#2F80ED"
    };
    addStyleOptions(options, config);
    return options;
  }

  options.color_measure = {
    type: "string",
    label: "Color Measure",
    section: "Data",
    display: "select",
    values: measureValues,
    default: measures.length > 1 ? "1" : "0"
  };

  if (!colorStats || colorStats.crossesZero || colorStats.hasPositive) {
    options.positive_light = {
      type: "string",
      label: "Positive Light Color",
      section: "Style",
      display: "color",
      default: "#A7D8FF"
    };
    options.positive_dark = {
      type: "string",
      label: "Positive Dark Color",
      section: "Style",
      display: "color",
      default: "#0B5CAD"
    };
  }

  if (!colorStats || colorStats.crossesZero || colorStats.hasNegative) {
    options.negative_light = {
      type: "string",
      label: "Negative Light Color",
      section: "Style",
      display: "color",
      default: "#FFD5A1"
    };
    options.negative_dark = {
      type: "string",
      label: "Negative Dark Color",
      section: "Style",
      display: "color",
      default: "#C65F00"
    };
  }

  if (!colorStats || colorStats.hasZero) {
    options.zero_color = {
      type: "string",
      label: "Zero Color",
      section: "Style",
      display: "color",
      default: "#CBD5E1"
    };
  }
  options.show_gradient_legend = {
    type: "boolean",
    label: "Show Gradient Legend",
    section: "Style",
    default: true
  };

  addStyleOptions(options, config);
  return options;
}

function addStyleOptions(options, config) {
  var borderVisible = truthy(config.show_border, false);
  var labelsVisible = truthy(config.show_value_labels, false);
  var axisTitleVisible = truthy(config.show_axis_title, true);

  options.show_value_labels = {
    type: "boolean",
    label: "Show Value Labels",
    section: "Style",
    default: false
  };
  options.value_label_measure = {
    type: "string",
    label: "Value Label Measure",
    section: "Style",
    display: "select",
    values: [
      { "Bar Length / Height Measure": "height" },
      { "Color Measure": "color" }
    ],
    default: "height",
    hidden: !labelsVisible
  };
  options.value_label_position = {
    type: "string",
    label: "Value Label Position",
    section: "Style",
    display: "select",
    values: [
      { "Outside Bar": "outside" },
      { "Inside Bar": "inside" },
      { "Auto": "auto" }
    ],
    default: "outside",
    hidden: !labelsVisible
  };
  options.value_label_format = {
    type: "string",
    label: "Value Label Format",
    section: "Style",
    display: "select",
    values: [
      { "Compact": "compact" },
      { "Full": "full" }
    ],
    default: "compact",
    hidden: !labelsVisible
  };
  options.value_label_color = {
    type: "string",
    label: "Value Label Color",
    section: "Style",
    display: "color",
    default: "#1F2937",
    hidden: !labelsVisible
  };

  options.show_border = {
    type: "boolean",
    label: "Show Bar Border",
    section: "Style",
    default: false
  };
  options.border_color = {
    type: "string",
    label: "Border Color",
    section: "Style",
    display: "color",
    default: "#1F2937",
    hidden: !borderVisible
  };
  options.border_width = {
    type: "number",
    label: "Border Width",
    section: "Style",
    default: 1,
    hidden: !borderVisible
  };

  options.show_grid = {
    type: "boolean",
    label: "Show Grid Lines",
    section: "Axis",
    default: true
  };
  options.axis_scale = {
    type: "string",
    label: "Axis Scale",
    section: "Axis",
    display: "select",
    values: [
      { "Linear": "linear" },
      { "Logarithmic": "log" }
    ],
    default: "linear"
  };
  options.axis_range_mode = {
    type: "string",
    label: "Axis Range",
    section: "Axis",
    display: "select",
    values: [
      { "Automatic": "auto" },
      { "Fixed": "fixed" }
    ],
    default: "auto"
  };
  options.axis_min = {
    type: "number",
    label: "Axis Minimum",
    section: "Axis",
    default: 0,
    hidden: config.axis_range_mode !== "fixed"
  };
  options.axis_max = {
    type: "number",
    label: "Axis Maximum",
    section: "Axis",
    default: 0,
    hidden: config.axis_range_mode !== "fixed"
  };
  options.show_axis_title = {
    type: "boolean",
    label: "Show Axis Title",
    section: "Axis",
    default: true
  };
  options.axis_title = {
    type: "string",
    label: "Axis Title",
    section: "Axis",
    default: "",
    hidden: !axisTitleVisible
  };
}

function measureOptionValues(measures) {
  return measures.map(function(measure, index) {
    var option = {};
    option[(index + 1) + ". " + fieldLabel(measure)] = String(index);
    return option;
  });
}

function sortHierarchicalRows(rows, config) {
  if (!rows.some(function(row) { return row.labelParts && row.labelParts.length > 1; })) {
    sortRows(rows, config);
    return;
  }

  var sortBy = config.sort_by || "height";
  if (sortBy === "query") return;
  var direction = config.sort_direction === "asc" ? 1 : -1;
  rows.sort(function(a, b) {
    var levels = Math.max(a.labelParts.length, b.labelParts.length);
    for (var level = 0; level < levels - 1; level++) {
      var av = hierarchySortValue(rows, a, level, sortBy);
      var bv = hierarchySortValue(rows, b, level, sortBy);
      var compare = compareSortValues(av, bv, direction, sortBy === "dimension");
      if (compare !== 0) return compare;
    }

    return compareSortValues(sortValue(a, sortBy), sortValue(b, sortBy), direction, sortBy === "dimension");
  });
}

function hierarchySortValue(rows, row, level, sortBy) {
  var key = hierarchyKey(row, level);
  if (sortBy === "dimension") return key;
  var total = 0;
  rows.forEach(function(candidate) {
    if (hierarchyKey(candidate, level) === key) total += numericSortValue(candidate, sortBy);
  });
  return total;
}

function hierarchyKey(row, level) {
  var parts = row.labelParts || [row.label || ""];
  return parts.slice(0, level + 1).join("\u0001");
}

function compareSortValues(a, b, direction, forceString) {
  if (forceString || typeof a === "string" || typeof b === "string") {
    return String(a).localeCompare(String(b)) * direction;
  }
  return (a - b) * direction;
}

function sortRows(rows, config) {
  var sortBy = config.sort_by || "height";
  if (sortBy === "query") return;

  var direction = config.sort_direction === "asc" ? 1 : -1;
  rows.sort(function(a, b) {
    return compareSortValues(sortValue(a, sortBy), sortValue(b, sortBy), direction, sortBy === "dimension");
  });
}

function parentKey(row) {
  if (!row.labelParts || row.labelParts.length < 2) return "";
  return row.labelParts.slice(0, -1).join(" / ");
}

function childLabel(row) {
  if (!row.labelParts || !row.labelParts.length) return row.label || "";
  return row.labelParts[row.labelParts.length - 1];
}

function sortValue(row, sortBy) {
  if (sortBy === "dimension") return row.label || "";
  if (sortBy === "color") return row.colorValue == null ? row.heightValue : row.colorValue;
  return row.heightValue;
}

function numericSortValue(row, sortBy) {
  var value = sortValue(row, sortBy);
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function truthy(value, defaultValue) {
  if (value === undefined || value === null) return defaultValue;
  if (value === true || value === "true" || value === "yes") return true;
  if (value === false || value === "false" || value === "no") return false;
  return Boolean(value);
}

function measureStats(values) {
  var min = Math.min.apply(null, values);
  var max = Math.max.apply(null, values);
  return {
    min: min,
    max: max,
    crossesZero: min < 0 && max > 0,
    hasPositive: max > 0,
    hasNegative: min < 0,
    hasZero: values.some(function(value) { return value === 0; }),
    allPositive: min >= 0,
    allNegative: max <= 0
  };
}

function createAxis(values, config) {
  var finite = values.filter(function(value) { return Number.isFinite(value); });
  if (!finite.length) finite = [0];

  var dataMin = Math.min.apply(null, finite);
  var dataMax = Math.max.apply(null, finite);
  var scale = config.axis_scale || "linear";
  var rangeMode = config.axis_range_mode || "auto";
  var min = rangeMode === "fixed" && Number.isFinite(Number(config.axis_min)) ? Number(config.axis_min) : dataMin;
  var max = rangeMode === "fixed" && Number.isFinite(Number(config.axis_max)) ? Number(config.axis_max) : dataMax;

  if (scale === "log") {
    if (min <= 0 || max <= 0 || dataMin <= 0) {
      return {
        error: {
          title: "Log axis requires positive values",
          message: "Logarithmic scale can only be used when the bar measure and axis range are greater than 0. Switch Axis Scale to Linear or filter out non-positive values."
        }
      };
    }
    if (min === max) {
      min = min / 10;
      max = max * 10;
    }
    return {
      scale: "log",
      min: min,
      max: max,
      zero: min,
      ticks: logTicks(min, max),
      position: function(value, length) {
        var clamped = Math.max(min, Math.min(max, value));
        return (Math.log10(clamped) - Math.log10(min)) / (Math.log10(max) - Math.log10(min)) * length;
      }
    };
  }

  if (rangeMode === "auto") {
    min = Math.min(0, dataMin);
    max = Math.max(0, dataMax);
    if (min === max) {
      min = min - 1;
      max = max + 1;
    }
  }

  if (min > max) {
    var swap = min;
    min = max;
    max = swap;
  }
  if (min === max) {
    min = min - 1;
    max = max + 1;
  }

  return {
    scale: "linear",
    min: min,
    max: max,
    zero: Math.max(min, Math.min(max, 0)),
    ticks: linearTicks(min, max, 5),
    position: function(value, length) {
      var clamped = Math.max(min, Math.min(max, value));
      return (clamped - min) / (max - min) * length;
    }
  };
}

function linearTicks(min, max, count) {
  var ticks = [];
  for (var i = 0; i <= count; i++) {
    ticks.push(min + (max - min) * (i / count));
  }
  if (min < 0 && max > 0 && ticks.indexOf(0) === -1) ticks.push(0);
  return ticks.sort(function(a, b) { return a - b; });
}

function logTicks(min, max) {
  var ticks = [];
  var start = Math.ceil(Math.log10(min));
  var end = Math.floor(Math.log10(max));
  ticks.push(min);
  for (var exp = start; exp <= end; exp++) {
    var value = Math.pow(10, exp);
    if (value > min && value < max) ticks.push(value);
  }
  ticks.push(max);
  return ticks.filter(function(value, index, arr) {
    return index === 0 || Math.abs(value - arr[index - 1]) > 1e-9;
  });
}

function boundMeasureColor(value, stats, config) {
  if (stats.crossesZero) {
    if (value === 0) return config.zero_color || "#CBD5E1";
    if (value > 0) {
      return interpolateHex(
        config.positive_light || "#A7D8FF",
        config.positive_dark || "#0B5CAD",
        stats.max === 0 ? 0 : value / stats.max
      );
    }
    return interpolateHex(
      config.negative_light || "#FFD5A1",
      config.negative_dark || "#C65F00",
      stats.min === 0 ? 0 : Math.abs(value / stats.min)
    );
  }

  var range = stats.max - stats.min;
  var t = range === 0 ? 1 : (value - stats.min) / range;
  var light = stats.allNegative
    ? config.negative_light || "#FFD5A1"
    : config.positive_light || "#A7D8FF";
  var dark = stats.allNegative
    ? config.negative_dark || "#C65F00"
    : config.positive_dark || "#0B5CAD";
  if (value === 0) return config.zero_color || "#CBD5E1";
  return interpolateHex(light, dark, t);
}

function interpolateHex(a, b, t) {
  t = Math.max(0, Math.min(1, t));
  var ca = hexToRgb(a);
  var cb = hexToRgb(b);
  return rgbToHex(
    Math.round(ca.r + (cb.r - ca.r) * t),
    Math.round(ca.g + (cb.g - ca.g) * t),
    Math.round(ca.b + (cb.b - ca.b) * t)
  );
}

function hexToRgb(hex) {
  var clean = String(hex || "").replace("#", "");
  if (clean.length === 3) clean = clean.split("").map(function(c) { return c + c; }).join("");
  var n = parseInt(clean, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(function(v) {
    var h = v.toString(16);
    return h.length === 1 ? "0" + h : h;
  }).join("");
}

function ensureResizeObserver(element) {
  if (element._ebcResizeObserver || typeof ResizeObserver === "undefined") return;

  var timer = null;
  element._ebcResizeObserver = new ResizeObserver(function() {
    if (!element._ebcRender) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      element._ebcRender();
    }, 80);
  });
  element._ebcResizeObserver.observe(element);
}

function renderEnhancedBarChart(element, state) {
  var config = state.config;
  var rows = state.rows;
  var colorMeasure = state.colorMeasure;
  var colorStats = state.colorStats;
  var root = element.querySelector(".ebc-root");
  if (!root) return;

  var title = root.querySelector(".ebc-title");
  var subtitle = root.querySelector(".ebc-subtitle");
  var wrap = root.querySelector(".ebc-chart-wrap");
  var svg = wrap.querySelector("svg");
  var tooltip = wrap.querySelector(".ebc-tooltip");

  title.textContent = config.title || "Enhanced Bar Chart";
  subtitle.textContent = colorMeasure
    ? "Bar height = " + fieldLabel(config._heightMeasure) + "; color = " + fieldLabel(colorMeasure)
    : "Bar height = " + fieldLabel(config._heightMeasure) + "; color = single color";

  while (svg.firstChild) svg.removeChild(svg.firstChild);

  var orientation = config.orientation || "vertical";
  var wrapWidth = Math.max(260, wrap.clientWidth || element.clientWidth || 900);
  var wrapHeight = Math.max(120, wrap.clientHeight || element.clientHeight - 64 || 420);
  var sizeMode = config.canvas_size_mode || "auto";
  var fixedWidth = Math.max(320, Number(config.fixed_canvas_width || 960));
  var fixedHeight = Math.max(160, Number(config.fixed_canvas_height || 520));
  var width = sizeMode === "fixed_width" || sizeMode === "fixed_both" ? fixedWidth : wrapWidth;
  var height = sizeMode === "fixed_height" || sizeMode === "fixed_both" ? fixedHeight : wrapHeight;
  var dimensionLevels = maxDimensionLevels(rows);
  var hasGroupedRows = orientation === "horizontal" && dimensionLevels > 1;
  var compactHorizontal = orientation === "horizontal" && height < 220;
  if (sizeMode === "fixed_width" || sizeMode === "fixed_both") {
    width = Math.max(width, readableWidth(rows, orientation, dimensionLevels));
  }
  if (sizeMode === "fixed_height" || sizeMode === "fixed_both") {
    height = Math.max(height, readableHeight(rows, orientation, dimensionLevels, truthy(config.show_axis_title, true)));
  }
  compactHorizontal = orientation === "horizontal" && height < 220;
  var horizontalLeft = hasGroupedRows
    ? Math.min(520, Math.max(190, dimensionLevels * 108, Math.floor(width * 0.12 * dimensionLevels)))
    : Math.min(190, Math.max(112, Math.floor(width * 0.24)));
  var margin = orientation === "horizontal"
    ? {
        top: compactHorizontal ? (hasGroupedRows ? 34 : 22) : (hasGroupedRows ? 46 : 30),
        right: Math.min(126, Math.max(54, Math.floor(width * 0.14))),
        bottom: compactHorizontal ? (truthy(config.show_axis_title, true) ? 44 : 30) : (truthy(config.show_axis_title, true) ? 58 : 42),
        left: horizontalLeft
      }
    : { top: 24, right: 104, bottom: verticalAxisBottom(dimensionLevels, truthy(config.show_axis_title, true)), left: truthy(config.show_axis_title, true) ? 88 : 72 };
  var innerWidth = Math.max(80, width - margin.left - margin.right);
  var innerHeight = Math.max(compactHorizontal ? 24 : 60, height - margin.top - margin.bottom);

  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", "0 0 " + width + " " + height);
  svg.style.width = width + "px";
  svg.style.height = height + "px";
  wrap.style.overflowX = width > wrapWidth + 1 ? "auto" : "hidden";
  wrap.style.overflowY = height > wrapHeight + 1 ? "auto" : "hidden";

  var axis = createAxis(rows.map(function(d) { return d.heightValue; }), config);
  if (axis.error) {
    if (state.addError) state.addError({ title: axis.error.title, message: axis.error.message });
    return;
  }

  if (orientation === "horizontal") {
    drawHorizontalBars(svg, rows, margin, innerWidth, innerHeight, axis, config, colorMeasure, colorStats, tooltip, width);
  } else {
    drawVerticalBars(svg, rows, margin, innerWidth, innerHeight, axis, config, colorMeasure, colorStats, tooltip, width);
  }

  drawLegend(svg, width, margin, config, colorMeasure, colorStats);
}

function readableHeight(rows, orientation, dimensionLevels, showAxisTitle) {
  if (orientation !== "horizontal") return 180 + Math.max(0, dimensionLevels - 1) * 18;
  var rowHeight = dimensionLevels > 1 ? 25 : 23;
  var top = dimensionLevels > 1 ? 46 : 30;
  var bottom = showAxisTitle ? 58 : 42;
  return Math.max(120, top + bottom + rows.length * rowHeight);
}

function readableWidth(rows, orientation, dimensionLevels) {
  if (orientation === "horizontal") return dimensionLevels > 1 ? Math.max(760, 430 + dimensionLevels * 108) : 520;
  return Math.max(520, 160 + rows.length * Math.max(28, dimensionLevels * 14));
}

function maxDimensionLevels(rows) {
  return rows.reduce(function(max, row) {
    return Math.max(max, row.labelParts ? row.labelParts.length : 1);
  }, 1);
}

function verticalAxisBottom(dimensionLevels, showAxisTitle) {
  return (showAxisTitle ? 62 : 44) + Math.max(1, dimensionLevels) * 20;
}

function drawVerticalBars(svg, rows, margin, innerWidth, innerHeight, axis, config, colorMeasure, colorStats, tooltip, svgWidth) {
  var barGap = 8;
  var barWidth = Math.max(8, (innerWidth - barGap * (rows.length - 1)) / rows.length);

  drawYAxis(svg, margin, innerWidth, innerHeight, axis, config);
  var zeroY = margin.top + innerHeight - axis.position(axis.zero, innerHeight);

  rows.forEach(function(d, i) {
    var x = margin.left + i * (barWidth + barGap);
    var valueY = margin.top + innerHeight - axis.position(d.heightValue, innerHeight);
    var y = Math.min(valueY, zeroY);
    var barHeight = Math.abs(zeroY - valueY);
    var color = barColor(d, colorMeasure, colorStats, config);
    var rect = barRect(x, y, barWidth, barHeight, color, config);

    attachTooltip(rect, tooltip, svgWidth, d, config._heightMeasure, colorMeasure);
    svg.appendChild(rect);

    if (truthy(config.show_value_labels, false)) {
      var label = verticalValueLabel(d, x, y, barWidth, barHeight, margin, innerHeight, config, colorMeasure, color);
      svg.appendChild(label);
    }

    drawVerticalCategoryLabel(svg, d, rows, i, x, barWidth, barGap, margin, innerHeight);
  });
}

function drawHorizontalBars(svg, rows, margin, innerWidth, innerHeight, axis, config, colorMeasure, colorStats, tooltip, svgWidth) {
  var rowStep = rows.length ? innerHeight / rows.length : innerHeight;
  var barGap = Math.max(1, Math.min(7, rowStep * 0.22));
  var barHeight = Math.max(2, Math.min(34, rowStep - barGap));

  drawHorizontalDimensionHeaders(svg, rows, margin, config);
  drawXAxis(svg, margin, innerWidth, innerHeight, axis, config);
  var zeroX = margin.left + axis.position(axis.zero, innerWidth);
  rows.forEach(function(d) {
    d._rowStep = barHeight + barGap;
  });

  rows.forEach(function(d, i) {
    var y = margin.top + i * (barHeight + barGap);
    d._y = y;
    var valueX = margin.left + axis.position(d.heightValue, innerWidth);
    var x = Math.min(valueX, zeroX);
    var barWidth = Math.abs(valueX - zeroX);
    var color = barColor(d, colorMeasure, colorStats, config);
    var rect = barRect(x, y, barWidth, barHeight, color, config);

    attachTooltip(rect, tooltip, svgWidth, d, config._heightMeasure, colorMeasure);
    svg.appendChild(rect);

    drawHorizontalCategoryLabel(svg, d, rows, i, margin, y, barHeight, innerWidth);

    if (truthy(config.show_value_labels, false)) {
      var label = horizontalValueLabel(d, x, y, barWidth, barHeight, config, colorMeasure, color);
      svg.appendChild(label);
    }
  });
}

function drawVerticalCategoryLabel(svg, d, rows, index, x, barWidth, barGap, margin, innerHeight) {
  if (barWidth <= 22) return;

  var cx = x + barWidth / 2;
  var baseY = margin.top + innerHeight;
  if (!d.labelParts || d.labelParts.length < 2) {
    var rotated = svgEl("text", {
      x: cx,
      y: baseY + 18,
      "text-anchor": "end",
      transform: "rotate(-42 " + cx + " " + (baseY + 18) + ")",
      class: "ebc-label"
    });
    rotated.textContent = truncate(d.labelParts ? d.labelParts[d.labelParts.length - 1] : d.label, 18);
    svg.appendChild(rotated);
    return;
  }

  var levels = maxDimensionLevels(rows);
  for (var level = 0; level < levels; level++) {
    var isLeaf = level === d.labelParts.length - 1;
    if (!isLeaf && !isHierarchyGroupStart(rows, index, level)) continue;

    var span = verticalGroupSpan(rows, index, level);
    var labelX = x + (span.end - index) * (barWidth + barGap) / 2 + barWidth / 2;
    var label = svgEl("text", {
      x: labelX,
      y: baseY + 16 + (levels - 1 - level) * 18,
      "text-anchor": "middle",
      class: isLeaf ? "ebc-label-child" : "ebc-label-parent"
    });
    label.textContent = truncate(d.labelParts[level] || "", Math.max(8, Math.floor((span.width || barWidth) / 7)));
    svg.appendChild(label);

    if (level === 0 && index > 0 && isHierarchyGroupStart(rows, index, level)) {
      var dividerX = x - barGap / 2;
      svg.appendChild(svgEl("line", {
        x1: dividerX,
        x2: dividerX,
        y1: margin.top,
        y2: baseY + levels * 18,
        class: "ebc-group-divider"
      }));
    }
  }
}

function drawHorizontalDimensionHeaders(svg, rows, margin, config) {
  if (!rows.some(function(row) { return row.labelParts && row.labelParts.length > 1; })) return;

  var dimensions = config._dimensionFields || [];
  var levels = maxDimensionLevels(rows);
  var layout = horizontalLabelLayout(margin, levels);
  var headerY = margin.top - 14;

  for (var level = 0; level < levels; level++) {
    var header = svgEl("text", { x: layout.columnX(level), y: headerY, class: "ebc-header" });
    header.textContent = dimensions[level] ? fieldLabel(dimensions[level]) : "Dimension " + (level + 1);
    svg.appendChild(header);
  }

  svg.appendChild(svgEl("line", {
    x1: 0,
    x2: margin.left,
    y1: margin.top - 4,
    y2: margin.top - 4,
    class: "ebc-header-rule"
  }));
  layout.dividers.forEach(function(x) {
    svg.appendChild(svgEl("line", {
      x1: x,
      x2: x,
      y1: 0,
      y2: margin.top - 4,
      class: "ebc-header-rule"
    }));
  });
  svg.appendChild(svgEl("line", {
    x1: margin.left,
    x2: margin.left,
    y1: 0,
    y2: margin.top - 4,
    class: "ebc-header-rule"
  }));
}

function drawHorizontalCategoryLabel(svg, d, rows, index, margin, y, barHeight, innerWidth) {
  var levels = maxDimensionLevels(rows);
  var layout = horizontalLabelLayout(margin, levels);
  if (!d.labelParts || d.labelParts.length < 2) {
    var single = svgEl("text", {
      x: margin.left - 12,
      y: y + barHeight / 2 + 4,
      "text-anchor": "end",
      class: "ebc-label"
    });
    single.textContent = truncate(d.label, 24);
    svg.appendChild(single);
    return;
  }

  for (var level = 0; level < levels; level++) {
    var isLeaf = level === d.labelParts.length - 1;
    if (!isLeaf && !isHierarchyGroupStart(rows, index, level)) continue;

    var text = svgEl("text", {
      x: layout.columnX(level),
      y: y + labelBaseline(barHeight),
      "text-anchor": "start",
      class: isLeaf ? "ebc-label" : "ebc-group-label"
    });
    text.textContent = truncate(d.labelParts[level] || "", layout.columnChars);
    svg.appendChild(text);

    if (level === 0 && index > 0 && isHierarchyGroupStart(rows, index, level)) {
      svg.appendChild(svgEl("line", {
        x1: 0,
        x2: margin.left + innerWidth,
        y1: y - 4,
        y2: y - 4,
        class: "ebc-group-divider"
      }));
    }
  }
  layout.dividers.forEach(function(x) {
    svg.appendChild(svgEl("line", {
      x1: x,
      x2: x,
      y1: y - 4,
      y2: y + barHeight + 4,
      class: "ebc-group-divider"
    }));
  });
}

function horizontalLabelLayout(margin, levels) {
  var columns = Math.max(1, levels || Math.floor((margin.left - 16) / 108));
  var usable = margin.left - 28;
  var columnWidth = usable / columns;
  var dividers = [];
  for (var i = 1; i < columns; i++) dividers.push(14 + i * columnWidth - 7);
  return {
    dividers: dividers,
    columnChars: Math.max(8, Math.floor((columnWidth - 16) / 7)),
    columnX: function(level) {
      return 14 + level * columnWidth;
    }
  };
}

function isHierarchyGroupStart(rows, index, level) {
  if (index === 0) return true;
  return hierarchyKey(rows[index], level) !== hierarchyKey(rows[index - 1], level);
}

function verticalGroupSpan(rows, index, level) {
  var key = hierarchyKey(rows[index], level);
  var start = index;
  var end = index;
  while (start > 0 && hierarchyKey(rows[start - 1], level) === key) start--;
  while (end + 1 < rows.length && hierarchyKey(rows[end + 1], level) === key) end++;
  return {
    start: start,
    end: end,
    width: Math.max(1, end - start + 1) * 28
  };
}

function labelBaseline(barHeight) {
  return barHeight < 9 ? barHeight / 2 + 3 : barHeight / 2 + 4;
}

function barColor(d, colorMeasure, colorStats, config) {
  return colorMeasure
    ? boundMeasureColor(d.colorValue, colorStats, config)
    : config.single_color || "#2F80ED";
}

function barRect(x, y, width, height, fill, config) {
  return svgEl("rect", {
    x: x,
    y: y,
    width: Math.max(0, width),
    height: Math.max(0, height),
    fill: fill,
    stroke: truthy(config.show_border, false) ? config.border_color || "#1F2937" : "none",
    "stroke-width": truthy(config.show_border, false) ? Math.max(0, Number(config.border_width || 1)) : 0,
    class: "ebc-bar",
    rx: 2
  });
}

function attachTooltip(rect, tooltip, svgWidth, d, heightMeasure, colorMeasure) {
  rect.addEventListener("mousemove", function(evt) {
    tooltip.style.display = "block";
    tooltip.style.left = Math.min(evt.offsetX + 14, svgWidth - 230) + "px";
    tooltip.style.top = Math.max(evt.offsetY - 18, 6) + "px";
    tooltip.innerHTML = tooltipHtml(d, heightMeasure, colorMeasure);
  });
  rect.addEventListener("mouseleave", function() {
    tooltip.style.display = "none";
  });
}

function verticalValueLabel(d, x, y, barWidth, barHeight, margin, innerHeight, config, colorMeasure, barFill) {
  var value = valueLabelText(d, config, colorMeasure);
  var position = resolvedLabelPosition(config.value_label_position || "outside", barHeight, 30);
  var inside = position === "inside";
  var isNegative = d.heightValue < 0;
  var labelY = inside
    ? (isNegative ? y + barHeight - 6 : y + 16)
    : (isNegative ? y + barHeight + 14 : y - 6);
  if (!inside && labelY < margin.top + 10) labelY = y + 16;

  var text = svgEl("text", {
    x: x + barWidth / 2,
    y: labelY,
    "text-anchor": "middle",
    fill: inside ? contrastTextColor(barFill) : config.value_label_color || "#1F2937",
    stroke: inside ? "none" : "#FFFFFF",
    "stroke-width": inside ? 0 : 3,
    class: "ebc-value-label"
  });
  text.textContent = value;
  return text;
}

function horizontalValueLabel(d, x, y, barWidth, barHeight, config, colorMeasure, barFill) {
  var value = valueLabelText(d, config, colorMeasure);
  var position = resolvedLabelPosition(config.value_label_position || "outside", barWidth, 58);
  var inside = position === "inside";
  var isNegative = d.heightValue < 0;
  var labelX = inside
    ? (isNegative ? x + 8 : x + Math.max(8, barWidth - 8))
    : (isNegative ? x - 8 : x + barWidth + 8);

  var text = svgEl("text", {
    x: labelX,
    y: y + barHeight / 2 + 4,
    "text-anchor": inside ? (isNegative ? "start" : "end") : (isNegative ? "end" : "start"),
    fill: inside ? contrastTextColor(barFill) : config.value_label_color || "#1F2937",
    stroke: inside ? "none" : "#FFFFFF",
    "stroke-width": inside ? 0 : 3,
    class: "ebc-value-label"
  });
  text.textContent = value;
  return text;
}

function valueLabelText(d, config, colorMeasure) {
  var useColor = config.value_label_measure === "color" && colorMeasure;
  var value = useColor ? d.colorValue : d.heightValue;
  return config.value_label_format === "full" ? formatNumber(value) : compactNumber(value);
}

function contrastTextColor(hexColor) {
  var rgb = hexToRgb(hexColor || "#FFFFFF");
  var luminance = (0.2126 * srgb(rgb.r) + 0.7152 * srgb(rgb.g) + 0.0722 * srgb(rgb.b));
  return luminance > 0.55 ? "#111827" : "#FFFFFF";
}

function srgb(value) {
  var channel = value / 255;
  return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
}

function resolvedLabelPosition(position, availableSize, minimumInsideSize) {
  if (position === "auto") return availableSize >= minimumInsideSize ? "inside" : "outside";
  return position;
}

function drawYAxis(svg, margin, innerWidth, innerHeight, axis, config) {
  axis.ticks.forEach(function(value) {
    var y = margin.top + innerHeight - axis.position(value, innerHeight);
    if (truthy(config.show_grid, true)) {
      svg.appendChild(svgEl("line", {
        x1: margin.left,
        x2: margin.left + innerWidth,
        y1: y,
        y2: y,
        class: "ebc-grid"
      }));
    }
    var text = svgEl("text", {
      x: margin.left - 10,
      y: y + 4,
      "text-anchor": "end",
      class: "ebc-axis"
    });
    text.textContent = compactNumber(value);
    svg.appendChild(text);
  });
  svg.appendChild(svgEl("line", {
    x1: margin.left,
    x2: margin.left + innerWidth,
    y1: margin.top + innerHeight - axis.position(axis.zero, innerHeight),
    y2: margin.top + innerHeight - axis.position(axis.zero, innerHeight),
    stroke: "#94A3B8"
  }));
  drawAxisTitle(svg, margin, innerWidth, innerHeight, config, "vertical");
}

function drawXAxis(svg, margin, innerWidth, innerHeight, axis, config) {
  axis.ticks.forEach(function(value, i) {
    var x = margin.left + axis.position(value, innerWidth);
    if (truthy(config.show_grid, true)) {
      svg.appendChild(svgEl("line", {
        x1: x,
        x2: x,
        y1: margin.top,
        y2: margin.top + innerHeight,
        class: "ebc-grid"
      }));
    }
    var text = svgEl("text", {
      x: x,
      y: margin.top + innerHeight + 20,
      "text-anchor": i === 0 ? "start" : "middle",
      class: "ebc-axis"
    });
    text.textContent = compactNumber(value);
    svg.appendChild(text);
  });
  svg.appendChild(svgEl("line", {
    x1: margin.left + axis.position(axis.zero, innerWidth),
    x2: margin.left + axis.position(axis.zero, innerWidth),
    y1: margin.top,
    y2: margin.top + innerHeight,
    stroke: "#94A3B8"
  }));
  drawAxisTitle(svg, margin, innerWidth, innerHeight, config, "horizontal");
}

function drawAxisTitle(svg, margin, innerWidth, innerHeight, config, orientation) {
  if (!truthy(config.show_axis_title, true)) return;
  var title = config.axis_title || fieldLabel(config._heightMeasure);
  if (!title) return;

  if (orientation === "horizontal") {
    var titleOffset = Math.max(30, Math.min(46, margin.bottom - 12));
    var horizontal = svgEl("text", {
      x: margin.left + innerWidth / 2,
      y: margin.top + innerHeight + titleOffset,
      "text-anchor": "middle",
      class: "ebc-axis-title"
    });
    horizontal.textContent = title;
    svg.appendChild(horizontal);
    return;
  }

  var vertical = svgEl("text", {
    x: 16,
    y: margin.top + innerHeight / 2,
    "text-anchor": "middle",
    transform: "rotate(-90 16 " + (margin.top + innerHeight / 2) + ")",
    class: "ebc-axis-title"
  });
  vertical.textContent = title;
  svg.appendChild(vertical);
}

function drawLegend(svg, width, margin, config, colorMeasure, stats) {
  var y = 18;
  if (!colorMeasure) {
    svg.appendChild(svgEl("rect", { x: width - margin.right - 120, y: y - 10, width: 14, height: 14, fill: config.single_color || "#2F80ED", rx: 2 }));
    var single = svgEl("text", { x: width - margin.right - 100, y: y + 1, class: "ebc-legend" });
    single.textContent = "Single color";
    svg.appendChild(single);
    return;
  }

  if (truthy(config.show_gradient_legend, true)) {
    drawGradientLegend(svg, width, margin, config, colorMeasure, stats);
    return;
  }

  var items = stats.crossesZero
    ? [
        { label: "Negative", color: config.negative_dark || "#C65F00" },
        { label: "Zero", color: config.zero_color || "#CBD5E1" },
        { label: "Positive", color: config.positive_dark || "#0B5CAD" }
      ]
    : [
        { label: "Low " + fieldLabel(colorMeasure), color: stats.allNegative ? config.negative_light || "#FFD5A1" : config.positive_light || "#A7D8FF" },
        { label: "High " + fieldLabel(colorMeasure), color: stats.allNegative ? config.negative_dark || "#C65F00" : config.positive_dark || "#0B5CAD" }
      ];

  items.forEach(function(item, i) {
    var x = width - margin.right - (items.length * 118) + i * 118;
    svg.appendChild(svgEl("rect", { x: x, y: y - 10, width: 14, height: 14, fill: item.color, rx: 2 }));
    var text = svgEl("text", { x: x + 20, y: y + 1, class: "ebc-legend" });
    text.textContent = item.label;
    svg.appendChild(text);
  });
}

function drawGradientLegend(svg, width, margin, config, colorMeasure, stats) {
  var legendWidth = stats.crossesZero ? 210 : 150;
  var legendHeight = 10;
  var x = width - margin.right - legendWidth;
  var y = 10;
  var gradientId = "ebc-gradient-" + Math.random().toString(36).slice(2);
  var defs = svgEl("defs", {});
  var gradient = svgEl("linearGradient", {
    id: gradientId,
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%"
  });

  if (stats.crossesZero) {
    gradient.appendChild(svgEl("stop", { offset: "0%", "stop-color": config.negative_dark || "#C65F00" }));
    gradient.appendChild(svgEl("stop", { offset: "50%", "stop-color": config.zero_color || "#CBD5E1" }));
    gradient.appendChild(svgEl("stop", { offset: "100%", "stop-color": config.positive_dark || "#0B5CAD" }));
  } else {
    var light = stats.allNegative ? config.negative_light || "#FFD5A1" : config.positive_light || "#A7D8FF";
    var dark = stats.allNegative ? config.negative_dark || "#C65F00" : config.positive_dark || "#0B5CAD";
    gradient.appendChild(svgEl("stop", { offset: "0%", "stop-color": light }));
    gradient.appendChild(svgEl("stop", { offset: "100%", "stop-color": dark }));
  }

  defs.appendChild(gradient);
  svg.appendChild(defs);
  svg.appendChild(svgEl("rect", {
    x: x,
    y: y,
    width: legendWidth,
    height: legendHeight,
    fill: "url(#" + gradientId + ")",
    rx: 2
  }));

  var min = svgEl("text", { x: x, y: y + 26, "text-anchor": "start", class: "ebc-legend" });
  min.textContent = compactNumber(stats.min);
  svg.appendChild(min);

  if (stats.crossesZero) {
    var zero = svgEl("text", { x: x + legendWidth / 2, y: y + 26, "text-anchor": "middle", class: "ebc-legend" });
    zero.textContent = "0";
    svg.appendChild(zero);
  }

  var max = svgEl("text", { x: x + legendWidth, y: y + 26, "text-anchor": "end", class: "ebc-legend" });
  max.textContent = compactNumber(stats.max);
  svg.appendChild(max);

  var title = svgEl("text", { x: x, y: y - 4, "text-anchor": "start", class: "ebc-legend" });
  title.textContent = fieldLabel(colorMeasure);
  svg.appendChild(title);
}

function tooltipHtml(d, heightMeasure, colorMeasure) {
  var title = d.label || "(empty)";
  var html = [
    "<strong>" + escapeHtml(title) + "</strong>",
    "<br>" + escapeHtml(fieldLabel(heightMeasure)) + ": " + formatNumber(d.heightValue)
  ];
  if (colorMeasure) {
    html.push("<br>" + escapeHtml(fieldLabel(colorMeasure)) + ": " + formatNumber(d.colorValue));
  }
  return html.join("");
}

function svgEl(name, attrs) {
  var el = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.keys(attrs || {}).forEach(function(key) {
    el.setAttribute(key, attrs[key]);
  });
  return el;
}

function formatNumber(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function compactNumber(value) {
  var abs = Math.abs(value);
  if (abs >= 1000000) return (value / 1000000).toFixed(1) + "M";
  if (abs >= 1000) return Math.round(value / 1000) + "K";
  return Math.round(value).toString();
}

function truncate(value, length) {
  var text = String(value == null ? "" : value);
  return text.length > length ? text.slice(0, length - 1) + "..." : text;
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

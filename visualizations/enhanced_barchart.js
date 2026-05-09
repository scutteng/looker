looker.plugins.visualizations.add({
  id: "enhanced_barchart",
  label: "Enhanced Bar Chart",
  options: {
    title: {
      type: "string",
      label: "Title",
      default: "Enhanced Bar Chart"
    },
    max_bars: {
      type: "number",
      label: "Max Bars",
      default: 30
    },
    height_measure: {
      type: "string",
      label: "Bar Length / Height Measure",
      display: "select",
      values: [
        { "First Measure": "0" }
      ],
      default: "0"
    },
    color_mode: {
      type: "string",
      label: "Bar Color Mode",
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
      display: "color",
      default: "#2F80ED"
    },
    positive_light: {
      type: "string",
      label: "Positive Light Color",
      display: "color",
      default: "#A7D8FF"
    },
    positive_dark: {
      type: "string",
      label: "Positive Dark Color",
      display: "color",
      default: "#0B5CAD"
    },
    negative_light: {
      type: "string",
      label: "Negative Light Color",
      display: "color",
      default: "#FFD5A1"
    },
    negative_dark: {
      type: "string",
      label: "Negative Dark Color",
      display: "color",
      default: "#C65F00"
    },
    zero_color: {
      type: "string",
      label: "Zero Color",
      display: "color",
      default: "#CBD5E1"
    }
  },

  create: function(element) {
    element.innerHTML = [
      "<style>",
      ".ebc-root{font-family:Inter,Roboto,Arial,sans-serif;color:#1f2937;width:100%;height:100%;box-sizing:border-box;padding:16px;background:#fff;}",
      ".ebc-title{font-size:18px;font-weight:700;margin:0 0 4px;}",
      ".ebc-subtitle{font-size:12px;color:#64748b;margin:0 0 12px;}",
      ".ebc-chart-wrap{position:relative;width:100%;height:calc(100% - 52px);min-height:260px;}",
      ".ebc-tooltip{position:absolute;pointer-events:none;display:none;background:#111827;color:#fff;border-radius:4px;padding:8px 10px;font-size:12px;line-height:1.35;box-shadow:0 8px 24px rgba(15,23,42,.22);z-index:2;}",
      ".ebc-axis text{fill:#64748b;font-size:11px;}",
      ".ebc-grid{stroke:#e8edf3;stroke-width:1;}",
      ".ebc-bar{transition:opacity .15s ease,stroke-width .15s ease;}",
      ".ebc-bar:hover{opacity:.82;stroke:#111827;stroke-width:1.5;}",
      ".ebc-label{fill:#334155;font-size:11px;}",
      ".ebc-legend{font-size:11px;fill:#64748b;}",
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

    var dimension = dimensions[0];
    var heightMeasure = measures[heightMeasureIndex];
    var colorMeasure = colorMode === "measure" ? measures[colorMeasureIndex] : null;
    var maxBars = Math.max(1, Number(config.max_bars || 30));

    var rows = data.slice(0, maxBars).map(function(row) {
      var colorValue = colorMeasure ? Number(cellValue(row, colorMeasure.name)) || 0 : null;
      return {
        label: cellValue(row, dimension.name),
        heightValue: Number(cellValue(row, heightMeasure.name)) || 0,
        colorValue: colorValue
      };
    });

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

    var root = element.querySelector(".ebc-root");
    var title = root.querySelector(".ebc-title");
    var subtitle = root.querySelector(".ebc-subtitle");
    var wrap = root.querySelector(".ebc-chart-wrap");
    var svg = wrap.querySelector("svg");
    var tooltip = wrap.querySelector(".ebc-tooltip");

    title.textContent = config.title || "Enhanced Bar Chart";
    subtitle.textContent = colorMeasure
      ? "Bar height = " + fieldLabel(heightMeasure) + "; color = " + fieldLabel(colorMeasure)
      : "Bar height = " + fieldLabel(heightMeasure) + "; color = single color";

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var width = Math.max(640, wrap.clientWidth || element.clientWidth || 900);
    var height = Math.max(260, wrap.clientHeight || element.clientHeight - 64 || 420);
    var margin = { top: 24, right: 28, bottom: 94, left: 72 };
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);

    var maxHeightValue = Math.max.apply(null, rows.map(function(d) { return Math.max(0, d.heightValue); }));
    var barGap = 8;
    var barWidth = Math.max(8, (innerWidth - barGap * (rows.length - 1)) / rows.length);

    drawYAxis(svg, margin, innerWidth, innerHeight, maxHeightValue);

    rows.forEach(function(d, i) {
      var x = margin.left + i * (barWidth + barGap);
      var barHeight = maxHeightValue === 0 ? 0 : (Math.max(0, d.heightValue) / maxHeightValue) * innerHeight;
      var y = margin.top + innerHeight - barHeight;
      var color = colorMeasure
        ? boundMeasureColor(d.colorValue, colorStats, config)
        : config.single_color || "#2F80ED";

      var rect = svgEl("rect", {
        x: x,
        y: y,
        width: barWidth,
        height: barHeight,
        fill: color,
        class: "ebc-bar",
        rx: 2
      });
      rect.addEventListener("mousemove", function(evt) {
        tooltip.style.display = "block";
        tooltip.style.left = Math.min(evt.offsetX + 14, width - 230) + "px";
        tooltip.style.top = Math.max(evt.offsetY - 18, 6) + "px";
        tooltip.innerHTML = tooltipHtml(d, heightMeasure, colorMeasure);
      });
      rect.addEventListener("mouseleave", function() {
        tooltip.style.display = "none";
      });
      svg.appendChild(rect);

      if (barWidth > 22) {
        var label = svgEl("text", {
          x: x + barWidth / 2,
          y: margin.top + innerHeight + 18,
          "text-anchor": "end",
          transform: "rotate(-42 " + (x + barWidth / 2) + " " + (margin.top + innerHeight + 18) + ")",
          class: "ebc-label"
        });
        label.textContent = truncate(d.label, 18);
        svg.appendChild(label);
      }
    });

    drawLegend(svg, width, margin, config, colorMeasure, colorStats);
    done();
  }
});

function cellValue(row, fieldName) {
  var cell = row[fieldName];
  if (!cell) return null;
  return cell.value == null ? cell.rendered || cell.html || "" : cell.value;
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
      default: "Enhanced Bar Chart"
    },
    max_bars: {
      type: "number",
      label: "Max Bars",
      default: 30
    },
    height_measure: {
      type: "string",
      label: "Bar Length / Height Measure",
      display: "select",
      values: measureValues,
      default: "0"
    },
    color_mode: {
      type: "string",
      label: "Bar Color Mode",
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
      display: "color",
      default: "#2F80ED"
    };
    return options;
  }

  options.color_measure = {
    type: "string",
    label: "Color Measure",
    display: "select",
    values: measureValues,
    default: measures.length > 1 ? "1" : "0"
  };

  if (!colorStats || colorStats.crossesZero || colorStats.hasPositive) {
    options.positive_light = {
      type: "string",
      label: "Positive Light Color",
      display: "color",
      default: "#A7D8FF"
    };
    options.positive_dark = {
      type: "string",
      label: "Positive Dark Color",
      display: "color",
      default: "#0B5CAD"
    };
  }

  if (!colorStats || colorStats.crossesZero || colorStats.hasNegative) {
    options.negative_light = {
      type: "string",
      label: "Negative Light Color",
      display: "color",
      default: "#FFD5A1"
    };
    options.negative_dark = {
      type: "string",
      label: "Negative Dark Color",
      display: "color",
      default: "#C65F00"
    };
  }

  if (!colorStats || colorStats.hasZero) {
    options.zero_color = {
      type: "string",
      label: "Zero Color",
      display: "color",
      default: "#CBD5E1"
    };
  }

  return options;
}

function measureOptionValues(measures) {
  return measures.map(function(measure, index) {
    var option = {};
    option[(index + 1) + ". " + fieldLabel(measure)] = String(index);
    return option;
  });
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

function drawYAxis(svg, margin, innerWidth, innerHeight, maxValue) {
  var ticks = 5;
  for (var i = 0; i <= ticks; i++) {
    var value = maxValue * (i / ticks);
    var y = margin.top + innerHeight - (innerHeight * i / ticks);
    svg.appendChild(svgEl("line", {
      x1: margin.left,
      x2: margin.left + innerWidth,
      y1: y,
      y2: y,
      class: "ebc-grid"
    }));
    var text = svgEl("text", {
      x: margin.left - 10,
      y: y + 4,
      "text-anchor": "end",
      class: "ebc-axis"
    });
    text.textContent = compactNumber(value);
    svg.appendChild(text);
  }
  svg.appendChild(svgEl("line", {
    x1: margin.left,
    x2: margin.left + innerWidth,
    y1: margin.top + innerHeight,
    y2: margin.top + innerHeight,
    stroke: "#94A3B8"
  }));
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

function tooltipHtml(d, heightMeasure, colorMeasure) {
  var html = [
    "<strong>" + escapeHtml(d.label) + "</strong>",
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

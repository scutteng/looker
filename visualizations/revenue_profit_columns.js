looker.plugins.visualizations.add({
  id: "revenue_profit_columns",
  label: "Revenue Columns Colored by Profit",
  options: {
    title: {
      type: "string",
      label: "Title",
      default: "Revenue by Category, Colored by Profit"
    },
    max_bars: {
      type: "number",
      label: "Max Bars",
      default: 30
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
    }
  },

  create: function(element) {
    element.innerHTML = [
      "<style>",
      ".rpc-root{font-family:Inter,Roboto,Arial,sans-serif;color:#1f2937;width:100%;height:100%;box-sizing:border-box;padding:16px;background:#fff;}",
      ".rpc-title{font-size:18px;font-weight:700;margin:0 0 4px;}",
      ".rpc-subtitle{font-size:12px;color:#64748b;margin:0 0 12px;}",
      ".rpc-chart-wrap{position:relative;width:100%;height:calc(100% - 52px);min-height:260px;}",
      ".rpc-tooltip{position:absolute;pointer-events:none;display:none;background:#111827;color:#fff;border-radius:4px;padding:8px 10px;font-size:12px;line-height:1.35;box-shadow:0 8px 24px rgba(15,23,42,.22);z-index:2;}",
      ".rpc-axis text{fill:#64748b;font-size:11px;}",
      ".rpc-axis line,.rpc-axis path{stroke:#d7dee8;}",
      ".rpc-grid{stroke:#e8edf3;stroke-width:1;}",
      ".rpc-bar{transition:opacity .15s ease,stroke-width .15s ease;}",
      ".rpc-bar:hover{opacity:.82;stroke:#111827;stroke-width:1.5;}",
      ".rpc-label{fill:#334155;font-size:11px;}",
      ".rpc-legend{font-size:11px;fill:#64748b;}",
      "</style>",
      "<div class='rpc-root'>",
      "<div class='rpc-title'></div>",
      "<div class='rpc-subtitle'></div>",
      "<div class='rpc-chart-wrap'><svg></svg><div class='rpc-tooltip'></div></div>",
      "</div>"
    ].join("");
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    var dimensions = queryResponse.fields.dimension_like || [];
    var measures = queryResponse.fields.measure_like || [];

    if (dimensions.length < 1 || measures.length < 2) {
      this.addError({
        title: "Need 1 dimension and 2 measures",
        message: "Use one category dimension, then Revenue/Sales as the first measure and Profit as the second measure."
      });
      done();
      return;
    }

    var dimension = dimensions[0];
    var revenue = measures[0];
    var profit = measures[1];
    var maxBars = Math.max(1, Number(config.max_bars || 30));

    var rows = data.slice(0, maxBars).map(function(row) {
      return {
        label: cellValue(row, dimension.name),
        revenue: Number(cellValue(row, revenue.name)) || 0,
        profit: Number(cellValue(row, profit.name)) || 0
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

    var root = element.querySelector(".rpc-root");
    var title = root.querySelector(".rpc-title");
    var subtitle = root.querySelector(".rpc-subtitle");
    var wrap = root.querySelector(".rpc-chart-wrap");
    var svg = wrap.querySelector("svg");
    var tooltip = wrap.querySelector(".rpc-tooltip");

    title.textContent = config.title || "Revenue by Category, Colored by Profit";
    subtitle.textContent = "Bar height = " + revenue.label_short + "; color = " + profit.label_short + " sign and magnitude";

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var width = Math.max(640, wrap.clientWidth || element.clientWidth || 900);
    var height = Math.max(260, wrap.clientHeight || element.clientHeight - 64 || 420);
    var margin = { top: 24, right: 24, bottom: 92, left: 72 };
    var innerWidth = width - margin.left - margin.right;
    var innerHeight = height - margin.top - margin.bottom;

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", "0 0 " + width + " " + height);

    var maxRevenue = Math.max.apply(null, rows.map(function(d) { return d.revenue; }));
    var maxPositiveProfit = Math.max.apply(null, rows.map(function(d) { return Math.max(0, d.profit); }));
    var maxNegativeProfit = Math.max.apply(null, rows.map(function(d) { return Math.max(0, -d.profit); }));

    var barGap = 8;
    var barWidth = Math.max(8, (innerWidth - barGap * (rows.length - 1)) / rows.length);

    drawYAxis(svg, margin, innerWidth, innerHeight, maxRevenue);

    rows.forEach(function(d, i) {
      var x = margin.left + i * (barWidth + barGap);
      var barHeight = maxRevenue === 0 ? 0 : (d.revenue / maxRevenue) * innerHeight;
      var y = margin.top + innerHeight - barHeight;
      var color = profitColor(
        d.profit,
        maxPositiveProfit,
        maxNegativeProfit,
        config.positive_light || "#A7D8FF",
        config.positive_dark || "#0B5CAD",
        config.negative_light || "#FFD5A1",
        config.negative_dark || "#C65F00"
      );

      var rect = svgEl("rect", {
        x: x,
        y: y,
        width: barWidth,
        height: barHeight,
        fill: color,
        class: "rpc-bar",
        rx: 2
      });
      rect.addEventListener("mousemove", function(evt) {
        tooltip.style.display = "block";
        tooltip.style.left = Math.min(evt.offsetX + 14, width - 210) + "px";
        tooltip.style.top = Math.max(evt.offsetY - 18, 6) + "px";
        tooltip.innerHTML = [
          "<strong>" + escapeHtml(d.label) + "</strong>",
          "<br>" + escapeHtml(revenue.label_short) + ": " + formatMoney(d.revenue),
          "<br>" + escapeHtml(profit.label_short) + ": " + formatMoney(d.profit)
        ].join("");
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
          class: "rpc-label"
        });
        label.textContent = truncate(d.label, 18);
        svg.appendChild(label);
      }
    });

    drawLegend(svg, width, margin, config);
    done();
  }
});

function cellValue(row, fieldName) {
  var cell = row[fieldName];
  if (!cell) return null;
  return cell.value == null ? cell.rendered || cell.html || "" : cell.value;
}

function profitColor(value, maxPositive, maxNegative, posLight, posDark, negLight, negDark) {
  if (value === 0) return "#CBD5E1";
  if (value > 0) return interpolateHex(posLight, posDark, maxPositive ? value / maxPositive : 0);
  return interpolateHex(negLight, negDark, maxNegative ? Math.abs(value) / maxNegative : 0);
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
      class: "rpc-grid"
    }));
    var text = svgEl("text", {
      x: margin.left - 10,
      y: y + 4,
      "text-anchor": "end",
      class: "rpc-axis"
    });
    text.textContent = compactMoney(value);
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

function drawLegend(svg, width, margin, config) {
  var y = 18;
  var items = [
    { label: "Positive profit", color: config.positive_dark || "#0B5CAD" },
    { label: "Negative profit", color: config.negative_dark || "#C65F00" }
  ];
  items.forEach(function(item, i) {
    var x = width - margin.right - 260 + i * 130;
    svg.appendChild(svgEl("rect", { x: x, y: y - 10, width: 14, height: 14, fill: item.color, rx: 2 }));
    var text = svgEl("text", { x: x + 20, y: y + 1, class: "rpc-legend" });
    text.textContent = item.label;
    svg.appendChild(text);
  });
}

function svgEl(name, attrs) {
  var el = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.keys(attrs || {}).forEach(function(key) {
    el.setAttribute(key, attrs[key]);
  });
  return el;
}

function formatMoney(value) {
  var abs = Math.abs(value);
  var sign = value < 0 ? "-" : "";
  return sign + "$" + abs.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function compactMoney(value) {
  if (Math.abs(value) >= 1000000) return "$" + (value / 1000000).toFixed(1) + "M";
  if (Math.abs(value) >= 1000) return "$" + Math.round(value / 1000) + "K";
  return "$" + Math.round(value);
}

function truncate(value, length) {
  var text = String(value == null ? "" : value);
  return text.length > length ? text.slice(0, length - 1) + "…" : text;
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

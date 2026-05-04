import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function RainChart({ data, isDark = true }) {
  const chartRef = useRef(null);
  const chartDivRef = useRef(null);

  useEffect(() => {
    if (!data?.forecast?.forecastday || !chartDivRef.current) return;

    if (chartRef.current) {
      try {
        chartRef.current.dispose();
      } catch { /* empty */ }
      chartRef.current = null;
    }

    const textColor = isDark ? 0xffffff : 0x333333;

    const root = am5.Root.new(chartDivRef.current);
    chartRef.current = root;

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "hour", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {
          grid: {
            stroke: isDark ? am5.color(0xffffff) : am5.color(0xcccccc),
            strokeOpacity: 0.2,
          },
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color(textColor),
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        renderer: am5xy.AxisRendererY.new(root, {
          grid: {
            stroke: isDark ? am5.color(0xffffff) : am5.color(0xcccccc),
            strokeOpacity: 0.2,
          },
        }),
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(textColor),
    });

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "chance",
        valueXField: "date",
        fill: am5.color(0x3b82f6),
        stroke: am5.color(0x2563eb),
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}%",
        }),
      })
    );

    series.columns.template.setAll({
      fillOpacity: 0.7,
      strokeWidth: 1,
    });

    const allHours = [];
    data.forecast.forecastday.forEach((day) => {
      day.hour.forEach((hour) => {
        const date = new Date(hour.time.replace(" ", "T"));
        allHours.push({
          date: date.getTime(),
          chance: hour.chance_of_rain,
          precip: hour.precip_mm,
        });
      });
    });

    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    series.data.setAll(allHours.slice(0, 48));
    series.appear(1000);

    return () => {
      if (chartRef.current) {
        try {
          chartRef.current.dispose();
        } catch { /* empty */ }
        chartRef.current = null;
      }
    };
  }, [data, isDark]);

  return (
    <section className={`p-3 sm:p-4 rounded-3xl w-full ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`} aria-label="Gráfico de probabilidad de lluvia">
      <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Rain Probability (48h)</h3>
      <div ref={chartDivRef} className="w-full h-56 sm:h-64 lg:h-72" />
      <style>{`[aria-label="amCharts"] { display: none !important; }`}</style>
    </section>
  );
}
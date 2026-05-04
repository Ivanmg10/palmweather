import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function TemperatureChart({ data, isDark = true }) {
  const chartRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    if (!data?.forecast?.forecastday || !divRef.current) return;

    if (chartRef.current) {
      try {
        chartRef.current.dispose();
      } catch { /* empty */ }
      chartRef.current = null;
    }

    const textColor = isDark ? 0xffffff : 0x333333;
    const lineColor = isDark ? 0xfbbf24 : 0xf59e0b;

    const root = am5.Root.new(divRef.current);
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
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.get("renderer").labels.template.setAll({
      fill: am5.color(textColor),
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      fill: am5.color(textColor),
    });

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "temp",
        valueXField: "date",
        stroke: am5.color(lineColor),
        fill: am5.color(lineColor),
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}°C",
        }),
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 3,
    });

    const allHours = [];
    data.forecast.forecastday.forEach((day) => {
      day.hour.forEach((hour) => {
        const date = new Date(hour.time.replace(" ", "T"));
        allHours.push({
          date: date.getTime(),
          temp: hour.temp_c,
        });
      });
    });

    series.data.setAll(allHours.slice(0, 48));

    chart.set("cursor", am5xy.XYCursor.new(root, {}));
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
    <section className={`m-2 sm:m-5 p-3 sm:p-4 rounded-3xl w-full ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`} aria-label="Gráfico de tendencia de temperatura">
      <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Temperature Trend (48h)</h3>
      <div ref={divRef} className="w-full h-48 sm:h-64" />
      <style>{`[aria-label="amCharts"] { display: none !important; }`}</style>
    </section>
  );
}
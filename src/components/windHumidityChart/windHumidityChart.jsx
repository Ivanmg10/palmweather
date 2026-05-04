import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function WindHumidityChart({ data, isDark = true }) {
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
        layout: root.verticalLayout,
      })
    );

    const allHours = [];
    data.forecast.forecastday.forEach((day) => {
      day.hour.forEach((hour) => {
        const date = new Date(hour.time.replace(" ", "T"));
        allHours.push({
          date: date.getTime(),
          wind: hour.wind_kph,
          humidity: hour.humidity,
        });
      });
    });

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

    const yAxisLeft = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        position: "left",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxisLeft.get("renderer").labels.template.setAll({
      fill: am5.color(textColor),
    });

    const yAxisRight = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        position: "right",
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxisRight.get("renderer").labels.template.setAll({
      fill: am5.color(textColor),
    });

    const seriesWind = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Wind (km/h)",
        xAxis: xAxis,
        yAxis: yAxisLeft,
        valueYField: "wind",
        valueXField: "date",
        stroke: am5.color(0x22c55e),
        fill: am5.color(0x22c55e),
        tooltip: am5.Tooltip.new(root, {
          labelText: "Wind: {valueY} km/h",
        }),
      })
    );

    seriesWind.strokes.template.setAll({
      strokeWidth: 2,
    });

    const seriesHumidity = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Humidity (%)",
        xAxis: xAxis,
        yAxis: yAxisRight,
        valueYField: "humidity",
        valueXField: "date",
        stroke: am5.color(0x06b6d4),
        fill: am5.color(0x06b6d4),
        tooltip: am5.Tooltip.new(root, {
          labelText: "Humidity: {valueY}%",
        }),
      })
    );

    seriesHumidity.strokes.template.setAll({
      strokeWidth: 2,
    });

    seriesWind.data.setAll(allHours.slice(0, 48));
    seriesHumidity.data.setAll(allHours.slice(0, 48));

    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    seriesWind.appear(1000);
    seriesHumidity.appear(1000);

    return () => {
      if (chartRef.current) {
        try {
          chartRef.current.dispose();
        } catch { /* empty */ }
        chartRef.current = null;
      }
    };
  }, [data]);

  return (
    <section className={`p-3 sm:p-4 rounded-3xl w-full ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`} aria-label="Gráfico de viento y humedad">
      <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Wind & Humidity (48h)</h3>
      <div ref={chartDivRef} className="w-full h-56 sm:h-64 lg:h-72" />
      <style>{`[aria-label="amCharts"] { display: none !important; }`}</style>
    </section>
  );
}
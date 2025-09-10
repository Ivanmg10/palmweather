import { useEffect, useState } from "react";
import { getWeatherIcon } from "../../utils/IconUtils";

export default function Forecast({ data }) {
  const [forecast, setForecast] = useState([]);

  const getWeekday = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const date = new Date(dateString);
    const dayIndex = date.getDay(); // 0 = Sunday, 6 = Saturday
    return days[dayIndex];
  };

  useEffect(() => {
    if (!data?.forecast?.forecastday) return;

    const forecastArray = data.forecast.forecastday.map((day, index) => ({
      id: index,
      day: getWeekday(day.date),
      max: day.day.maxtemp_c,
      low: day.day.mintemp_c,
      icon: day.day.condition.code,
    }));

    setForecast(forecastArray);
  }, [data]);

  return (
    <div
      id="10-day-forecast"
      className="m-10 flex flex-col items-center p-1 bg-[#1e1e1e] w-full rounded-3xl"
    >
      {forecast.map((day, index) => {
        return (
          <>
            <div
              key={day.id}
              className="flex flex-row justify-around items-center w-full py-4 text-1xl "
            >
              <p className="w-1/4 text-1xl">
                {index === 0 ? "Today" : day.day}
              </p>

              {getWeatherIcon(day.icon)}

              <div className="flex flex-row justify-around w-2/4">
                <p className="text-2xl">{day.low} °</p>
                <div>--------</div>
                <p className="text-2xl">{day.max} °</p>
              </div>
            </div>

            {index === 6 ? (
              <></>
            ) : (
              <div className="w-[90%] border-b-1 border-gray-500"></div>
            )}
          </>
        );
      })}
    </div>
  );
}

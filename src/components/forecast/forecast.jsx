import { useEffect, useState } from "react";
import { getWeatherIcon } from "../../utils/IconUtils";

export default function Forecast({ data, setLocation }) {
  const [forecast, setForecast] = useState([]);
  const [inputValue, setInputValue] = useState("");

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

    const daysMin = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date(dateString);
    const dayIndex = date.getDay(); // 0 = Sunday, 6 = Saturday

    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return daysMin[dayIndex];
    } else {
      return days[dayIndex];
    }
  };

  useEffect(() => {
    if (!data?.forecast?.forecastday) return;

    const forecastArray = data.forecast.forecastday.map((day, index) => ({
      id: index,
      day: getWeekday(day.date),
      max: Math.round(day.day.maxtemp_c),
      low: Math.round(day.day.mintemp_c),
      text: day.day.condition.text,
    }));

    setForecast(forecastArray);
  }, [data]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setLocation(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div
      id="10-day-forecast"
      className="m-2 sm:m-5 flex flex-col p-1  w-full rounded-3xl"
    >
      <div>
        <input
          type="text"
          id="username"
          placeholder="Buscar.."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="block 2xl:w-full px-4 py-3 text-lg  text-white bg-transparent rounded-full focus:outline-none 
             focus:ring-0 focus:ring-offset-0 w-full pb-5"
        />

        {forecast.map((day, index) => {
          return (
            <div key={day.id}>
              <div className="flex flex-row justify-around items-center w-full py-4 text-1xl">
                <p className="w-1/4 text-1xl sm:font-semibold">
                  {index === 0 ? "Today" : day.day}
                </p>

                <div className="sm:w-1/4 sm:flex sm:justify-center">
                  {getWeatherIcon(day.text)}
                </div>

                <div className="flex flex-row justify-center items-center w-2/4 sm:w-2/4 sm:px-5">
                  <p className="sm:text-2xl min-w-12 sm:min-w-16">{day.low}°</p>
                  <hr className="w-0 sm:w-[50%] h-1 mx-auto border-0 rounded-sm bg-gradient-to-r from-blue-200 to-yellow-200" />
                  <p className="sm:text-2xl min-w-12 sm:min-w-16">{day.max}°</p>
                </div>
              </div>

              {/* {index === 6 ? (
              <></>
            ) : (
              <div className="w-[90%] border-b-1 border-gray-500"></div>
            )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

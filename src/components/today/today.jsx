import { useState } from "react";
import { getWeatherIcon } from "../../utils/IconUtils";

export default function Today({ data, setLocation }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setLocation(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <>
      <div
        id="main-weather"
        className="flex flex-col justify-center items-center  w-64 p-5"
      >
        <p className="text-3xl">{data.location.name}</p>
        <div className="flex items-center">
          <p className="text-7xl sm:text-9xl p-2">
            {Math.round(data.current.temp_c)}°
          </p>
          {getWeatherIcon(data.current.condition.text, "big")}
        </div>

        <div id="high-lows" className="flex">
          <p className="mr-3">
            H: {Math.round(data.forecast.forecastday[0].day.maxtemp_c)} °
          </p>
          <p>L: {Math.round(data.forecast.forecastday[0].day.mintemp_c)} °</p>
        </div>
      </div>

      <div className="relative w-[100%] sm:w-1/2 mb-4 sm:mb-16">
        <input
          type="text"
          id="username"
          placeholder="Buscar..."
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="block w-full px-4 py-3 text-lg text-white bg-[#1e1e1e] rounded-full focus:outline-none"
        />
      </div>
    </>
  );
}

import { getWeatherIcon } from "../../utils/IconUtils";

export default function Today({ data }) {
  return (
    <div
      id="main-weather"
      className="flex flex-col justify-center items-center mb-16 w-64 p-5"
    >
      <p className="">Home</p>
      <p className="text-3xl">{data.location.name}</p>
      <div className="flex items-center">
        <p className="text-9xl p-2">{data.current.temp_c}°</p>
        {getWeatherIcon(data.current.condition.code, "big")}
      </div>

      <div id="high-lows" className="flex">
        <p className="mr-3">
          H: {data.forecast.forecastday[0].day.maxtemp_c} °
        </p>
        <p>L: {data.forecast.forecastday[0].day.mintemp_c} °</p>
      </div>
    </div>
  );
}

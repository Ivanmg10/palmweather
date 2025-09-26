import { getWeatherColor } from "../../utils/IconUtils";

export default function Today({ data }) {
  const bgColor = getWeatherColor(data.current.condition.text);


  return (
    <>
      <div
        id="main-weather"
        className={`
          m-2 sm:m-5 flex flex-col 2xl:flex-row justify-center items-center
          p-5 rounded-3xl w-full gap-5 text-black ${bgColor}
        `}
      >


        <div className="flew flex-col justify-center items-center">
          <p className={`text-3xl`}>{data.location.name}</p>
          <div className="flex items-center">
            <p className={`text-7xl sm:text-9xl p-2`}>
              {Math.round(data.current.temp_c)}°
            </p>
            {/* {getWeatherIcon(data.current.condition.text, "big")} */}
          </div>

          <div id="high-lows" className="flex justify-center">
            <p className="mr-3 ">
              H: {Math.round(data.forecast.forecastday[0].day.maxtemp_c)} °
            </p>
            <p className="">
              L: {Math.round(data.forecast.forecastday[0].day.mintemp_c)} °
            </p>
          </div>
        </div>

        <div className="relative w-full 2xl:w-1/2 flex flex-col justify-center items-center gap-5 ">
          <div className="hidden 2xl:grid grid-cols-2 gap-4 2xl:w-full w-[80%] ">
            <p className="text-xl">Wind: {data.current.wind_kph} km/h</p>

            <p className="text-xl">Humidity: {data.current.humidity}%</p>

            <p className="text-xl">Pressure: {data.current.pressure_mb} hPa</p>

            <p className="text-xl">Visibility: {data.current.vis_miles} mi</p>

            <p className="text-xl">UV Index: {data.current.uv}</p>

            <p className="text-xl">Feels Like: {data.current.feelslike_c} °C</p>

            <p className="text-xl">Cloud Cover: {data.current.cloud}%</p>

            <p className="text-xl">Dew Point: {data.current.dewpoint_c} °C</p>
          </div>
        </div>
      </div>
    </>
  );
}

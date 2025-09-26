import { getHour } from "../../utils/DateUtils";
import { getWeatherIcon } from "../../utils/IconUtils";

export default function Temperature({ data }) {
  const hours = data.forecast.forecastday[0].hour;
  const nextDayHours = data.forecast.forecastday[1].hour;

  function buildNext24Hours(hours, nextDayHours) {
    const now = new Date();
    const currentHour = now.getHours();

    const startIndex = hours.findIndex((h) => {
      const hourFromData = new Date(h.time.replace(" ", "T")).getHours();
      return hourFromData === currentHour;
    });

    const todaySlice = hours.slice(startIndex);
    const remaining = 24 - todaySlice.length;
    const nextSlice = nextDayHours.slice(0, remaining);

    return [...todaySlice, ...nextSlice];
  }

  return (
    <div
      id="hour-temperature"
      className="sm:m-5 m-2 flex flex-row flex-nowrap overflow-x-auto justify-around gap-1 py-6 bg-[#1e1e1e]  rounded-3xl w-full"
    >
      {buildNext24Hours(hours, nextDayHours).map((hour, index) => {
        return (
          <div
            className="w-1/6 flex-shrink-0 flex flex-col items-center gap-3 ml-4 sm:ml-0"
            key={hour.time}
          >
            <p className="text-1xl">
              {index === 0 ? "Now" : getHour(hour.time)}
            </p>
            {getWeatherIcon(hour.condition.text)}
            <p className="text-1xl sm:text-2xl">{Math.round(hour.temp_c)} °</p>
          </div>
        );
      })}
    </div>
  );
}

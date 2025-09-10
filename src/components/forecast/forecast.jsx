import { returnIcon } from "../../utils/IconUtils";

const forecast = [
  {
    id: 1,
    icon: "IconSun",
    day: "Monday",
    max: "23",
    low: "21",
  },
  {
    id: 2,
    icon: "IconCloud",
    day: "Tuesday",
    max: "23",
    low: "21",
  },
  {
    id: 3,
    icon: "IconCloudRain",
    day: "Wednesday",
    max: "23",
    low: "21",
  },
  {
    id: 4,
    icon: "IconCloudBolt",
    day: "Thursday",
    max: "23",
    low: "21",
  },
  {
    id: 5,
    icon: "IconSnowflake",
    day: "Friday",
    max: "23",
    low: "21",
  },
  {
    id: 6,
    icon: "IconHaze",
    day: "Saturday",
    max: "23",
    low: "21",
  },
  {
    id: 7,
    icon: "IconHaze",
    day: "Sunday",
    max: "23",
    low: "21",
  },
];

export default function Forecast() {
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

              {returnIcon(day.icon)}

              <div className="flex flex-row justify-around w-2/4">
                <p className="text-2xl">{day.max} °</p>
                <div>--------</div>
                <p className="text-2xl">{day.low} °</p>
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

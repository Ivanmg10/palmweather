import {
  IconHaze,
  IconSnowflake,
  IconCloudBolt,
  IconCloud,
  IconSun,
  IconCloudRain,
} from "@tabler/icons-react";

const forecast = [
  {
    id: 1,
    icon: "iconSun",
    day: "Monday",
    max: "23",
    low: "21",
  },
  {
    id: 2,
    icon: "iconCloud",
    day: "Tuesday",
    max: "23",
    low: "21",
  },
  {
    id: 3,
    icon: "iconCloudRain",
    day: "Wednesday",
    max: "23",
    low: "21",
  },
  {
    id: 4,
    icon: "iconCloudBolt",
    day: "Thursday",
    max: "23",
    low: "21",
  },
  {
    id: 5,
    icon: "iconSnowflake",
    day: "Friday",
    max: "23",
    low: "21",
  },
  {
    id: 6,
    icon: "iconHaze",
    day: "Saturday",
    max: "23",
    low: "21",
  },
  {
    id: 7,
    icon: "iconHaze",
    day: "Sunday",
    max: "23",
    low: "21",
  },
];

export default function Forecast() {
  return (
    <div id="10-day-forecast" className="m-10 flex flex-col items-center p-1">
      {forecast.map((day) => {
        return (
          <div
            key={day.id}
            className="flex flex-row justify-around w-full p-4 border-b-1 border-b-gray-300"
          >
            <p className="w-1/4">{day.day}</p>
            <IconSun stroke={2} className="w-1/4" />
            <div className="flex flex-row justify-around w-2/4">
              <p>{day.max}</p>
              <div>--------</div>
              <p>{day.low}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

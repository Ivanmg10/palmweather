import {
  IconHaze,
  IconSnowflake,
  IconCloudBolt,
  IconCloud,
  IconSun,
  IconCloudRain,
} from "@tabler/icons-react";

export default function Temperature() {
  const icons = [
    IconHaze,
    IconSnowflake,
    IconCloudBolt,
    IconCloud,
    IconSun,
    IconCloudRain,
  ];

  const generateRandomTemperature = (min = -5, max = 35) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const hoursArray = Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,
    hour: index,
    icon: icons[Math.floor(Math.random() * icons.length)],
    temperature: generateRandomTemperature(),
  }));

  console.log(hoursArray);

  return (
    <div
      id="hour-temperature"
      className="m-10 flex flex-row flex-nowrap overflow-x-auto justify-around gap-1 py-6 bg-[#1e1e1e]  rounded-3xl w-full"
    >
      {hoursArray.map((hour, index) => {
        return (
          <div className="w-1/6 flex-shrink-0 flex flex-col items-center gap-3">
            <p className="text-1xl">{index === 0 ? "Now" : hour.hour}</p>
            <IconHaze stroke={2} className="w-8 h-8" />
            <p className="text-2xl">{hour.temperature} °</p>
          </div>
        );
      })}
    </div>
  );
}

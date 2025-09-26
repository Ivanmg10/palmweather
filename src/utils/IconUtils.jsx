import {
  IconMist,
  IconCloudFog,
  IconSnowflake,
  IconCloudBolt,
  IconCloud,
  IconSun,
  IconCloudRain,
  IconMoon,
  IconWind,
  IconTemperature,
} from "@tabler/icons-react";

const iconSizeClass = (size) =>
  size === "big" ? "w-10 sm:w-20 h-10 sm:h-20" : "w-6 h-6 sm:w-8 sm:h-8";

const iconColors = {
  sun: "text-amber-200",
  moon: "text-blue-200",
  cloud: "text-gray-300",
  rain: "text-blue-400",
  snow: "text-blue-100",
  thunder: "text-yellow-300",
  mist: "text-gray-500",
  fog: "text-gray-400",
  wind: "text-gray-400",
  temperature: "text-red-400",
  default: "text-amber-400",
};

const bgColors = {
  sun: "bg-gradient-to-r from-amber-200 to-amber-400",
  moon: "bg-gradient-to-r from-blue-200 to-blue-400",
  cloud: "bg-gradient-to-r from-gray-300 to-gray-400",
  rain: "bg-gradient-to-r from-blue-400 to-blue-600",
  snow: "bg-gradient-to-r from-blue-100 to-blue-300",
  thunder: "bg-gradient-to-r from-yellow-300 to-yellow-500",
  mist: "bg-gradient-to-r from-gray-500 to-gray-400",
  fog: "bg-gradient-to-r from-gray-400 to-gray-500",
  wind: "bg-gradient-to-r from-gray-400 to-gray-300",
  temperature: "bg-gradient-to-r from-red-400 to-red-600",
  default: "bg-gradient-to-r from-amber-400 to-amber-200",
};

const iconsMap = {
  IconMist: IconMist,
  IconFog: IconCloudFog,
  IconSnowflake: IconSnowflake,
  IconCloudBolt: IconCloudBolt,
  IconCloud: IconCloud,
  IconSun: IconSun,
  IconCloudRain: IconCloudRain,
  IconMoon: IconMoon,
  IconWind: IconWind,
  IconTemperature: IconTemperature,
};

export const returnIcon = (iconName, size, type = "default") => {
  const IconComponent = iconsMap[iconName] || IconSun;
  return (
    <IconComponent
      stroke={2}
      className={`${iconColors[type] ?? iconColors.default} ${iconSizeClass(
        size
      )}`}
    />
  );
};

const conditionTextIconMap = {
  sunny: { icon: "IconSun", type: "sun" },
  clear: { icon: "IconMoon", type: "moon" },
  "partly cloudy": { icon: "IconCloud", type: "cloud" },
  cloudy: { icon: "IconCloud", type: "cloud" },
  overcast: { icon: "IconCloud", type: "cloud" },

  mist: { icon: "IconMist", type: "mist" },
  fog: { icon: "IconFog", type: "fog" },
  "freezing fog": { icon: "IconFog", type: "fog" },

  "patchy rain possible": { icon: "IconCloudRain", type: "rain" },
  "light rain": { icon: "IconCloudRain", type: "rain" },
  "light rain shower": { icon: "IconCloudRain", type: "rain" },
  "moderate rain": { icon: "IconCloudRain", type: "rain" },
  "heavy rain": { icon: "IconCloudRain", type: "rain" },
  "torrential rain": { icon: "IconCloudRain", type: "rain" },

  "patchy snow possible": { icon: "IconSnowflake", type: "snow" },
  "light snow": { icon: "IconSnowflake", type: "snow" },
  "moderate snow": { icon: "IconSnowflake", type: "snow" },
  "heavy snow": { icon: "IconSnowflake", type: "snow" },

  "patchy rain with thunder": { icon: "IconCloudBolt", type: "thunder" },
  "moderate rain with thunder": { icon: "IconCloudBolt", type: "thunder" },
  "heavy rain with thunder": { icon: "IconCloudBolt", type: "thunder" },
  "snow with thunder": { icon: "IconCloudBolt", type: "thunder" },

  windy: { icon: "IconWind", type: "wind" },

  hot: { icon: "IconTemperature", type: "temperature" },
  cold: { icon: "IconTemperature", type: "temperature" },
};

export const getWeatherIcon = (text, size, isDay = true) => {
  if (!text) return returnIcon("IconSun", size, "sun");

  if (size === "big") console.log(text);

  const normalizedText = text.trim().toLowerCase();
  const mapping = conditionTextIconMap[normalizedText] || {
    icon: isDay ? "IconSun" : "IconMoon",
    type: isDay ? "sun" : "moon",
  };

  return returnIcon(mapping.icon, size, mapping.type);
};

//ESTA FUNCION SE USA PARA COLOREAR EL FONDO DEL TODAY
export const getWeatherColor = (text) => {
  const normalizedText = text.trim().toLowerCase();
  const mapping = conditionTextIconMap[normalizedText] || {
    icon: "IconSun",
    type: "sun",
  };

  return bgColors[mapping.type];
};

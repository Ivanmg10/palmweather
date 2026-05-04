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
  IconCloudSnow,
  IconSunset,
  IconSunrise,
  IconUmbrella,
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
  sunset: "text-orange-300",
  sunrise: "text-yellow-300",
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
  sunset: "bg-gradient-to-r from-orange-300 to-red-400",
  sunrise: "bg-gradient-to-r from-yellow-300 to-orange-400",
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
  IconCloudSnow: IconCloudSnow,
  IconSunset: IconSunset,
  IconSunrise: IconSunrise,
  IconUmbrella: IconUmbrella,
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

const weatherCodeMap = {
  1000: { icon: "IconSun", type: "sun" },
  1003: { icon: "IconCloud", type: "cloud" },
  1006: { icon: "IconCloud", type: "cloud" },
  1009: { icon: "IconCloud", type: "cloud" },
  1030: { icon: "IconMist", type: "mist" },
  1063: { icon: "IconCloudRain", type: "rain" },
  1066: { icon: "IconSnowflake", type: "snow" },
  1069: { icon: "IconCloudSnow", type: "snow" },
  1072: { icon: "IconCloudSnow", type: "snow" },
  1087: { icon: "IconCloudBolt", type: "thunder" },
  1114: { icon: "IconWind", type: "wind" },
  1117: { icon: "IconSnowflake", type: "snow" },
  1135: { icon: "IconCloudFog", type: "fog" },
  1147: { icon: "IconCloudFog", type: "fog" },
  1150: { icon: "IconCloudRain", type: "rain" },
  1153: { icon: "IconCloudRain", type: "rain" },
  1168: { icon: "IconCloudRain", type: "rain" },
  1171: { icon: "IconCloudRain", type: "rain" },
  1180: { icon: "IconCloudRain", type: "rain" },
  1183: { icon: "IconCloudRain", type: "rain" },
  1186: { icon: "IconCloudRain", type: "rain" },
  1189: { icon: "IconCloudRain", type: "rain" },
  1192: { icon: "IconCloudRain", type: "rain" },
  1195: { icon: "IconCloudRain", type: "rain" },
  1198: { icon: "IconCloudRain", type: "rain" },
  1201: { icon: "IconCloudRain", type: "rain" },
  1204: { icon: "IconCloudSnow", type: "snow" },
  1207: { icon: "IconCloudSnow", type: "snow" },
  1210: { icon: "IconSnowflake", type: "snow" },
  1213: { icon: "IconSnowflake", type: "snow" },
  1216: { icon: "IconSnowflake", type: "snow" },
  1219: { icon: "IconSnowflake", type: "snow" },
  1222: { icon: "IconSnowflake", type: "snow" },
  1225: { icon: "IconSnowflake", type: "snow" },
  1237: { icon: "IconCloudSnow", type: "snow" },
  1240: { icon: "IconCloudRain", type: "rain" },
  1243: { icon: "IconCloudRain", type: "rain" },
  1246: { icon: "IconCloudRain", type: "rain" },
  1249: { icon: "IconCloudSnow", type: "snow" },
  1252: { icon: "IconCloudSnow", type: "snow" },
  1255: { icon: "IconCloudSnow", type: "snow" },
  1258: { icon: "IconCloudSnow", type: "snow" },
  1261: { icon: "IconCloudSnow", type: "snow" },
  1264: { icon: "IconCloudSnow", type: "snow" },
  1273: { icon: "IconCloudBolt", type: "thunder" },
  1276: { icon: "IconCloudBolt", type: "thunder" },
  1279: { icon: "IconCloudBolt", type: "thunder" },
  1282: { icon: "IconCloudBolt", type: "thunder" },
};

export const getWeatherIcon = (text, size, isDay = true, code) => {
  if (!text && !code) return returnIcon("IconSun", size, "sun");

  if (code && weatherCodeMap[code]) {
    const mapping = weatherCodeMap[code];
    if (!isDay) {
      if (mapping.type === "sun") {
        return returnIcon("IconMoon", size, "moon");
      }
      return returnIcon(mapping.icon, size, mapping.type);
    }
    return returnIcon(mapping.icon, size, mapping.type);
  }

  const fallbackType = isDay ? "sun" : "moon";
  const fallbackIcon = isDay ? "IconSun" : "IconMoon";

  return returnIcon(fallbackIcon, size, fallbackType);
};

export const getWeatherColor = (text, code, isDay = true) => {
  if (code && weatherCodeMap[code]) {
    const mapping = weatherCodeMap[code];
    if (!isDay && mapping.type === "sun") {
      return "bg-gradient-to-r from-blue-900 to-blue-800";
    }
    return bgColors[mapping.type] || bgColors.default;
  }

  return isDay ? bgColors.default : "bg-gradient-to-r from-blue-900 to-blue-800";
};

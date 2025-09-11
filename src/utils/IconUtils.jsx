import {
  IconMist,
  IconSnowflake,
  IconCloudBolt,
  IconCloud,
  IconSun,
  IconCloudRain,
  IconMoon,
} from "@tabler/icons-react";
// import { getHour } from "./DateUtils";

export const returnIcon = (icon, size) => {
  const conditionSize =
    size === "big" ? "w-10 sm:w-20 h-10 sm:h-20" : "w-6 h-6 sm:w-8 sm:h-8";

  switch (icon) {
    case "IconMist":
      return (
        <IconMist stroke={2} className={` text-blue-100 ${conditionSize} `} />
      );
    case "IconSnowflake":
      return (
        <IconSnowflake
          stroke={2}
          className={` text-blue-200 ${conditionSize} `}
        />
      );
    case "IconCloudBolt":
      return (
        <IconCloudBolt
          stroke={2}
          className={` text-yellow-200 ${conditionSize} `}
        />
      );
    case "IconCloud":
      return (
        <IconCloud stroke={2} className={` text-blue-200 ${conditionSize} `} />
      );
    case "IconSun":
      return (
        <IconSun stroke={2} className={` text-amber-200 ${conditionSize} `} />
      );
    case "IconCloudRain":
      return (
        <IconCloudRain
          stroke={2}
          className={` text-blue-300 ${conditionSize} `}
        />
      );
    case "IconMoon":
      return (
        <IconMoon stroke={2} className={` text-blue-300 ${conditionSize} `} />
      );
    default:
      return (
        <IconSun stroke={2} className={` text-yellow-200 ${conditionSize} `} />
      );
  }
};

// const isNight = (code, date) => {
//   if (getHour(date) > "24" && getHour(date) < "7") {
//     return 1009;
//   } else 1000;
// };

// Mapa de códigos
// const conditionIconMap = {
//   1000: "IconSun", // Soleado
//   1003: "IconCloud", // Parcialmente nublado
//   1006: "IconCloud", // Nublado
//   1009: "IconCloud", // Cubierto
//   1030: "IconMist", // Neblina
//   1135: "IconMist", // Niebla
//   1147: "IconMist", // Niebla helada
//   1063: "IconCloudRain", // Lluvia ligera
//   1183: "IconCloudRain",
//   1186: "IconCloudRain",
//   1189: "IconCloudRain",
//   1192: "IconCloudRain",
//   1195: "IconCloudRain",
//   1240: "IconCloudRain",
//   1243: "IconCloudRain",
//   1246: "IconCloudRain",
//   1066: "IconSnowflake", // Nieve
//   1210: "IconSnowflake",
//   1213: "IconSnowflake",
//   1216: "IconSnowflake",
//   1219: "IconSnowflake",
//   1222: "IconSnowflake",
//   1225: "IconSnowflake",
//   1255: "IconSnowflake",
//   1258: "IconSnowflake",
//   1282: "IconSnowflake",
//   1087: "IconCloudBolt", // Tormentas
//   1273: "IconCloudBolt",
//   1276: "IconCloudBolt",
//   1279: "IconCloudBolt",
//   395: "IconCloudBolt",
// };

//prettier-ignore
const conditionTextIconMap = {
  "sunny": "IconSun",
  "clear": "IconMoon",
  "partly cloudy": "IconCloud",
  "cloudy": "IconCloud",
  "overcast": "IconCloud",
  "mist": "IconHaze",
  "patchy rain possible": "IconCloudRain",
  "patchy rain nearby": "IconCloudRain",
  "light drizzle": "IconCloudRain",
  "patchy light drizzle": "IconCloudRain",
  "patchy freezing drizzle possible": "IconCloudRain",
  "moderate rain": "IconCloudRain",
  "moderate rain at times": "IconCloudRain",
  "heavy rain": "IconCloudRain",
  "heavy rain at times": "IconCloudRain",
  "light freezing rain": "IconCloudRain",
  "moderate or heavy freezing rain": "IconCloudRain",
  "light sleet": "IconCloudRain",
  "moderate or heavy sleet": "IconCloudRain",
  "light sleet showers": "IconCloudRain",
  "moderate or heavy sleet showers": "IconCloudRain",
  "patchy snow possible": "IconSnowflake",
  "light snow": "IconSnowflake",
  "patchy light snow": "IconSnowflake",
  "patchy moderate snow": "IconSnowflake",
  "moderate snow": "IconSnowflake",
  "patchy heavy snow": "IconSnowflake",
  "heavy snow": "IconSnowflake",
  "light snow showers": "IconSnowflake",
  "moderate or heavy snow showers": "IconSnowflake",
  "light showers of ice pellets": "IconSnowflake",
  "moderate or heavy showers of ice pellets": "IconSnowflake",
  "patchy light rain with thunder": "IconCloudBolt",
  "moderate or heavy rain with thunder": "IconCloudBolt",
  "patchy light snow with thunder": "IconCloudBolt",
  "moderate or heavy snow with thunder": "IconCloudBolt",
  "thundery outbreaks possible": "IconCloudBolt",
  "blowing snow": "IconSnowflake",
  "blizzard": "IconSnowflake",
  "fog": "IconHaze",
  "freezing fog": "IconHaze",
  "light rain": "IconCloudRain",
  "light rain shower": "IconCloudRain",
  "moderate or heavy rain shower": "IconCloudRain",
  "torrential rain shower": "IconCloudRain",
  "ice pellets": "IconSnowflake"
};

export const getWeatherIcon = (text, size) => {
  const normalizedText = text && text.trim().toLowerCase();

  const icon = conditionTextIconMap[normalizedText] || IconSun;

  return returnIcon(icon, size);
};

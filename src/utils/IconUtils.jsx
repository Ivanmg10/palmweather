import {
  IconHaze,
  IconSnowflake,
  IconCloudBolt,
  IconCloud,
  IconSun,
  IconCloudRain,
} from "@tabler/icons-react";
// import { getHour } from "./DateUtils";

export const returnIcon = (icon, size) => {
  const conditionSize = size === "big" ? "w-20 h-20" : "w-8 h-8";

  switch (icon) {
    case "IconHaze":
      return (
        <IconHaze stroke={2} className={` text-cyan-200 ${conditionSize} `} />
      );
    case "'IconSnowflake'":
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
const conditionIconMap = {
  1000: "IconSun", // Soleado
  1003: "IconCloud", // Parcialmente nublado
  1006: "IconCloud", // Nublado
  1009: "IconCloud", // Cubierto
  1030: "IconHaze", // Neblina
  1135: "IconHaze", // Niebla
  1147: "IconHaze", // Niebla helada
  1063: "IconCloudRain", // Lluvia ligera
  1183: "IconCloudRain",
  1186: "IconCloudRain",
  1189: "IconCloudRain",
  1192: "IconCloudRain",
  1195: "IconCloudRain",
  1240: "IconCloudRain",
  1243: "IconCloudRain",
  1246: "IconCloudRain",
  1066: "IconSnowflake", // Nieve
  1210: "IconSnowflake",
  1213: "IconSnowflake",
  1216: "IconSnowflake",
  1219: "IconSnowflake",
  1222: "IconSnowflake",
  1225: "IconSnowflake",
  1255: "IconSnowflake",
  1258: "IconSnowflake",
  1282: "IconSnowflake",
  1087: "IconCloudBolt", // Tormentas
  1273: "IconCloudBolt",
  1276: "IconCloudBolt",
  1279: "IconCloudBolt",
  395: "IconCloudBolt",
};

export const getWeatherIcon = (code, size) => {
  const Icon = conditionIconMap[code] || IconSun;
  return returnIcon(Icon, size);
};

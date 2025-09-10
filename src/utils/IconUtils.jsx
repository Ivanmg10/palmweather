import {
  IconHaze,
  IconSnowflake,
  IconCloudBolt,
  IconCloud,
  IconSun,
  IconCloudRain,
} from "@tabler/icons-react";

export const returnIcon = (icon, size) => {
  const conditionSize = size === "big" ? "w-20 h-20" : "w-8 h-8";

  switch (icon) {
    case "IconHaze":
      return (
        <IconHaze stroke={2} className={` text-cyan-200 ${conditionSize} `} />
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
    default:
      return (
        <IconSun stroke={2} className={` text-yellow-200 ${conditionSize} `} />
      );
  }
};

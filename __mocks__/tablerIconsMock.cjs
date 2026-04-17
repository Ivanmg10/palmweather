const React = require("react");

const createIcon = (name) => {
  const Icon = ({ className, stroke, ...props }) =>
    React.createElement("svg", { "data-testid": name, className, ...props });
  Icon.displayName = name;
  return Icon;
};

module.exports = {
  IconMist: createIcon("IconMist"),
  IconCloudFog: createIcon("IconCloudFog"),
  IconSnowflake: createIcon("IconSnowflake"),
  IconCloudBolt: createIcon("IconCloudBolt"),
  IconCloud: createIcon("IconCloud"),
  IconSun: createIcon("IconSun"),
  IconCloudRain: createIcon("IconCloudRain"),
  IconMoon: createIcon("IconMoon"),
  IconWind: createIcon("IconWind"),
  IconTemperature: createIcon("IconTemperature"),
};

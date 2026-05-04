import { motion } from "framer-motion";
import { getWeatherColor, getWeatherIcon } from "../../utils/IconUtils";
import { IconWind, IconDroplet, IconEye, IconSun, IconCloud, IconThermometer, IconTemperature } from "@tabler/icons-react";

const InfoItem = (props) => {
  const IconComp = props.icon;
  return (
    <div className="flex items-center gap-2 p-2 sm:p-3 h-full">
      <IconComp size={20} className="flex-shrink-0" />
      <div className="flex flex-col">
        <span className="text-xs sm:text-sm opacity-70">{props.label}</span>
        <span className="text-sm sm:text-base font-semibold">{props.value}</span>
      </div>
    </div>
  );
};

const RainEffect = () => (
  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 bg-blue-300/60 rounded-full"
        style={{
          left: `${8 + i * 15}%`,
          height: '25px',
        }}
        animate={{
          y: [0, 150, 300],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeIn",
        }}
      />
    ))}
  </div>
);

const StormEffect = () => (
  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
    {/* Heavy rain */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5 bg-blue-200/70 rounded-full"
        style={{
          left: `${5 + i * 10}%`,
          height: '35px',
        }}
        animate={{
          y: [0, 180, 350],
          opacity: [0, 0.7, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeIn",
        }}
      />
    ))}
    {/* Rayos sutil */}
    <motion.div
      className="absolute inset-0 bg-white/5"
      animate={{
        opacity: [0, 0.2, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
    <motion.div
      className="absolute top-12 right-16 text-yellow-400/60 text-xl"
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.9, 1.1, 0.9],
      }}
      transition={{
        duration: 0.15,
        repeat: Infinity,
        repeatDelay: 4,
      }}
    >
      ⚡
    </motion.div>
  </div>
);

const SunGlow = () => (
  <motion.div
    className="absolute -top-4 -right-4 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.4, 0.6, 0.4],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const CloudFloat = () => (
  <>
    <motion.div
      className="absolute top-6 left-1/4 w-20 h-10 bg-white/30 rounded-full blur-md"
      animate={{
        x: [0, 30, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-12 right-1/3 w-16 h-8 bg-white/25 rounded-full blur-md"
      animate={{
        x: [0, -20, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />
  </>
);

const MoonEffect = () => (
  <>
    <motion.div
      className="absolute -top-2 -right-8 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-8 right-12 w-16 h-16 bg-blue-100/40 rounded-full blur-lg"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
    />
  </>
);

const SnowEffect = () => (
  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
        style={{
          left: `${15 + i * 14}%`,
        }}
        animate={{
          y: [0, 80, 160],
          x: [0, Math.sin(i) * 20, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

const getWeatherEffect = (code, isDay) => {
  if (!code) return null;
  
  const stormCodes = [1087, 1273, 1276, 1279, 1282];
  const rainCodes = [1063, 1066, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1204, 1207, 1240, 1243, 1246, 1249, 1252];
  const snowCodes = [1066, 1069, 1072, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264, 1279, 1282];
  const sunCodes = [1000];
  const cloudCodes = [1003, 1006, 1009];

  if (stormCodes.includes(code)) return 'storm';
  if (rainCodes.includes(code)) return 'rain';
  if (snowCodes.includes(code)) return isDay ? 'snow' : 'snow';
  if (sunCodes.includes(code)) return isDay ? 'sun' : 'moon';
  if (cloudCodes.includes(code)) return isDay ? 'cloud' : 'cloud';
  return null;
};

export default function Today({ data, isDark: _isDark = true }) {
  const isDay = data.current.is_day === 1;
  const bgColor = getWeatherColor(data.current.condition.text, data.current.condition.code, isDay);
  const alerts = data.alerts?.alert || [];
  const weatherEffect = getWeatherEffect(data.current.condition.code, isDay);

  const getEffect = () => {
    switch (weatherEffect) {
      case 'storm': return <StormEffect />;
      case 'rain': return <RainEffect />;
      case 'snow': return <SnowEffect />;
      case 'sun': return <SunGlow />;
      case 'moon': return <MoonEffect />;
      case 'cloud': return <CloudFloat />;
      default: return null;
    }
  };

  return (
    <>
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="m-2 sm:m-5 w-full"
        >
          {alerts.map((alert, index) => (
            <div key={index} className="bg-red-500/90 text-white p-4 rounded-2xl mb-2">
              <p className="font-bold">{alert.headline}</p>
              <p className="text-sm">{alert.desc}</p>
            </div>
          ))}
        </motion.div>
      )}

      <motion.div
        id="main-weather"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative flex flex-col 2xl:flex-row p-6 rounded-3xl w-full h-full gap-6 text-black ${bgColor}`}
      >
        {getEffect()}
        
        <div className="flex flex-col items-center justify-center flex-1 relative z-10">
          <p className="text-xl sm:text-2xl font-semibold mb-3">{data.location.name}, {data.location.country}</p>
          
          <div className="flex items-center gap-4">
            <div className="scale-125 sm:scale-150">
              {getWeatherIcon(data.current.condition.text, "big", isDay, data.current.condition.code)}
            </div>
            <div className="flex flex-col items-start">
              <p className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-none">
                {Math.round(data.current.temp_c)}°
              </p>
              <p className="text-base sm:text-lg font-medium capitalize mt-1">{data.current.condition.text}</p>
            </div>
          </div>

          <div id="high-lows" className="flex gap-6 mt-4 font-medium">
            <span className="flex items-center gap-1">
              <IconSun size={18} />
              H: {Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°
            </span>
            <span className="flex items-center gap-1">
              <IconTemperature size={18} />
              L: {Math.round(data.forecast.forecastday[0].day.mintemp_c)}°
            </span>
          </div>
        </div>

        <div className="w-full 2xl:w-1/2 h-full flex flex-col relative z-10">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 h-full content-center items-center justify-items-center">
            <InfoItem icon={IconWind} label="Wind" value={`${data.current.wind_kph} km/h`} />
            <InfoItem icon={IconDroplet} label="Humidity" value={`${data.current.humidity}%`} />
            <InfoItem icon={IconEye} label="Visibility" value={`${data.current.vis_miles} mi`} />
            <InfoItem icon={IconSun} label="UV Index" value={data.current.uv} />
            <InfoItem icon={IconThermometer} label="Feels Like" value={`${Math.round(data.current.feelslike_c)}°C`} />
            <InfoItem icon={IconCloud} label="Cloud" value={`${data.current.cloud}%`} />
          </div>
        </div>
      </motion.div>
    </>
  );
}
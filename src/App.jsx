import { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
import Forecast from "./components/forecast/forecast.jsx";
import Temperature from "./components/temperature/temperature.jsx";
import Today from "./components/today/today.jsx";
import Loading from "./pages/Loading.jsx";
import Error from "./pages/Error.jsx";
import { useLocationName } from "./hooks/useLocationName.jsx";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "framer-motion";

const TemperatureChart = lazy(() => import("./components/temperatureChart/temperatureChart.jsx"));
const RainChart = lazy(() => import("./components/rainChart/rainChart.jsx"));
const WindHumidityChart = lazy(() => import("./components/windHumidityChart/windHumidityChart.jsx"));

const ChartSkeleton = ({ isDark }) => (
  <div className={`m-2 sm:m-5 p-3 sm:p-4 rounded-3xl w-full h-56 sm:h-64 lg:h-72 animate-pulse ${isDark ? 'bg-[#1e1e1e]' : 'bg-gray-200'}`}>
    <div className={`h-6 w-48 rounded mb-4 ${isDark ? 'bg-white/10' : 'bg-gray-300'}`}></div>
    <div className={`h-full rounded ${isDark ? 'bg-white/5' : 'bg-gray-200'}`}></div>
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [locationName, setLocationName] = useState("Oviedo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { location, isLoading, locationError } = useLocationName({ setError });

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const isDark = darkMode;

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (location && location !== "Loading location...") {
      setLocationName(location);
    }
  }, [location]);

  useEffect(() => {
    if (isLoading) return;

    const fetchData = (api) => {
      fetch(
        `https://api.weatherapi.com/v1/${api}?key=${API_KEY}&q=${locationName}&aqi=no&days=7`
      )
        .then((res) => res.json())
        .then((data) => {
          setData((prev) => ({ ...prev, ...data }));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };

    fetchData("forecast.json");
  }, [locationName, isLoading]);

  if (error) return <Error locationError={locationError} />;
  if (loading) return <Loading />;

  return (
    <main className={`min-h-screen flex flex-col justify-start items-center p-4 sm:p-6 lg:p-10 pt-16 sm:pt-20 lg:pt-24 ${isDark ? 'bg-[#121212]' : 'bg-gray-100'} transition-colors duration-300`} role="main" aria-label="Weather forecast">
      {/* Dark Mode Toggle */}
      <motion.button
        onClick={() => setDarkMode(!isDark)}
        className={`fixed top-4 right-4 z-50 p-2 sm:p-3 rounded-full ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <IconSun size={20} className="sm:size-6 text-yellow-400" />
        ) : (
          <IconMoon size={20} className="sm:size-6 text-gray-700" />
        )}
      </motion.button>

      <div className={`w-full max-w-7xl xl:max-w-[90rem] flex flex-col justify-center items-center gap-4 sm:gap-6`}>
        <div className="flex flex-col xl:flex-row w-full items-stretch gap-4 xl:gap-8">
          <div className="flex-1 min-w-0 w-full flex">
            <Today data={data} isDark={isDark} />
          </div>
          <div className="flex-1 min-w-0 w-full flex">
            <Forecast data={data} setLocation={setLocationName} isDark={isDark} />
          </div>
        </div>
        
        <Temperature data={data} isDark={isDark} />
        
        <Suspense fallback={<ChartSkeleton isDark={isDark} />}>
          <TemperatureChart data={data} isDark={isDark} />
        </Suspense>
        
        <Suspense fallback={<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full"><ChartSkeleton isDark={isDark} /><ChartSkeleton isDark={isDark} /></div>}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full px-2 sm:px-0">
            <RainChart data={data} isDark={isDark} />
            <WindHumidityChart data={data} isDark={isDark} />
          </div>
        </Suspense>
      </div>
    </main>
  );
}

export default App;
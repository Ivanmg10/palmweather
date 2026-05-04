import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getWeatherIcon } from "../../utils/IconUtils";
import { IconSearch, IconMapPin } from "@tabler/icons-react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function Forecast({ data, setLocation, isDark = true }) {
  const [forecast, setForecast] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchTimeout = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setInputValue(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (value.trim().length < 1) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    searchTimeout.current = setTimeout(() => {
      fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}&num=5`)
        .then((res) => res.json())
        .then((results) => {
          setSearchResults(results || []);
          setShowDropdown(true);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 300);
  };

  const selectLocation = (name, _country) => {
    setLocation(name);
    setInputValue("");
    setShowDropdown(false);
    setSearchResults([]);
  };

  const getWeekday = (dateString) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const daysMin = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const dayIndex = date.getDay();
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return daysMin[dayIndex];
    }
    return days[dayIndex];
  };

  useEffect(() => {
    if (!data?.forecast?.forecastday) return;
    const forecastArray = data.forecast.forecastday.map((day, index) => ({
      id: index,
      day: getWeekday(day.date),
      max: Math.round(day.day.maxtemp_c),
      low: Math.round(day.day.mintemp_c),
      text: day.day.condition.text,
      code: day.day.condition.code,
      chance: day.day.daily_chance_of_rain,
    }));
    setForecast(forecastArray);
  }, [data]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setLocation(inputValue.trim());
      setInputValue("");
    }
  };

  const containerBg = isDark ? "bg-[#1e1e1e]" : "bg-white";
  const textWhite = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-white/60" : "text-gray-500";
  const inputBg = isDark ? "bg-white/10" : "bg-gray-100";
  const placeholderColor = isDark ? "placeholder-white/50" : "placeholder-gray-400";

  return (
    <section id="10-day-forecast" aria-label="7-day forecast" className={`flex flex-col p-4 w-full rounded-3xl h-full ${containerBg}`}>
      <div className="relative mb-4" ref={dropdownRef}>
        <label htmlFor="city-search" className="sr-only">Search city</label>
        <IconSearch size={20} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} aria-hidden="true" />
        <input
          id="city-search"
          type="text"
          placeholder="Search city..."
          value={inputValue}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
          className={`w-full pl-10 pr-4 py-3 ${textWhite} ${inputBg} rounded-xl focus:outline-none ${placeholderColor}`}
          aria-label="Search city to view weather"
          autoComplete="off"
        />
        <AnimatePresence>
          {showDropdown && (searchResults.length > 0 || loading) && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute z-50 w-full mt-2 rounded-xl overflow-hidden shadow-lg ${
                isDark ? 'bg-[#2a2a2a]' : 'bg-white border border-gray-200'
              }`}
              role="listbox"
            >
              {loading && (
                <li className={`px-4 py-3 ${textMuted} text-sm`}>Searching...</li>
              )}
              {searchResults.map((result) => (
                <li
                  key={`${result.lat}-${result.lon}`}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => selectLocation(result.name, result.country)}
                  role="option"
                >
                  <IconMapPin size={16} className={textMuted} />
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${textWhite}`}>{result.name}</p>
                    <p className={`text-xs ${textMuted}`}>{result.country}</p>
                  </div>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2" role="list" aria-label="Daily forecast">
        {forecast.map((day, index) => (
          <motion.div
            key={day.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center justify-between py-2 sm:py-3 px-2 rounded-lg hover:${isDark ? 'bg-white/5' : 'bg-gray-100'} transition-colors`}
            role="listitem"
          >
            <div className="w-1/4 min-w-[60px]">
              <p className={`font-medium text-sm sm:text-base ${textWhite}`}>
                {index === 0 ? "Today" : day.day}
              </p>
              {day.chance > 0 && (
                <p className="text-xs text-blue-500">{day.chance}% rain</p>
              )}
            </div>

            <div className="w-1/4 flex justify-center" aria-hidden="true">
              {getWeatherIcon(day.text, "small", true, day.code)}
            </div>

            <div className="w-2/4 flex items-center justify-end gap-2 sm:gap-3">
              <span className={`min-w-6 sm:min-w-8 text-right text-sm ${textMuted}`}>{day.low}°</span>
              <div className={`w-16 sm:w-20 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/20' : 'bg-gray-300'}`}>
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full"
                  style={{
                    width: `${((day.max - day.low) / 40) * 100}%`,
                    marginLeft: `${((day.low + 10) / 50) * 100}%`,
                  }}
                />
              </div>
              <span className="text-white font-medium min-w-6 sm:min-w-8 text-sm">{day.max}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from 'framer-motion'
import { getHour } from '../../utils/DateUtils'
import { getWeatherIcon } from '../../utils/IconUtils'

export default function Temperature({ data, isDark = true }) {
  const hours = data.forecast.forecastday[0].hour
  const nextDayHours = data.forecast.forecastday[1].hour

  function buildNext24Hours(hours, nextDayHours) {
    const now = new Date()
    const currentHour = now.getHours()

    const startIndex = hours.findIndex((h) => {
      const hourFromData = new Date(h.time.replace(' ', 'T')).getHours()
      return hourFromData === currentHour
    })

    const todaySlice = hours.slice(startIndex)
    const remaining = 24 - todaySlice.length
    const nextSlice = nextDayHours.slice(0, remaining)

    return [...todaySlice, ...nextSlice]
  }

  return (
    <motion.div
      id="hour-temperature"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={`sm:m-5 m-2 flex flex-row flex-nowrap overflow-x-auto justify-around gap-1 py-6 rounded-3xl w-full relative ${isDark ? 'bg-[#1e1e1e]' : 'bg-white'}`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <style>{`
        #hour-temperature::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l pointer-events-none opacity-50"></div>
      {buildNext24Hours(hours, nextDayHours).map((hour, index) => {
        return (
          <motion.div
            className="w-1/6 flex-shrink-0 flex flex-col items-center gap-3 ml-4 sm:ml-0"
            key={hour.time}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
          >
            <p className={`text-1xl ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
              {index === 0 ? 'Now' : getHour(hour.time)}
            </p>
            {getWeatherIcon(hour.condition.text, 'small', hour.is_day === 1, hour.condition.code)}
            <p
              className={`text-1xl sm:text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              {Math.round(hour.temp_c)} °
            </p>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

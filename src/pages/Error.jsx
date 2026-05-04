import { motion } from "framer-motion";
import { IconAlertTriangle, IconRefresh, IconHome } from "@tabler/icons-react";

export default function Error({ locationError }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1e1e1e] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <IconAlertTriangle size={80} className="text-red-500" />
        </motion.div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
          <p className="text-lg text-white/70 max-w-md">
            {locationError || "Unable to load weather data"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition-colors"
          >
            <IconRefresh size={20} />
            Try Again
          </button>
          
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
          >
            <IconHome size={20} />
            Go Home
          </button>
        </div>

        <p className="text-sm text-white/40 mt-6">
          Tip: Check your internet connection or try a different location
        </p>
      </motion.div>
    </div>
  );
}
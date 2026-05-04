import { motion } from "framer-motion";
import { IconCloud, IconSun, IconCloudRain, IconCloudSnow, IconCloudBolt } from "@tabler/icons-react";

const icons = [
  { Sun: IconSun, anim: "colorSun" },
  { Cloud: IconCloud, anim: "colorCloud" },
  { Rain: IconCloudRain, anim: "colorRain" },
  { Snow: IconCloudSnow, anim: "colorSnow" },
  { Bolt: IconCloudBolt, anim: "colorBolt" },
];

const keyframes = `
  @keyframes colorSun { 0%, 100% { color: #fcd34d; } 50% { color: #f97316; } }
  @keyframes colorCloud { 0%, 100% { color: #d1d5db; } 50% { color: #6b7280; } }
  @keyframes colorRain { 0%, 100% { color: #93c5fd; } 50% { color: #3b82f6; } }
  @keyframes colorSnow { 0%, 100% { color: #a5f3fc; } 50% { color: #ffffff; } }
  @keyframes colorBolt { 0%, 100% { color: #fef08a; } 50% { color: #eab308; } }
`;

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1e1e1e]" role="status" aria-label="Loading weather data">
      <style>{keyframes}</style>
      <div className="flex flex-col items-center gap-8">
        <div className="flex gap-4" role="group" aria-label="Animated weather icons">
          {icons.map((item, index) => {
            const IconComponent = Object.values(item)[0];
            const anim = item.anim;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0.3, y: 0 }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className="relative"
              aria-hidden="true"
            >
              <IconComponent size={40} className="transition-all" style={{ animation: `${anim} 3s ease-in-out infinite`, animationDelay: `${index * 0.2}s` }} />
            </motion.div>
          );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.p 
            className="text-2xl font-light text-white"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Finding your location
          </motion.p>
          <motion.p 
            className="text-sm text-white/50"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Getting weather data...
          </motion.p>
        </motion.div>

        <div className="flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-yellow-400 rounded-full"
              animate={{ scale: [0.5, 1.5, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
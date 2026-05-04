import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["cloudIcon.svg"],
      manifest: {
        name: "PalmWeather",
        short_name: "Weather",
        description: "Weather app with forecast",
        theme_color: "#1e1e1e",
        background_color: "#1e1e1e",
        display: "standalone",
        icons: [
          {
            src: "cloudIcon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.weatherapi\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "weather-api-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "geolocation-cache",
              expiration: {
                maxEntries: 5,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
});

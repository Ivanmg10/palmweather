// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), tailwindcss(), eslint()],
  server: {
    host: true, // equivalente a --host
    port: 5173, // opcional, puedes definir tu puerto
  },
});

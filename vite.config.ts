import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // With VITE_API_URL=/ the dev site talks to the Express API (npm run dev:all) without CORS.
    proxy: { "/api": "http://localhost:3001" },
  },
});

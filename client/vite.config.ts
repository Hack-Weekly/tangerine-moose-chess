import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// vite.config.ts
import Terminal from "vite-plugin-terminal";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Terminal()],
});

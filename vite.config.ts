import path from "path";
import px2rem from "postcss-plugin-px2rem";
import postcssPresetEnv from "postcss-preset-env";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tailwindConfig from "./tailwind.config.js";
import AutoImport from "unplugin-auto-import/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      dirs: ["components"],
      include: [/\.vue$/, /\.md$/],
      resolvers: [ArcoResolver({ sideEffect: true })],
    }),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));

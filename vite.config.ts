import path from "path";
import px2rem from "postcss-plugin-px2rem";
import postcssPresetEnv from "postcss-preset-env";
import tailwindcss from "tailwindcss";
import { BuildOptions, defineConfig } from "vite";
import tailwindConfig from "./tailwind.config.js";
import AutoImport from "unplugin-auto-import/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import { vitePluginForArco } from "@arco-plugins/vite-vue";
import legacy from '@vitejs/plugin-legacy';

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
    vitePluginForArco({
      style: "css",
    }),
    legacy({
      targets: [
        'Android >= 39',
        'Chrome >= 50',
        'Safari >= 10.1',
        'iOS >= 10.3',
        '> 1%',
      ],
    }),
  ],
  build: {
    minify: "terser",
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    terserOptions: {
      toplevel: true,
      safari10: false,
    },
  } as BuildOptions,
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(),
        px2rem({
          rootValue: 16,
          propBlackList: ["font-size", "border", "border-width"],
          exclude: /(node_module)/,
        }),
        tailwindcss(tailwindConfig),
      ],
    },
  },
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

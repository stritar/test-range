// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/assets/favicon/*", dest: "favicon" },
      ],
    }),
  ],
  base: "/test-range/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        playground: resolve(__dirname, "playground.html"),
        isolation: resolve(__dirname, "isolation.html"),
      },
    },
  },
});


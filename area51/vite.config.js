// vite.config.js
import { defineConfig } from "vite";
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
  server: {
    historyApiFallback: true,
  },
});


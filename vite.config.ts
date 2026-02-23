import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

function svgCurrentColor(): Plugin {
  return {
    name: "svg-currentcolor",
    transform(code, id) {
      if (!id.endsWith(".svg") || !id.includes("assets/icons")) return;
      return {
        code: code.replace(/fill="(?!none")[^"]*"/g, 'fill="currentColor"'),
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), svgCurrentColor()],
});

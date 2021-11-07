import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  base: "/hn-solid/",
});

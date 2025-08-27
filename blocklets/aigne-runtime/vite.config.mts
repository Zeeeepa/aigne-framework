import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createBlockletPlugin } from "vite-plugin-blocklet";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
      },
    },
    optimizeDeps: {
      exclude: ["sqlocal"],
    },
    worker: {
      format: "es" as const,
    },
    plugins: [react(), createBlockletPlugin(), svgr()],
    build: {
      cssCodeSplit: false,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-common": [
              "react",
              "react-dom",
              "react-router-dom",
              "@mui/material",
              "@mui/icons-material",
              "ufo",
              "axios",
            ],
            "vendor-markdwon": ["@uiw/react-markdown-preview"],
            "vendor-ux": ["@arcblock/ux"],
          },
        },
      },
    },
    resolve: {
      dedupe: ["@mui/material", "@mui/icons-material", "react", "react-dom"],
    },
  };
});

import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "css-template-components",
      fileName: (format) => `index.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "vue"],
      input: {
        server: resolve(__dirname, "src/server/index.ts"),
        client: resolve(__dirname, "src/client/index.ts"),
      },
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        inlineDynamicImports: false,
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts()],
  resolve: { preserveSymlinks: true },
});

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         server: resolve(__dirname, "./src/server/index.ts"),
//         client: resolve(__dirname, "./src/client/index.ts"),
//       },
//       output: {
//         preserveModules: false,
//       },
//     },
//   },
// });

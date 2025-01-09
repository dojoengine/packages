import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [TanStackRouterVite(), react(), wasm()],
    build: { target: "esnext" },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});

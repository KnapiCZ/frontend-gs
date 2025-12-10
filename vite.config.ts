import { defineConfig } from "vite"
import path from "path"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Explicitly set NODE_ENV based on mode
    process.env.NODE_ENV = mode
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        test: {
            globals: true,
            environment: "jsdom",
        },
    }
})

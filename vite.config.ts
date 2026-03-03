import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config: any = {
    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: [".", "./client", "./shared"],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
      },
    },
    build: {
      outDir: "dist/spa",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
  };

  // Only add server plugin in development mode
  if (command === "serve") {
    config.plugins = [react(), expressPlugin()];
  } else {
    // Production build: only client plugins
    config.plugins = [react()];
  }

  return config;
});

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    async configureServer(server) {
      // Lazy-load the server module only during development
      const { createServer } = await import("./server");
      const app = await createServer();
      server.middlewares.use(app);
    },
  };
}

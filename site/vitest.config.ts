import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    maxWorkers: 1,
    pool: "forks",
    setupFiles: ["./tests/setup.ts"],
  },
});

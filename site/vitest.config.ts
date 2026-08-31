import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
      "next/navigation": path.resolve(
        import.meta.dirname,
        "tests/stubs/next-navigation.ts",
      ),
    },
  },
  test: {
    environment: "jsdom",
    maxWorkers: 1,
    pool: "forks",
    setupFiles: ["./tests/setup.ts"],
  },
});

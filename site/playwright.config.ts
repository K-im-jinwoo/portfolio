import { defineConfig } from "@playwright/test";

// A fresh local server serves the built artifact. Never reuse a dev server.
export default defineConfig({
  testDir: "./tests/browser",
  forbidOnly: true,
  retries: 0,
  workers: 2,
  timeout: 45_000,
  globalTimeout: 600_000,
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/browser-report.json" }],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
    colorScheme: "light",
    reducedMotion: "reduce",
    deviceScaleFactor: 1,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    ...[360, 390, 768, 1440].map((width) => ({
      name: `chromium-${width}`,
      testIgnore: "**/boundaries.spec.ts",
      use: { viewport: { width, height: 900 } },
    })),
    {
      name: "chromium-boundaries",
      testMatch: "**/boundaries.spec.ts",
      use: { viewport: { width: 360, height: 900 } },
    },
  ],
  webServer: {
    command: "node node_modules/wrangler/bin/wrangler.js dev --config dist/server/wrangler.json --ip 127.0.0.1 --port 4173 --local --inspector-port 0",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120_000,
    env: {
      WRANGLER_SEND_METRICS: "false",
      WRANGLER_WRITE_LOGS: "false",
      WRANGLER_LOG_PATH: ".wrangler/logs",
      MINIFLARE_REGISTRY_PATH: ".wrangler/registry",
    },
  },
});

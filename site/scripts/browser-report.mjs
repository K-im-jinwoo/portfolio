import { resolve } from "node:path";
import { readFileSync, unlinkSync } from "node:fs";
import { inspectBrowserReport } from "../../automation/gates.mjs";

const reportPath = resolve("test-results/browser-report.json");
if (process.argv[2] === "--prepare") {
  try {
    unlinkSync(reportPath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
} else {
  try {
    const gate = inspectBrowserReport(JSON.parse(readFileSync(reportPath, "utf8")));
    if (!gate.ok) {
      console.error(`Browser gate rejected: ${gate.errors.join(", ")}`);
      process.exitCode = 1;
    } else {
      console.log(`Browser gate passed: ${gate.tests} tests, no skips or retries.`);
    }
  } catch {
    console.error("Browser gate rejected: missing or invalid current-run report.");
    process.exitCode = 1;
  }
}

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("production build runner", () => {
  it("uses the Windows Unicode-path-safe build runner", () => {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
    const runner = readFileSync("scripts/run-vinext-build.mjs", "utf8");

    expect(packageJson.scripts.build).toBe("node scripts/run-vinext-build.mjs");
    expect(runner).toContain("subst");
    expect(runner).toContain("vinext");
  });
});

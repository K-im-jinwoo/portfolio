import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("release privacy and responsive contract", () => {
  it("excludes the private phone number from source content", () => {
    const files = [
      "content/profile.ts",
      "content/projects.ts",
      "app/page.tsx",
      "app/about/page.tsx",
    ];
    const source = files.map((file) => readFileSync(file, "utf8")).join("\n");

    expect(source).not.toMatch(/010[- ]?3515[- ]?6166/);
  });

  it("contains the mobile breakpoint and reduced-motion rule", () => {
    const css = readFileSync("app/globals.css", "utf8");

    expect(css).toContain("@media (max-width: 640px)");
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

function readApplicationSources(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);

    if (entry.isDirectory()) return readApplicationSources(file);
    if (!/\.(?:css|json|svg|ts|tsx)$/.test(entry.name)) return [];

    return [readFileSync(file, "utf8")];
  });
}

describe("release privacy and responsive contract", () => {
  it("excludes the private phone number from source content", () => {
    const source = ["app", "components", "content"]
      .flatMap(readApplicationSources)
      .join("\n");

    expect(source).not.toMatch(/010[- ]?3515[- ]?6166/);
    expect(source).not.toMatch(/github|resume|이력서\s*(?:다운로드|받기)/i);
  });

  it("locks the mobile gutter, stacking, overflow, focus, and motion rules", () => {
    const css = readFileSync("app/globals.css", "utf8");
    const responsiveSources = [
      "app/page.tsx",
      "app/about/page.tsx",
      "components/project-meta.tsx",
      "components/process-steps.tsx",
      "components/project-row.tsx",
    ]
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    expect(css).toContain("@media (max-width: 640px)");
    expect(css).toContain("width: min(calc(100% - 40px), 1120px)");
    expect(css).toContain("overflow-x: clip");
    expect(css).toContain("grid-template-columns: minmax(0, 1fr) !important");
    expect(css).toContain(":focus-visible");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(responsiveSources.match(/mobile-stack/g)).toHaveLength(5);
  });
});

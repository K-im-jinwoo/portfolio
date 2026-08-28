import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("portfolio theme", () => {
  it("defines only the approved palette and Noto Sans KR", () => {
    const sources = [
      "app/globals.css",
      "app/page.tsx",
      "public/favicon.svg",
    ].map((file) => readFileSync(file, "utf8"));
    const css = sources[0];
    const approved = new Set([
      "#FAFAF8",
      "#DADADA",
      "#B0B3B8",
      "#43464B",
      "#0F1012",
    ]);

    for (const hex of approved) {
      expect(css.toUpperCase()).toContain(hex);
    }

    const usedHexColors = sources
      .flatMap((source) => source.match(/#[0-9a-f]{6}/gi) ?? [])
      .map((color) => color.toUpperCase());

    expect(usedHexColors.every((color) => approved.has(color))).toBe(true);
    expect(sources.join("\n")).not.toMatch(
      /(?:bg|text|border)-(?:white|black|slate|gray|zinc|neutral|stone)-?/,
    );
    expect(css).toContain('"Noto Sans KR"');
  });
});

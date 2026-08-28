import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("portfolio theme", () => {
  it("defines only the approved palette and Noto Sans KR", () => {
    const css = readFileSync("app/globals.css", "utf8");

    for (const hex of [
      "#FAFAF8",
      "#DADADA",
      "#B0B3B8",
      "#43464B",
      "#0F1012",
    ]) {
      expect(css.toUpperCase()).toContain(hex);
    }

    expect(css).toContain('"Noto Sans KR"');
  });
});

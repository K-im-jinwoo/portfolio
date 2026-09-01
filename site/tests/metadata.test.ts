import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("root metadata", () => {
  it("defines site-specific Open Graph and X fields", () => {
    const layout = readFileSync("app/layout.tsx", "utf8");

    expect(layout).toContain("김진우 | 업무 자동화 개발자");
    expect(layout).toContain("/og.png");
    expect(layout).toContain("openGraph");
    expect(layout).toContain("twitter");
    expect(layout).toContain("NEXT_PUBLIC_SITE_URL");
    expect(layout).not.toContain('?? "http://localhost:3000"');
  });

  it("keeps the social image at 1200 by 630", () => {
    const image = readFileSync("public/og.png");

    expect(image.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(image.readUInt32BE(16)).toBe(1200);
    expect(image.readUInt32BE(20)).toBe(630);
  });
});

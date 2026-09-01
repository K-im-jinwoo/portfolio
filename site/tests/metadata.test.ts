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

    expect(image.subarray(0, 8)).toEqual(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    );
    expect(image.subarray(12, 16).toString("ascii")).toBe("IHDR");
    expect(image.readUInt32BE(16)).toBe(1200);
    expect(image.readUInt32BE(20)).toBe(630);
  });
});

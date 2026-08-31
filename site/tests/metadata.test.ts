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
});

import { expect, test } from "@playwright/test";
import { assertLayout, layoutProblems, ready } from "./helpers";

for (const width of [639, 640, 641, 767, 769, 1023, 1024, 1025]) {
  test(`breakpoint ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/about", "/projects/wiki-knowledge-system", "/projects/qms-approval-system"]) {
      await page.goto(path);
      await ready(page);
      await assertLayout(page);
    }
  });
}

for (const width of [360, 390, 768, 1440]) {
  test(`long public text ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/projects/wiki-knowledge-system");
    await ready(page);
    await page.locator("h1").evaluate((element) => { element.textContent = "업무 자동화 설계와 검증 결과를 정리한 긴 한국어 프로젝트 제목 ".repeat(5); });
    await page.locator("main p").nth(1).evaluate((element) => { element.textContent = "LongPublicIdentifier".repeat(16); });
    await assertLayout(page);
  });
}

test("detects hidden horizontal clipping even with overflow-x clip", async ({ page }) => {
  await page.goto("/");
  await ready(page);
  await page.locator("h1").evaluate((element) => { element.style.width = "2000px"; element.textContent = "Unbroken".repeat(180); });
  expect((await layoutProblems(page)).length).toBeGreaterThan(0);
});

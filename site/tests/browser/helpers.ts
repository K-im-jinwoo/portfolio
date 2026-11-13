import { expect, type Page } from "@playwright/test";

export async function ready(page: Page) {
  await expect(page.locator("main")).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(async (image) => {
      if (!image.complete) await new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }));
  });
}

export async function layoutProblems(page: Page) {
  return page.evaluate(() => {
    const problems: string[] = [];
    const width = document.documentElement.clientWidth;
    if (document.documentElement.scrollWidth > width + 1) problems.push("page-overflow");
    for (const element of document.querySelectorAll<HTMLElement>("main *, header a, footer a")) {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      if (!rect.width || !rect.height || style.visibility === "hidden" || style.display === "none") continue;
      if (element.classList.contains("sr-only") && rect.width <= 1 && rect.height <= 1 && style.position === "absolute") continue;
      if (rect.left < -1 || rect.right > width + 1) problems.push(`${element.tagName}:outside-viewport`);
      if (element.childElementCount === 0 && element.textContent?.trim()) {
        // Visible glyphs can exceed line boxes without being clipped.
        const clipsX = ["hidden", "clip"].includes(style.overflowX);
        const clipsY = ["hidden", "clip"].includes(style.overflowY);
        if (clipsX && element.scrollWidth > element.clientWidth + 2 && element.clientWidth > 0) problems.push(`${element.tagName}:text-width`);
        if (clipsY && element.scrollHeight > element.clientHeight + 2 && element.clientHeight > 0) problems.push(`${element.tagName}:text-height`);
        const range = document.createRange();
        range.selectNodeContents(element);
        for (const textRect of range.getClientRects()) {
          if (textRect.left < -1 || textRect.right > width + 1) problems.push(`${element.tagName}:text-outside-viewport`);
          for (let ancestor: HTMLElement | null = element; ancestor; ancestor = ancestor.parentElement) {
            const ancestorStyle = getComputedStyle(ancestor);
            const bounds = ancestor.getBoundingClientRect();
            if (["hidden", "clip"].includes(ancestorStyle.overflowX) && (textRect.left < bounds.left - 2 || textRect.right > bounds.right + 2)) problems.push(`${element.tagName}:ancestor-clips-text`);
          }
        }
      }
    }
    return [...new Set(problems)];
  });
}

export async function assertLayout(page: Page) {
  expect(await layoutProblems(page)).toEqual([]);
}

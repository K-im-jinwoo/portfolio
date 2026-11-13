import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { projects } from "../../content/projects";
import { profile } from "../../content/profile";
import { assertLayout, ready } from "./helpers";

const routes = [
  { path: "/", title: profile.headline, status: 200 },
  { path: "/about", title: profile.headline, status: 200 },
  ...projects.map((project) => ({ path: `/projects/${project.slug}`, title: project.title, status: 200 })),
  { path: "/projects/missing-project", title: "페이지를 찾을 수 없습니다.", status: 404 },
];

for (const route of routes) {
  test(`built page ${route.path}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(route.status);
    await ready(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.title);
    expect(await page.locator("html").getAttribute("lang")).toBe("ko");
    expect(await page.evaluate(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
    expect(await page.evaluate(() => [...document.fonts].some((font) => font.family.includes("Noto Sans KR") && font.status === "loaded"))).toBe(true);
    await assertLayout(page);
    const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(accessibility.violations.map(({ id, nodes }) => ({ id, count: nodes.length }))).toEqual([]);
    expect(errors).toEqual([]);
    // Review evidence only. Never write or replace a comparison baseline here.
    await testInfo.attach("rendered-page", { body: await page.screenshot({ fullPage: true, animations: "disabled" }), contentType: "image/png" });
  });
}

test("project links, cycle, evidence disclosure and keyboard navigation", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('main a[href^="/projects/"]');
  await expect(links).toHaveCount(projects.length);
  expect(await links.evaluateAll((items) => items.map((item) => item.getAttribute("href") ?? "").sort((a, b) => a.localeCompare(b)))).toEqual(projects.map(({ slug }) => `/projects/${slug}`).sort((a, b) => a.localeCompare(b)));
  await page.keyboard.press("Tab");
  await expect(page.locator("header a").first()).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Work", exact: true })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "About", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/about$/);

  for (const [index, project] of projects.entries()) {
    await page.goto(`/projects/${project.slug}`);
    const next = projects[(index + 1) % projects.length];
    await expect(page.getByRole("navigation", { name: "프로젝트 이동" }).getByRole("link")).toHaveAttribute("href", `/projects/${next.slug}`);
    if (project.evidence) {
      const summary = page.locator("summary");
      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("img", { name: project.evidence.alt })).toBeVisible();
      await assertLayout(page);
    }
  }
});

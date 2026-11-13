// Load from an operator-owned, read-only checkout in production.
export const policyVersion = "portfolio-v1";
export const roles = ["selector", "writer", "content-reviewer", "code-reviewer", "design-reviewer"];
export const requiredChecks = ["unit", "build", "browser"];
export const baselineSlugs = [
  "wiki-knowledge-system", "excel-data-converter", "excel-export-optimization",
  "qms-approval-system", "academic-transfer-workflow", "lg-voc-dashboard",
];

export function allowedWriterPath(file) {
  if (typeof file !== "string" || file.includes("\\") || file.includes("\0")) return false;
  if (file.startsWith("/") || file.split("/").some((part) => !part || part === "." || part === "..")) return false;
  // New evidence images need a separate public-information review pipeline.
  return /^site\/(?:content|app|components|lib)\/.+\.(?:ts|tsx|css)$/.test(file);
}

export function requiredBrowserCases() {
  const cases = [];
  const paths = ["/", "/about", ...baselineSlugs.map((slug) => `/projects/${slug}`), "/projects/missing-project"];
  for (const width of [360, 390, 768, 1440]) {
    for (const path of paths) cases.push({ project: `chromium-${width}`, title: `built page ${path}` });
    cases.push({ project: `chromium-${width}`, title: "project links, cycle, evidence disclosure and keyboard navigation" });
  }
  for (const width of [639, 640, 641, 767, 769, 1023, 1024, 1025]) cases.push({ project: "chromium-boundaries", title: `breakpoint ${width}` });
  for (const width of [360, 390, 768, 1440]) cases.push({ project: "chromium-boundaries", title: `long public text ${width}` });
  cases.push({ project: "chromium-boundaries", title: "detects hidden horizontal clipping even with overflow-x clip" });
  return cases;
}

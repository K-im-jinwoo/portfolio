import assert from "node:assert/strict";
import test from "node:test";
import { inspectBrowserReport, inspectChange } from "../gates.mjs";
import { allowedWriterPath, requiredBrowserCases } from "../policy.mjs";

function report() {
  const cases = requiredBrowserCases();
  return {
    errors: [], stats: { expected: cases.length, unexpected: 0, skipped: 0, flaky: 0 },
    suites: [{ specs: cases.map(({ project, title }) => ({
      title, ok: true, tests: [{ projectName: project, status: "expected", expectedStatus: "passed", annotations: [], results: [{ status: "passed", retry: 0 }] }],
    })) }],
  };
}
function change() {
  const identity = { headSha: "a".repeat(40), baseSha: "b".repeat(40), sourceDigest: "c".repeat(64), policyVersion: "portfolio-v1" };
  return {
    ...identity, writerRunId: "writer-1", changedFiles: ["site/content/projects.ts"],
    reviews: ["content-reviewer", "design-reviewer"].map((role) => ({ ...identity, role, runId: role, decision: "approve", findings: [] })),
    checks: ["unit", "build", "browser"].map((name) => ({ name, headSha: identity.headSha, status: "passed", exitCode: 0, ...(name === "browser" ? { report: report() } : {}) })),
  };
}

test("accepts complete passing browser results and independent current reviews", () => {
  assert.equal(inspectBrowserReport(report()).ok, true);
  assert.equal(inspectChange(change()).ok, true);
});
test("rejects empty, missing, invalid and truncated browser results", () => {
  for (const value of [null, {}, { suites: {} }, { ...report(), suites: [] }, { ...report(), errors: [{ message: "setup" }] }]) assert.equal(inspectBrowserReport(value).ok, false);
});
test("rejects malformed change inputs without executing or throwing", () => {
  for (const value of [null, {}, { ...change(), changedFiles: {} }, { ...change(), reviews: [null] }, { ...change(), checks: [null] }]) assert.equal(inspectChange(value).ok, false);
});
test("rejects missing required pages and missing breakpoint checks", () => {
  const value = report(); value.suites[0].specs.pop(); value.stats.expected--;
  assert.equal(inspectBrowserReport(value).ok, false);
});
test("rejects skipped, expected-failure, retried and flaky tests", () => {
  for (const mutate of [
    (r) => { r.stats.skipped = 1; },
    (r) => { r.suites[0].specs[0].tests[0].expectedStatus = "failed"; },
    (r) => { r.suites[0].specs[0].tests[0].results[0].status = "skipped"; },
    (r) => { r.suites[0].specs[0].tests[0].results[0].retry = 1; },
    (r) => { r.suites[0].specs[0].tests[0].annotations.push({ type: "fixme" }); },
    (r) => { r.stats.flaky = 1; },
  ]) { const value = report(); mutate(value); assert.equal(inspectBrowserReport(value).ok, false); }
});
test("blocks policy, test, configuration, dependency and image changes by the writer", () => {
  for (const file of ["automation/policy.mjs", "site/tests/browser/routes.spec.ts", "site/playwright.config.ts", "site/package.json", "site/public/evidence/new.png", ".github/workflows/verify.yml"]) {
    assert.equal(allowedWriterPath(file), false);
    const value = change(); value.changedFiles.push(file); assert.equal(inspectChange(value).ok, false);
  }
});
test("rejects path traversal and platform-specific paths", () => {
  for (const file of ["site/content/../tests/check.ts", "/site/content/projects.ts", "site\\content\\projects.ts", "site/content//projects.ts", "site/content/./projects.ts", "site/content/a\0.ts"]) assert.equal(allowedWriterPath(file), false);
});
test("requires a code review when UI or code files change", () => {
  const value = change(); value.changedFiles.push("site/app/page.tsx");
  assert.equal(inspectChange(value).ok, false);
  value.reviews.push({ ...value.reviews[0], role: "code-reviewer", runId: "code-1" });
  assert.equal(inspectChange(value).ok, true);
});
test("invalidates reviews for a new source, commit, base or policy", () => {
  for (const field of ["headSha", "baseSha", "sourceDigest", "policyVersion"]) {
    const value = change(); value.reviews[0][field] = "old"; assert.equal(inspectChange(value).ok, false);
  }
});
test("rejects self review, shared review context and duplicate receipts", () => {
  for (const mutate of [
    (v) => { v.reviews[0].runId = v.writerRunId; },
    (v) => { v.reviews[1].runId = v.reviews[0].runId; },
    (v) => { v.reviews.push(v.reviews[0]); },
    (v) => { v.checks.push(v.checks[0]); },
  ]) { const value = change(); mutate(value); assert.equal(inspectChange(value).ok, false); }
});
test("rejects missing, stale, skipped and nonzero-exit checks", () => {
  for (const mutate of [
    (v) => { v.checks.pop(); },
    (v) => { v.checks[0].headSha = "d".repeat(40); },
    (v) => { v.checks[0].status = "skipped"; },
    (v) => { v.checks[0].exitCode = 1; },
    (v) => { v.checks[2].report = {}; },
  ]) { const value = change(); mutate(value); assert.equal(inspectChange(value).ok, false); }
});
test("rejects request-changes reviews and unresolved findings", () => {
  const value = change(); value.reviews[0].findings = ["unsupported metric"]; assert.equal(inspectChange(value).ok, false);
  value.reviews[0].findings = []; value.reviews[0].decision = "request-changes"; assert.equal(inspectChange(value).ok, false);
});

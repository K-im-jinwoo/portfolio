import { requiredBrowserCases, requiredChecks, allowedWriterPath, policyVersion } from "./policy.mjs";

// These are validation helpers, not proof that input receipts are genuine.
// Only the future trusted controller may collect and supply release receipts.
export function inspectBrowserReport(report) {
  const errors = [];
  const cases = [];
  function visit(suites) {
    for (const suite of suites ?? []) {
      for (const spec of suite.specs ?? []) {
        for (const test of spec.tests ?? []) {
          cases.push({ project: test.projectName, title: spec.title });
          if (spec.ok !== true || test.status !== "expected" || test.expectedStatus !== "passed"
            || test.results?.length !== 1 || test.results[0].status !== "passed"
            || test.results[0].retry !== 0 || (test.annotations ?? []).some((annotation) => !annotation || ["skip", "fixme", "fail"].includes(annotation.type))) {
            errors.push("browser_case_not_passed");
          }
        }
      }
      visit(suite.suites);
    }
  }
  if (!report || typeof report !== "object") return { ok: false, errors: ["browser_report_missing"] };
  try { visit(report.suites); } catch { errors.push("browser_report_invalid"); }
  const stats = report.stats;
  if (!stats || !Number.isInteger(stats.expected) || stats.expected < 1 || stats.expected !== cases.length
    || stats.unexpected !== 0 || stats.skipped !== 0 || stats.flaky !== 0 || report.errors?.length !== 0) {
    errors.push("browser_report_incomplete");
  }
  const keys = cases.map(({ project, title }) => `${project}\0${title}`);
  if (new Set(keys).size !== keys.length) errors.push("browser_duplicate_case");
  for (const { project, title } of requiredBrowserCases()) {
    if (!keys.includes(`${project}\0${title}`)) errors.push("browser_required_case_missing");
  }
  return { ok: errors.length === 0, errors: [...new Set(errors)], tests: cases.length };
}

export function inspectChange(input) {
  const errors = [];
  const sha = /^[a-f0-9]{40}$/;
  const digest = /^[a-f0-9]{64}$/;
  if (!input || !sha.test(input.headSha ?? "") || !sha.test(input.baseSha ?? "")
    || !digest.test(input.sourceDigest ?? "") || input.policyVersion !== policyVersion) {
    return { ok: false, errors: ["change_identity_invalid"] };
  }
  if (!Array.isArray(input.changedFiles) || input.changedFiles.length === 0
    || !input.changedFiles.every(allowedWriterPath)) errors.push("writer_path_forbidden");
  if (!input.writerRunId || typeof input.writerRunId !== "string") errors.push("writer_identity_missing");
  const reviews = Array.isArray(input.reviews) ? input.reviews.filter((review) => review && typeof review === "object") : [];
  const needed = ["content-reviewer", "design-reviewer"];
  if ((Array.isArray(input.changedFiles) ? input.changedFiles : []).some((file) => typeof file === "string" && !file.startsWith("site/content/"))) needed.push("code-reviewer");
  const runIds = new Set([input.writerRunId]);
  for (const role of needed) {
    const receipts = reviews.filter((review) => review.role === role);
    if (receipts.length !== 1) { errors.push("review_missing_or_duplicate"); continue; }
    const review = receipts[0];
    if (review.decision !== "approve" || !Array.isArray(review.findings) || review.findings.length > 0) errors.push("review_not_approved");
    if (review.headSha !== input.headSha || review.baseSha !== input.baseSha
      || review.sourceDigest !== input.sourceDigest || review.policyVersion !== policyVersion) errors.push("review_stale");
    if (!review.runId || runIds.has(review.runId)) errors.push("review_not_independent");
    runIds.add(review.runId);
  }
  const checks = Array.isArray(input.checks) ? input.checks.filter((check) => check && typeof check === "object") : [];
  for (const name of requiredChecks) {
    const receipts = checks.filter((check) => check.name === name);
    if (receipts.length !== 1) { errors.push("check_missing_or_duplicate"); continue; }
    const check = receipts[0];
    if (check.status !== "passed" || check.exitCode !== 0 || check.headSha !== input.headSha) errors.push("check_failed_or_stale");
    if (name === "browser" && !inspectBrowserReport(check.report).ok) errors.push("browser_report_rejected");
  }
  return { ok: errors.length === 0, errors: [...new Set(errors)] };
}

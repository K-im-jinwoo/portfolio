import { describe, expect, it } from "vitest";
import {
  additionalProjects,
  featuredProjects,
  getProjectBySlug,
  projects,
} from "@/content/projects";
import { profile } from "@/content/profile";

describe("portfolio content", () => {
  it("contains five unique projects split 3 and 2", () => {
    expect(projects).toHaveLength(5);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(5);
    expect(featuredProjects).toHaveLength(3);
    expect(additionalProjects).toHaveLength(2);
  });

  it("resolves every slug and includes a technology stack", () => {
    for (const project of projects) {
      expect(getProjectBySlug(project.slug)).toEqual(project);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it("prioritizes AI and automation evidence", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
      "wiki-knowledge-system",
      "excel-data-converter",
      "excel-export-optimization",
      "academic-transfer-workflow",
      "lg-voc-dashboard",
    ]);
    expect(featuredProjects.map(({ slug }) => slug)).toEqual([
      "wiki-knowledge-system",
      "excel-data-converter",
      "excel-export-optimization",
    ]);
    expect(additionalProjects.map(({ slug }) => slug)).toEqual([
      "academic-transfer-workflow",
      "lg-voc-dashboard",
    ]);
  });

  it("stores evidence without defensive visitor-facing copy", () => {
    for (const project of projects) {
      expect(project.snapshot).toEqual({
        problem: expect.any(String),
        role: expect.any(String),
        change: expect.any(String),
        scope: expect.any(String),
      });
      expect(Object.values(project.snapshot).every((value) => value.trim())).toBe(
        true,
      );
      expect(project.verification.every((value) => value.trim())).toBe(true);
      expect(project.limits.every((value) => value.trim())).toBe(true);
      expect(project.verification.length).toBeGreaterThan(0);
      expect(project.limits.length).toBeGreaterThan(0);
    }

    expect(JSON.stringify(projects)).not.toMatch(
      /확인되지 않은 .*표시하지|수치는 표시하지 않습니다|근거 범위에 포함하지/,
    );
  });

  it("explains why the Excel export image strategy was selected", () => {
    const excelExport = getProjectBySlug("excel-export-optimization");

    expect(excelExport?.decisions?.join(" ")).toMatch(/위해|때문/);
  });

  it("expresses the WIKI benchmark evidence with its evaluation scope", () => {
    const wiki = getProjectBySlug("wiki-knowledge-system");

    expect(wiki?.metrics.map(({ value, label }) => ({ value, label }))).toEqual([
      { value: "9.38초", label: "평균 응답 시간" },
      { value: "96%", label: "엄격 정확도 (24/25)" },
      { value: "3/3", label: "WIKI 부재 질문 미발견" },
    ]);
    expect(wiki?.metrics[0]?.note).toBe(
      "25개 질문 · Oracle Cloud 동기화 WIKI 63개",
    );
    expect(wiki?.verification.join(" ")).toContain("WIKI 원본 63개");
    expect(wiki?.verification.join(" ")).not.toMatch(/P50|P95|73개/);
    expect(wiki?.evidence).toMatchObject({
      src: "/evidence/llm-wiki-ask-benchmark.png",
      alt: expect.stringContaining("Telegram"),
      query: expect.stringContaining("/ask"),
      facts: expect.arrayContaining(["평균 응답 9.38초", "엄격 정확도 96%(24/25)"]),
    });
    expect(wiki?.limits.join(" ")).toContain(
      "반복 측정의 변동성은 확인하지 않았습니다",
    );
  });

  it("publishes email but never a phone number", () => {
    expect(profile.email).toBe("jwkim6166@gmail.com");
    expect(JSON.stringify(profile)).not.toMatch(
      /01[016789][- ]?\d{3,4}[- ]?\d{4}/,
    );
  });
});

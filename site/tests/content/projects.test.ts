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
      expect(project.verification.length).toBeGreaterThan(0);
      expect(project.limits.length).toBeGreaterThan(0);
    }

    expect(JSON.stringify(projects)).not.toMatch(
      /확인되지 않은 .*표시하지|수치는 표시하지 않습니다/,
    );
  });

  it("expresses the WIKI response times as a comparison", () => {
    const wiki = getProjectBySlug("wiki-knowledge-system");

    expect(wiki?.metrics.map(({ value, label }) => ({ value, label }))).toEqual([
      { value: "약 80~120초", label: "기존 질의 흐름" },
      { value: "10.3초", label: "자동화 후 최초 실행" },
      { value: "1.02초", label: "동일 흐름 재실행" },
    ]);
    expect(wiki?.limits.join(" ")).toContain(
      "원인을 분리 측정하지 않았습니다",
    );
  });

  it("keeps the current detail page readable during the evidence migration", () => {
    for (const project of projects) {
      expect(project.problem).toBe(project.snapshot.problem);
      expect(project.solution).toBe(project.snapshot.change);
      expect(project.result).toBe(project.snapshot.scope);
      expect(project.steps).toEqual(project.system ?? []);
    }
  });

  it("publishes email but never a phone number", () => {
    expect(profile.email).toBe("jwkim6166@gmail.com");
    expect(JSON.stringify(profile)).not.toMatch(
      /01[016789][- ]?\d{3,4}[- ]?\d{4}/,
    );
  });
});

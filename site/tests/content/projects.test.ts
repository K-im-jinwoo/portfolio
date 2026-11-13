import { describe, expect, it } from "vitest";
import {
  additionalProjects,
  featuredProjects,
  getProjectBySlug,
  projects,
} from "@/content/projects";
import { profile } from "@/content/profile";

describe("portfolio content", () => {
  it("partitions unique project URLs into featured and supporting work", () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(featuredProjects.length).toBeGreaterThan(0);
    expect(additionalProjects.length).toBeGreaterThan(0);
    expect([...featuredProjects, ...additionalProjects]).toHaveLength(projects.length);
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(["featured", "supporting"]).toContain(project.tier);
    }
  });

  it("resolves every slug and includes a technology stack", () => {
    for (const project of projects) {
      expect(getProjectBySlug(project.slug)).toEqual(project);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it("prioritizes business systems and the Excel workflow", () => {
    expect(projects.map(({ slug }) => slug)).toEqual(expect.arrayContaining([
      "wiki-knowledge-system",
      "excel-data-converter",
      "excel-export-optimization",
      "production-quality-dashboard",
      "market-research-agent",
      "qms-approval-system",
      "academic-transfer-workflow",
      "lg-voc-dashboard",
    ]));
    expect(featuredProjects.map(({ slug }) => slug)).toEqual([
      "academic-transfer-workflow",
      "qms-approval-system",
      "excel-data-converter",
      "wiki-knowledge-system",
    ]);
    expect(additionalProjects.map(({ slug }) => slug)).toEqual(expect.arrayContaining([
      "production-quality-dashboard",
      "market-research-agent",
      "excel-export-optimization",
      "lg-voc-dashboard",
    ]));
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

    expect(excelExport?.decisions?.join(" ")).toMatch(/대신|줄였습니다|적용했습니다/);
  });

  it("captures the evidence-backed Excel export diagnosis and safeguards", () => {
    const excelExport = getProjectBySlug("excel-export-optimization");
    const allText = JSON.stringify(excelExport);

    expect(excelExport?.snapshot.problem).toContain("4,500px");
    expect(excelExport?.snapshot.problem).toContain("3.6MB");
    expect(excelExport?.snapshot.change).toContain("Stream");
    expect(excelExport?.decisions?.join(" ")).toContain("400px");
    expect(excelExport?.metrics).toEqual([]);
    expect(allText).toMatch(/측정|측정치/);
  });

  it("describes the Excel converter's progression from manual files to rules", () => {
    const excelConverter = getProjectBySlug("excel-data-converter");

    expect(excelConverter?.snapshot.problem).toContain("Grid");
    expect(excelConverter?.comparison?.before.join(" ")).toContain("VBA");
    expect(excelConverter?.discovery).toContain("프로그램");
    expect(excelConverter?.decisions?.join(" ")).toContain("자연어");
    expect(excelConverter?.decisions?.join(" ")).toContain("JSON");
    expect(excelConverter?.snapshot.role).toContain("AI");
    expect(excelConverter?.limits.join(" ")).toContain("FakeExcel");
  });

  it("distinguishes project origins and keeps historical AI scores out of current WIKI claims", () => {
    const wiki = getProjectBySlug("wiki-knowledge-system");

    expect(wiki?.projectKind).toBe("개인 프로젝트");
    expect(getProjectBySlug("market-research-agent")?.projectKind).toBe("개인 프로젝트");
    expect(getProjectBySlug("lg-voc-dashboard")?.projectKind).toBe("산학 프로젝트");
    expect(getProjectBySlug("qms-approval-system")?.projectKind).toBe("업무 프로젝트");
    expect(getProjectBySlug("excel-data-converter")?.period).toBe("2026");
    expect(wiki?.metrics).toEqual([]);
    expect(wiki?.verification.join(" ")).toMatch(/AI|에이전트 내부 평가/);
    expect(wiki?.verification.join(" ")).not.toMatch(/P50|P95/);
    expect(wiki?.evidence).toBeUndefined();
    expect(JSON.stringify(wiki)).not.toMatch(/96%|9\.38|1\.02|216개|146\.625/);
    expect(wiki?.limits.join(" ")).toContain("Hermes");
    expect(wiki?.snapshot.role).toContain("AI 구현");
    expect(wiki?.snapshot.scope).toContain("검토 보조");
  });

  it("describes the LG VOC project as labeling and visualization delivery", () => {
    const lgVoc = getProjectBySlug("lg-voc-dashboard");

    expect(lgVoc?.snapshot.problem).toContain("리뷰");
    expect(lgVoc?.snapshot.role).toContain("3~4만");
    expect(lgVoc?.stack).toContain("D3.js");
    expect(lgVoc?.snapshot.change).toContain("워드클라우드");
    expect(lgVoc?.snapshot.scope).toContain("사내 서버");
    expect(lgVoc?.discovery).toContain("SVG");
    expect(lgVoc?.decisions?.join(" ")).toContain("탭 전환");
    expect(lgVoc?.verification.join(" ")).toContain("담당자 시연");
    expect(lgVoc?.limits.join(" ")).toContain("정확도");
  });

  it("describes QMS approval as the representative workflow", () => {
    const qms = getProjectBySlug("qms-approval-system");

    expect(qms?.period).toContain("2025.08.14");
    expect(qms?.snapshot.problem).toContain("승인");
    expect(qms?.snapshot.problem).toContain("권한");
    expect(qms?.snapshot.change).toContain("QC");
    expect(qms?.architecture?.router.label).toContain("승인");
    expect(
      qms?.architecture?.branches
        .flatMap(({ steps }) => steps)
        .map(({ label, detail }) => `${label} ${detail}`)
        .join(" "),
    ).toContain("승인");
    expect(qms?.verification.join(" ")).toContain("실제 운영");
    expect(qms?.limits.join(" ")).toContain("프로시저");
  });

  it("publishes email but never a phone number", () => {
    expect(profile.email).toBe("jwkim6166@gmail.com");
    expect(JSON.stringify(profile)).not.toMatch(
      /01[016789][- ]?\d{3,4}[- ]?\d{4}/,
    );
  });
});

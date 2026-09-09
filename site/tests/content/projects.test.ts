import { describe, expect, it } from "vitest";
import {
  additionalProjects,
  featuredProjects,
  getProjectBySlug,
  projects,
} from "@/content/projects";
import { profile } from "@/content/profile";

describe("portfolio content", () => {
  it("contains six unique projects split 3 and 3", () => {
    expect(projects).toHaveLength(6);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(6);
    expect(featuredProjects).toHaveLength(3);
    expect(additionalProjects).toHaveLength(3);
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
      "qms-approval-system",
      "academic-transfer-workflow",
      "lg-voc-dashboard",
    ]);
    expect(featuredProjects.map(({ slug }) => slug)).toEqual([
      "wiki-knowledge-system",
      "excel-data-converter",
      "excel-export-optimization",
    ]);
    expect(additionalProjects.map(({ slug }) => slug)).toEqual([
      "qms-approval-system",
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

    expect(excelExport?.decisions?.join(" ")).toMatch(/대신|줄였습니다|적용했습니다/);
  });

  it("captures the evidence-backed Excel export diagnosis and safeguards", () => {
    const excelExport = getProjectBySlug("excel-export-optimization");
    const allText = JSON.stringify(excelExport);

    expect(excelExport?.snapshot.problem).toContain("4,500px");
    expect(excelExport?.snapshot.problem).toContain("3.6MB");
    expect(excelExport?.snapshot.role).toContain("자원 해제");
    expect(excelExport?.snapshot.change).toContain("Stream");
    expect(excelExport?.snapshot.scope).toContain("단위 체계 통일");
    expect(excelExport?.discovery).toContain("DPI");
    expect(excelExport?.decisions?.join(" ")).toContain("400px");
    expect(excelExport?.decisions?.join(" ")).toContain("슬롯");
    expect(excelExport?.verification.join(" ")).toContain("처리 시간");
    expect(allText).toContain("별도로 측정하지 않았습니다");
  });

  it("describes the Excel converter's progression from manual files to rules", () => {
    const excelConverter = getProjectBySlug("excel-data-converter");

    expect(excelConverter?.snapshot.problem).toContain("Grid");
    expect(excelConverter?.comparison?.before.join(" ")).toContain("VBA");
    expect(excelConverter?.discovery).toContain("프로그램");
    expect(excelConverter?.decisions?.join(" ")).toContain("자연어");
    expect(excelConverter?.decisions?.join(" ")).toContain("JSON");
    expect(excelConverter?.verification.join(" ")).toContain("테스트 코드");
    expect(excelConverter?.limits.join(" ")).toContain("FakeExcel");
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
    expect(qms?.snapshot.role).toContain("권한");
    expect(qms?.snapshot.change).toContain("QC");
    expect(qms?.architecture?.router.label).toContain("승인");
    expect(
      qms?.architecture?.branches
        .flatMap(({ steps }) => steps)
        .map(({ label, detail }) => `${label} ${detail}`)
        .join(" "),
    ).toContain("트랜잭션");
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

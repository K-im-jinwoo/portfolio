import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/projects/[slug]/page";
import { getProjectBySlug } from "@/content/projects";

describe("project detail routes", () => {
  it("generates one route for every project", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "wiki-knowledge-system" },
      { slug: "excel-data-converter" },
      { slug: "excel-export-optimization" },
      { slug: "qms-approval-system" },
      { slug: "academic-transfer-workflow" },
      { slug: "lg-voc-dashboard" },
    ]);
  });

  it("returns undefined for an unknown project", () => {
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });

  it("renders evidence sections for the LLM WIKI case study", async () => {
    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "wiki-knowledge-system" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "한눈에 보는 결과" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Before → After" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "문제를 어떻게 발견했는가" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "왜 이 구조를 선택했는가" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "수집·정제·질의 구조" }),
    ).toBeInTheDocument();
    expect(screen.getByText("WIKI Capture Skill")).toBeInTheDocument();
    expect(screen.getByText("n8n 라우팅")).toBeInTheDocument();
    expect(screen.getByText("Antigravity 수동 검토")).toBeInTheDocument();
    expect(screen.getByText("wiki-agent API")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "검증" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Telegram에서 실행한 LLM WIKI v2.3 25개 질문 평가 결과",
      }),
    ).toHaveAttribute("src", "/evidence/llm-wiki-ask-benchmark.png");
    expect(screen.getByTestId("evidence-summary-card")).toBeInTheDocument();
    expect(screen.getByText("실제 /ask 질의")).toBeInTheDocument();
    expect(screen.getByText("원본 Telegram 캡처 보기")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "적용 범위와 한계" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("OVERVIEW")).not.toBeInTheDocument();
    expect(screen.getByText("9.38초")).toBeInTheDocument();
    expect(
      screen.getAllByTestId("case-study-index").map((node) => node.textContent),
    ).toEqual(["01", "02", "03", "04", "05", "06", "07"]);
  });

  it("renders a configurable workflow for the Excel converter case study", async () => {
    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "excel-data-converter" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "분석·규칙·변환 구조" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("system-architecture")).toBeInTheDocument();
    expect(screen.getByText("대상 Excel 파일")).toBeInTheDocument();
    expect(screen.getByText("다중 조건 코드 매핑")).toBeInTheDocument();
    expect(screen.getByText(/자연어 규칙 설정을 시도했지만/)).toBeInTheDocument();
  });

  it("omits unavailable optional evidence sections", async () => {
    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "academic-transfer-workflow" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "한눈에 보는 결과" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Before → After" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "적용 범위와 한계" }),
    ).toBeInTheDocument();
  });

  it("renders the representative QMS approval workflow", async () => {
    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "qms-approval-system" }),
      }),
    );

    expect(
      screen.getByRole("heading", { name: "검사 결과 승인 흐름" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("system-architecture")).toBeInTheDocument();
    expect(screen.getByText("QC 별도 승인")).toBeInTheDocument();
    expect(screen.getByText("사용자별 권한 확인")).toBeInTheDocument();
  });

  it("omits optional evidence sections backed only by empty arrays", async () => {
    const project = getProjectBySlug("academic-transfer-workflow");
    if (!project) throw new Error("Expected academic transfer project");

    const original = {
      comparison: project.comparison,
      decisions: project.decisions,
      system: project.system,
    };

    project.comparison = { before: [], after: [] };
    project.decisions = [];
    project.system = [];

    try {
      render(
        await ProjectPage({
          params: Promise.resolve({ slug: "academic-transfer-workflow" }),
        }),
      );

      expect(
        screen.queryByRole("heading", { name: "Before → After" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "왜 이 구조를 선택했는가" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("heading", { name: "수집·정제·질의 구조" }),
      ).not.toBeInTheDocument();
      expect(
        screen.getAllByTestId("case-study-index").map((node) => node.textContent),
      ).toEqual(["01", "02", "03", "04"]);
    } finally {
      project.comparison = original.comparison;
      project.decisions = original.decisions;
      project.system = original.system;
    }
  });

  it("uses not-found for unknown slugs and produces item metadata", async () => {
    await expect(
      ProjectPage({ params: Promise.resolve({ slug: "missing-project" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    await expect(
      generateMetadata({
        params: Promise.resolve({ slug: "wiki-knowledge-system" }),
      }),
    ).resolves.toMatchObject({
      title: "LLM 기반 개인 지식 관리 시스템 | Jinwoo Kim",
      openGraph: { images: [] },
      twitter: { images: [] },
    });
  });

  it("links to the next project and wraps after the last project", async () => {
    const first = render(
      await ProjectPage({
        params: Promise.resolve({ slug: "wiki-knowledge-system" }),
      }),
    );
    expect(
      screen.getByRole("link", { name: /다음 프로젝트.*Excel 데이터 변환/ }),
    ).toHaveAttribute("href", "/projects/excel-data-converter");

    first.unmount();
    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "lg-voc-dashboard" }),
      }),
    );
    expect(
      screen.getByRole("link", { name: /다음 프로젝트.*LLM 기반/ }),
    ).toHaveAttribute("href", "/projects/wiki-knowledge-system");
  });
});

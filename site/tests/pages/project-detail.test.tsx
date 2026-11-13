import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/projects/[slug]/page";
import { getProjectBySlug, projects } from "@/content/projects";

describe("project detail routes", () => {
  it("generates one route for every project", () => {
    expect(generateStaticParams()).toEqual(
      projects.map(({ slug }) => ({ slug })),
    );
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
      screen.getByRole("heading", { name: "업무 배경" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "구현 내용과 선택 배경" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: getProjectBySlug("wiki-knowledge-system")!.architecture!.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("WIKI Capture Skill")).toBeInTheDocument();
    expect(screen.getByText("Hermes 대표 에이전트")).toBeInTheDocument();
    expect(screen.getByText("사용자 승인 확인")).toBeInTheDocument();
    expect(screen.getByText("조회 역할")).toBeInTheDocument();
    expect(screen.queryByText("n8n 라우팅")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "확인 기록" })).toBeInTheDocument();
    expect(screen.getByText("CASE STUDY / 개인 프로젝트")).toBeInTheDocument();
    expect(screen.queryByTestId("evidence-summary-card")).not.toBeInTheDocument();
    expect(screen.queryByText("원본 Telegram 캡처 보기")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "적용 범위와 한계" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("OVERVIEW")).not.toBeInTheDocument();
    expect(screen.queryByText("초기 API 평균 응답")).not.toBeInTheDocument();
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
      screen.getByRole("heading", { name: getProjectBySlug("excel-data-converter")!.architecture!.title }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("system-architecture")).toBeInTheDocument();
    expect(screen.getByText("대상 Excel 파일")).toBeInTheDocument();
    expect(screen.getByText("단일·복합 조건")).toBeInTheDocument();
    expect(screen.getAllByText(/JSON/).length).toBeGreaterThan(0);
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
    const comparison = getProjectBySlug("academic-transfer-workflow")?.comparison;
    expect(Boolean(screen.queryByRole("heading", { name: "Before → After" }))).toBe(Boolean(comparison?.before.length && comparison.after.length));
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
      screen.getByRole("heading", { name: getProjectBySlug("qms-approval-system")!.architecture!.title }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("system-architecture")).toBeInTheDocument();
    expect(screen.getByText("QC 별도 승인 경로")).toBeInTheDocument();
    expect(screen.getByText("사용자 권한 확인")).toBeInTheDocument();
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
        screen.queryByRole("heading", { name: "구현 내용과 선택 배경" }),
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
      title: `${getProjectBySlug("wiki-knowledge-system")!.title} | Jinwoo Kim`,
      openGraph: { images: [] },
      twitter: { images: [] },
    });
  });

  it("links to the next project and wraps after the last project", async () => {
    for (const [index, project] of projects.entries()) {
      const view = render(await ProjectPage({ params: Promise.resolve({ slug: project.slug }) }));
      expect(screen.getByRole("link", { name: /다음 프로젝트/ })).toHaveAttribute(
        "href", `/projects/${projects[(index + 1) % projects.length].slug}`,
      );
      view.unmount();
    }
  });
});

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
      { slug: "excel-data-converter" },
      { slug: "wiki-knowledge-system" },
      { slug: "academic-transfer-workflow" },
      { slug: "excel-export-optimization" },
      { slug: "lg-voc-dashboard" },
    ]);
  });

  it("returns undefined for an unknown project", () => {
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });

  it("renders the explicit overview and case-study sections", async () => {
    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "excel-data-converter" }),
      }),
    );

    expect(screen.getByText("OVERVIEW")).toBeInTheDocument();
    expect(screen.getByText("PROBLEM")).toBeInTheDocument();
    expect(screen.getByText("SOLUTION")).toBeInTheDocument();
    expect(screen.getByText("PROCESS")).toBeInTheDocument();
    expect(screen.getByText("RESULT")).toBeInTheDocument();
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
        params: Promise.resolve({ slug: "excel-data-converter" }),
      }),
    );
    expect(
      screen.getByRole("link", { name: /다음 프로젝트.*LLM 기반/ }),
    ).toHaveAttribute("href", "/projects/wiki-knowledge-system");

    first.unmount();
    render(
      await ProjectPage({
        params: Promise.resolve({ slug: "lg-voc-dashboard" }),
      }),
    );
    expect(
      screen.getByRole("link", { name: /다음 프로젝트.*Excel 데이터 변환/ }),
    ).toHaveAttribute("href", "/projects/excel-data-converter");
  });
});

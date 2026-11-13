import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

describe("home page", () => {
  it("shows identity, portrait, and every project link", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: profile.headline,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("노트북으로 작업하는 김진우 개발자 캐릭터"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /프로젝트 보기/ })).toHaveLength(
      projects.length,
    );
  });

  it("shows the current positioning and work CTA", () => {
    render(<HomePage />);

    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "대표 사례 보기" }),
    ).toHaveAttribute("href", "/#work");

    const hero = screen.getByTestId("home-hero");
    expect(hero.className).toContain("lg:min-h-[70vh]");
    expect(hero.className).toContain("lg:py-12");
    expect(hero.className).not.toContain("min-h-[calc(100vh-80px)]");
    expect(
      screen.getByRole("heading", { level: 1 }).className,
    ).toContain("5vw");
  });

  it("lists the academic workflow project first", () => {
    render(<HomePage />);
    const projectLinks = screen.getAllByRole("link", {
      name: /프로젝트 보기/,
    });

    expect(projectLinks[0]).toHaveAttribute(
      "href",
      "/projects/academic-transfer-workflow",
    );
  });

  it("identifies personal and academic projects separately from company work", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: /LLM 기반 개인 지식 관리/ })).toHaveTextContent("개인 프로젝트");
    expect(screen.getByRole("link", { name: /울산대학교 학사·입학 업무 시스템/ })).toHaveTextContent("업무 프로젝트");
    expect(screen.getByRole("link", { name: /LG전자 소비자 VoC/ })).toHaveTextContent("산학 프로젝트");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("home page", () => {
  it("shows identity, portrait, and all six project links", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "업무 시스템의 병목을 발견하고, 직접 개선하는 개발자입니다.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("노트북으로 작업하는 김진우 개발자 캐릭터"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /프로젝트 보기/ })).toHaveLength(
      6,
    );
  });

  it("shows the AI automation positioning and work CTA", () => {
    render(<HomePage />);

    expect(screen.getByText("AI·업무자동화 개발자")).toBeInTheDocument();
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

  it("lists the LLM WIKI project first", () => {
    render(<HomePage />);
    const projectLinks = screen.getAllByRole("link", {
      name: /프로젝트 보기/,
    });

    expect(projectLinks[0]).toHaveAttribute(
      "href",
      "/projects/wiki-knowledge-system",
    );
  });
});

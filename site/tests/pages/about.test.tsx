import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";

describe("about page", () => {
  it("shows profile, concise career, and education", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /업무의 병목을 찾고/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("김진우 / Jinwoo Kim")).toBeInTheDocument();
    expect(screen.getByText("(주)하이텍정보시스템")).toBeInTheDocument();
    expect(screen.getByText("동의대학교")).toBeInTheDocument();
    expect(
      screen.getByText("MES·QMS·학사 시스템 개발과 반복 업무 자동화"),
    ).toBeInTheDocument();
  });

  it("connects three capabilities to evidence projects without duplicate contact", () => {
    render(<AboutPage />);

    expect(screen.getByRole("link", { name: /AI 업무 흐름/ })).toHaveAttribute(
      "href",
      "/projects/wiki-knowledge-system",
    );
    expect(
      screen.getByRole("link", { name: /재사용 가능한 업무 자동화/ }),
    ).toHaveAttribute("href", "/projects/excel-data-converter");
    expect(
      screen.getByRole("link", { name: /운영 문제 원인 분석/ }),
    ).toHaveAttribute("href", "/projects/excel-export-optimization");
    expect(screen.queryByText("SUPPORTING EXPERIENCE")).not.toBeInTheDocument();
    expect(screen.queryByText("CONTACT")).not.toBeInTheDocument();
    expect(screen.queryByText("jwkim6166@gmail.com")).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";

describe("about page", () => {
  it("shows profile, career, education, and skill groups", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /업무의 병목을 찾고/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("김진우 / Jinwoo Kim")).toBeInTheDocument();
    expect(screen.getByText("(주)하이텍정보시스템")).toBeInTheDocument();
    expect(screen.getByText("동의대학교")).toBeInTheDocument();
    expect(screen.getByText("AI & Automation")).toBeInTheDocument();
    expect(screen.getByText(/HWASHIN QMS/)).toBeInTheDocument();
  });
});

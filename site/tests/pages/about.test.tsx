import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";
import { capabilities, profile } from "@/content/profile";

describe("about page", () => {
  it("shows profile, concise career, and education", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: profile.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText("김진우 / Jinwoo Kim")).toBeInTheDocument();
    expect(screen.getByText("(주)하이텍정보시스템")).toBeInTheDocument();
    expect(screen.getByText("동의대학교")).toBeInTheDocument();
    expect(
      screen.getByText(profile.experience[0].description),
    ).toBeInTheDocument();
  });

  it("connects three capabilities to evidence projects without duplicate contact", () => {
    render(<AboutPage />);

    for (const capability of capabilities) {
      expect(screen.getByRole("link", { name: new RegExp(capability.title) })).toHaveAttribute("href", capability.href);
    }
    expect(screen.queryByText("SUPPORTING EXPERIENCE")).not.toBeInTheDocument();
    expect(screen.queryByText("CONTACT")).not.toBeInTheDocument();
    expect(screen.queryByText("jwkim6166@gmail.com")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "업무 시스템과 자동화를 연결하는 기술" })).toBeInTheDocument();
    for (const group of Object.keys(profile.skills)) {
      expect(screen.getByRole("heading", { name: group })).toBeInTheDocument();
    }
  });
});

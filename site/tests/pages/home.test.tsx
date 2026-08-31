import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("home page", () => {
  it("shows identity, portrait, and all five project links", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /복잡한 업무를/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("노트북으로 작업하는 김진우 개발자 캐릭터"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /프로젝트 보기/ })).toHaveLength(
      5,
    );
  });
});

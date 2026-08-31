import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

describe("site shell", () => {
  it("renders the main navigation and public email", () => {
    render(
      <>
        <SiteHeader />
        <SiteFooter />
      </>,
    );

    expect(screen.getByRole("link", { name: "JINWOO KIM" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "/#work",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/#contact",
    );
    expect(
      screen.getByRole("link", { name: "jwkim6166@gmail.com" }),
    ).toHaveAttribute("href", "mailto:jwkim6166@gmail.com");
    expect(document.body.textContent).not.toMatch(
      /01[016789][- ]?\d{3,4}[- ]?\d{4}/,
    );
  });
});

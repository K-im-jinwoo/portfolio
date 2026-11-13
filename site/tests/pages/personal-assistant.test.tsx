import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AssistantLayout from "@/app/apps/jw1/layout";
import AppPage, { metadata as appMetadata } from "@/app/apps/jw1/page";
import PrivacyPage, { metadata as privacyMetadata } from "@/app/apps/jw1/privacy/page";
import { SiteFooter } from "@/components/site-footer";

describe("personal assistant public information", () => {
  it("identifies the OAuth app and connects the homepage to its privacy notice", () => {
    render(<AssistantLayout><AppPage /></AssistantLayout>);
    expect(screen.getByRole("heading", { level: 1, name: "jw1 개인 WIKI 비서" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "처리하는 데이터와 개인정보 안내 읽기 →" })).toHaveAttribute("href", "/apps/jw1/privacy");
    expect(screen.getByRole("navigation", { name: "앱 안내" })).toBeInTheDocument();
    expect(document.querySelector("form")).toBeNull();
  });

  it("explains Google permissions and approval before writes", () => {
    render(<AppPage />);
    expect(screen.getByRole("heading", { name: "Google 연결은 왜 필요한가요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "변경 전에는 확인과 승인을 받습니다" })).toBeInTheDocument();
    expect(document.body.textContent).toContain("전체 파일의 조회·관리");
    expect(document.body.textContent).toContain("OpenAI");
    expect(document.body.textContent).toContain("WIKI 문서 스냅샷");
  });

  it("discloses external AI processing and recovery copies without promising automatic erasure", () => {
    render(<PrivacyPage />);
    const body = document.body.textContent ?? "";
    for (const fact of ["OpenAI", "Telegram", "Oracle Cloud", "WIKI 문서 스냅샷", "승인 기록", "복구 백업"])
      expect(body).toContain(fact);
    expect(body).toContain("모든 사본에 동일한 자동 삭제 기간을 적용하고 있지는 않습니다");
    expect(body).toContain("이미 저장된 운영 자료를 자동으로 지우지는 않습니다");
  });

  it("offers connection revocation and a reachable contact", () => {
    render(<PrivacyPage />);
    expect(screen.getByRole("link", { name: "Google 계정의 연결된 앱 관리" })).toHaveAttribute("href", "https://myaccount.google.com/connections");
    expect(screen.getByRole("link", { name: "jwkim6166@gmail.com" })).toHaveAttribute("href", "mailto:jwkim6166@gmail.com");
    expect(screen.getByRole("heading", { name: "이용 안내" })).toHaveAttribute("id", "privacy-usage");
    expect(document.querySelector("#usage")).not.toBeNull();
  });

  it("makes both new pages discoverable from the existing site footer", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "개인 비서 소개" })).toHaveAttribute("href", "/apps/jw1");
    expect(screen.getByRole("link", { name: "개인정보 안내" })).toHaveAttribute("href", "/apps/jw1/privacy");
    expect(screen.getByRole("link", { name: "jwkim6166@gmail.com" })).toBeInTheDocument();
  });

  it("uses app-specific search and sharing metadata", () => {
    expect(appMetadata.title).toBe("jw1 개인 WIKI 비서 | 김진우");
    expect(privacyMetadata.title).toBe("개인정보 안내 | jw1 개인 WIKI 비서");
    expect(appMetadata.description).toContain("Google Calendar");
    expect(privacyMetadata.description).toContain("삭제 요청");
  });

  it("keeps operational identifiers and credential material out of public copy", () => {
    render(<><AppPage /><PrivacyPage /></>);
    expect(document.body.textContent).not.toMatch(/\/srv\/|refresh_token|client_secret|63414673652|144\.24\.92\.159|\.apps\.googleusercontent\.com/);
  });
});

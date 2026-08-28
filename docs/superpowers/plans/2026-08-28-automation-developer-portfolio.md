# Automation Developer Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 김진우의 실제 경력과 다섯 프로젝트를 보여주는 미니멀한 취업·이직용 포트폴리오를 구축하고, 검증 후 사용자 승인에 따라 배포한다.

**Architecture:** `@openai/create-sites@0.3.0`으로 생성한 Vinext·React·TypeScript 단일 사이트를 사용한다. 홈, 정적 프로젝트 상세 경로, 소개 페이지를 App Router로 구성하고 프로젝트와 프로필 콘텐츠는 타입이 있는 정적 데이터 모듈에서 공급한다. 서버 데이터베이스, CMS, 인증과 런타임 API는 추가하지 않는다.

**Tech Stack:** Vinext, React, TypeScript, Tailwind CSS, shadcn, Vitest, Testing Library, Noto Sans KR, OpenAI Sites

**Spec:** `docs/superpowers/specs/2026-08-28-automation-developer-portfolio-design.md`

## Global Constraints

- 프로젝트 초기화는 `npm create --yes @openai/sites@0.3.0 . -- --yes --add-ons shadcn --install`을 정확히 사용한다.
- 색상은 `#FAFAF8`, `#DADADA`, `#B0B3B8`, `#43464B`, `#0F1012`만 사용한다.
- 기본 서체는 Google Fonts의 `Noto Sans KR`이며 `Noto Sans KR`, `Noto Sans`, system-ui, sans-serif 순서로 폴백한다.
- `#B0B3B8`는 작은 필수 텍스트에 사용하지 않는다. 날짜, 역할, 기술, 링크는 `#43464B` 이상을 사용한다.
- 프로필 자산은 `docs/superpowers/specs/assets/jinwoo-profile-reference.png` 원본을 복사해 사용하며 재생성하지 않는다.
- 실제 이력서에 없는 성과 수치를 만들지 않는다.
- 공개 이메일은 `jwkim6166@gmail.com`만 사용하고 전화번호 `010-3515-6166`은 사이트 코드와 출력물에 포함하지 않는다.
- GitHub URL이나 이력서 파일이 없으면 해당 링크 또는 버튼을 렌더링하지 않는다.
- 최소 320px 너비에서 수평 스크롤 없이 읽을 수 있어야 한다.
- 프로덕션 배포는 최종 로컬 결과를 사용자에게 보여주고 명시적 승인을 받은 뒤에만 수행한다.

---

## File Map

- `app/layout.tsx`: 전역 메타데이터, Noto Sans KR 로딩, SiteHeader·SiteFooter 배치
- `app/globals.css`: 다섯 색상 토큰, 타이포그래피, 포커스, 반응형 전역 규칙
- `app/page.tsx`: 홈 조합
- `app/about/page.tsx`: 소개 페이지 조합
- `app/projects/[slug]/page.tsx`: 프로젝트 상세와 정적 경로 생성
- `app/not-found.tsx`: 알 수 없는 프로젝트와 경로의 404 화면
- `components/site-header.tsx`: 전역 내비게이션
- `components/site-footer.tsx`: 이메일과 선택적 외부 링크
- `components/profile-portrait.tsx`: 승인된 프로필 이미지
- `components/project-list.tsx`: 대표·추가 프로젝트 목록
- `components/project-row.tsx`: 한 프로젝트의 링크 행
- `components/project-meta.tsx`: 기간·역할·기술·채널
- `components/impact-metrics.tsx`: 검증된 수치만 표시
- `components/case-study-section.tsx`: 문제·해결·결과 섹션
- `components/process-steps.tsx`: 프로젝트 처리 흐름
- `components/career-timeline.tsx`: 경력과 학력
- `components/skill-groups.tsx`: 기술 그룹
- `content/projects.ts`: 다섯 프로젝트의 정적 타입 데이터와 조회 함수
- `content/profile.ts`: 이름, 소개, 경력, 학력, 기술, 공개 이메일
- `public/jinwoo-profile.png`: 승인된 프로필 이미지
- `public/og.png`: 사이트 전체 소셜 미리보기
- `tests/content/projects.test.ts`: 프로젝트 데이터 무결성
- `tests/components/site-shell.test.tsx`: 헤더·푸터·개인정보 경계
- `tests/pages/home.test.tsx`: 홈 콘텐츠와 링크
- `tests/pages/project-detail.test.tsx`: 상세 구조와 404 조회 계약
- `tests/pages/about.test.tsx`: 소개·경력·기술·프로필
- `vitest.config.ts`: jsdom 테스트 설정
- `tests/setup.ts`: Testing Library DOM matcher 설정

---

### Task 1: Scaffold, Test Harness, and Theme Foundation

**Files:**
- Create through scaffold: `package.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.openai/hosting.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Test: `tests/theme-contract.test.ts`

**Interfaces:**
- Consumes: 승인된 설계 문서와 전역 제약
- Produces: `npm test`, `npm run build`, CSS 토큰 `--canvas`, `--line`, `--muted`, `--secondary`, `--ink`

- [ ] **Step 1: Initialize the Sites project once**

Run:

```powershell
npm create --yes @openai/sites@0.3.0 . -- --yes --add-ons shadcn --install
```

Expected: `package.json`, `app`, `.openai/hosting.json`이 생성되고 의존성 설치가 성공한다. 동일 디렉터리에서 초기화 명령을 두 번 실행하지 않는다.

- [ ] **Step 2: Add the test dependencies and script**

Run:

```powershell
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
npm pkg set scripts.test="vitest run"
```

Expected: `package.json`에 `test` 스크립트와 네 테스트 의존성이 존재한다.

- [ ] **Step 3: Write the failing theme contract test**

Create `tests/theme-contract.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("portfolio theme", () => {
  it("defines only the approved palette and Noto Sans KR", () => {
    const css = readFileSync("app/globals.css", "utf8");
    for (const hex of ["#FAFAF8", "#DADADA", "#B0B3B8", "#43464B", "#0F1012"]) {
      expect(css.toUpperCase()).toContain(hex);
    }
    expect(css).toContain('"Noto Sans KR"');
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test -- tests/theme-contract.test.ts`

Expected: FAIL because the starter stylesheet does not define the approved tokens and font stack.

- [ ] **Step 5: Configure Vitest and the exact theme tokens**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: { environment: "jsdom", setupFiles: ["./tests/setup.ts"] },
});
```

Create `tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Replace generated theme values in `app/globals.css` with:

```css
:root {
  --canvas: #FAFAF8;
  --line: #DADADA;
  --muted: #B0B3B8;
  --secondary: #43464B;
  --ink: #0F1012;
}

html { background: var(--canvas); color: var(--ink); }
body {
  margin: 0;
  background: var(--canvas);
  color: var(--ink);
  font-family: "Noto Sans KR", "Noto Sans", system-ui, sans-serif;
}
* { box-sizing: border-box; }
a { color: inherit; }
:focus-visible { outline: 2px solid var(--ink); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; }
}
```

In `app/layout.tsx`, add the Google Fonts stylesheet with `display=swap`:

```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
  />
</head>
```

- [ ] **Step 6: Run tests and the starter build**

Run: `npm test -- tests/theme-contract.test.ts`

Expected: PASS.

Run: `npm run build`

Expected: build exits with code 0.

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json app vitest.config.ts tests/setup.ts tests/theme-contract.test.ts .openai/hosting.json
git commit -m "chore: scaffold portfolio foundation"
```

---

### Task 2: Typed Portfolio Content

**Files:**
- Create: `content/projects.ts`
- Create: `content/profile.ts`
- Test: `tests/content/projects.test.ts`

**Interfaces:**
- Consumes: no application module
- Produces: `Project`, `ProjectMetric`, `projects`, `featuredProjects`, `additionalProjects`, `getProjectBySlug(slug: string): Project | undefined`, `profile`

- [ ] **Step 1: Write the failing content integrity test**

Create `tests/content/projects.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { additionalProjects, featuredProjects, getProjectBySlug, projects } from "@/content/projects";
import { profile } from "@/content/profile";

describe("portfolio content", () => {
  it("contains five unique projects split 3 and 2", () => {
    expect(projects).toHaveLength(5);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(5);
    expect(featuredProjects).toHaveLength(3);
    expect(additionalProjects).toHaveLength(2);
  });

  it("resolves every slug and includes required case-study fields", () => {
    for (const project of projects) {
      expect(getProjectBySlug(project.slug)).toEqual(project);
      expect(project.problem.length).toBeGreaterThan(20);
      expect(project.solution.length).toBeGreaterThan(20);
      expect(project.result.length).toBeGreaterThan(20);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it("publishes email but never a phone number", () => {
    expect(profile.email).toBe("jwkim6166@gmail.com");
    expect(JSON.stringify(profile)).not.toMatch(/010[- ]?3515[- ]?6166/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/content/projects.test.ts`

Expected: FAIL because `content/projects.ts` and `content/profile.ts` do not exist.

- [ ] **Step 3: Define exact content types and data**

Create the following public contracts in `content/projects.ts`:

```ts
export type ProjectMetric = { value: string; label: string };
export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  context: string;
  stack: string[];
  summary: string;
  problem: string;
  solution: string;
  result: string;
  steps: { label: string; detail: string }[];
  metrics: ProjectMetric[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "excel-data-converter",
    title: "Excel 데이터 변환 자동화 프로그램",
    period: "2026.02 — 현재",
    role: "기획 · 설계 · 개발",
    context: "HIAIR KOREA MES / WinForms 업무",
    stack: ["Python", "PySide6", "Excel"],
    summary: "사용자가 헤더와 변환 규칙을 설정하고 저장·재사용할 수 있는 Excel 데이터 변환 도구입니다.",
    problem: "반복되는 Excel 데이터 변환에서 파일마다 헤더와 규칙이 달라 수작업 설정이 계속 필요했습니다.",
    solution: "사용자가 헤더와 변환 규칙을 직접 설정하고 저장한 뒤 다음 작업에서 재사용할 수 있는 PySide6 프로그램을 개발했습니다.",
    result: "개인에게 의존하던 반복 변환 절차를 재사용 가능한 도구로 표준화했습니다. 확인되지 않은 시간 절감 수치는 표시하지 않습니다.",
    steps: [
      { label: "입력", detail: "원본 Excel과 헤더 선택" },
      { label: "규칙", detail: "변환 규칙 설정 또는 불러오기" },
      { label: "검증", detail: "변환 전 결과 확인" },
      { label: "출력", detail: "변환 파일 생성" },
    ],
    metrics: [],
    featured: true,
  },
  {
    slug: "wiki-knowledge-system",
    title: "LLM 기반 개인 지식 관리 시스템",
    period: "2026.07 — 현재",
    role: "기획 · 설계 · 개발",
    context: "개인 프로젝트",
    stack: ["Telegram", "n8n", "OpenAI Agents SDK", "Python", "Markdown"],
    summary: "모바일 기록부터 WIKI 검색과 출처 기반 답변까지 연결한 개인 지식 관리 시스템입니다.",
    problem: "Markdown WIKI가 늘면서 모바일 기록과 검색 흐름이 분리됐고 기존 질의 응답에는 약 80초에서 2분이 필요했습니다.",
    solution: "Telegram 입력, n8n 라우팅, WIKI 질의 API, 키워드·가중치 검색과 Agents SDK Tool Calling을 연결했습니다.",
    result: "초기 질의 응답을 실측 10.3초, 동일 흐름 재실행을 1.02초까지 단축하고 조회 문서와 출처를 포함한 답변을 제공했습니다.",
    steps: [
      { label: "입력", detail: "Telegram 기록 또는 질문" },
      { label: "라우팅", detail: "n8n 명령 분기" },
      { label: "검색", detail: "WIKI 질의 API와 문서 조회" },
      { label: "응답", detail: "근거와 출처를 포함한 답변" },
    ],
    metrics: [
      { value: "10.3초", label: "초기 질의 응답" },
      { value: "1.02초", label: "재실행 응답" },
    ],
    featured: true,
  },
  {
    slug: "academic-transfer-workflow",
    title: "학사 전과 업무 프로세스 시스템",
    period: "2024.07 — 2026.02",
    role: "업무 화면 · 권한 제어 · 데이터 연계 개발",
    context: "울산대학교 학사·입학 시스템",
    stack: ["C#", "ASP.NET WebForms", "DevExpress", "MSSQL", "Stored Procedure"],
    summary: "전과 신청부터 확정까지의 단계와 상태별 권한을 한 화면에서 처리하는 학사 업무 시스템입니다.",
    problem: "신청, 접수, 심사, 확정 단계와 상태별 수정 권한을 하나의 업무 화면에서 안전하게 처리해야 했습니다.",
    solution: "업무를 7개 탭으로 구성하고 신청·접수·반려·확정 상태에 따라 수정 권한과 처리 기능을 제어했습니다.",
    result: "여러 단계로 이어지는 전과 업무와 권한 규칙을 하나의 시스템 흐름으로 구성했습니다. 확인되지 않은 처리 시간 수치는 표시하지 않습니다.",
    steps: [
      { label: "신청", detail: "신청 데이터 입력과 검증" },
      { label: "접수", detail: "담당자 접수와 상태 변경" },
      { label: "심사", detail: "심사 결과와 반려 제어" },
      { label: "확정", detail: "확정 이후 수정 제한" },
    ],
    metrics: [],
    featured: true,
  },
  {
    slug: "excel-export-optimization",
    title: "고해상도 이미지 Excel Export 성능 개선",
    period: "2026.02 — 현재",
    role: "원인 분석 · 성능 개선",
    context: "HIAIR KOREA MES / WinForms 업무",
    stack: ["C#", ".NET", "WinForms", "Excel Export", "Stream"],
    summary: "고해상도 이미지가 포함된 Excel Export의 메모리 부족과 처리 지연을 개선한 사례입니다.",
    problem: "4,500px 이상, 약 3.6MB의 이미지가 다수 포함된 Excel Export에서 메모리 부족과 처리 지연이 발생했습니다.",
    solution: "이미지를 400px로 사전 리사이징하고 메모리 복사를 줄이기 위해 Stream 기반으로 로딩했습니다.",
    result: "파일 용량과 생성 시간을 줄였습니다. 실제 감소율을 확인하지 않았으므로 개선 비율은 표시하지 않습니다.",
    steps: [
      { label: "분석", detail: "이미지 크기와 메모리 사용 확인" },
      { label: "축소", detail: "400px 사전 리사이징" },
      { label: "로딩", detail: "Stream 기반 이미지 처리" },
      { label: "출력", detail: "Excel 생성 결과 확인" },
    ],
    metrics: [],
    featured: false,
  },
  {
    slug: "lg-voc-dashboard",
    title: "LG전자 소비자 VoC 라벨링 및 시각화 시스템",
    period: "2023.02 — 2024.04",
    role: "라벨링 · 시각화 · 이관 · 배포",
    context: "Django 기반 VoC 분석 프로젝트",
    stack: ["Django", "JavaScript", "D3.js", "SQL"],
    summary: "대규모 소비자 리뷰를 라벨링하고 시각화해 사내 시스템으로 이관한 데이터 프로젝트입니다.",
    problem: "약 20만 건의 리뷰에 대한 라벨링, 시각화, 탭 전환 시 렌더링 상태 관리와 사내 시스템 이관이 필요했습니다.",
    solution: "3~4만 건을 직접 라벨링하고 워드클라우드·도넛·바 차트를 구현했으며 D3.js SVG 중복 생성과 이벤트 구조를 개선했습니다.",
    result: "DB 데이터 이관, 사내 서버 배포, 담당자 시연과 내부 시스템 이관까지 수행했습니다. 확인되지 않은 성능 수치는 표시하지 않습니다.",
    steps: [
      { label: "라벨링", detail: "리뷰 데이터 분류" },
      { label: "시각화", detail: "워드클라우드와 차트 구현" },
      { label: "개선", detail: "SVG와 이벤트 상태 정리" },
      { label: "이관", detail: "DB와 사내 서버 배포" },
    ],
    metrics: [],
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const additionalProjects = projects.filter((project) => !project.featured);
export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
```

Create `content/profile.ts` with this contract:

```ts
export const profile = {
  nameKo: "김진우",
  nameEn: "Jinwoo Kim",
  role: "Business Automation Developer",
  headline: "복잡한 업무를 단순한 시스템으로.",
  email: "jwkim6166@gmail.com",
  intro: "MES·QMS 등 실제 업무 시스템을 개발·운영하며 반복 작업과 비효율을 개선해 왔습니다. 기술 자체보다 현장의 문제를 정확히 정의하고, 자동화가 실제 업무에 정착하도록 만드는 과정을 중요하게 생각합니다.",
  experience: [{ period: "2024.07 — 현재", organization: "(주)하이텍정보시스템", description: "Software Developer · MES, QMS, 학사·입학 업무 시스템 개발" }],
  education: [{ period: "2018.03 — 2024.02", organization: "동의대학교", description: "산업ICT기술공학과 · 학사" }],
  skills: {
    Languages: ["C#", "TypeScript", "JavaScript", "Python", "SQL"],
    "Web & Desktop": ["React", "ASP.NET WebForms", "Django", ".NET Framework", "WinForms", "DevExpress"],
    "Data & Integration": ["MSSQL", "Stored Procedure", "REST API"],
    "AI & Automation": ["OpenAI API", "OpenAI Agents SDK", "n8n", "Tool Calling", "Excel Automation"],
  },
} as const;
```

- [ ] **Step 4: Run the content tests**

Run: `npm test -- tests/content/projects.test.ts`

Expected: PASS with 3 tests.

- [ ] **Step 5: Commit**

```powershell
git add content tests/content
git commit -m "feat: add typed portfolio content"
```

---

### Task 3: Global Shell and Privacy Boundary

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Test: `tests/components/site-shell.test.tsx`

**Interfaces:**
- Consumes: `profile.email`, route paths `/`, `/about`, `/#contact`
- Produces: `SiteHeader(): JSX.Element`, `SiteFooter(): JSX.Element`

- [ ] **Step 1: Write the failing shell test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

describe("site shell", () => {
  it("renders the main navigation and public email", () => {
    render(<><SiteHeader /><SiteFooter /></>);
    expect(screen.getByRole("link", { name: "JINWOO KIM" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/#work");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "jwkim6166@gmail.com" })).toHaveAttribute("href", "mailto:jwkim6166@gmail.com");
    expect(document.body.textContent).not.toMatch(/010[- ]?3515[- ]?6166/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/components/site-shell.test.tsx`

Expected: FAIL because shell components do not exist.

- [ ] **Step 3: Implement semantic header and footer**

Use a `<header>` containing a labeled `<nav>` and a `<footer id="contact">`. Render only the email action; do not create GitHub or resume controls. Add SiteHeader and SiteFooter around `{children}` in `app/layout.tsx`. Set metadata title to `김진우 | 업무 자동화 개발자` and description to `업무 시스템과 AI 워크플로로 반복 업무와 운영 병목을 개선하는 개발자 김진우의 포트폴리오`.

- [ ] **Step 4: Run the shell test and build**

Run: `npm test -- tests/components/site-shell.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: exit code 0.

- [ ] **Step 5: Commit**

```powershell
git add app/layout.tsx components/site-header.tsx components/site-footer.tsx tests/components/site-shell.test.tsx
git commit -m "feat: add portfolio site shell"
```

---

### Task 4: Home Page and First Meaningful Preview

**Files:**
- Modify: `app/page.tsx`
- Create: `components/profile-portrait.tsx`
- Create: `components/project-list.tsx`
- Create: `components/project-row.tsx`
- Create: `tests/pages/home.test.tsx`
- Create: `public/jinwoo-profile.png`

**Interfaces:**
- Consumes: `profile`, `featuredProjects`, `additionalProjects`, `Project`
- Produces: `ProfilePortrait({ className? }: { className?: string }): JSX.Element`, `ProjectRow({ project }: { project: Project }): JSX.Element`, `ProjectList({ title, projects }: { title: string; projects: Project[] }): JSX.Element`

- [ ] **Step 1: Copy the approved image**

Run:

```powershell
Copy-Item -LiteralPath 'docs\superpowers\specs\assets\jinwoo-profile-reference.png' -Destination 'public\jinwoo-profile.png'
```

Expected: the copied file remains a 480×480 PNG with alpha transparency.

- [ ] **Step 2: Write the failing home test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("home page", () => {
  it("shows identity, portrait, and all five project links", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1, name: /복잡한 업무를/ })).toBeInTheDocument();
    expect(screen.getByAltText("노트북으로 작업하는 김진우 개발자 캐릭터")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /프로젝트 보기/ })).toHaveLength(5);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- tests/pages/home.test.tsx`

Expected: FAIL because the starter home does not contain the approved portfolio.

- [ ] **Step 4: Implement the bounded home slice**

Implement the final home structure immediately: two-column hero, ProfilePortrait, featured list of 3 and additional list of 2. Every ProjectRow wraps its visible title and a visually hidden `프로젝트 보기` phrase in an anchor to `/projects/${project.slug}`. Use only the five CSS tokens and divider-based grouping; do not use decorative cards or gradients.

ProfilePortrait must render:

```tsx
<img
  src="/jinwoo-profile.png"
  width={480}
  height={480}
  alt="노트북으로 작업하는 김진우 개발자 캐릭터"
/>
```

- [ ] **Step 5: Run the home test**

Run: `npm test -- tests/pages/home.test.tsx`

Expected: PASS.

- [ ] **Step 6: Start and hand off the first meaningful preview**

Run `npm run dev` in a retained session. Use one lightweight request to the exact printed local URL and require a non-error response. Open that URL once in Codex and keep the same browser tab for later HMR. Do not perform screenshots or browser QA.

Expected: the user sees the actual identity, approved palette, profile image and five project links; no starter content remains.

- [ ] **Step 7: Commit**

```powershell
git add app/page.tsx components/profile-portrait.tsx components/project-list.tsx components/project-row.tsx tests/pages/home.test.tsx public/jinwoo-profile.png
git commit -m "feat: build portfolio home page"
```

---

### Task 5: Project Case-Study Routes

**Files:**
- Create: `app/projects/[slug]/page.tsx`
- Create: `app/not-found.tsx`
- Create: `components/project-meta.tsx`
- Create: `components/impact-metrics.tsx`
- Create: `components/case-study-section.tsx`
- Create: `components/process-steps.tsx`
- Test: `tests/pages/project-detail.test.tsx`

**Interfaces:**
- Consumes: `Project`, `projects`, `getProjectBySlug`
- Produces: `generateStaticParams(): { slug: string }[]`, `ProjectMeta({ project }: { project: Project })`, `ImpactMetrics({ metrics }: { metrics: ProjectMetric[] })`, `CaseStudySection({ index, label, title, children })`, `ProcessSteps({ steps }: { steps: Project["steps"] })`

- [ ] **Step 1: Write failing project route contract tests**

```tsx
import { describe, expect, it } from "vitest";
import { generateStaticParams } from "@/app/projects/[slug]/page";
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
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/pages/project-detail.test.tsx`

Expected: FAIL because the dynamic route does not exist.

- [ ] **Step 3: Implement static params and not-found handling**

In `app/projects/[slug]/page.tsx`, generate params from `projects`. Resolve the route with `getProjectBySlug`; call framework `notFound()` when undefined. Render overview, Problem, Solution, Process and Result using the shared components. Render ImpactMetrics only when `metrics.length > 0`.

In `app/not-found.tsx`, render a concise heading, explanation and link back to `/`.

- [ ] **Step 4: Render item-specific metadata**

Export `generateMetadata` from the dynamic route. Title format: `${project.title} | Jinwoo Kim`. Description uses `project.summary`. Clear inherited Open Graph and X images for detail pages because the project data has no primary image.

- [ ] **Step 5: Run route tests and build all paths**

Run: `npm test -- tests/pages/project-detail.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: all five project routes compile and the build exits 0.

- [ ] **Step 6: Commit**

```powershell
git add app/projects app/not-found.tsx components/project-meta.tsx components/impact-metrics.tsx components/case-study-section.tsx components/process-steps.tsx tests/pages/project-detail.test.tsx
git commit -m "feat: add project case studies"
```

---

### Task 6: About Page

**Files:**
- Create: `app/about/page.tsx`
- Create: `components/career-timeline.tsx`
- Create: `components/skill-groups.tsx`
- Test: `tests/pages/about.test.tsx`

**Interfaces:**
- Consumes: `profile`, `ProfilePortrait`
- Produces: `CareerTimeline({ experience, education })`, `SkillGroups({ skills })`, default `AboutPage`

- [ ] **Step 1: Write the failing about-page test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "@/app/about/page";

describe("about page", () => {
  it("shows profile, career, education, and skill groups", () => {
    render(<AboutPage />);
    expect(screen.getByRole("heading", { level: 1, name: /업무의 병목을 찾고/ })).toBeInTheDocument();
    expect(screen.getByText("(주)하이텍정보시스템")).toBeInTheDocument();
    expect(screen.getByText("동의대학교")).toBeInTheDocument();
    expect(screen.getByText("AI & Automation")).toBeInTheDocument();
    expect(screen.getByText(/HWASHIN QMS/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/pages/about.test.tsx`

Expected: FAIL because the about page does not exist.

- [ ] **Step 3: Implement the approved About composition**

Use the same ProfilePortrait component at a larger visual size. Render profile intro, career, education, four skill groups and a short supporting experience paragraph for `HWASHIN QMS 업무 시스템 개발`. The final contact area links to `mailto:jwkim6166@gmail.com`; do not render phone, GitHub, or resume download.

- [ ] **Step 4: Run test and build**

Run: `npm test -- tests/pages/about.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: exit code 0.

- [ ] **Step 5: Commit**

```powershell
git add app/about components/career-timeline.tsx components/skill-groups.tsx tests/pages/about.test.tsx
git commit -m "feat: add portfolio about page"
```

---

### Task 7: Social Preview and Site Metadata

**Files:**
- Create: `public/og.png`
- Modify: `app/layout.tsx`
- Test: `tests/metadata.test.ts`

**Interfaces:**
- Consumes: site title, description, approved palette, deployment origin
- Produces: root Open Graph and X metadata using `/og.png`

- [ ] **Step 1: Write a failing metadata source test**

Create `tests/metadata.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("root metadata", () => {
  it("defines site-specific Open Graph and X fields", () => {
    const layout = readFileSync("app/layout.tsx", "utf8");
    expect(layout).toContain("김진우 | 업무 자동화 개발자");
    expect(layout).toContain("/og.png");
    expect(layout).toContain("openGraph");
    expect(layout).toContain("twitter");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/metadata.test.ts`

Expected: FAIL because root social metadata and `public/og.png` are absent.

- [ ] **Step 3: Generate one branded social preview**

After the first meaningful preview and stable copy, use exactly one image-generation subagent as required by the Sites workflow. Its brief must request a clean 1200×630 landscape card using only the five approved colors and the exact visible text `김진우` and `업무 자동화 개발자`. It must make one image-generation request, save outside the site checkout, return the path, and must not call Sites tools, edit site source, initialize a site, or spawn another agent.

Inspect the returned image for exact Korean text. Retry once only if text is incorrect or unusable. Copy the accepted image to `public/og.png`.

- [ ] **Step 4: Wire root metadata**

Add root Open Graph and X title, description and `/og.png` to `app/layout.tsx`. Build absolute image URLs from a trusted configured site origin or deployment origin, never from an unvalidated forwarded host header.

- [ ] **Step 5: Run metadata test and build**

Run: `npm test -- tests/metadata.test.ts`

Expected: PASS.

Run: `npm run build`

Expected: exit code 0 with `public/og.png` included.

- [ ] **Step 6: Commit**

```powershell
git add public/og.png app/layout.tsx tests/metadata.test.ts
git commit -m "feat: add portfolio social preview"
```

---

### Task 8: Responsive, Accessibility, and Release Validation

**Files:**
- Modify: `app/globals.css`
- Modify: `app/page.tsx`, `app/about/page.tsx`, `app/projects/[slug]/page.tsx`
- Modify: `components/project-list.tsx`, `components/project-row.tsx`, `components/project-meta.tsx`, `components/process-steps.tsx`
- Create: `tests/release-contract.test.ts`

**Interfaces:**
- Consumes: all routes and components
- Produces: verified local release candidate and a deployment approval checkpoint

- [ ] **Step 1: Write the release contract test**

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("release privacy and responsive contract", () => {
  it("excludes the private phone number from source content", () => {
    const files = ["content/profile.ts", "content/projects.ts", "app/page.tsx", "app/about/page.tsx"];
    const source = files.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(source).not.toMatch(/010[- ]?3515[- ]?6166/);
  });

  it("contains the mobile breakpoint and reduced-motion rule", () => {
    const css = readFileSync("app/globals.css", "utf8");
    expect(css).toContain("@media (max-width: 640px)");
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
```

- [ ] **Step 2: Run the test to verify any missing release rule fails**

Run: `npm test -- tests/release-contract.test.ts`

Expected: FAIL if the final mobile breakpoint or privacy contract is absent.

- [ ] **Step 3: Complete responsive and focus styles**

Add an explicit `@media (max-width: 640px)` block that stacks home/about heroes, converts project detail metadata and process steps to one or two columns, hides no essential text, and sets all content containers to `max-width: 1120px; width: min(100% - 48px, 1120px)`. At 320px, reduce the side gutter to 20px. Keep visible focus outlines from Task 1.

- [ ] **Step 4: Run the complete automated verification**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: build exits 0.

Ensure the retained dev server is running, then request these routes without inspecting bodies:

```text
/
/about
/projects/excel-data-converter
/projects/wiki-knowledge-system
/projects/academic-transfer-workflow
/projects/excel-export-optimization
/projects/lg-voc-dashboard
/projects/missing-project
```

Expected: the first seven routes return non-error responses and the missing project returns 404.

- [ ] **Step 5: Present the local release candidate and stop for approval**

Show the user the existing browser tab with the completed site. Report the exact automated checks and state that phone, GitHub and resume download are omitted. Ask whether to deploy. Do not call any deployment mutation before the user answers yes.

- [ ] **Step 6: Commit the validated release candidate**

```powershell
git add app components content public tests package.json package-lock.json vitest.config.ts
git commit -m "test: verify portfolio release"
```

- [ ] **Step 7: Publish only after approval**

After explicit approval, push the exact current commit to the configured source branch, package the successful build output with the Sites hosting helper, save a Sites version using that commit SHA, deploy the saved version, and inspect deployment status until terminal. Return the production URL and stop the retained local dev server.

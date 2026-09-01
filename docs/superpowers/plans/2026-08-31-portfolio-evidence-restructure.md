# 증거 중심 포트폴리오 개편 구현 계획

> **에이전트 작업자 필수:** 이 계획은 `superpowers:subagent-driven-development`(추천) 또는 `superpowers:executing-plans`를 사용해 작업별로 실행한다. 모든 진행 단계는 체크박스로 추적한다.

**목표:** AI 전략·업무자동화 직무 지원자가 첫 화면과 프로젝트 상세 페이지에서 문제 발견, 자동화 구조, 검증 결과와 증거 한계를 빠르게 확인할 수 있도록 포트폴리오를 개편한다.

**구조:** `site/content/projects.ts`를 단일 데이터 기준으로 유지하면서 프로젝트 데이터를 증거 중심 타입으로 확장한다. 홈, 프로젝트 상세, About은 이 타입을 소비하는 작은 컴포넌트로 구성하고 근거가 없는 선택형 섹션은 렌더링하지 않는다.

**기술:** Vinext, React, TypeScript, Tailwind CSS, Vitest, Testing Library

**설계 문서:** `docs/superpowers/specs/2026-08-31-portfolio-evidence-restructure-design.md`

## 전체 제약 조건

- 작업 브랜치는 `codex/portfolio-evidence-restructure`를 유지한다.
- 기존 5색 팔레트와 Noto Sans KR을 유지한다.
- 신규 npm 의존성을 추가하지 않는다.
- 확인되지 않은 정량 수치, 운영 효과, 테스트 결과와 제품 화면을 만들지 않는다.
- LLM WIKI의 1.02초 재실행 원인을 캐시 또는 특정 최적화로 단정하지 않는다.
- `main` 병합, 원격 푸시와 배포는 별도 사용자 선택 전까지 수행하지 않는다.
- 제품 코드보다 실패 테스트를 먼저 작성하고 실제 실패를 확인한다.

## 파일 역할

- `site/content/projects.ts`: 프로젝트 순서, 대표·보조 구분과 모든 증거 데이터의 단일 기준
- `site/content/profile.ts`: Hero와 About에서 사용하는 정체성 문구와 경력 요약
- `site/components/project-snapshot.tsx`: 문제·역할·핵심 변화·확인 범위 요약
- `site/components/before-after.tsx`: Before/After 비교 목록
- `site/components/evidence-list.tsx`: 선택 근거·검증·한계 목록의 공통 표현
- `site/components/capability-links.tsx`: About 역량과 대표 프로젝트 연결
- `site/app/page.tsx`: 축소된 Hero, CTA, 대표 프로젝트 우선 노출
- `site/app/projects/[slug]/page.tsx`: 선택형 증거 섹션 조합
- `site/app/about/page.tsx`: 축소된 소개와 프로젝트 연결 역량
- `site/components/impact-metrics.tsx`: 3개 이상의 비교 지표를 지원하는 반응형 구조
- `site/components/profile-portrait.tsx`: 220px 홈 이미지 크기
- `site/public/og.png`: 새 대표 문장과 일치하는 소셜 미리보기

---

### 작업 1: 프로젝트 데이터와 증거 모델

**파일:**
- 수정: `site/content/projects.ts`
- 수정: `site/tests/content/projects.test.ts`

**인터페이스:**
- 제공 타입: `ProjectTier`, `ProjectSnapshot`, `ProjectComparison`, `ProjectMetric`, `Project`
- 제공 데이터: `projects`, `featuredProjects`, `additionalProjects`, `getProjectBySlug(slug)`
- 후속 작업은 `Project`의 `snapshot`, `comparison`, `discovery`, `decisions`, `system`, `verification`, `limits`, `metrics`를 사용한다.

- [ ] **1단계: 새 순서와 증거 계약을 확인하는 실패 테스트 작성**

`site/tests/content/projects.test.ts`에 다음 검증을 추가한다.

```ts
it("prioritizes AI and automation evidence", () => {
  expect(projects.map(({ slug }) => slug)).toEqual([
    "wiki-knowledge-system",
    "excel-data-converter",
    "excel-export-optimization",
    "academic-transfer-workflow",
    "lg-voc-dashboard",
  ]);
  expect(featuredProjects.map(({ slug }) => slug)).toEqual([
    "wiki-knowledge-system",
    "excel-data-converter",
    "excel-export-optimization",
  ]);
  expect(additionalProjects.map(({ slug }) => slug)).toEqual([
    "academic-transfer-workflow",
    "lg-voc-dashboard",
  ]);
});

it("stores evidence without defensive visitor-facing copy", () => {
  for (const project of projects) {
    expect(project.snapshot).toEqual({
      problem: expect.any(String),
      role: expect.any(String),
      change: expect.any(String),
      scope: expect.any(String),
    });
    expect(project.verification.length).toBeGreaterThan(0);
    expect(project.limits.length).toBeGreaterThan(0);
  }

  expect(JSON.stringify(projects)).not.toMatch(
    /확인되지 않은 .*표시하지|수치는 표시하지 않습니다/,
  );
});

it("expresses the WIKI response times as a comparison", () => {
  const wiki = getProjectBySlug("wiki-knowledge-system");
  expect(wiki?.metrics.map(({ value, label }) => ({ value, label }))).toEqual([
    { value: "약 80~120초", label: "기존 질의 흐름" },
    { value: "10.3초", label: "자동화 후 최초 실행" },
    { value: "1.02초", label: "동일 흐름 재실행" },
  ]);
  expect(wiki?.limits.join(" ")).toContain("원인을 분리 측정하지 않았습니다");
});
```

- [ ] **2단계: 실패 테스트 실행**

실행: `npm.cmd test -- tests/content/projects.test.ts`

예상 결과: 기존 순서가 Excel 변환부터 시작하고 `snapshot`과 `limits`가 없어 실패한다.

- [ ] **3단계: 증거 타입과 프로젝트 데이터 구현**

`site/content/projects.ts`의 타입을 다음 형태로 변경한다.

```ts
export type ProjectTier = "featured" | "supporting";

export type ProjectSnapshot = {
  problem: string;
  role: string;
  change: string;
  scope: string;
};

export type ProjectComparison = {
  before: string[];
  after: string[];
};

export type ProjectMetric = {
  value: string;
  label: string;
  note?: string;
};

export type ProjectStep = {
  label: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  role: string;
  context: string;
  stack: string[];
  summary: string;
  tier: ProjectTier;
  snapshot: ProjectSnapshot;
  comparison?: ProjectComparison;
  discovery?: string;
  decisions?: string[];
  system?: ProjectStep[];
  verification: string[];
  limits: string[];
  metrics: ProjectMetric[];
};
```

다섯 프로젝트를 설계 문서의 순서로 재배치하고 다음 사실을 사용한다.

| 프로젝트 | 핵심 변화 | 검증·확인 범위 | 한계 |
|---|---|---|---|
| LLM WIKI | Telegram, n8n, WIKI API, Agents SDK Tool Calling과 출처 기반 응답 연결 | 기존 약 80~120초, 최초 10.3초, 동일 흐름 재실행 1.02초 | 개인 WIKI MVP이며 재실행 단축 원인·문서 수·환경·반복 횟수는 분리 측정하지 않음 |
| Excel 변환 | 파일별 반복 변환을 사용자가 헤더·규칙을 저장하고 재사용하는 PySide6 도구로 구조화 | 헤더와 변환 규칙 설정·저장·불러오기, 변환 흐름 구현 | 처리 시간·메모리·매크로 보존·읽기 전용·자동화 테스트 수는 근거 미확인 |
| Excel Export | 4,500px 이상·약 3.6MB 이미지 처리에 400px 사전 리사이징과 Stream 로딩 적용 | 이미지 크기 조정, Stream 기반 로딩, Excel 출력 결과 확인 | 파일 크기와 생성 시간의 전후 수치는 미측정 |
| 학사 전과 | 신청부터 확정까지 7개 탭과 상태별 권한 제어 | 신청·접수·반려·확정 상태, 확정 후 수정 제한 구현 | 처리 시간과 운영 효과 수치는 미측정 |
| LG VoC | 라벨링·시각화·렌더링 개선부터 DB와 사내 시스템 이관까지 연결 | 약 3~4만 건 직접 라벨링, D3.js SVG·이벤트 개선, 이관·배포·시연 | 정량 성능 개선 수치는 미측정 |

`featuredProjects`와 `additionalProjects`는 `tier`로 필터링한다.

```ts
export const featuredProjects = projects.filter(
  (project) => project.tier === "featured",
);
export const additionalProjects = projects.filter(
  (project) => project.tier === "supporting",
);
```

- [ ] **4단계: 프로젝트 데이터 테스트 통과 확인**

실행: `npm.cmd test -- tests/content/projects.test.ts`

예상 결과: 해당 테스트 파일 전체 통과

- [ ] **5단계: 커밋**

```powershell
git add site/content/projects.ts site/tests/content/projects.test.ts
git commit -m "feat: prioritize evidence-led project data"
```

---

### 작업 2: 첫 화면의 직무 정체성과 프로젝트 노출

**파일:**
- 수정: `site/content/profile.ts`
- 수정: `site/app/page.tsx`
- 수정: `site/components/profile-portrait.tsx`
- 수정: `site/tests/pages/home.test.tsx`

**인터페이스:**
- 소비: 작업 1의 `featuredProjects`, `additionalProjects`
- 제공: `profile.headline`, `profile.role`, `ProfilePortrait({ size })`
- CTA 계약: 접근 가능한 이름 `대표 사례 보기`, 대상 `/#work`

- [ ] **1단계: Hero 실패 테스트 작성**

`site/tests/pages/home.test.tsx`에 다음 검증을 추가한다.

```ts
it("shows the AI automation positioning and work CTA", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "업무 현장의 병목을 발견하고, 자동화와 AI로 실제 사용할 수 있는 시스템을 만듭니다.",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("AI·업무자동화 개발자")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "대표 사례 보기" })).toHaveAttribute(
    "href",
    "/#work",
  );

  const hero = screen.getByTestId("home-hero");
  expect(hero.className).toContain("lg:min-h-[70vh]");
  expect(hero.className).not.toContain("min-h-[calc(100vh-80px)]");
});

it("lists the LLM WIKI project first", () => {
  render(<HomePage />);
  const projectLinks = screen.getAllByRole("link", { name: /프로젝트 보기/ });
  expect(projectLinks[0]).toHaveAttribute(
    "href",
    "/projects/wiki-knowledge-system",
  );
});
```

- [ ] **2단계: 실패 테스트 실행**

실행: `npm.cmd test -- tests/pages/home.test.tsx`

예상 결과: 새 제목, 한국어 역할, CTA와 Hero 높이 계약이 없어 실패한다.

- [ ] **3단계: 새 Hero 구현**

`site/content/profile.ts`를 다음 문구로 변경한다.

```ts
role: "AI·업무자동화 개발자",
headline:
  "업무 현장의 병목을 발견하고, 자동화와 AI로 실제 사용할 수 있는 시스템을 만듭니다.",
```

`site/app/page.tsx`의 Hero는 다음 계약을 따른다.

```tsx
<section
  data-testid="home-hero"
  className="site-container mobile-stack grid min-h-0 items-center gap-10 py-16 sm:py-20 lg:min-h-[70vh] lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:py-16"
>
  {/* 이름, 새 headline, intro */}
  <div className="mt-8 flex flex-wrap items-center gap-5">
    <a
      href="/#work"
      className="inline-flex border-b border-[var(--ink)] pb-1 text-sm font-semibold text-[var(--ink)]"
    >
      대표 사례 보기 <span aria-hidden="true">↓</span>
    </a>
    <span className="text-sm font-semibold text-[var(--secondary-ink)]">
      {profile.role}
    </span>
  </div>
  <ProfilePortrait />
</section>
```

`ProfilePortrait`의 홈 크기는 220px, About 크기는 기존 280px을 유지한다.

- [ ] **4단계: 홈 테스트 통과 확인**

실행: `npm.cmd test -- tests/pages/home.test.tsx`

예상 결과: 해당 테스트 파일 전체 통과

- [ ] **5단계: 첫 의미 있는 미리보기 확인**

실행: `Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing`

예상 결과: HTTP 200. 이후 기존 Codex 브라우저 탭을 새로고침해 새 Hero와 첫 프로젝트 노출을 사용자에게 보여준다. 이 확인 전에는 후속 제품 코드를 수정하지 않는다.

- [ ] **6단계: 커밋**

```powershell
git add site/content/profile.ts site/app/page.tsx site/components/profile-portrait.tsx site/tests/pages/home.test.tsx
git commit -m "feat: surface AI automation evidence above the fold"
```

---

### 작업 3: 증거 중심 프로젝트 상세 페이지

**파일:**
- 생성: `site/components/project-snapshot.tsx`
- 생성: `site/components/before-after.tsx`
- 생성: `site/components/evidence-list.tsx`
- 수정: `site/components/impact-metrics.tsx`
- 수정: `site/app/projects/[slug]/page.tsx`
- 수정: `site/tests/pages/project-detail.test.tsx`

**인터페이스:**
- 소비: 작업 1의 `Project`, `ProjectSnapshot`, `ProjectComparison`, `ProjectMetric`
- 제공: `ProjectSnapshotView`, `BeforeAfter`, `EvidenceList`
- 선택형 계약: 데이터가 없는 `comparison`, `discovery`, `decisions`, `system` 섹션은 DOM에 생성하지 않는다.

- [ ] **1단계: 상세 페이지 실패 테스트 작성**

`site/tests/pages/project-detail.test.tsx`에 다음 검증을 추가한다.

```ts
it("renders evidence sections for the LLM WIKI case study", async () => {
  render(await ProjectPage({ params: Promise.resolve({ slug: "wiki-knowledge-system" }) }));

  expect(screen.getByRole("heading", { name: "한눈에 보는 결과" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Before → After" })).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "문제를 어떻게 발견했는가" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "왜 이 구조를 선택했는가" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "실제 시스템" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "검증" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "적용 범위와 한계" })).toBeInTheDocument();
  expect(screen.queryByText("OVERVIEW")).not.toBeInTheDocument();
  expect(screen.getByText("약 80~120초")).toBeInTheDocument();
});

it("omits unavailable optional evidence sections", async () => {
  render(
    await ProjectPage({
      params: Promise.resolve({ slug: "academic-transfer-workflow" }),
    }),
  );

  expect(screen.getByRole("heading", { name: "한눈에 보는 결과" })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Before → After" })).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "적용 범위와 한계" })).toBeInTheDocument();
});
```

- [ ] **2단계: 실패 테스트 실행**

실행: `npm.cmd test -- tests/pages/project-detail.test.tsx`

예상 결과: 새 섹션과 컴포넌트가 없어 실패한다.

- [ ] **3단계: 요약과 비교 컴포넌트 구현**

`ProjectSnapshotView`는 네 개 항목을 반응형 그리드로 표시한다.

```tsx
export function ProjectSnapshotView({ snapshot }: { snapshot: ProjectSnapshot }) {
  const items = [
    ["문제", snapshot.problem],
    ["내 역할", snapshot.role],
    ["핵심 변화", snapshot.change],
    ["확인된 범위", snapshot.scope],
  ] as const;

  return (
    <dl className="grid border-y border-[var(--line)] sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label} className="border-b border-[var(--line)] py-6 sm:px-6 sm:odd:pl-0">
          <dt className="text-xs font-semibold tracking-[0.08em] text-[var(--secondary-ink)]">
            {label}
          </dt>
          <dd className="mt-3 text-base leading-7 text-[var(--ink)]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
```

`BeforeAfter`는 `comparison.before`와 `comparison.after`를 나란히 표시하고 모바일에서는 세로로 쌓는다. `EvidenceList`는 `items: string[]`를 받아 단순 목록으로 출력한다.

- [ ] **4단계: 상세 페이지를 선택형 섹션으로 조합**

`site/app/projects/[slug]/page.tsx`에서 기존 Overview·Problem·Solution·Result 고정 구성을 제거하고 다음 조건으로 렌더링한다.

```tsx
import type { ReactNode } from "react";

const sections: Array<{
  label: string;
  title: string;
  content: ReactNode;
}> = [
  {
    label: "SNAPSHOT",
    title: "한눈에 보는 결과",
    content: <ProjectSnapshotView snapshot={project.snapshot} />,
  },
  ...(project.comparison
    ? [{
        label: "BEFORE / AFTER",
        title: "Before → After",
        content: <BeforeAfter comparison={project.comparison} />,
      }]
    : []),
  ...(project.discovery
    ? [{
        label: "DISCOVERY",
        title: "문제를 어떻게 발견했는가",
        content: <p>{project.discovery}</p>,
      }]
    : []),
  ...(project.decisions
    ? [{
        label: "DECISIONS",
        title: "왜 이 구조를 선택했는가",
        content: <EvidenceList items={project.decisions} />,
      }]
    : []),
  ...(project.system
    ? [{
        label: "SYSTEM",
        title: "실제 시스템",
        content: <ProcessSteps steps={project.system} />,
      }]
    : []),
  {
    label: "VERIFICATION",
    title: "검증",
    content: <EvidenceList items={project.verification} />,
  },
  {
    label: "SCOPE",
    title: "적용 범위와 한계",
    content: <EvidenceList items={project.limits} />,
  },
];

{sections.map((section, index) => (
  <CaseStudySection
    key={section.title}
    index={String(index + 1).padStart(2, "0")}
    label={section.label}
    title={section.title}
  >
    {section.content}
  </CaseStudySection>
))}
```

`ImpactMetrics`는 고정 2열 대신 다음 클래스를 사용해 3개 LLM 비교 지표를 지원한다.

```tsx
className="grid border-y border-[var(--line)] sm:grid-cols-3"
```

`metric.note`가 있으면 label 아래에 작은 보조 설명을 렌더링한다.

- [ ] **5단계: 상세 페이지 테스트와 전체 관련 테스트 실행**

실행: `npm.cmd test -- tests/pages/project-detail.test.tsx tests/content/projects.test.ts`

예상 결과: 두 테스트 파일 전체 통과

- [ ] **6단계: 커밋**

```powershell
git add site/components/project-snapshot.tsx site/components/before-after.tsx site/components/evidence-list.tsx site/components/impact-metrics.tsx 'site/app/projects/[slug]/page.tsx' site/tests/pages/project-detail.test.tsx
git commit -m "feat: turn case studies into evidence narratives"
```

---

### 작업 4: About 페이지 역할 축소와 프로젝트 연결

**파일:**
- 생성: `site/components/capability-links.tsx`
- 수정: `site/content/profile.ts`
- 수정: `site/app/about/page.tsx`
- 수정: `site/tests/pages/about.test.tsx`

**인터페이스:**
- 제공: `CapabilityLink`, `CapabilityLinks({ items })`
- 각 항목: `{ title: string; description: string; href: string }`
- 링크 대상은 작업 1의 세 대표 프로젝트 경로다.

- [ ] **1단계: About 실패 테스트 작성**

`site/tests/pages/about.test.tsx`에 다음 검증을 추가한다.

```ts
it("connects three capabilities to evidence projects without duplicate contact", () => {
  render(<AboutPage />);

  expect(screen.getByRole("link", { name: /AI 업무 흐름/ })).toHaveAttribute(
    "href",
    "/projects/wiki-knowledge-system",
  );
  expect(
    screen.getByRole("link", { name: /재사용 가능한 업무 자동화/ }),
  ).toHaveAttribute("href", "/projects/excel-data-converter");
  expect(screen.getByRole("link", { name: /운영 문제 원인 분석/ })).toHaveAttribute(
    "href",
    "/projects/excel-export-optimization",
  );
  expect(screen.queryByText("SUPPORTING EXPERIENCE")).not.toBeInTheDocument();
  expect(screen.queryByText("CONTACT")).not.toBeInTheDocument();
  expect(screen.queryByText("jwkim6166@gmail.com")).not.toBeInTheDocument();
});
```

- [ ] **2단계: 실패 테스트 실행**

실행: `npm.cmd test -- tests/pages/about.test.tsx`

예상 결과: 프로젝트 연결 링크가 없고 QMS·CONTACT 섹션이 남아 있어 실패한다.

- [ ] **3단계: 역량 링크 컴포넌트와 축소된 About 구현**

`CapabilityLinks`는 다음 세 항목을 출력한다.

```ts
const capabilities = [
  {
    title: "AI 업무 흐름",
    description: "기록·검색·출처 기반 답변을 하나의 흐름으로 연결했습니다.",
    href: "/projects/wiki-knowledge-system",
  },
  {
    title: "재사용 가능한 업무 자동화",
    description: "파일별 반복 규칙을 사용자가 재사용할 수 있는 도구로 구조화했습니다.",
    href: "/projects/excel-data-converter",
  },
  {
    title: "운영 문제 원인 분석",
    description: "고해상도 이미지 처리 병목을 찾아 리사이징과 Stream 로딩으로 개선했습니다.",
    href: "/projects/excel-export-optimization",
  },
] satisfies CapabilityLink[];
```

About에서 별도 QMS 장문, 기존 `SkillGroups`, CONTACT 섹션을 제거한다. 경력 요약에는 `MES·QMS·학사 시스템 개발과 반복 업무 자동화`를 한 문장으로 남기고 학력은 한 줄로 유지한다.

- [ ] **4단계: About 테스트 통과 확인**

실행: `npm.cmd test -- tests/pages/about.test.tsx`

예상 결과: 해당 테스트 파일 전체 통과

- [ ] **5단계: 커밋**

```powershell
git add site/components/capability-links.tsx site/content/profile.ts site/app/about/page.tsx site/tests/pages/about.test.tsx
git commit -m "feat: connect about capabilities to project evidence"
```

---

### 작업 5: 소셜 미리보기와 최종 릴리스 검증

**파일:**
- 수정: `site/public/og.png`
- 수정: `site/tests/metadata.test.ts`

**인터페이스:**
- 기존 `site/app/layout.tsx`의 `/og.png` 메타데이터 계약을 유지한다.
- 결과 이미지는 1200×630 PNG이며 기존 5색 팔레트와 새 대표 문장을 사용한다.

- [ ] **1단계: 이미지 규격 회귀 테스트 추가와 메타데이터 계약 확인**

`site/tests/metadata.test.ts`에 PNG 형식과 1200×630 규격을 고정하는 테스트를 추가한다.

```ts
it("keeps the social image at 1200 by 630", () => {
  const image = readFileSync("public/og.png");

  expect(image.subarray(1, 4).toString("ascii")).toBe("PNG");
  expect(image.readUInt32BE(16)).toBe(1200);
  expect(image.readUInt32BE(20)).toBe(630);
});
```

소셜 이미지는 생성형 미디어 예외이므로 이 테스트는 새 시안의 내용 자체를 판정하지 않고 파일 계약의 회귀만 방지한다.

실행: `npm.cmd test -- tests/metadata.test.ts tests/release-contract.test.ts`

예상 결과: 기존 메타데이터와 개인정보·반응형 계약 통과. 실패하면 제품 코드를 바꾸기 전에 실제 실패 원인을 기록한다.

- [ ] **2단계: 소셜 이미지 한 번 생성**

이미지 전용 서브에이전트 한 개에 다음 제한을 포함해 요청한다.

```text
한 번의 imagegen 요청으로 1200×630 가로형 포트폴리오 소셜 이미지를 생성한다.
문구는 “업무 현장의 병목을 발견하고, 자동화와 AI로 실제 사용할 수 있는 시스템을 만듭니다.”이다.
색상은 #FAFAF8, #DADADA, #B0B3B8, #43464B, #0F1012만 사용하고 미니멀한 편집 디자인을 유지한다.
이메일·전화번호·자격증·회사 로고는 넣지 않는다.
사이트 도구 호출, 사이트 소스 수정, 별도 에이전트 생성은 금지한다.
결과는 사이트 체크아웃 외부에 저장하고 경로만 반환한다.
```

Site 소유 에이전트가 결과의 한글 문구, 팔레트와 크기를 확인하고 `site/public/og.png`로 복사한다. 문구가 틀려 사용할 수 없을 때만 한 번 재시도한다.

- [ ] **3단계: 전체 자동 검증 실행**

실행: `npm.cmd test`

예상 결과: 9개 테스트 파일과 모든 테스트 통과

실행: `npm.cmd run build`

예상 결과: Vinext 5개 빌드 단계 완료, 종료 코드 0

- [ ] **4단계: 실제 경로 확인**

다음 경로를 요청한다.

```text
/
/about
/projects/wiki-knowledge-system
/projects/excel-data-converter
/projects/excel-export-optimization
/projects/academic-transfer-workflow
/projects/lg-voc-dashboard
/projects/missing-project
```

예상 결과: 앞의 7개는 HTTP 200, 누락 프로젝트는 404

- [ ] **5단계: 브라우저 검수**

동일한 로컬 탭에서 다음을 확인한다.

- 1294×912: 스크롤 없이 Selected Work 제목 또는 첫 프로젝트 일부 노출
- 768px, 390px, 320px: 가로 넘침 없음
- 한국어 어절 중간 분리 없음
- `대표 사례 보기`와 프로젝트 링크의 키보드 포커스 표시
- LLM WIKI 상세 페이지에 결과, Before/After, 검증, 한계 표시
- 학사 전과 상세 페이지에서 근거 없는 Before/After 섹션 미표시

- [ ] **6단계: 최종 커밋**

```powershell
git add site/public/og.png site/tests/metadata.test.ts
git commit -m "chore: align social preview and release evidence"
```

- [ ] **7단계: 최종 리뷰와 사용자 비교**

브랜치 전체 diff를 독립 리뷰하고 Critical·Important 문제를 수정한다. 로컬 비교 화면을 사용자에게 보여주고 `main` 병합, PR 또는 브랜치 유지 중 하나를 선택받는다. 사용자가 별도로 요청하지 않으면 푸시와 배포를 진행하지 않는다.

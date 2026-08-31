# Portfolio Evidence Restructure Design

## Objective

Reframe the portfolio from a polished developer introduction into evidence that supports AI strategy and business-automation roles. Preserve the approved minimal visual system while making project prioritization, decision-making, validation boundaries, and measurable outcomes visible earlier.

## Audience and Primary Task

- Primary audience: hiring managers and interviewers for AI strategy, business automation, and internal-system improvement roles.
- Primary task: understand within the first viewport what problems Jinwoo Kim solves, then reach the strongest case study with one action.
- Secondary task: inspect how each project problem was discovered, why the implementation was chosen, what was verified, and where the evidence stops.

## Evidence Boundary

- Use only facts already present in the supplied resume and current portfolio content.
- Do not add the suggested 10,000-row time, memory usage, automated-test count, macro preservation, read-only behavior, or `Schema → Validation → Execution` claims until source logs are verified.
- Do not invent screenshots or imply that a personal MVP was deployed to production.
- Keep unknown measurement conditions and unresolved causes in the limitations section instead of turning them into claims.
- Remove defensive visitor-facing phrases such as “확인되지 않은 수치는 표시하지 않습니다.” Replace them with confirmed implementation facts.

## Content Model

Keep a single typed project source in `site/content/projects.ts`, but replace the mechanically repeated `problem`, `solution`, and `result` presentation with an evidence-oriented model.

Each project will contain:

- `tier`: `featured` or `supporting`.
- `snapshot`: problem, role, core change, and confirmed scope.
- `comparison`: optional Before and After bullet lists.
- `discovery`: optional explanation of how the problem surfaced.
- `decisions`: optional list of constraints, alternatives, and reasons.
- `system`: optional ordered workflow steps using the existing process component.
- `verification`: confirmed measurements or implementation checks only.
- `limits`: application scope and unresolved measurement boundaries.
- `metrics`: contextual result values; labels must identify the comparison baseline.

Optional sections are omitted when evidence is unavailable. This prevents five projects from appearing artificially identical.

## Project Priority

The canonical project order and next-project navigation will be:

1. LLM 기반 개인 지식 관리 시스템 — featured
2. Excel 데이터 변환 자동화 프로그램 — featured
3. 고해상도 이미지 Excel Export 성능 개선 — featured
4. 학사 전과 업무 프로세스 시스템 — supporting
5. LG전자 소비자 VoC 라벨링 및 시각화 시스템 — supporting

The Excel Export project remains third until verified before/after file-size or generation-time measurements are available.

## Home Page

### Hero

- Replace the headline with: `업무 현장의 병목을 발견하고, 자동화와 AI로 실제 사용할 수 있는 시스템을 만듭니다.`
- Replace the English-only role with `AI·업무자동화 개발자`.
- Set the hero minimum height to 70vh on desktop and remove the minimum-height constraint on mobile.
- Reduce the home portrait from 260px to 220px.
- Add a clear `대표 사례 보기` anchor linking to `#work`.
- Preserve the current five-color palette, Noto Sans KR, typography character, borders, and restrained motion.

### First-Viewport Evidence

At a 1294×912 desktop viewport, the selected-work heading or the beginning of the first project row must be visible without scrolling. The first listed project must be the LLM WIKI case study.

## Project Detail Page

Remove the duplicated Overview section. Render the following sequence, omitting unavailable optional sections:

1. `한눈에 보는 결과`
   - Problem
   - My role
   - Core change
   - Confirmed scope
2. `Before → After`
3. `문제를 어떻게 발견했는가`
4. `왜 이 구조를 선택했는가`
5. `실제 시스템`
   - Reuse the existing workflow-step component as a code-native process diagram.
   - Do not add fabricated product screenshots.
6. `검증`
7. `적용 범위와 한계`

The page must distinguish implementation facts, measured results, and unverified operational impact.

## LLM WIKI Evidence

Display the timing evidence as a comparison rather than two isolated numbers:

- 기존 질의 흐름: 약 80–120초
- 자동화 후 최초 실행: 10.3초
- 동일 흐름 재실행: 1.02초

State that these values belong to a personal WIKI MVP. Do not attribute the 1.02-second rerun to caching or a particular optimization because the cause was not separately measured. Document count, environment, and repeat count remain evidence gaps.

## Excel Automation Evidence

Describe only the confirmed transition:

- Before: file-specific transformation work required repeated manual adjustment.
- After: users can configure, save, and reload headers and transformation rules in a reusable PySide6 tool.

Do not add performance, memory, macro-preservation, read-only, validation-pipeline, or automated-test claims without source verification.

## Other Result Copy

- Excel Export: state the confirmed 4,500px / approximately 3.6MB source-image condition, 400px pre-resize, and Stream-based loading. Do not claim a reduction percentage.
- Academic transfer: state the seven-tab workflow and state-based edit/confirmation controls without an unverified processing-time claim.
- LG VoC: state the confirmed labeling range, visualization work, rendering/event correction, data migration, internal deployment, and demonstration without adding performance claims.

## About Page

- Keep the development philosophy to three or four concise sentences.
- Keep one compact career summary and a single-line education entry.
- Remove the separate QMS essay; retain QMS in the career summary.
- Replace the exhaustive skill-name grid with three evidence-linked capabilities:
  - AI workflow → LLM WIKI
  - Reusable work automation → Excel converter
  - Runtime problem analysis → Excel Export
- Remove the About contact section because the global footer already contains the email address.

## Components and Files

Expected production changes:

- `site/content/projects.ts`
- `site/content/profile.ts`
- `site/app/page.tsx`
- `site/app/projects/[slug]/page.tsx`
- `site/app/about/page.tsx`
- `site/components/impact-metrics.tsx`
- `site/components/profile-portrait.tsx`
- New focused evidence components under `site/components/` as needed
- Existing shared styling in `site/app/globals.css` only when a reusable rule is required

The existing Vinext structure, routes, header, footer, metadata logic, palette, and package set remain unchanged.

## Social Preview

The current social image contains the old primary headline. After the new copy is stable, refresh `site/public/og.png` once so the preview matches the new positioning while preserving the established palette and minimal visual identity. Do not include private contact information.

## Testing and Validation

Use test-first changes for each slice:

- Project-content tests lock the new order, featured/supporting grouping, evidence fields, LLM comparison labels, and absence of defensive phrases.
- Home-page tests lock the new headline, Korean role, CTA, reduced hero contract, and five project links.
- Project-detail tests lock the new evidence sections, optional-section behavior, first/last navigation order, and unknown-slug behavior.
- About tests lock the compact content, evidence-linked capabilities, and absence of duplicate contact content.
- Metadata tests confirm existing title/description behavior remains valid after the copy change.
- Run the complete test suite and production build.
- Perform browser QA at 1294×912, 768px, 390px, and 320px. Confirm first-viewport project evidence, no horizontal overflow, natural Korean wrapping, keyboard focus, and representative detail-page rendering.

## Delivery and Git Boundary

- Work only on `codex/portfolio-evidence-restructure` until the comparison is approved.
- Commit the design, then implementation slices separately.
- Do not merge to `main`, push the branch, or deploy without a later explicit user choice.

## Non-goals

- No visual redesign or new color system.
- No new dependency.
- No fabricated quantitative evidence.
- No product screenshot placeholders presented as real evidence.
- No hosting or production deployment in this branch phase.

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

export type ProjectArchitecture = {
  inputs: ProjectStep[];
  router: ProjectStep;
  branches: Array<{
    label: string;
    steps: ProjectStep[];
  }>;
  curation: ProjectStep[];
  knowledgeBase: ProjectStep;
};

export type ProjectEvidence = {
  src: string;
  alt: string;
  caption: string;
  note: string;
  query: string;
  facts: string[];
  sources: string[];
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
  architecture?: ProjectArchitecture;
  evidence?: ProjectEvidence;
  verification: string[];
  limits: string[];
  metrics: ProjectMetric[];
};

export const projects: Project[] = [
  {
    slug: "wiki-knowledge-system",
    title: "LLM 기반 개인 지식 관리 시스템",
    period: "2026.07 — 현재",
    role: "기획 · 설계 · 개발",
    context: "개인 프로젝트",
    stack: [
      "Telegram",
      "n8n",
      "OpenAI Agents SDK",
      "WIKI Capture Skill",
      "Python",
      "Obsidian",
      "Markdown",
    ],
    summary:
      "직접 기록하고 정리하는 부담을 줄이고, AI에게 질문해 필요한 지식을 찾을 수 있도록 만든 개인 지식 관리 시스템입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "Notion에 작업 내용을 직접 작성하고 분류·관리하는 과정이 번거로웠고, 시간이 지나면 어떤 내용을 기록했는지 잊어 필요한 자료를 다시 찾는 데에도 시간이 들었습니다.",
      role: "문제 정의 · WIKI Capture Skill 제작 · 에이전트 워크플로 설계 · 실행 결과 검토",
      change:
        "Codex 작업과 모바일 메모를 직접 지정한 Inbox에 모은 뒤, 검토·병합한 WIKI를 LLM 질의로 회수할 수 있도록 연결했습니다.",
      scope:
        "WIKI Capture Skill, Telegram/n8n 수집·질의 흐름과 에이전트 내부 평가를 구성했습니다. 최종 Inbox 검토와 WIKI 병합은 직접 수행했습니다.",
    },
    comparison: {
      before: [
        "Notion에 작업 내용을 직접 작성하고 분류·관리해야 했습니다.",
        "기록한 내용을 잊으면 필요한 자료를 다시 직접 찾아야 했습니다.",
      ],
      after: [
        "Codex 작업은 WIKI Capture Skill로, 모바일 메모는 Telegram/n8n을 통해 Inbox에 모았습니다.",
        "Antigravity에서 기존 WIKI와 비교해 중복을 제거하거나 관련 문서를 병합한 뒤, LLM 질의로 자료와 출처를 확인했습니다.",
      ],
    },
    discovery:
      "Notion에 작업 내용을 직접 작성·관리하는 번거로움이 있었고, 시간이 지나면 무엇을 기록했는지 잊어 필요한 자료를 다시 찾는 과정도 반복되었습니다. 그래서 기록과 정리를 분리하고, 나중에는 AI에게 질문해 지식을 회수하는 흐름을 만들고자 했습니다.",
    decisions: [
      "새 기록을 바로 WIKI에 확정하지 않고, 직접 지정한 Inbox(검토 대기 폴더)에 먼저 저장했습니다. 기존 WIKI와 비교해 중복 제거·문서 병합 후 반영하기 위해서입니다.",
      "Telegram 하나로 모바일 메모와 /ask 질의를 함께 사용할 수 있도록, n8n에서 일반 메시지와 /ask 요청을 분기했습니다.",
      "n8n은 입력·라우팅을 담당하고, WIKI 검색·답변은 별도 wiki-agent /ask API로 분리했습니다.",
      "자동 수집과 최종 WIKI 반영을 분리해, Antigravity에서 사용자가 기존 문서와 비교·정제하도록 했습니다.",
      "LLM 답변에 근거 문서와 WIKI 동기화 시각을 함께 반환해 답변의 근거와 최신성을 확인할 수 있도록 했습니다.",
    ],
    architecture: {
      inputs: [
        { label: "Codex 작업", detail: "WIKI Capture Skill" },
        { label: "모바일 메모", detail: "Telegram 입력" },
      ],
      router: {
        label: "n8n 라우팅",
        detail: "Telegram 입력 확인 · 일반 메모와 /ask 질의 분기",
      },
      branches: [
        {
          label: "메모 수집",
          steps: [
            { label: "Markdown 변환", detail: "frontmatter와 status: inbox 생성" },
            { label: "00_Inbox 저장", detail: "Google Drive에 업로드" },
          ],
        },
        {
          label: "/ask 질의",
          steps: [
            { label: "질문 추출·검증", detail: "/ask 명령과 질문 내용 분리" },
            { label: "wiki-agent API", detail: "WIKI 검색·답변 생성" },
            { label: "Telegram 응답", detail: "답변·출처·동기화 시각 반환" },
          ],
        },
      ],
      curation: [
        { label: "Antigravity 수동 검토", detail: "기존 WIKI와 내용 비교" },
        { label: "중복 제거·문서 병합", detail: "검토한 내용을 WIKI에 반영" },
      ],
      knowledgeBase: {
        label: "Obsidian Markdown WIKI",
        detail: "정리된 지식 저장 · LLM 질의 대상",
      },
    },
    evidence: {
      src: "/evidence/llm-wiki-ask-benchmark.png",
      alt: "Telegram에서 실행한 LLM WIKI v2.3 25개 질문 평가 결과",
      caption:
        "실제 Telegram /ask 응답에서 평균 응답 시간 9.38초와 엄격 정확도 96%(24/25)를 확인했습니다.",
      note: "2026-09-02 v2.3 · 25개 질문 · Oracle Cloud 동기화 WIKI 63개",
      query: "/ask 2026-09-02 v2.3 25개 평가의 원문 측정값만 찾아줘",
      facts: ["평균 응답 9.38초", "엄격 정확도 96%(24/25)", "평가 질문 25개"],
      sources: [
        "LLM_WIKI_Agent_Ask_Architecture.md",
        "n8n_LLM_WIKI_질문_답변_MVP_구축.md",
        "2026-09.md 운영 평가 로그",
      ],
    },
    verification: [
      "Oracle Cloud에 동기화된 WIKI 원본 63개를 대상으로 실제 질문 25개 평가 세트를 구성했습니다.",
      "2026-09-02 v2.3 평가에서 평균 응답 시간 9.38초를 측정했습니다.",
      "에이전트 내부 평가 기준 엄격 정확도는 25문항 중 24문항(96%)으로 기록되었습니다.",
      "WIKI에 없는 질문 3건은 모두 임의 답변 없이 미발견으로 응답했습니다.",
      "평가 실행에서 응답시간과 Request-ID, 토큰, Tool Calls 로그를 함께 대조했습니다.",
    ],
    limits: [
      "개인 Markdown WIKI를 대상으로 한 MVP입니다.",
      "25개 질문에 대한 단일 평가 회차라 반복 측정의 변동성은 확인하지 않았습니다.",
      "에이전트가 질문 생성·실행·채점을 수행한 내부 평가이므로, 독립적인 정확도 검증으로 해석할 수 없습니다.",
      "WIKI에 없는 질문은 검색을 반복해 평균 14.50초가 소요되어 조기 종료가 필요합니다.",
      "집계 질의에서는 정답을 확인했지만 10개 대상 중 4개의 출처만 응답에 포함되는 한계를 확인했습니다.",
      "기록·검토에 걸리는 시간과 Notion 대비 생산성 변화는 별도 측정하지 않았습니다.",
    ],
    metrics: [
      {
        value: "9.38초",
        label: "평균 응답 시간",
        note: "25개 질문 · Oracle Cloud 동기화 WIKI 63개",
      },
      {
        value: "96%",
        label: "엄격 정확도 (24/25)",
        note: "에이전트 내부 평가 기준",
      },
      {
        value: "3/3",
        label: "WIKI 부재 질문 미발견",
        note: "임의 답변 없이 처리",
      },
    ],
  },
  {
    slug: "excel-data-converter",
    title: "Excel 데이터 변환 자동화 프로그램",
    period: "2026.02 — 현재",
    role: "기획 · 설계 · 개발",
    context: "HIAIR KOREA MES / WinForms 업무",
    stack: ["Python", "PySide6", "Excel"],
    summary:
      "사용자가 헤더와 변환 규칙을 설정하고 저장·재사용할 수 있는 Excel 데이터 변환 도구입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "파일마다 헤더와 변환 규칙이 달라 반복 작업마다 수작업 설정이 필요했습니다.",
      role: "반복 업무 분석, 변환 규칙 구조 설계와 PySide6 프로그램 개발",
      change:
        "헤더와 변환 규칙을 사용자가 설정하고 저장·불러올 수 있는 재사용 도구로 구성했습니다.",
      scope:
        "규칙 설정, 저장, 불러오기와 변환 전 확인을 포함한 업무 흐름을 구현했습니다.",
    },
    comparison: {
      before: [
        "파일마다 다른 헤더와 규칙을 작업 때마다 다시 설정했습니다.",
        "입력 형식이 달라질 때마다 변환 조건을 다시 구성했습니다.",
      ],
      after: [
        "사용자가 헤더와 변환 규칙을 직접 구성할 수 있게 했습니다.",
        "저장한 규칙을 불러와 다음 변환 작업에 재사용할 수 있게 했습니다.",
      ],
    },
    discovery:
      "반복되는 Excel 변환 요청을 처리하면서 입력 형식만 달라질 뿐 같은 설정과 변환 절차가 되풀이되는 지점을 확인했습니다.",
    decisions: [
      "파일별 코드를 늘리는 대신 헤더와 변환 규칙을 데이터로 관리하도록 구성했습니다.",
      "사용자가 직접 설정할 수 있도록 PySide6 기반 화면으로 구현했습니다.",
      "규칙 저장과 불러오기를 제공해 같은 변환 조건을 다시 사용할 수 있게 했습니다.",
    ],
    system: [
      { label: "입력", detail: "원본 Excel과 헤더 선택" },
      { label: "규칙", detail: "변환 규칙 설정 또는 불러오기" },
      { label: "검증", detail: "변환 전 결과 확인" },
      { label: "출력", detail: "변환 파일 생성" },
    ],
    verification: [
      "사용자가 헤더와 변환 규칙을 직접 설정할 수 있게 구현했습니다.",
      "설정한 규칙을 저장하고 다시 불러오는 흐름을 구현했습니다.",
      "변환 전에 설정과 결과를 확인하는 단계를 구성했습니다.",
    ],
    limits: [
      "처리 시간과 메모리 사용량은 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "excel-export-optimization",
    title: "고해상도 이미지 Excel Export 성능 개선",
    period: "2026.02 — 현재",
    role: "원인 분석 · 성능 개선",
    context: "HIAIR KOREA MES / WinForms 업무",
    stack: ["C#", ".NET", "WinForms", "Excel Export", "Stream"],
    summary:
      "고해상도 이미지가 포함된 Excel Export에서 이미지 처리 방식을 변경한 사례입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "4,500px 이상·약 3.6MB 이미지가 다수 포함된 Excel Export에서 메모리 부족과 처리 지연이 발생했습니다.",
      role: "문제 조건 분석, 이미지 처리 방식 변경과 Excel 출력 결과 확인",
      change:
        "이미지를 400px로 사전 리사이징하고 Stream 기반 로딩을 적용했습니다.",
      scope:
        "이미지 크기 조정, 로딩 방식 변경과 Excel 출력 결과까지 확인했습니다.",
    },
    comparison: {
      before: [
        "고해상도 원본 이미지를 다수 처리하면서 메모리 부족과 지연이 발생했습니다.",
        "Excel 생성 과정에서 큰 이미지 데이터를 그대로 다뤘습니다.",
      ],
      after: [
        "Excel 삽입 전에 이미지를 400px로 리사이징했습니다.",
        "이미지 로딩 방식을 Stream 기반으로 변경했습니다.",
      ],
    },
    discovery:
      "Excel Export 과정에서 고해상도 이미지가 다수 포함될 때 메모리 부족과 처리 지연이 발생하는 것을 확인했습니다.",
    decisions: [
      "고해상도 원본을 그대로 다루는 구간을 줄이기 위해 Excel 삽입 전에 이미지를 400px로 조정했습니다.",
      "큰 이미지 데이터를 파일 단위로 반복 로딩하는 부담을 줄이기 위해 Stream 기반 로딩을 출력 파이프라인에 연결했습니다.",
    ],
    system: [
      { label: "분석", detail: "이미지 크기와 발생 조건 확인" },
      { label: "축소", detail: "400px 사전 리사이징" },
      { label: "로딩", detail: "Stream 기반 이미지 처리" },
      { label: "출력", detail: "Excel 생성 결과 확인" },
    ],
    verification: [
      "4,500px 이상·약 3.6MB 이미지가 포함된 발생 조건을 확인했습니다.",
      "Excel 삽입 전 400px 리사이징을 적용했습니다.",
      "Stream 기반 로딩을 적용하고 Excel 출력 결과를 확인했습니다.",
    ],
    limits: [
      "파일 용량과 생성 시간의 변경 전후 수치는 별도로 측정하지 않았습니다.",
      "메모리 사용량의 변경 전후 수치는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "academic-transfer-workflow",
    title: "학사 전과 업무 프로세스 시스템",
    period: "2024.07 — 2026.02",
    role: "업무 화면 · 권한 제어 · 데이터 연계 개발",
    context: "울산대학교 학사·입학 시스템",
    stack: [
      "C#",
      "ASP.NET WebForms",
      "DevExpress",
      "MSSQL",
      "Stored Procedure",
    ],
    summary:
      "전과 신청부터 확정까지의 단계와 상태별 권한을 한 화면에서 처리하는 학사 업무 시스템입니다.",
    tier: "supporting",
    snapshot: {
      problem:
        "신청, 접수, 심사와 확정 단계마다 처리 기능과 수정 권한이 달랐습니다.",
      role: "7개 탭 업무 화면, 상태별 권한 제어와 데이터 연계 개발",
      change:
        "업무 절차를 7개 탭으로 구성하고 상태에 따라 수정과 처리 기능을 제어했습니다.",
      scope:
        "신청·접수·반려·확정 상태와 확정 이후 수정 제한까지 구현했습니다.",
    },
    discovery:
      "신청부터 확정까지 이어지는 전과 업무를 한 화면에서 처리하려면 상태별 권한과 처리 순서를 함께 제어해야 했습니다.",
    decisions: [
      "업무 단계와 조회 대상을 7개 탭으로 나눠 한 화면에 구성했습니다.",
      "신청·접수·반려·확정 상태를 기준으로 수정 권한과 처리 기능을 제어했습니다.",
      "확정 이후에는 데이터 수정을 제한했습니다.",
    ],
    system: [
      { label: "신청", detail: "신청 데이터 입력과 검증" },
      { label: "접수", detail: "담당자 접수와 상태 변경" },
      { label: "심사", detail: "심사 결과와 반려 제어" },
      { label: "확정", detail: "확정 이후 수정 제한" },
    ],
    verification: [
      "신청부터 확정까지의 업무 화면을 7개 탭으로 구성했습니다.",
      "신청·접수·반려·확정 상태에 따른 처리 기능을 구현했습니다.",
      "확정 이후 데이터 수정 제한을 적용했습니다.",
    ],
    limits: ["업무 처리 시간과 운영 효과는 별도로 측정하지 않았습니다."],
    metrics: [],
  },
  {
    slug: "lg-voc-dashboard",
    title: "LG전자 소비자 VoC 라벨링 및 시각화 시스템",
    period: "2023.02 — 2024.04",
    role: "라벨링 · 시각화 · 이관 · 배포",
    context: "Django 기반 VoC 분석 프로젝트",
    stack: ["Django", "JavaScript", "D3.js", "SQL"],
    summary:
      "소비자 리뷰를 라벨링하고 시각화해 사내 시스템으로 이관한 데이터 프로젝트입니다.",
    tier: "supporting",
    snapshot: {
      problem:
        "리뷰 라벨링과 시각화뿐 아니라 탭 전환 시 렌더링 상태와 사내 시스템 이관까지 처리해야 했습니다.",
      role: "리뷰 라벨링, D3.js 시각화, 렌더링 개선, DB와 서버 이관",
      change:
        "3~4만 건을 직접 라벨링하고 시각화·렌더링 개선부터 사내 시스템 이관까지 연결했습니다.",
      scope:
        "라벨링, 차트 구현, SVG·이벤트 개선, DB 이관, 사내 서버 배포와 담당자 시연을 수행했습니다.",
    },
    discovery:
      "탭을 전환할 때 D3.js SVG가 중복 생성되고 상태와 이벤트가 남아 시각화가 일관되게 갱신되지 않는 문제를 확인했습니다.",
    decisions: [
      "워드클라우드·도넛·바 차트로 리뷰 분류 결과를 구분해 표현했습니다.",
      "탭 전환 전에 렌더링 상태를 초기화하고 이벤트 처리 구조를 정리했습니다.",
      "DB 데이터와 애플리케이션을 사내 환경으로 이관하고 담당자 시연까지 진행했습니다.",
    ],
    system: [
      { label: "라벨링", detail: "약 3~4만 건 리뷰 데이터 분류" },
      { label: "시각화", detail: "워드클라우드와 차트 구현" },
      { label: "개선", detail: "SVG 중복 생성과 이벤트 상태 정리" },
      { label: "이관", detail: "DB와 사내 서버 배포" },
    ],
    verification: [
      "약 3~4만 건의 리뷰를 직접 라벨링했습니다.",
      "워드클라우드·도넛·바 차트 기반 시각화를 구현했습니다.",
      "D3.js SVG 중복 생성과 탭 전환 이벤트 구조를 개선했습니다.",
      "DB 데이터 이관, 사내 서버 배포와 담당자 시연을 수행했습니다.",
    ],
    limits: ["정량 성능 개선 수치는 별도로 측정하지 않았습니다."],
    metrics: [],
  },
];

export const featuredProjects = projects.filter(
  (project) => project.tier === "featured",
);
export const additionalProjects = projects.filter(
  (project) => project.tier === "supporting",
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

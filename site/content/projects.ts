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
      "Python",
      "Markdown",
    ],
    summary:
      "모바일 기록부터 WIKI 검색과 출처 기반 답변까지 연결한 개인 지식 관리 시스템입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "Markdown WIKI의 기록과 검색 흐름이 분리되어 기존 질의 응답에 약 80~120초가 필요했습니다.",
      role: "기획, 워크플로 설계, WIKI 질의 API 연계와 응답 구조 구현",
      change:
        "Telegram, n8n, WIKI 질의 API와 Agents SDK Tool Calling을 하나의 흐름으로 연결했습니다.",
      scope:
        "개인 WIKI MVP에서 최초 실행과 동일 흐름 재실행 시간을 측정하고 출처 포함 응답을 확인했습니다.",
    },
    comparison: {
      before: [
        "모바일 기록과 Markdown WIKI 검색이 서로 분리되어 있었습니다.",
        "기존 질의 흐름은 약 80~120초가 필요했습니다.",
      ],
      after: [
        "Telegram 입력과 n8n 라우팅을 WIKI 질의 API에 연결했습니다.",
        "조회 문서를 근거와 출처로 포함하는 응답 구조를 구성했습니다.",
      ],
    },
    discovery:
      "개인 WIKI의 문서가 늘면서 모바일에서 남긴 기록을 다시 찾고 질문하는 과정이 분리되어 반복 대기와 수작업 탐색이 발생했습니다.",
    decisions: [
      "모바일 입력은 Telegram으로 통일하고 n8n에서 기록과 질문 명령을 분기했습니다.",
      "WIKI 검색 책임은 별도 질의 API로 분리해 문서 조회 흐름을 재사용할 수 있게 구성했습니다.",
      "Agents SDK Tool Calling으로 실제 조회 문서를 근거와 출처로 반환하도록 연결했습니다.",
    ],
    system: [
      { label: "입력", detail: "Telegram 기록 또는 질문" },
      { label: "라우팅", detail: "n8n 명령 분기" },
      { label: "검색", detail: "WIKI 질의 API와 문서 조회" },
      { label: "응답", detail: "근거와 출처를 포함한 답변" },
    ],
    verification: [
      "기존 질의 흐름에서 약 80~120초가 필요했습니다.",
      "자동화 후 최초 실행은 10.3초로 측정했습니다.",
      "동일 흐름 재실행은 1.02초로 측정했습니다.",
      "응답에 실제 조회 문서의 근거와 출처가 포함되는 것을 확인했습니다.",
    ],
    limits: [
      "개인 Markdown WIKI를 대상으로 한 MVP입니다.",
      "재실행 단축에 영향을 준 원인을 분리 측정하지 않았습니다.",
      "문서 수, 실행 환경과 반복 횟수에 따른 성능 차이는 별도로 측정하지 않았습니다.",
    ],
    metrics: [
      { value: "약 80~120초", label: "기존 질의 흐름" },
      { value: "10.3초", label: "자동화 후 최초 실행" },
      { value: "1.02초", label: "동일 흐름 재실행" },
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
        "파일마다 헤더와 변환 규칙이 달라 반복 작업마다 설정과 코드 수정이 필요했습니다.",
      role: "반복 업무 분석, 변환 규칙 구조 설계와 PySide6 프로그램 개발",
      change:
        "헤더와 변환 규칙을 사용자가 설정하고 저장·불러올 수 있는 재사용 도구로 구성했습니다.",
      scope:
        "규칙 설정, 저장, 불러오기와 변환 전 확인을 포함한 업무 흐름을 구현했습니다.",
    },
    comparison: {
      before: [
        "파일마다 다른 헤더와 규칙을 작업 때마다 다시 설정했습니다.",
        "변환 절차가 개별 작업자의 코드 수정에 의존했습니다.",
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
      "비개발 사용자도 직접 설정할 수 있도록 PySide6 기반 화면으로 구현했습니다.",
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
      "매크로 보존, 원본 읽기 전용 처리와 자동화 테스트 수는 현재 근거 범위에 포함하지 않았습니다.",
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
      "고해상도 이미지가 포함된 Excel Export의 메모리 부족과 처리 지연 원인을 이미지 처리 방식에서 개선한 사례입니다.",
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
      "실제 Excel Export 과정에서 특정 고해상도 이미지가 다수 포함될 때 메모리 부족과 처리 지연이 반복되는 조건을 확인했습니다.",
    decisions: [
      "Excel에 필요한 표시 크기를 기준으로 이미지를 400px로 먼저 조정했습니다.",
      "이미지 로딩은 Stream 기반으로 변경해 출력 파이프라인에 연결했습니다.",
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
      "여러 담당자와 단계로 이어지는 전과 업무를 하나의 화면에서 처리하려면 상태별 권한과 처리 순서를 함께 제어해야 했습니다.",
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
      "약 20만 건의 리뷰 중 약 3~4만 건을 직접 라벨링했습니다.",
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

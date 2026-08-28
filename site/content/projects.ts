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
    summary:
      "사용자가 헤더와 변환 규칙을 설정하고 저장·재사용할 수 있는 Excel 데이터 변환 도구입니다.",
    problem:
      "반복되는 Excel 데이터 변환에서 파일마다 헤더와 규칙이 달라 수작업 설정이 계속 필요했습니다.",
    solution:
      "사용자가 헤더와 변환 규칙을 직접 설정하고 저장한 뒤 다음 작업에서 재사용할 수 있는 PySide6 프로그램을 개발했습니다.",
    result:
      "개인에게 의존하던 반복 변환 절차를 재사용 가능한 도구로 표준화했습니다. 확인되지 않은 시간 절감 수치는 표시하지 않습니다.",
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
    stack: [
      "Telegram",
      "n8n",
      "OpenAI Agents SDK",
      "Python",
      "Markdown",
    ],
    summary:
      "모바일 기록부터 WIKI 검색과 출처 기반 답변까지 연결한 개인 지식 관리 시스템입니다.",
    problem:
      "Markdown WIKI가 늘면서 모바일 기록과 검색 흐름이 분리됐고 기존 질의 응답에는 약 80초에서 2분이 필요했습니다.",
    solution:
      "Telegram 입력, n8n 라우팅, WIKI 질의 API, 키워드·가중치 검색과 Agents SDK Tool Calling을 연결했습니다.",
    result:
      "초기 질의 응답을 실측 10.3초, 동일 흐름 재실행을 1.02초까지 단축하고 조회 문서와 출처를 포함한 답변을 제공했습니다.",
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
    stack: [
      "C#",
      "ASP.NET WebForms",
      "DevExpress",
      "MSSQL",
      "Stored Procedure",
    ],
    summary:
      "전과 신청부터 확정까지의 단계와 상태별 권한을 한 화면에서 처리하는 학사 업무 시스템입니다.",
    problem:
      "신청, 접수, 심사, 확정 단계와 상태별 수정 권한을 하나의 업무 화면에서 안전하게 처리해야 했습니다.",
    solution:
      "업무를 7개 탭으로 구성하고 신청·접수·반려·확정 상태에 따라 수정 권한과 처리 기능을 제어했습니다.",
    result:
      "여러 단계로 이어지는 전과 업무와 권한 규칙을 하나의 시스템 흐름으로 구성했습니다. 확인되지 않은 처리 시간 수치는 표시하지 않습니다.",
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
    summary:
      "고해상도 이미지가 포함된 Excel Export의 메모리 부족과 처리 지연을 개선한 사례입니다.",
    problem:
      "4,500px 이상, 약 3.6MB의 이미지가 다수 포함된 Excel Export에서 메모리 부족과 처리 지연이 발생했습니다.",
    solution:
      "이미지를 400px로 사전 리사이징하고 메모리 복사를 줄이기 위해 Stream 기반으로 로딩했습니다.",
    result:
      "파일 용량과 생성 시간을 줄였습니다. 실제 감소율을 확인하지 않았으므로 개선 비율은 표시하지 않습니다.",
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
    summary:
      "대규모 소비자 리뷰를 라벨링하고 시각화해 사내 시스템으로 이관한 데이터 프로젝트입니다.",
    problem:
      "약 20만 건의 리뷰에 대한 라벨링, 시각화, 탭 전환 시 렌더링 상태 관리와 사내 시스템 이관이 필요했습니다.",
    solution:
      "3~4만 건을 직접 라벨링하고 워드클라우드·도넛·바 차트를 구현했으며 D3.js SVG 중복 생성과 이벤트 구조를 개선했습니다.",
    result:
      "DB 데이터 이관, 사내 서버 배포, 담당자 시연과 내부 시스템 이관까지 수행했습니다. 확인되지 않은 성능 수치는 표시하지 않습니다.",
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
export const additionalProjects = projects.filter(
  (project) => !project.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

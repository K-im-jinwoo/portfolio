import type { CapabilityLink } from "@/components/capability-links";

export const profile = {
  nameKo: "김진우",
  nameEn: "Jinwoo Kim",
  role: "업무 시스템 개발 · AI 활용 자동화",
  headline:
    "업무 시스템 개발·유지보수에 참여하며 AI로 반복 작업을 자동화합니다.",
  email: "jwkim6166@gmail.com",
  intro:
    "2024년 7월부터 (주)하이텍정보시스템에서 C#·.NET 기반 학사·MES와 React·TypeScript 기반 QMS·모니터링 화면 개발·유지보수에 참여하고 있습니다. 기존 MSSQL 프로시저와 사내 API를 연계해 권한·승인 상태별 업무 흐름을 반영했으며, 학사·QMS 기능은 실제 운영 환경에서 사용되고 있습니다. 최근 자동화 도구·대시보드와 개인 프로젝트에서는 요구사항과 샘플 전달 및 실행 결과 확인을 맡았으며, 코드와 테스트는 AI 코딩 도구가 구현했습니다.",
  experience: [
    {
      period: "2024.07 — 현재",
      organization: "(주)하이텍정보시스템",
      description: "학사·MES·QMS 업무 시스템 개발·유지보수 참여 및 반복 업무 자동화",
    },
  ],
  education: [
    {
      period: "2018.03 — 2024.02",
      organization: "동의대학교",
      description: "산업ICT기술공학과 · 학사",
    },
  ],
  skills: {
    "업무 사용 (개발·유지보수)": [
      "C#",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "ASP.NET WebForms",
      "WinForms",
      ".NET Framework",
      "DevExpress",
      "DevExtreme",
    ],
    "데이터 · 운영 연계": [
      "MSSQL (기존 Stored Procedure·API 연계)",
      "REST API 연동",
      "VBA 매크로 삽입·코드 변환",
      "Git",
      "PM2",
    ],
    "AI 도구 활용 구축 (개인·자동화)": [
      "Python",
      "PySide6",
      "FastAPI",
      "OpenAI API / Agents SDK",
      "Hermes Agent",
      "n8n",
      "SQLite",
      "Docker",
    ],
  },
} as const;

export const capabilities = [
  {
    title: "학사·입학 업무 화면 개발·유지보수",
    description:
      "7개 탭 전과 처리, 16개 탭 통합학적조회, 23개 입학전형 확정 처리 등 실제 운영 학사 화면 개발에 참여했습니다.",
    href: "/projects/academic-transfer-workflow",
  },
  {
    title: "QMS 권한·승인 연동 및 화면 개선",
    description:
      "기존 API·DB 프로시저를 연계해 단계별 검사 승인과 탭별 조회·변경 항목 저장 기능을 운영 화면에 반영했습니다.",
    href: "/projects/qms-approval-system",
  },
  {
    title: "수작업 코드 변환의 AI 도구화",
    description:
      "반복하던 Excel 매크로 삽입·코드 변환 수작업을 바탕으로 AI에 구현을 맡겨 PySide6 변환 도구를 제작했습니다.",
    href: "/projects/excel-data-converter",
  },
] satisfies CapabilityLink[];

import type { CapabilityLink } from "@/components/capability-links";

export const profile = {
  nameKo: "김진우",
  nameEn: "Jinwoo Kim",
  role: "AI·업무자동화 개발자",
  headline:
    "업무 현장의 병목을 발견하고, 자동화와 AI로 실제 사용할 수 있는 시스템을 만듭니다.",
  email: "jwkim6166@gmail.com",
  intro:
    "MES·QMS 등 실제 업무 시스템을 개발·운영하며 반복 작업과 비효율을 개선해 왔습니다. 기술 자체보다 현장의 문제를 정확히 정의하고, 자동화가 실제 업무에 정착하도록 만드는 과정을 중요하게 생각합니다.",
  experience: [
    {
      period: "2024.07 — 현재",
      organization: "(주)하이텍정보시스템",
      description: "MES·QMS·학사 시스템 개발과 반복 업무 자동화",
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
    Languages: ["C#", "TypeScript", "JavaScript", "Python", "SQL"],
    "Web & Desktop": [
      "React",
      "ASP.NET WebForms",
      "Django",
      ".NET Framework",
      "WinForms",
      "DevExpress",
    ],
    "Data & Integration": ["MSSQL", "Stored Procedure", "REST API"],
    "AI & Automation": [
      "OpenAI API",
      "OpenAI Agents SDK",
      "n8n",
      "Tool Calling",
      "Excel Automation",
    ],
  },
} as const;

export const capabilities = [
  {
    title: "AI 업무 흐름",
    description: "기록·검색·출처 기반 답변을 하나의 흐름으로 연결했습니다.",
    href: "/projects/wiki-knowledge-system",
  },
  {
    title: "재사용 가능한 업무 자동화",
    description:
      "파일별 반복 규칙을 사용자가 재사용할 수 있는 도구로 구조화했습니다.",
    href: "/projects/excel-data-converter",
  },
  {
    title: "운영 문제 원인 분석",
    description:
      "고해상도 이미지 처리 병목을 찾아 리사이징과 Stream 로딩으로 개선했습니다.",
    href: "/projects/excel-export-optimization",
  },
] satisfies CapabilityLink[];

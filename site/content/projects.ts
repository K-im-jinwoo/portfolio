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
  title?: string;
  inputFlowLabel?: string;
  curationFlowLabel?: string;
  outputFlowLabel?: string;
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
    stack: ["Python", "PySide6", "openpyxl", "JSON", "VBA", "Excel COM"],
    summary:
      "Excel에 입력된 업무 명칭을 Grid가 요구하는 내부 코드로 변환하고, 파일별 규칙을 설정·검증할 수 있는 로컬 도구입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "처음에는 업무 명칭을 Excel 파일에 그대로 기입했지만, Grid에 데이터를 넣으려면 파일별 명칭을 내부 코드로 변환해야 했습니다.",
      role: "VBA 수동 변환 과정 분석, 규칙 엔진 구조 설계와 PySide6 프로그램 개발",
      change:
        "VBA에 직접 넣던 변환 규칙을 GUI에서 설정·검증하고, 파일별 명칭을 코드로 변환할 수 있게 했습니다.",
      scope:
        "PySide6 GUI, 규칙 저장·불러오기, Dry Run 검증, 새 XLSX 생성과 매크로 포함 XLSM 내보내기 흐름을 구현했습니다.",
    },
    comparison: {
      before: [
        "Connection Error 같은 업무 명칭을 Excel에 직접 기입해 파일로 관리했습니다.",
        "Grid 입력을 위해 VBA 매크로를 직접 작성·삽입하고, 파일마다 다른 조건을 수작업으로 수정했습니다.",
      ],
      after: [
        "GUI에서 대상·참조 컬럼과 단일·복합 조건을 직접 구성합니다.",
        "Dry Run으로 코드 변환 결과와 잘못된 조합을 확인한 뒤 새 파일로 출력합니다.",
      ],
    },
    discovery:
      "처음에는 업무 명칭을 Excel 파일에 그대로 기입해 관리했습니다. 이후 Grid 입력을 위해 Excel 데이터를 내부 코드로 바꾸기 시작했고, 처음에는 VBA 매크로를 직접 삽입했습니다. 하지만 파일마다 데이터 패턴과 변환 조건이 달라질 때마다 VBA를 수정해야 했습니다. Slack·OpenAI·n8n으로 자연어 규칙을 받는 방식도 시도했지만, 명칭 해석보다 파일별 코드 조건을 직접 설정하는 편이 적합하다고 판단해 프로그램으로 전환했습니다.",
    decisions: [
      "명칭을 그대로 저장하는 방식에서 Grid 입력에 필요한 코드 변환을 별도 단계로 분리했습니다.",
      "VBA를 매번 직접 삽입하는 대신 파일별 변환 규칙을 데이터로 관리하도록 구성했습니다.",
      "Slack·OpenAI·n8n 기반 자연어 규칙 설정을 시도했지만, 다양한 표현과 데이터 패턴을 안정적으로 처리하기 위해 GUI 기반 규칙 편집기로 전환했습니다.",
      "사용자가 직접 설정할 수 있도록 PySide6 기반 화면으로 구현했습니다.",
      "규칙 저장과 불러오기를 JSON 프로필로 제공해 같은 변환 조건을 다시 사용할 수 있게 했습니다.",
      "여러 조건을 하나의 복합 키로 매핑해 제품·PART처럼 서로 연관된 값의 조합이 참조 데이터에 존재하는지 검증했습니다.",
      "변환 전 Dry Run을 두어 없는 명칭, 중복 참조와 미일치 정책을 결과 파일 생성 전에 확인하도록 했습니다.",
    ],
    architecture: {
      title: "분석·규칙·변환 구조",
      inputFlowLabel: "입력 구조 분석",
      curationFlowLabel: "검증 결과 확인·규칙 재사용",
      outputFlowLabel: "새 파일 출력",
      inputs: [
        { label: "대상 Excel 파일", detail: "검사 데이터와 업무 입력 시트" },
        { label: "코드 정보 시트", detail: "명칭과 내부 코드의 매핑 기준" },
      ],
      router: {
        label: "시트·헤더 분석",
        detail: "시트명, 헤더와 데이터 시작 행을 읽어 현재 파일 구조를 파악",
      },
      branches: [
        {
          label: "사용자 규칙 설정",
          steps: [
            { label: "헤더·컬럼 매핑", detail: "대상 컬럼과 참조 컬럼을 GUI에서 선택" },
            { label: "다중 조건 코드 매핑", detail: "여러 조건을 하나의 복합 키로 구성" },
            { label: "미일치·중복 정책", detail: "유지·삭제·기록·중단 정책을 선택" },
          ],
        },
        {
          label: "검증·변환 실행",
          steps: [
            { label: "Dry Run 미리보기", detail: "변환 전 성공·실패와 대상 행을 확인" },
            { label: "조합 유효성 검증", detail: "없는 명칭과 허용되지 않은 코드 조합을 오류 처리" },
            { label: "결과 파일 생성", detail: "원본을 유지하고 새 XLSX 또는 XLSM을 출력" },
          ],
        },
      ],
      curation: [
        { label: "결과·오류 로그 확인", detail: "변환·미일치·중복 처리 결과를 확인" },
        { label: "JSON 규칙 프로필 저장", detail: "설정한 규칙을 다음 변환 작업에 재사용" },
      ],
      knowledgeBase: {
        label: "변환 결과 Excel",
        detail: "업무에 사용할 새 XLSX 또는 매크로 포함 XLSM",
      },
    },
    verification: [
      "대상 시트와 참조 시트의 헤더·컬럼을 GUI에서 선택하도록 구현했습니다.",
      "단일 조건과 여러 조건을 조합한 코드 매핑 규칙을 처리하도록 구현했습니다.",
      "없는 명칭, 중복 참조와 조건 불일치에 대해 규칙별 처리 정책을 적용하도록 구현했습니다.",
      "Dry Run에서 실제 저장 전에 변환 로그와 성공·실패 결과를 확인하도록 구성했습니다.",
      "일반 변환은 새 XLSX로 저장하고, 별도 경로에서는 생성된 VBA와 Excel COM을 이용해 XLSM을 내보내도록 구현했습니다.",
      "테스트 코드에는 단일·복합 조건, 미일치·중복 정책, 원본 보존과 XLSM 출력 실패 경로를 검증하는 시나리오가 포함되어 있습니다.",
    ],
    limits: [
      "현재 프로필 저장 방식은 SQLite가 아닌 JSON 파일입니다.",
      "일반 XLSX 변환은 openpyxl 기반이며, XLSM 생성은 Windows Excel COM과 VBA 프로젝트 접근 권한이 필요합니다.",
      "XLSM 관련 테스트는 실제 Excel이 아닌 FakeExcel 대체 객체를 사용하므로, VBA 실행 자체의 운영 검증은 별도입니다.",
      "실제 Excel 환경에서 VBA 컴파일과 Worksheet_Change 실행 결과는 별도 운영 검증이 필요합니다.",
      "처리 시간과 메모리 사용량의 변경 전후 수치는 별도로 측정하지 않았습니다.",
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
        "Grid 기반 Excel Export에서 4,500px 이상, 약 3.6MB의 고해상도 이미지를 한 셀에 여러 개 삽입하면 메모리 부족이 발생했습니다. 또한 생성된 Excel에서 스크롤 지연과 이미지 위치·여백이 틀어지는 문제가 나타났습니다.",
      role: "Excel Export 문제 조건 분석, 이미지 사전 리사이징·Stream 처리와 자원 해제 로직 구현, 이미지 배치 단위 및 정렬 개선",
      change:
        "고해상도 원본 이미지를 그대로 삽입하지 않고, Excel 삽입 전 리사이징과 Stream 기반 처리를 적용했습니다. 또한 이미지 배치 단위와 정렬 로직을 정리해 이미지 위치와 여백 오류를 개선했습니다.",
      scope:
        "기존 이미지 다운로드·삽입 로직을 분석하고, 이미지 사전 리사이징·Stream 처리·자원 해제·단위 체계 통일·셀 내 이미지 슬롯 배치까지 Excel Export 경로에 적용했습니다. 처리 시간·메모리·파일 용량의 변경 전후 측정은 포함하지 않았습니다.",
    },
    comparison: {
      before: [
        "고해상도 원본 이미지를 그대로 다운로드·로드해 Excel에 삽입했습니다.",
        "셀 단위 다중 이미지 배치에서 DPI·Excel 문서 단위 차이로 위치와 여백이 어긋났습니다.",
      ],
      after: [
        "Excel 삽입 전에 이미지를 400px 기준으로 리사이징했습니다.",
        "Stream 기반 처리와 자원 해제를 적용하고, 문서 단위를 통일해 셀 내 이미지 슬롯·비율·정렬을 정리했습니다.",
      ],
    },
    discovery:
      "Grid Excel Export 경로를 분석하면서 문제 원인을 이미지 다운로드·로드·리사이징·Excel 삽입 과정 전체로 좁혔습니다. 서버 리사이징을 사용해도 원본 이미지가 반환되었고, 셀 단위로 여러 이미지를 배치할 때는 DPI와 Excel 문서 단위 차이로 위치와 여백이 어긋났습니다. 또한 이미지와 Stream을 사용한 뒤 자원을 해제하지 않으면 메모리 부담이 커질 수 있는 구조였습니다.",
    decisions: [
      "원본 이미지 전체를 byte[]에 적재하는 대신 OpenRead 기반 Stream 처리를 사용했습니다.",
      "Excel 삽입 전에 이미지를 400px 기준으로 사전 리사이징해 원본 고해상도 처리 구간을 줄였습니다.",
      "이미지와 Stream을 사용한 뒤 즉시 해제하도록 처리했습니다.",
      "Excel 문서 단위를 통일하고, 셀 내 여러 이미지는 슬롯으로 나누어 비율 유지와 중앙 정렬을 적용했습니다.",
    ],
    system: [
      { label: "분석", detail: "이미지 크기와 발생 조건 확인" },
      { label: "축소", detail: "Excel 삽입 전 400px 사전 리사이징" },
      { label: "로딩", detail: "Stream 처리와 사용 후 자원 해제" },
      { label: "배치", detail: "문서 단위 통일과 셀 내 슬롯·정렬 처리" },
      { label: "출력", detail: "Excel 생성 결과 확인" },
    ],
    verification: [
      "4,500px 이상·약 3.6MB 이미지가 포함된 발생 조건을 확인했습니다.",
      "이미지 사전 리사이징, Stream 기반 처리와 자원 해제 로직을 적용했습니다.",
      "Excel 출력 결과에서 이미지 위치·비율·여백과 셀 내 다중 이미지 배치를 확인했습니다.",
      "처리 시간·메모리 사용량·파일 용량의 변경 전후 수치는 별도로 측정하지 않았습니다.",
    ],
    limits: [
      "처리 시간·메모리 사용량·파일 용량의 변경 전후 수치는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "academic-transfer-workflow",
    title: "전과 신청·승인 및 학적 연계 시스템",
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
      "레거시 화면 전환과 신규·개선 개발을 통해 전과 신청·승인·학적 연계를 지원한 실제 운영 학사 시스템입니다.",
    tier: "supporting",
    snapshot: {
      problem:
        "기존 학사 업무를 전환하면서 신청·접수·결과 등록·승인 단계마다 다른 처리 기능과 수정 제한을 화면에 반영해야 했습니다.",
      role: "레거시 화면 전환, 신규 기능 개발·개선, 상태별 화면 제어와 기존 DB 프로시저 연동",
      change:
        "7개 탭에서 업무 단계별 조회와 처리를 제공하고, 신청 상태와 확정 여부에 따라 수정·삭제·결과 입력을 제어했습니다. 최종 승인에는 학적 반영 처리를 연계했습니다.",
      scope:
        "ASP.NET WebForms 화면과 C# 처리 로직의 전환·개발·개선을 담당했으며, 기존 DB 프로시저를 연동했습니다. 실제 담당자가 사용하는 운영 시스템에 적용되었습니다.",
    },
    discovery:
      "레거시 화면 전환과 신규·개선 기능 개발 과정에서 전과 업무의 처리 단계와 상태별 제약을 반영해야 했습니다. 접수·승인된 신청 자료와 확정된 결과는 수정 가능 범위가 달랐고, 최종 승인 단계는 학적 반영 처리로 이어졌습니다.",
    decisions: [
      "신청, 접수, 확정·출력, 접수 처리, 명단 조회, 결과 등록, 승인 처리를 7개 탭으로 구분해 업무별 조회와 처리를 제공했습니다.",
      "신청 상태와 확정 여부를 함께 확인해 수정·삭제 버튼과 결과 입력 기능을 제어했습니다.",
      "조회·등록·승인에 필요한 값을 기존 업무 서비스와 DB 프로시저에 전달하고, 처리 결과와 오류 메시지를 화면에 안내했습니다.",
      "최종 승인 기능에 학적 반영 서비스 호출을 연결했습니다.",
    ],
    system: [
      { label: "신청", detail: "신청 정보 입력·조회" },
      { label: "접수", detail: "접수·반려와 상태별 수정 제한" },
      { label: "결과 등록", detail: "전입 결과 입력과 확정 처리" },
      { label: "승인", detail: "선택 대상 승인과 학적 반영 연계" },
    ],
    verification: [
      "원본 소스에서 7개 탭과 탭별 조회·처리 기능을 확인할 수 있습니다.",
      "신청 상태와 확정 여부에 따른 수정·삭제 및 결과 입력 제어가 소스에 포함되어 있습니다.",
      "최종 승인 경로에 학적 반영 서비스 호출이 연결되어 있습니다.",
      "전환·개발한 기능은 실제 업무 담당자가 사용하는 운영 시스템에 적용되었습니다.",
    ],
    limits: [
      "DB 프로시저를 직접 작성한 범위는 아니며, 기존 프로시저와 화면·C# 로직을 연동했습니다.",
      "업무 처리 시간 단축이나 오류 감소율은 별도로 측정하지 않았습니다.",
    ],
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

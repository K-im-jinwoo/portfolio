export type ProjectTier = "featured" | "supporting";
export type ProjectKind = "업무 프로젝트" | "개인 프로젝트" | "산학 프로젝트";

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
  projectKind: ProjectKind;
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
    slug: "academic-transfer-workflow",
    projectKind: "업무 프로젝트",
    title: "울산대학교 학사·입학 업무 시스템",
    period: "2024.07 — 2026.02",
    role: "학사·입학 화면 개발·유지보수 참여 · 기존 DB 프로시저 연계",
    context: "울산대학교 학사·입학 시스템 / 실제 운영 시스템",
    stack: [
      "C#",
      "ASP.NET WebForms",
      "DevExpress",
      "MSSQL (Stored Procedure 연계)",
    ],
    summary:
      "레거시 화면 전환과 신규·개선 화면 개발에 참여해 전과 7개 탭 처리, 16개 탭 통합학적조회, 입학전형 확정 제어를 실제 운영 학사 시스템에 반영한 프로젝트입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "학사·입학 업무를 웹 화면으로 전환·개선하면서 신청·접수·결과 등록·승인 단계별 제약과 확정 여부에 따른 수정 제한을 화면에 반영해야 했습니다.",
      role: "레거시 화면 전환 및 신규·개선 화면 개발·유지보수 참여, 상태별 화면 제어 적용, 기존 업무 서비스·DB 프로시저 연동",
      change:
        "전과 업무를 7개 탭으로 구성해 상태별 수정·삭제·결과 입력을 제어하고 최종 승인에 학적 반영 호출을 연결했습니다. 통합학적조회 16개 탭, 실기고사 배점 Excel 일괄 등록, 23개 입학전형 화면의 확정 처리 패턴을 적용했습니다.",
      scope:
        "전과 신청·승인 화면, 16개 탭 통합학적조회, 실기고사 배점 Excel 업로드, 23개 신입학·편입학 전형 화면의 확정 제어 개발·유지보수에 참여했습니다. 기존 DB 프로시저와 업무 서비스를 연동했으며 실제 운영 환경에서 사용되었습니다.",
    },
    comparison: {
      before: [
        "레거시 화면 전환 과정에서 전과·입학 업무의 진행 단계별 수정 가능 범위와 확정 상태를 화면마다 일관되게 제어해야 했습니다.",
        "학생 학적·성적·장학·등록·졸업 정보가 여러 화면에 흩어져 있었고, 실기고사 배점 입력 등 반복 등록 업무가 존재했습니다.",
      ],
      after: [
        "전과 7개 탭과 23개 입학전형 화면에서 진행 상태·확정 여부에 따라 입력·수정·삭제 기능을 제어하고 처리 결과를 안내합니다.",
        "16개 탭 통합학적조회에서 선택한 탭의 UserControl과 데이터를 조회하고, 실기고사 배점은 Excel 파일로 일괄 등록합니다.",
      ],
    },
    discovery:
      "전과와 입학 업무는 접수·승인된 자료와 확정된 결과의 수정 가능 범위가 서로 다르고, 최종 승인 단계가 학적 반영 처리로 이어집니다. 기존 DB 프로시저와 서비스를 유지하면서 화면 단에서 상태별 제어와 안내가 누락되지 않도록 구성해야 했습니다.",
    decisions: [
      "전과 업무는 신청, 접수, 확정·출력, 접수 처리, 명단 조회, 결과 등록, 승인 처리의 7개 탭으로 구성되어 단계별 조회와 처리를 제공합니다.",
      "신청 상태와 확정 여부를 함께 확인해 수정·삭제 버튼과 결과 입력 허용 범위를 제어합니다.",
      "조회·등록·승인에 필요한 파라미터를 기존 업무 서비스 및 DB 프로시저에 전달하고, 처리 결과와 오류 메시지를 화면에 표시합니다.",
      "최종 승인 경로에는 학적 반영 서비스 호출이 연결되어 있습니다.",
      "통합학적조회는 학적·성적·장학·등록·졸업 등 16개 탭으로 구성하고, 활성화된 탭의 UserControl과 데이터를 조회하도록 구성했습니다.",
      "실기고사 배점의 Excel 일괄 등록(WebMethod·Stored Procedure 연계)과 23개 입학전형 화면의 공통 확정 처리 및 수정 제한 기능을 반영했습니다.",
    ],
    system: [
      { label: "신청·접수", detail: "전과 신청 조회·접수·반려 및 상태별 수정 제한" },
      { label: "결과·승인", detail: "전입 결과 확정 및 최종 승인 시 학적 반영 연계" },
      { label: "통합학적", detail: "16개 탭 중 선택된 탭의 UserControl·데이터 조회" },
      { label: "입학전형", detail: "실기 배점 Excel 업로드 및 23개 화면 확정 제어" },
    ],
    verification: [
      "소스 코드 기준 전과 7개 탭의 조회·처리 흐름과 상태·확정 여부에 따른 수정·삭제 제어가 반영되어 있습니다.",
      "최종 승인 경로에 학적 반영 서비스 호출이 연결되어 있으며, 실제 대학 업무 담당자가 사용하는 운영 시스템에 적용되었습니다.",
      "저장소 이력 기준 16개 탭 통합학적조회, 실기고사 배점 Excel 등록, 23개 입학전형 화면의 공통 확정 처리 적용 내역을 확인했습니다.",
    ],
    limits: [
      "DB 프로시저(Stored Procedure)는 직접 작성하지 않았으며, 기존 프로시저와 업무 서비스를 화면·C# 코드에 연동했습니다.",
      "과거 작업 중 본인 직접 작성과 AI 도구 활용의 시점별 분담 비율은 별도로 구분되지 않습니다.",
      "업무 처리 시간 단축이나 오류 감소율 같은 정량적 운영 수치는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "qms-approval-system",
    projectKind: "업무 프로젝트",
    title: "HWASHIN QMS 검사·승인 업무 시스템",
    period: "2025.08.14 — 2026.04.02",
    role: "검사·승인 화면 개발·유지보수 참여 · 기존 API·DB 프로시저 연동",
    context: "UPORTAL QMS / 실제 운영 시스템",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "DevExtreme",
      "TanStack Query",
      "MSSQL 연동",
      "PM2",
    ],
    summary:
      "검사 결과 입력·판정과 권한별 승인 흐름을 화면에 반영하고, 탭별 조회 캐시 분리와 변경 항목 저장을 적용한 실제 운영 품질관리(QMS) 웹 시스템입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "검사 결과는 Inspector·Reviewer·Approval 단계로 나뉘며, 사용자 권한과 QC 유형에 따라 처리 가능한 승인 동작이 달라 화면에서 이를 구분해 제어해야 했습니다.",
      role: "검사·승인 화면 개발·유지보수 참여, 사용자별 권한 확인 및 기존 API·DB 프로시저 연동, 공통 UI 개선 및 PM2 배포 참여",
      change:
        "검사 조건별 승인 상태를 조회해 권한에 따라 CONFIRM 버튼을 제어하고, QC 승인 경로를 분리해 연결했습니다. 검사 상세 탭별 캐시 분리와 설비 점검계획의 변경 항목 저장 로직을 적용했습니다.",
      scope:
        "검사 결과 입력·OK/NG 판정, LOT SOP·NG 상세 팝업, 검토·승인 화면, 기존 API·DB 프로시저 연동, 탭별 캐시 분리, 변경 필드 저장 및 공통 UI 개선에 참여했습니다. 개발·개선 기능은 실제 운영 시스템에서 사용되었습니다.",
    },
    comparison: {
      before: [
        "동일한 검사 데이터라도 사용자 권한과 진행 단계(Inspector·Reviewer·Approval) 및 QC 여부에 따라 허용 동작을 구분해야 했습니다.",
        "검사 상세 탭 이동과 설비 점검계획 수정 시 불필요한 재조회나 미변경 항목 저장을 줄일 필요가 있었습니다.",
      ],
      after: [
        "작업일·검사명·Work Center·품목·Shift 조건으로 승인 상태를 조회하고, 사용자 권한에 맞는 CONFIRM 버튼만 활성화합니다.",
        "검사 상세 데이터를 탭별 캐시로 분리하고, 점검계획은 원본 대비 실제 변경된 필드만 저장(원래 값으로 되돌린 항목 제외)합니다.",
      ],
    },
    discovery:
      "검사 결과 승인 화면에서는 일반 승인과 QC 승인이 서로 다른 조회·저장 경로를 사용해야 했고, 승인 직후 목록과 권한 상태가 함께 갱신되어야 현업 화면에서 상태 불일치가 발생하지 않았습니다.",
    decisions: [
      "작업일·검사명·Work Center·품목·Shift 조건을 기준으로 승인 대상과 현재 진행 상태를 조회합니다.",
      "사용자 권한과 검사 상태를 확인해 Reviewer·Approval 단계의 CONFIRM 버튼 노출 및 활성 상태를 제어합니다.",
      "QC 승인 흐름은 일반 승인과 구분된 별도 조회·권한 확인 경로로 연동되어 있습니다.",
      "기존 API를 통해 승인 결과를 저장하고, 성공 시 관련 목록과 권한 상태를 다시 조회합니다.",
      "검사 상세 데이터는 탭별 캐시 키로 분리하고, 설비 점검계획은 원본 값과 비교해 실제 변경된 필드만 저장 대상에 포함합니다.",
      "Dialog·Popup·VerticalGrid 등 공통 UI 개선과 PM2 기반 운영 배포 과정에 참여했습니다.",
    ],
    architecture: {
      title: "검사 결과 승인 및 화면 연동 흐름",
      inputFlowLabel: "승인 대상 조회",
      curationFlowLabel: "권한 확인·승인 처리",
      outputFlowLabel: "결과 반영",
      inputs: [
        {
          label: "검사 조건",
          detail: "작업일·검사명·Work Center·품목·Shift",
        },
        {
          label: "검사 결과",
          detail: "단계별 승인 대상 및 LOT SOP·NG 상세 정보",
        },
      ],
      router: {
        label: "승인 목록·상태 조회",
        detail: "기존 API·DB 프로시저를 통해 검사 결과와 승인 상태를 조회",
      },
      branches: [
        {
          label: "권한·상태 제어",
          steps: [
            { label: "사용자 권한 확인", detail: "처리 가능한 승인 단계(Reviewer·Approval) 확인" },
            { label: "승인 버튼 제어", detail: "권한과 현재 상태에 따라 CONFIRM 버튼 제어" },
          ],
        },
        {
          label: "승인·저장 실행",
          steps: [
            { label: "QC 별도 승인 경로", detail: "QC 승인 조회·권한 경로를 분리 처리" },
            { label: "저장 및 상태 갱신", detail: "승인·변경분 저장 후 목록과 권한 상태 재조회" },
          ],
        },
      ],
      curation: [
        { label: "변경 항목 판별", detail: "점검계획 수정 시 원본과 다른 필드만 추출" },
        { label: "탭별 캐시 분리", detail: "검사 상세 탭 단위 조회 캐시 관리" },
      ],
      knowledgeBase: {
        label: "QMS 운영 데이터",
        detail: "기존 API와 DB 프로시저를 통해 반영된 검사·승인 결과",
      },
    },
    verification: [
      "검사 조건별 승인 목록 조회, 사용자 권한에 따른 Reviewer·Approval CONFIRM 버튼 제어, QC 별도 승인 연동이 반영되어 있습니다.",
      "저장소 이력 기준 검사 상세의 탭별 캐시 분리, 설비 점검계획의 변경 필드 저장, VerticalGrid 등 공통 컴포넌트 개선 내역을 확인했습니다.",
      "2025년 8월부터 2026년 4월까지 참여해 반영한 검사·승인 기능이 실제 운영 시스템에서 사용된 것을 확인했습니다.",
    ],
    limits: [
      "DB 프로시저는 직접 작성하지 않았으며, 기존 API와 DB 프로시저를 프론트엔드 화면 로직에 연동했습니다.",
      "과거 작업 중 본인 직접 작성과 AI 도구 활용의 시점별 분담 비율은 별도로 구분되지 않습니다.",
      "승인 처리 시간 단축이나 조회 부하 감소율 같은 정량 수치는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "excel-data-converter",
    projectKind: "업무 프로젝트",
    title: "Excel 데이터 변환 자동화 프로그램",
    period: "2026",
    role: "수동 매크로 삽입·코드 변환 수행 · 요구사항 전달 · AI 활용 도구 제작",
    context: "HIAIR KOREA MES / WinForms 업무 보조",
    stack: ["Python", "PySide6", "openpyxl", "JSON", "VBA", "Excel COM"],
    summary:
      "파일마다 VBA 매크로를 삽입해 수작업으로 처리하던 Excel 내부 코드 변환 업무를 줄이기 위해, 요구사항과 샘플을 전달해 AI로 구현한 로컬 GUI 변환 프로그램입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "초기에는 Excel에 업무 명칭을 그대로 기입했으나, MES Grid 입력을 위해 파일별 명칭을 내부 코드로 바꿔야 해 매번 VBA 매크로를 삽입하고 조건을 수작업으로 맞춰야 하는 번거로움이 있었습니다.",
      role: "본인: 파일 수작업 및 VBA 매크로 삽입·코드 변환 수행, 변환 요구사항·샘플 제공 및 동작 확인 / AI 구현: PySide6 GUI, 규칙 매핑·Dry Run·JSON 프로필·파일 내보내기 코드 및 테스트 작성",
      change:
        "파일마다 매크로를 넣어 수동 변환하던 작업을 대신해, GUI에서 대상·참조 컬럼과 단일·복합 조건을 설정하고 Dry Run 확인 후 새 파일로 출력하는 도구를 구축했습니다.",
      scope:
        "PySide6 GUI 기반 시트·헤더 선택, 단일·복합 조건 매핑, JSON 규칙 프로필 저장·불러오기, Dry Run 검증, 새 XLSX 생성 및 매크로 포함 XLSM 내보내기 기능이 구현되어 있습니다.",
    },
    comparison: {
      before: [
        "Connection Error 같은 업무 명칭을 Excel에 기입한 뒤, Grid 입력을 위해 VBA 매크로를 삽입하고 파일마다 다른 조건을 수작업으로 처리했습니다.",
        "파일 구조나 제품·PART 조건 조합이 달라질 때마다 수동 변환 작업을 반복해야 했습니다.",
      ],
      after: [
        "GUI에서 대상·참조 컬럼과 단일·복합 조건을 선택하고 JSON 프로필로 저장해 재사용합니다.",
        "Dry Run으로 미일치·중복 참조 여부를 미리 확인한 뒤 원본을 보존하고 새 XLSX 또는 XLSM 파일로 출력합니다.",
      ],
    },
    discovery:
      "파일마다 VBA 매크로를 삽입해 업무 명칭을 MES 내부 코드로 바꾸다 보니, 헤더와 제품·PART 등 복합 조건을 매번 수작업으로 맞춰야 했습니다. 이에 반복되던 변환 조건과 실제 파일 샘플을 AI에 전달해 GUI 변환 프로그램을 구현하고 실행 결과를 확인했습니다.",
    decisions: [
      "수동 매크로 삽입·변환에서 반복하던 단일·복합 조건 코드 매핑을 GUI에서 설정할 수 있도록 요구사항을 전달했습니다.",
      "자연어 해석 대신 시트·헤더·컬럼을 선택하는 PySide6 GUI 방식으로 구성했습니다(초기 검토했던 OpenAI·n8n 연동 기능은 현재 도구에서 제거됨).",
      "설정한 변환 조건을 반복 사용할 수 있도록 JSON 파일 기반 프로필 저장·불러오기 기능을 두었습니다.",
      "원본 파일 손상을 막기 위해 변환 전 Dry Run 미리보기와 미일치·중복 정책(유지·삭제·기록·중단) 확인 단계를 포함했습니다.",
      "일반 변환 결과는 새 XLSX로 출력하고, 매크로가 필요한 경우 생성된 VBA와 Excel COM을 통해 XLSM으로 내보내도록 구현되어 있습니다.",
    ],
    architecture: {
      title: "규칙 설정 및 코드 변환 흐름",
      inputFlowLabel: "파일·코드 기준 입력",
      curationFlowLabel: "Dry Run 확인·프로필 재사용",
      outputFlowLabel: "변환 파일 생성",
      inputs: [
        { label: "대상 Excel 파일", detail: "업무 명칭이 기입된 원본 시트" },
        { label: "코드 기준 시트", detail: "명칭과 MES 내부 코드 매핑표" },
      ],
      router: {
        label: "시트·헤더 읽기",
        detail: "시트명, 헤더, 데이터 시작 행을 불러와 GUI 선택 목록으로 표시",
      },
      branches: [
        {
          label: "규칙 구성",
          steps: [
            { label: "컬럼 매핑", detail: "대상 컬럼과 참조 컬럼을 GUI에서 지정" },
            { label: "단일·복합 조건", detail: "제품·PART 등 다중 컬럼 조합 조건 설정" },
            { label: "예외 처리 정책", detail: "미일치·중복 시 유지·삭제·기록·중단 선택" },
          ],
        },
        {
          label: "검증 및 출력",
          steps: [
            { label: "Dry Run 검증", detail: "저장 전 변환 성공·실패 건수와 대상 행 확인" },
            { label: "유효성 확인", detail: "등록되지 않은 명칭·조합 오류 로그 표시" },
            { label: "새 파일 출력", detail: "원본을 유지하고 새 XLSX 또는 XLSM 생성" },
          ],
        },
      ],
      curation: [
        { label: "변환 로그 확인", detail: "변환·미일치·중복 처리 결과 검토" },
        { label: "JSON 프로필 저장", detail: "파일별 변환 규칙을 JSON으로 저장·재사용" },
      ],
      knowledgeBase: {
        label: "변환 완료 Excel",
        detail: "MES Grid 입력에 사용할 새 XLSX 또는 매크로 포함 XLSM",
      },
    },
    verification: [
      "수동 변환을 수행하던 파일 사례를 기준으로 시트·헤더 선택, 단일·복합 조건 매핑, Dry Run 로그 확인, 새 XLSX 출력 흐름을 확인했습니다.",
      "현재 GUI 프로그램은 JSON 프로필 저장 방식을 사용하며, AI 구현 과정에서 단일·복합 조건과 미일치·중복 정책, 원본 보존 시나리오를 확인하는 테스트 코드가 함께 작성되었습니다.",
    ],
    limits: [
      "파일 수작업과 VBA 매크로 삽입·코드 변환 및 요구사항·샘플 제공은 본인이 수행했으며, PySide6 GUI·규칙 처리·내보내기 코드와 테스트는 AI가 구현했습니다.",
      "현재 실제 GUI 코드는 JSON 파일로 규칙을 저장합니다(별도 프로토타입의 SQLite 기록과 구분).",
      "XLSM 내보내기는 Windows Excel COM 및 VBA 프로젝트 접근 권한이 필요하며, 테스트 코드는 FakeExcel 대체 객체를 사용하므로 실제 Excel 내 VBA 실행 검증은 별도입니다.",
      "수작업 대비 변환 시간 단축률이나 메모리 사용량 수치는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "production-quality-dashboard",
    projectKind: "업무 프로젝트",
    title: "생산·품질·납기 모니터링 대시보드",
    period: "2026.03 — 현재",
    role: "현장 요구사항 반영 · AI 활용 화면 구현 · 조회 연계 참여",
    context: "HIAIR KOREA 생산·품질 웹 시스템",
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "React Query",
      "DevExtreme",
      "Chart.js",
      "MSSQL 연동",
    ],
    summary:
      "생산 공정·실적, DPU·불량 통계, 호기별 일정·납기 현황을 현장 화면에 맞춰 시각화하고 주기적 DB 조회(Polling)로 연결한 모니터링 웹 시스템입니다.",
    tier: "supporting",
    snapshot: {
      problem:
        "공정 진행률, 계획 대비 실적, 품질 지표, 호기별 납기 등 조회 기준이 다른 데이터를 현장 화면과 태블릿 규격에 맞춰 표시하고 주기적으로 갱신해야 했습니다.",
      role: "본인: 현장 화면 요구사항 전달·기존 API 및 MSSQL 조회 연계 확인 / AI 구현: 공정 맵·상태 카드·품질 차트·HeatMap·일정 화면 및 조회 훅 코드 작성",
      change:
        "공정 흐름과 상태 카드, DPU·불량 유형 차트 및 HeatMap, Super Module 주간 계획·납기 화면을 구성하고 React Query Polling 기반 데이터 재조회를 적용했습니다.",
      scope:
        "생산·품질·Super Module 대시보드 화면 구성, 기존 API·MSSQL Stored Procedure 연계, 현장 태블릿용 반응형 레이아웃 적용에 참여했습니다.",
    },
    discovery:
      "생산 현황은 공정·호기별 진행률로, 품질 현황은 기간·공급업체·불량 유형별 집계로, 일정 현황은 주간 계획과 목표 납기를 기준으로 표시해야 했습니다. 각 화면의 조회 기준을 맞추고 현장에서 지연 여부를 색상과 카드로 구분할 수 있도록 요구사항을 반영했습니다.",
    decisions: [
      "생산 대시보드는 공정 맵과 상태 카드를 배치해 전체 공정 흐름과 개별 진행률을 함께 표시합니다.",
      "품질 대시보드는 불량 통계를 Bar·Doughnut 차트로 시각화하고, 공정별 불량 분포는 HeatMap으로 나타냅니다.",
      "Super Module 화면은 주간 계획과 호기별 목표 납기를 비교하고, 납기 임박도와 지연 상태에 따라 색상을 구분합니다.",
      "React Query Polling으로 조회 데이터를 주기적으로 갱신하며, 현장 태블릿 해상도를 고려한 반응형 레이아웃을 적용했습니다.",
    ],
    system: [
      { label: "조회 연계", detail: "기간·공정·호기 조건으로 기존 API·MSSQL SP 호출" },
      { label: "생산 화면", detail: "공정 맵·상태 카드·계획 대비 실적 표시" },
      { label: "품질 화면", detail: "DPU·불량 유형 차트 및 공정별 HeatMap 시각화" },
      { label: "일정 화면", detail: "Super Module 호기별 작업 현황과 목표 납기 비교" },
      { label: "주기 갱신", detail: "React Query Polling 기반 DB 데이터 재조회" },
    ],
    verification: [
      "저장소 이력 및 화면 기준 생산 공정 맵, 품질 대시보드, Super Module 일정 화면과 조회 훅 구성을 확인했습니다.",
      "공정별 상태 카드, 계획 대비 실적, DPU·불량 차트, 호기별 납기 표시 및 반응형 레이아웃이 반영되어 있습니다.",
    ],
    limits: [
      "데이터 갱신은 주기적 DB Polling 방식이며, 모든 설비·센서가 실시간으로 연동된 구조는 아닙니다(장비 상태 등 일부 항목은 고정값 포함).",
      "DB 프로시저는 직접 작성하지 않았으며, 요구사항을 전달해 AI로 화면·차트 코드를 구현하고 연계를 확인했습니다.",
      "현장 판단 시간 단축이나 조회 부하 변화 같은 정량 수치는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "excel-export-optimization",
    projectKind: "업무 프로젝트",
    title: "고해상도 이미지 Excel Export 개선 적용",
    period: "2026.02 — 현재",
    role: "기존 화면의 Excel 출력 개선 적용 참여 · 출력 결과 확인",
    context: "HIAIR KOREA MES / WinForms 업무",
    stack: ["C#", ".NET", "WinForms", "Excel Export", "Stream"],
    summary:
      "고해상도 이미지가 다수 포함된 Grid Excel Export에서 발생하던 메모리 부족 및 이미지 배치 틀어짐 문제에 대해, 사전 리사이징·Stream 처리·슬롯 배치 개선이 적용된 사례입니다.",
    tier: "supporting",
    snapshot: {
      problem:
        "Grid 기반 Excel Export 시 4,500px 이상(약 3.6MB)의 고해상도 이미지를 한 셀에 여러 장 삽입하면 메모리 부족 오류가 발생하고, 출력된 Excel에서 스크롤 지연과 이미지 위치·여백 틀어짐이 나타났습니다.",
      role: "기존 WinForms 화면의 Excel Export 이미지 처리 개선 적용 참여 및 출력 파일 표시 상태 확인",
      change:
        "원본 고해상도 이미지를 그대로 넣던 방식에서 Excel 삽입 전 400px 기준 축소, Stream 기반 로드 및 자원 정리, 셀 내 슬롯 기준 정렬 로직이 적용된 코드로 변경되었습니다.",
      scope:
        "WinForms Grid의 Excel Export 경로에 이미지 사전 리사이징, Stream 로드·자원 해제, 문서 단위 통일 및 셀 내 슬롯 배치가 반영되었으며 출력 결과를 확인했습니다.",
    },
    comparison: {
      before: [
        "4,500px 이상·약 3.6MB 원본 이미지를 그대로 로드해 Excel 셀에 삽입하면서 메모리 부족과 출력 후 스크롤 지연이 발생했습니다.",
        "한 셀에 여러 이미지를 넣을 때 단위 차이와 배치 계산 문제로 이미지 위치와 여백이 어긋났습니다.",
      ],
      after: [
        "Excel 삽입 전 이미지를 400px 기준으로 사전 축소하고 Stream 로드 및 사용 후 자원 정리를 적용했습니다.",
        "셀 영역을 슬롯 단위로 나누고 비율 유지와 중앙 정렬을 적용해 다중 이미지 배치를 정리했습니다.",
      ],
    },
    discovery:
      "특정 검사 데이터에 4,500px 이상·약 3.6MB급 고해상도 이미지가 여러 장 포함될 때 Export가 실패하거나 출력된 시트의 이미지 정렬이 깨지는 조건이 확인되었고, 이미지 축소·Stream 정리·슬롯 정렬 방식을 적용해 출력을 개선했습니다.",
    decisions: [
      "원본 이미지를 byte[] 전체로 적재하는 대신 Stream 기반으로 읽고 사용 후 자원을 정리하는 구조가 적용되었습니다.",
      "Excel에 삽입하기 전에 이미지를 400px 기준으로 사전 축소해 고해상도 원본이 그대로 시트에 들어가지 않도록 처리했습니다.",
      "문서 단위를 맞추고 셀 내 다중 이미지를 슬롯 영역으로 나누어 비율 유지 및 중앙 정렬이 되도록 배치 로직을 반영했습니다.",
    ],
    system: [
      { label: "조건 확인", detail: "4,500px+·약 3.6MB 다중 이미지 Export 오류 조건" },
      { label: "사전 축소", detail: "Excel 삽입 전 400px 기준 이미지 리사이징" },
      { label: "자원 정리", detail: "Stream 기반 로드 및 사용 후 해제 처리" },
      { label: "배치 정렬", detail: "셀 내 다중 이미지 슬롯 분할 및 비율·중앙 정렬" },
      { label: "결과 확인", detail: "Excel 파일 출력 및 셀 내 이미지 표시 확인" },
    ],
    verification: [
      "기록 및 코드 기준 4,500px 이상·약 3.6MB 이미지 조건에 대한 400px 사전 축소, Stream 로드·자원 정리, 셀 내 다중 이미지 슬롯 배치가 적용된 것을 확인했습니다.",
      "생성된 Excel 출력 파일에서 셀 내 다중 이미지의 위치·비율·여백 표시 상태를 확인했습니다.",
    ],
    limits: [
      "세부 알고리즘(DPI·문서 단위 변환 및 자원 해제 코드)의 본인 직접 작성과 AI 도구 활용 분담 비율은 별도로 확인되지 않습니다.",
      "처리 시간, 메모리 사용량, 출력 파일 용량의 변경 전후 정량 수치는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "lg-voc-dashboard",
    projectKind: "산학 프로젝트",
    title: "LG전자 소비자 VoC 라벨링·시각화 대시보드",
    period: "2023.02 — 2024.04",
    role: "리뷰 데이터 라벨링 · 시각화 화면 및 사내 이관 참여",
    context: "대학 산학 프로젝트 (취업 전 · 직장 경력 연수 미포함)",
    stack: ["Django", "JavaScript", "D3.js", "SQL"],
    summary:
      "대학 재학 중 참여한 산학 프로젝트로, 소비자 리뷰 약 3~4만 건을 직접 라벨링하고 Django·D3.js 기반 시각화 화면 개선과 사내 서버 이관·배포에 참여했습니다.",
    tier: "supporting",
    snapshot: {
      problem:
        "전체 약 20만 건의 소비자 리뷰를 활용한 산학 과제에서 분담받은 약 3~4만 건을 직접 분류해야 했고, 탭 전환 시 D3.js 차트가 중복 생성되지 않도록 화면을 정리해 사내 환경으로 이관해야 했습니다.",
      role: "리뷰 약 3~4만 건 직접 라벨링, Django·D3.js 시각화 및 탭 전환 렌더링 수정 참여, DB 이관·사내 서버 배포·담당자 시연 참여",
      change:
        "라벨링한 분류 데이터를 워드클라우드·도넛·바 차트로 시각화하고, 탭 전환 시 기존 SVG와 이벤트를 정리해 차트가 중복 렌더링되지 않도록 수정한 뒤 사내 서버로 이관했습니다.",
      scope:
        "리뷰 라벨링(약 3~4만 건), Django·JavaScript·D3.js 차트 화면 참여, SVG 중복 생성 수정, DB 이관 및 사내 서버 배포·시연에 참여했습니다.",
    },
    discovery:
      "분류한 리뷰 데이터를 차트로 표시할 때 탭을 반복 전환하면 기존 D3.js SVG 요소와 이벤트가 남아 차트가 겹쳐 그려지는 현상이 있었고, 재렌더링 전에 컨테이너와 이벤트를 초기화하는 처리가 필요했습니다.",
    decisions: [
      "전체 약 20만 건 규모의 리뷰 데이터 중 담당 분량인 약 3~4만 건을 기준에 맞춰 직접 라벨링했습니다.",
      "분류 결과를 한눈에 비교할 수 있도록 워드클라우드·도넛·바 차트 시각화를 구성했습니다.",
      "탭 전환 시 기존 SVG 요소와 이벤트를 정리한 뒤 차트를 다시 그리도록 렌더링 흐름을 수정했습니다.",
      "구축된 DB 데이터와 Django 애플리케이션을 LG 사내 서버 환경으로 이관하고 담당자 대상 시연에 참여했습니다.",
    ],
    system: [
      { label: "데이터 분류", detail: "약 3~4만 건 소비자 리뷰 직접 라벨링" },
      { label: "차트 시각화", detail: "Django·D3.js 기반 워드클라우드·도넛·바 차트" },
      { label: "렌더링 정리", detail: "탭 전환 시 SVG 중복 생성 및 이벤트 초기화" },
      { label: "이관·배포", detail: "DB 데이터 이관, 사내 서버 배포 및 담당자 시연" },
    ],
    verification: [
      "담당 분량인 약 3~4만 건의 소비자 리뷰 라벨링을 완료했습니다.",
      "워드클라우드·도넛·바 차트 시각화와 탭 전환 시 SVG 중복 렌더링 수정 결과를 확인했습니다.",
      "DB 이관, 사내 서버 배포 및 현업 담당자 시연까지 마무리했습니다.",
    ],
    limits: [
      "대학 재학 중 수행한 산학 협력 프로젝트이며, 정식 직장 경력 연수에는 포함되지 않습니다.",
      "라벨링 정확도(라벨러 간 일치율)나 이관 이후 현업 활용 지표는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "wiki-knowledge-system",
    projectKind: "개인 프로젝트",
    title: "LLM 기반 개인 지식 관리·업무 보조 시스템",
    period: "2026.07 — 현재",
    role: "기록·검색 요구사항 전달 · Inbox 위치 지정 · AI 구현 결과 실사용 확인",
    context: "개인 프로젝트 (AI 구현 중심)",
    stack: [
      "Telegram",
      "Hermes Agent",
      "FastAPI",
      "OpenAI Agents SDK",
      "WIKI Capture Skill",
      "Python",
      "SQLite",
      "Obsidian",
      "Markdown",
    ],
    summary:
      "수동 기록과 재검색의 번거로움을 줄이기 위해 요구사항과 Inbox 저장 위치를 전달하고, AI로 구현한 문서 검색·출처 표시·승인 후 메모 저장 기능을 개인 사용 중인 지식 관리 도구입니다.",
    tier: "featured",
    snapshot: {
      problem:
        "Notion에 작업 내용을 수기로 작성·분류하는 과정이 번거로웠고, 시간이 지나면 기록 여부를 잊어 과거 작업 맥락과 자료를 다시 찾는 데 시간이 걸렸습니다.",
      role: "본인: 수동 기록 불편 제시, Inbox 폴더 위치 지정, AI 작업 요청 및 실사용 피드백 / AI 구현: FastAPI·Agents SDK·Hermes 코드와 테스트 작성·실행",
      change:
        "초기 n8n·FastAPI 질의 구성을 거쳐 Hermes 기반의 조회·계획·기록 역할 구조로 전환했습니다. 질문에는 조회한 문서 출처를 함께 표시하고, 메모는 미리보기와 승인을 거쳐 Inbox에 저장합니다.",
      scope:
        "Markdown WIKI 문서 검색, Telegram 연동, 조회·계획·기록 역할 분리, 승인 후 메모 저장 및 Inbox 검토 보조 흐름을 AI로 구현해 개인 사용 중입니다.",
    },
    comparison: {
      before: [
        "Notion에 작업 내용을 직접 작성·분류해야 했고, 시간이 지나면 어디에 무엇을 적었는지 다시 찾아야 했습니다.",
        "초기 n8n 및 키워드 분기 구성에서는 후속 질문의 문맥을 이어받아 처리하는 데 한계가 있었습니다.",
      ],
      after: [
        "작업 내역은 WIKI Capture Skill로 기록하고, Telegram 메모는 미리보기와 승인을 거쳐 지정한 Inbox 폴더에 저장합니다.",
        "Hermes 에이전트가 조회·계획·기록 역할을 나누어 처리하며, 조회 결과에 참조 문서 출처와 동기화 시각을 함께 표시합니다.",
      ],
    },
    discovery:
      "Notion에 작업 내용을 수기로 작성·분류하는 과정이 번거로웠고, 시간이 지나면 기록 여부를 잊어 과거 작업 맥락과 자료를 다시 찾는 데 시간이 걸렸습니다. 이러한 불편 사항과 Inbox 저장 위치를 AI에 전달해 검색·메모 도구 구현을 맡기고, 개인 사용 과정에서 실행 결과를 확인했습니다.",
    decisions: [
      "새 메모는 지정한 Inbox에 Markdown 초안으로 정리하고, 대상 경로와 내용을 미리보기로 확인한 뒤 사용자 승인을 거쳐 저장합니다.",
      "초기 n8n·FastAPI·OpenAI Agents SDK 질의 구성에서 Hermes 기반의 조회·계획·기록 역할 구조로 전환했습니다.",
      "질문 응답에는 실제 조회한 문서의 출처를 함께 표시하며, 문서 조회와 메모 저장 흐름을 구분해 처리합니다.",
    ],
    architecture: {
      title: "Hermes 역할 분리와 조회·승인 흐름 (AI 구현 구조)",
      inputFlowLabel: "기록 수집·대화 입력",
      curationFlowLabel: "초안 검토·승인 확인",
      outputFlowLabel: "근거 반환·Inbox 반영",
      inputs: [
        { label: "Codex 작업 기록", detail: "WIKI Capture Skill" },
        { label: "모바일 메모·질문", detail: "Telegram 입력" },
      ],
      router: {
        label: "Hermes 대표 에이전트",
        detail: "대화 문맥 확인 · 역할 위임 · 승인 도구 호출",
      },
      branches: [
        {
          label: "읽기 전용 조회",
          steps: [
            { label: "조회 역할", detail: "WIKI 검색·본문 읽기·Task 조회" },
            { label: "동기화 상태 확인", detail: "문서 동기화 상태 확인 후 원본 조회" },
            { label: "출처 포함 응답", detail: "참조 문서 경로와 동기화 시각 표시" },
          ],
        },
        {
          label: "기록·계획 초안",
          steps: [
            { label: "기록 역할", detail: "Telegram 메모를 Markdown 초안으로 정리" },
            { label: "계획 역할", detail: "Task 기반 작업 계획 초안 제시" },
            { label: "미리보기 안내", detail: "저장 전 대상 폴더(Inbox)와 내용 표시" },
          ],
        },
      ],
      curation: [
        { label: "사용자 승인 확인", detail: "미리보기 확인 후 승인된 건만 저장 실행" },
        { label: "Inbox 검토 보조", detail: "기존 문서와 비교 후 최종 반영 여부 분리" },
      ],
      knowledgeBase: {
        label: "Obsidian Markdown WIKI",
        detail: "질의는 읽기 전용 · 메모 저장은 지정된 Inbox 경로 사용",
      },
    },
    verification: [
      "Telegram에서 문서 질의 응답, 출처 표시, 미리보기·승인 후 Inbox 저장 흐름을 개인 사용하며 동작을 확인했습니다.",
      "초기 질의 API와 Hermes 전환·반복 검토 과정에서 AI가 작성·실행한 테스트 로그가 남아 있습니다.",
    ],
    limits: [
      "본인은 요구사항·Inbox 위치 전달과 실사용 확인을 맡았으며, API·에이전트 코드와 테스트 작성·실행은 AI가 수행했습니다.",
      "초기 API의 내부 채점 기록은 현재 Hermes 성능을 대표하지 않으며, Notion 대비 생산성 향상 수치는 별도로 측정하지 않았습니다.",
    ],
    metrics: [],
  },
  {
    slug: "market-research-agent",
    projectKind: "개인 프로젝트",
    title: "시장 데이터 조회·Telegram 리서치 에이전트",
    period: "2026.09 — 현재",
    role: "조회 요건·응답 문제 제시 · AI 구현 위임 · Telegram 수신 확인",
    context: "개인 실험 프로젝트 · 조회 전용 (주문·수익 무관)",
    stack: ["Python", "Hermes Agent", "Telegram", "REST API", "Shell"],
    summary:
      "개인 리서치 참고용으로 시장 데이터 조회 조건과 Telegram 단일 응답 요구사항을 AI에 전달해 구현한 조회 전용 실험 프로젝트입니다.",
    tier: "supporting",
    snapshot: {
      problem:
        "저장된 보고서와 실시간 시세의 조회 시점을 구분해 봐야 했고, Telegram에서 비동기 위임 호출을 쓸 때 중간 알림과 최종 답변이 나뉘어 오는 불편함이 있었습니다.",
      role: "본인: 시점 구분 및 단일 응답 요구사항 전달, Telegram 실제 수신 확인 / AI 구현: 조회 전담 프로필, 종목코드·시간 제한 래퍼, 동기 브리지 코드 및 테스트 작성·실행",
      change:
        "API 응답 완료 시각을 기준으로 실시간 시세와 저장 보고서를 구분해 표시하고, Telegram에서는 동기 브리지를 통해 중간 메시지 없이 최종 응답 1건만 오도록 구성을 변경했습니다.",
      scope:
        "1~5개 종목의 현재가 및 최근 완성 1분봉 거래량 조회와 Telegram 응답 전달 흐름이 조회 전용(주문·계좌 권한 없음)으로 구현되어 있습니다.",
    },
    discovery:
      "Telegram에서 에이전트를 호출할 때 중간 상태 알림과 결과 메시지가 따로 도착해 읽기 불편했고, 시세 데이터의 기준 시각도 명확히 표시될 필요가 있어 AI에 응답 방식 변경을 요청했습니다.",
    decisions: [
      "주문이나 계좌 기능 없이 1~5개 종목의 시세·거래량만 확인하는 조회 전용 프로필로 범위를 제한했습니다.",
      "저장된 종가·보고서와 실시간 API 조회 결과의 관측 시각·출처를 구분해 표시하도록 구성했습니다.",
      "Telegram 응답은 동기 브리지 방식을 적용해 중간 알림 없이 최종 결과 한 건만 전달되도록 변경했습니다.",
    ],
    system: [
      { label: "조회 요청", detail: "Telegram에서 1~5개 종목 조회 입력" },
      { label: "래퍼 호출", detail: "종목코드 확인 및 제한 시간 내 시세 API 조회" },
      { label: "시점 구분", detail: "API 응답 시각과 저장 보고서 출처 분리 표시" },
      { label: "동기 전달", detail: "중간 알림을 제외하고 Telegram 단일 응답 전송" },
    ],
    verification: [
      "실제 Telegram 테스트에서 현재가와 최근 완성 1분봉 거래량 정보가 중간 알림 없이 단일 메시지로 수신되는 것을 확인했습니다.",
      "조회·응답 동작을 확인하기 위해 AI가 작성·실행한 테스트 기록이 WIKI 로그에 남아 있습니다.",
    ],
    limits: [
      "개인 실험 성격의 보조 도구이며, 코드와 자동화 테스트 작성·실행은 AI가 수행했습니다.",
      "조회 전용이며 자동매매, 주문 실행, 투자 수익률이나 운영 성과와는 무관합니다.",
      "장기 운영 성공률이나 외부 API 장애 시의 모든 예외 시나리오는 별도로 검증하지 않았습니다.",
    ],
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

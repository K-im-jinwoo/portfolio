import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "jw1 개인 WIKI 비서 | 김진우",
  description: "개인 WIKI 검색·메모 정리와 Google Calendar 일정 관리를 연결하는 jw1의 기능과 데이터 이용 안내입니다.",
};

export default function PersonalAssistantPage() {
  return (
    <article className="space-y-12 text-base leading-8 text-[var(--secondary-ink)]">
      <header>
        <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.15] tracking-[-0.045em] text-[var(--ink)]">
          jw1 개인 WIKI 비서
        </h1>
        <p className="mt-6 text-lg leading-9">
          기록에서 맥락을 찾고, 다음에 할 일을 정리합니다.
        </p>
        <p className="mt-4">
          jw1은 {profile.nameKo}가 운영하는 개인용 AI 비서입니다. Telegram 대화에서
          Google Drive의 개인 WIKI를 찾고 메모를 정리하며, Google Calendar 일정을
          조회하고 승인한 일정을 생성하는 데 사용합니다.
        </p>
        <p className="mt-4">
          운영자 본인과 직접 허용한 사용자만 이용하는 개인 도구입니다.
          이 페이지는 앱의 기능과 데이터 처리 방식을 설명합니다.
        </p>
      </header>

      <section aria-labelledby="assistant-features">
        <h2 id="assistant-features" className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">무엇을 하나요?</h2>
        <dl className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          <div className="py-5 sm:grid sm:grid-cols-[150px_1fr] sm:gap-6">
            <dt className="font-semibold text-[var(--ink)]">WIKI 검색과 답변</dt>
            <dd className="mt-2 sm:mt-0">개인 WIKI 문서를 검색하고, 관련 기록을 바탕으로 프로젝트의 맥락과 다음 행동을 정리합니다.</dd>
          </div>
          <div className="py-5 sm:grid sm:grid-cols-[150px_1fr] sm:gap-6">
            <dt className="font-semibold text-[var(--ink)]">메모와 Inbox 검토</dt>
            <dd className="mt-2 sm:mt-0">요청한 메모의 저장안을 만들고, Inbox 기록을 기존 문서에 반영할 변경안과 보류 사항을 검토합니다. 정기 검토는 변경안을 준비하는 단계입니다.</dd>
          </div>
          <div className="py-5 sm:grid sm:grid-cols-[150px_1fr] sm:gap-6">
            <dt className="font-semibold text-[var(--ink)]">일정 관리</dt>
            <dd className="mt-2 sm:mt-0">캘린더 목록과 일정을 확인하고, 사용자가 선택한 일정의 제목·시간을 미리 보여준 뒤 승인한 일정을 생성합니다.</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="assistant-permissions">
        <h2 id="assistant-permissions" className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">Google 연결은 왜 필요한가요?</h2>
        <p className="mt-4">
          Drive 연결은 WIKI 문서 조회와 승인한 메모·문서 변경에, Calendar 연결은
          캘린더 목록 조회와 일정 조회·생성에 사용합니다. 현재 Drive 동의 범위는
          전체 파일의 조회·관리를 포함하며, 앱에서는 지정한 개인 WIKI와 Inbox를 처리하는 데 사용합니다.
        </p>
        <p className="mt-4">
          질문과 관련 문서·일정 내용은 답변과 검토를 위해 OpenAI의 AI 서비스에
          전달될 수 있습니다. Inbox 검토에는 WIKI 문서 스냅샷이 사용될 수 있습니다.
        </p>
        <a className="mt-5 inline-block font-semibold text-[var(--ink)] underline underline-offset-4" href="/apps/jw1/privacy">
          처리하는 데이터와 개인정보 안내 읽기 →
        </a>
      </section>

      <section aria-labelledby="assistant-approval">
        <h2 id="assistant-approval" className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">변경 전에는 확인과 승인을 받습니다</h2>
        <p className="mt-4">
          메모 저장, WIKI 변경안 반영, 일정 생성은 각 기능의 미리보기와 명시적 승인 절차를 거칩니다.
          WIKI 변경안의 승인은 사용자·대화·유효기간과 검토한 내용에 연결되며 한 번만 사용할 수 있습니다.
          원문과 검토 근거는 변경 검증과 복구를 위해 보존합니다.
        </p>
      </section>

      <section aria-labelledby="assistant-contact">
        <h2 id="assistant-contact" className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">운영자와 문의</h2>
        <p className="mt-4">운영자: {profile.nameKo}</p>
        <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a>
      </section>
    </article>
  );
}

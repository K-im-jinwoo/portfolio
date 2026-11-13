import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "개인정보 안내 | jw1 개인 WIKI 비서",
  description: "jw1이 접근하는 Google Drive·Calendar 정보, 외부 AI 처리, 보관 자료와 연결 해제·삭제 요청 방법을 설명합니다.",
};

const heading = "text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]";
const link = "underline underline-offset-4";

export default function AssistantPrivacyPage() {
  return (
    <article className="space-y-10 text-base leading-8 text-[var(--secondary-ink)]">
      <header>
        <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.15] tracking-[-0.045em] text-[var(--ink)]">jw1 개인정보 안내</h1>
        <p className="mt-5 text-sm">최종 수정: 2026년 10월 28일</p>
        <p className="mt-5">
          이 안내는 {profile.nameKo}가 운영하는 <a className={link} href="/apps/jw1">jw1 개인 WIKI 비서</a>의
          데이터 처리에 적용됩니다. 본인과 직접 허용한 사용자의 기록 검색·메모 정리·일정 관리를 위한 개인 도구입니다.
        </p>
      </header>

      <section aria-labelledby="privacy-data">
        <h2 id="privacy-data" className={heading}>접근하는 정보와 이용 목적</h2>
        <dl className="mt-5 space-y-6">
          <div><dt className="font-semibold text-[var(--ink)]">Google Drive</dt><dd className="mt-1">지정한 WIKI의 파일·폴더 이름과 식별자, 문서 본문을 조회합니다. 질문 답변, Inbox 검토, 요청한 메모 저장과 승인한 변경안 반영에 사용합니다. 동의 화면의 Drive 권한은 전체 파일 조회·관리를 포함합니다.</dd></div>
          <div><dt className="font-semibold text-[var(--ink)]">Google Calendar</dt><dd className="mt-1">캘린더 목록·식별자와 일정의 제목, 설명, 날짜·시간, 시간대 등 일정 정보를 처리합니다. 일정 확인과 미리보기, 승인한 일정 생성에 사용합니다. 현재 동의 범위에는 캘린더 목록 조회와 일정 관리 권한이 포함됩니다.</dd></div>
          <div><dt className="font-semibold text-[var(--ink)]">Telegram 대화와 승인 정보</dt><dd className="mt-1">사용자가 보낸 질문·메모·일정 요청, 사용자·대화 식별자, 승인 내용과 처리 결과를 다룹니다. 허용 사용자 확인, 요청 처리, 결과 전달과 승인 검증에 사용합니다.</dd></div>
          <div><dt className="font-semibold text-[var(--ink)]">연결 자격증명</dt><dd className="mt-1">동의한 권한의 범위와 접근·갱신 토큰을 접근이 제한된 운영 환경에 보관합니다. 토큰은 Google API 요청과 연결 유지를 위해 사용합니다.</dd></div>
        </dl>
      </section>

      <section aria-labelledby="privacy-processing">
        <h2 id="privacy-processing" className={heading}>외부 서비스에서 처리되는 정보</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5">
          <li><strong className="font-semibold text-[var(--ink)]">Google:</strong> 사용자가 연결한 Drive·Calendar의 원본과 API 요청을 처리합니다.</li>
          <li><strong className="font-semibold text-[var(--ink)]">Telegram:</strong> 봇과 주고받는 메시지, 결과와 검토 자료의 전달을 처리합니다.</li>
          <li><strong className="font-semibold text-[var(--ink)]">OpenAI:</strong> 답변·계획·검토를 위해 질문, 관련 문서·일정 정보와 대화 맥락이 전달될 수 있습니다. Inbox 자동 검토에는 WIKI 문서 스냅샷이 전달될 수 있으며, 웹 검색 기능을 이용하면 관련 검색어가 검색 처리에 사용될 수 있습니다.</li>
          <li><strong className="font-semibold text-[var(--ink)]">운영 서버:</strong> Oracle Cloud의 개인 운영 환경에서 문서 미러, 요청 처리와 검토·승인·복구 자료를 보관합니다.</li>
        </ul>
        <p className="mt-4">
          외부 서비스의 데이터 보관과 이용에는 각 서비스의 정책과 계정 설정도 적용됩니다.
          운영자는 이 데이터를 판매하거나 광고 타기팅에 사용하지 않습니다.
        </p>
        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a className={link} href="https://policies.google.com/privacy">Google 개인정보처리방침</a>
          <a className={link} href="https://telegram.org/privacy">Telegram 개인정보처리방침</a>
          <a className={link} href="https://openai.com/policies/privacy-policy/">OpenAI 개인정보처리방침</a>
        </p>
      </section>

      <section aria-labelledby="privacy-storage">
        <h2 id="privacy-storage" className={heading}>보관하는 자료와 삭제 요청</h2>
        <p className="mt-4">
          원본 WIKI와 일정은 사용자의 Google 계정에 보관됩니다. 운영 환경에는 조회용 문서 미러,
          대화·요청 처리 기록, 문서 스냅샷, AI 응답, 검토안·보고서, 승인 기록과 복구 백업이 남을 수 있습니다.
          이 자료는 요청 처리, 오류 확인, 승인 검증과 복구에 사용합니다.
        </p>
        <p className="mt-4">
          모든 사본에 동일한 자동 삭제 기간을 적용하고 있지는 않습니다.
          삭제를 요청하면 관련 운영 자료와 백업의 범위를 확인해 처리 범위와 남는 자료를 안내합니다.
          Google·Telegram·OpenAI에 보관된 자료는 해당 서비스의 삭제 기능과 정책도 함께 확인해야 합니다.
        </p>
      </section>

      <section aria-labelledby="privacy-controls">
        <h2 id="privacy-controls" className={heading}>접근 제한과 사용자의 선택</h2>
        <p className="mt-4">
          비서 사용은 허용 사용자로 제한하고, 쓰기 작업은 기능별 미리보기와 명시적 승인 절차를 거칩니다.
          WIKI 변경안은 사용자·대화·유효기간·검토 내용과 현재 설정을 검사한 뒤 반영합니다.
          자격증명과 운영 기록을 공개 안내 페이지에 싣지 않습니다.
        </p>
        <p className="mt-4">
          <a className={link} href="https://myaccount.google.com/connections">Google 계정의 연결된 앱 관리</a>에서
          접근 권한을 철회할 수 있습니다. 연결 해제는 앱의 새 API 접근을 제한하며, 이미 저장된 운영 자료를
          자동으로 지우지는 않습니다. 별도의 조회·정정·삭제 요청은 아래 운영자에게 연락해 주세요.
        </p>
      </section>

      <section id="usage" aria-labelledby="privacy-usage" className="scroll-mt-8">
        <h2 id="privacy-usage" className={heading}>이용 안내</h2>
        <p className="mt-4">
          jw1은 개인 기록과 일정을 관리하기 위한 도구입니다. 본인이 접근할 수 있는 정보만 사용하고,
          다른 사람의 민감한 정보를 입력하기 전에는 공유할 권한과 범위를 확인해 주세요.
          AI의 답변과 변경안에는 오류가 있을 수 있으므로 원본과 미리보기를 확인한 뒤 승인해 주세요.
        </p>
        <p className="mt-4">
          기능이나 데이터 처리 방식이 바뀌면 이 안내의 내용과 수정일을 함께 갱신합니다.
          Google API 사용에 관한 기준은 <a className={link} href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>에서 확인할 수 있습니다.
        </p>
      </section>

      <section aria-labelledby="privacy-website">
        <h2 id="privacy-website" className={heading}>이 안내 사이트를 방문할 때</h2>
        <p className="mt-4">
          안내 페이지는 개인 Drive·Calendar 자료를 직접 불러오거나 Google 계정 연결을 실행하지 않습니다.
          페이지를 제공하는 호스팅·네트워크 서비스는 IP 주소, 요청 시각, 브라우저 정보 등 접속 기록을 처리할 수 있습니다.
          이 포트폴리오는 Google Fonts에서 글꼴을 불러옵니다.
        </p>
      </section>

      <section aria-labelledby="privacy-contact">
        <h2 id="privacy-contact" className={heading}>운영자에게 문의하기</h2>
        <p className="mt-4">운영자: {profile.nameKo}</p>
        <a className={link} href={`mailto:${profile.email}`}>{profile.email}</a>
        <p className="mt-3 text-sm">문의할 때 비밀번호, 인증 코드, 접근·갱신 토큰을 보내지 마세요.</p>
      </section>
    </article>
  );
}

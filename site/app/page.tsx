export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--canvas)] text-[var(--ink)]">
      <section className="mx-auto flex min-h-screen w-[min(100%-40px,1120px)] items-center py-20 sm:w-[min(100%-48px,1120px)]">
        <div className="max-w-3xl border-t border-[var(--line)] pt-8">
          <p className="text-sm font-medium tracking-[0.08em] text-[var(--secondary)]">
            김진우 · Business Automation Developer
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
            복잡한 업무를 단순한 시스템으로.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--secondary)] sm:text-lg">
            업무 시스템과 자동화로 반복 작업과 운영 병목을 개선합니다.
          </p>
        </div>
      </section>
    </main>
  );
}

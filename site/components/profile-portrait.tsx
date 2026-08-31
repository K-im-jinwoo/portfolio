type ProfilePortraitProps = {
  className?: string;
};

export function ProfilePortrait({ className = "" }: ProfilePortraitProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[380px] border-b border-[var(--line)] ${className}`}
    >
      <img
        src="/jinwoo-profile.png"
        width={480}
        height={480}
        alt="노트북으로 작업하는 김진우 개발자 캐릭터"
        className="block h-auto w-full"
      />
    </div>
  );
}

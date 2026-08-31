type ProfilePortraitProps = {
  className?: string;
  size?: "home" | "about";
};

export function ProfilePortrait({
  className = "",
  size = "home",
}: ProfilePortraitProps) {
  const sizeClass = size === "about" ? "max-w-[280px]" : "max-w-[260px]";

  return (
    <div
      className={`mx-auto aspect-square w-full overflow-hidden rounded-full bg-[var(--line)] ${sizeClass} ${className}`}
    >
      <img
        src="/jinwoo-profile.png"
        width={480}
        height={480}
        alt="노트북으로 작업하는 김진우 개발자 캐릭터"
        className="block h-full w-full object-contain"
      />
    </div>
  );
}

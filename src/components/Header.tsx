export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-20">
      {/* Logo as styled text to match Figma exactly */}
      <span className="text-[28px] font-bold italic text-text leading-none select-none">
        -РУУУШ+
      </span>

      <div className="flex items-center gap-4">
        <button className="rounded-full border border-text px-6 py-2 text-[20px] text-text hover:bg-text/10 transition-colors">
          Увійти
        </button>
        <button
          className="flex size-[38px] items-center justify-center rounded-full border border-text/30"
          aria-label="Menu"
        >
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="0" y1="1" x2="18" y2="1" />
            <line x1="0" y1="6" x2="18" y2="6" />
            <line x1="0" y1="11" x2="18" y2="11" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center gap-8 pb-12 pt-8">
      <p className="text-[22px] text-text">
        Маєте запитання? Будемо раді поспілкуватися
      </p>
      <div className="flex items-center gap-6">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-16 items-center justify-center rounded-full bg-bg-input transition-colors hover:bg-bg-input/80"
          aria-label="WhatsApp"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E74C41"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </a>
        <a
          href="mailto:finance@ruuush.marketing"
          className="flex size-16 items-center justify-center rounded-full bg-bg-input transition-colors hover:bg-bg-input/80"
          aria-label="Email"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E74C41"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

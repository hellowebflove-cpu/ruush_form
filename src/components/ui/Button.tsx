interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const base =
    "w-full max-w-[501px] py-4 rounded-xl text-[15px] uppercase italic tracking-wider transition-all font-bold";

  const variants = {
    primary:
      "bg-accent text-text-white hover:bg-accent/90 active:scale-[0.98]",
    outline:
      "border border-text text-text hover:bg-text/10",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}

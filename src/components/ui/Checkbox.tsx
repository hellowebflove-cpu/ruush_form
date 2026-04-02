"use client";

import { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <div className="relative mt-1 flex-shrink-0">
            <input
              ref={ref}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />
            <div className="size-[26px] rounded-[4px] border border-[#C2C2C2] bg-text-white peer-checked:border-accent peer-checked:bg-accent transition-colors" />
            <svg
              className="absolute inset-0 m-auto hidden size-4 peer-checked:block"
              viewBox="0 0 16 16"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8l3.5 3.5L13 5" />
            </svg>
          </div>
          <span className="text-[22px] leading-[1.3] text-text">{label}</span>
        </label>
        {error && (
          <p className="mt-1 pl-9 text-[14px] text-accent">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

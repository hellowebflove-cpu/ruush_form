"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <div
          className={`relative flex items-center rounded-[20px] bg-bg-input px-7 py-4 transition-colors ${
            error ? "ring-1 ring-border-error" : ""
          } ${className ?? ""}`}
        >
          <input
            ref={ref}
            placeholder={label}
            className="w-full bg-transparent text-[18px] text-text placeholder:text-text/50 outline-none"
            {...props}
          />
          <span className="absolute right-5 top-2 text-[18px] text-accent">
            *
          </span>
        </div>
        {error && (
          <p className="mt-1 pl-2 text-[14px] text-accent">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

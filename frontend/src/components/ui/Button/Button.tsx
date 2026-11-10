import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300",

        /* Primary */
        variant === "primary" &&
          "bg-teal-400 text-[#062222] shadow-lg shadow-teal-400/20 hover:-translate-y-0.5 hover:bg-teal-300 hover:shadow-teal-400/30",

        /* Secondary */
        variant === "secondary" &&
          "bg-cyan-300 text-[#062222] shadow-lg shadow-cyan-300/10 hover:-translate-y-0.5 hover:bg-cyan-200",

        /* Outline */
        variant === "outline" &&
          "border border-teal-300/20 bg-transparent text-slate-200 hover:border-teal-300/50 hover:bg-teal-400/5 hover:text-teal-200",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
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

        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30",

        variant === "secondary" &&
          "bg-cyan-500 text-black hover:bg-cyan-400",

        variant === "outline" &&
          "border border-slate-700 text-white hover:border-cyan-400 hover:text-cyan-400",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
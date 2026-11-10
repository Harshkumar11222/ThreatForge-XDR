import { ReactNode } from "react";
import clsx from "clsx";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({
  children,
  className,
}: PageWrapperProps) {
  return (
    <main
      className={clsx(
        "min-h-screen w-full bg-[#0b1f1f] text-white overflow-x-hidden overflow-y-visible",
        className
      )}
    >
      {children}
    </main>
  );
}
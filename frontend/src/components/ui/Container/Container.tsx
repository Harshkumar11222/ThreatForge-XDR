import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10",
        className
      )}
    >
      {children}
    </div>
  );
}
import { cn } from "../../lib/utils";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Narrower max-width for long-form content */
  narrow?: boolean;
};

export function SectionContainer({
  children,
  className,
  narrow = false,
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}

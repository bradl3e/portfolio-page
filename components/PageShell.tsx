import type { ReactNode } from "react";
import Navigation, { type NavHref } from "@/components/Navigation";

type PageShellProps = {
  /** Aktiver Bereich in der Navigation. */
  current: NavHref;
  /** Abstand zwischen den Inhaltsblöcken, je Frame verschieden (z. B. "gap-6"). */
  className?: string;
  children: ReactNode;
};

/** Gemeinsames Gerüst der Frames Home und Projekte: Inhalt mittig, Navigation unten. */
export default function PageShell({ current, className = "", children }: PageShellProps) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col items-center justify-between gap-6 p-4 sm:p-8 lg:p-16">
      <main className={`flex w-full flex-1 flex-col items-center justify-center ${className}`}>
        {children}
      </main>
      <Navigation current={current} />
    </div>
  );
}

import Link from "next/link";
import { MobileBottomNav } from "@/components/MobileBottomNav";

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export function AppShell({ children, title, subtitle }: AppShellProps) {
  return (
    <div className="has-mobile-nav min-h-screen">
      <nav className="no-print sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/today"
            className="font-semibold text-forest hover:text-forest2"
          >
            NC750X Roadbook
          </Link>
          <div className="hidden flex-wrap gap-2 md:flex">
            <Link href="/today" className="btn-secondary text-xs sm:text-sm">
              Today
            </Link>
            <Link href="/" className="btn-secondary text-xs sm:text-sm">
              Dashboard
            </Link>
            <Link href="/#roadbook-days" className="btn-secondary text-xs sm:text-sm">
              Days
            </Link>
            <Link href="/map" className="btn-secondary text-xs sm:text-sm">
              Map
            </Link>
            <Link href="/print" className="btn-secondary text-xs sm:text-sm">
              Print
            </Link>
          </div>
          <Link href="/" className="btn-secondary text-xs md:hidden">
            Dashboard
          </Link>
        </div>
      </nav>

      {(title || subtitle) && (
        <header className="mx-auto max-w-6xl px-4 pt-8 pb-4">
          {title && (
            <h1 className="text-3xl font-bold text-forest sm:text-4xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-1 text-muted">{subtitle}</p>
          )}
        </header>
      )}

      <main className="mx-auto max-w-6xl px-4 pb-12">{children}</main>
      <MobileBottomNav />
    </div>
  );
}

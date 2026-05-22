import Link from "next/link";

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export function AppShell({ children, title, subtitle }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <nav className="no-print sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="font-semibold text-forest hover:text-forest2">
            NC750X Roadbook
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link href="/" className="btn-secondary text-xs sm:text-sm">
              Dashboard
            </Link>
            <Link href="/print" className="btn-secondary text-xs sm:text-sm">
              Print roadbook
            </Link>
          </div>
        </div>
      </nav>

      {(title || subtitle) && (
        <header className="mx-auto max-w-6xl px-4 pt-8 pb-4">
          {title && (
            <h1 className="text-3xl font-bold text-forest sm:text-4xl">{title}</h1>
          )}
          {subtitle && (
            <p className="mt-1 text-muted">{subtitle}</p>
          )}
        </header>
      )}

      <main className="mx-auto max-w-6xl px-4 pb-12">{children}</main>
    </div>
  );
}

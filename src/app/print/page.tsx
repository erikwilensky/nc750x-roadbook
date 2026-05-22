import Link from "next/link";
import { PrintView } from "@/components/PrintView";
import { trip } from "@/data/trip";

export default function PrintPage() {
  return (
    <div className="min-h-screen bg-cream">
      <nav className="no-print border-b border-line bg-paper px-4 py-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="font-semibold text-forest">
            ← Dashboard
          </Link>
          <span className="text-sm text-muted">Print roadbook</span>
        </div>
      </nav>
      <main className="mx-auto max-w-4xl px-4 py-6">
        <PrintView />
      </main>
      <footer className="no-print py-4 text-center text-xs text-muted">
        {trip.title} — print preview
      </footer>
    </div>
  );
}

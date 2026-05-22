import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-cream p-8">
      <h1 className="text-2xl font-bold text-forest">Day not found</h1>
      <Link href="/" className="btn-primary">
        Back to dashboard
      </Link>
    </div>
  );
}

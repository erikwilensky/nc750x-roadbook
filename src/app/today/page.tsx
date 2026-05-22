import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";
import { TodayMode } from "@/components/TodayMode";

export default function TodayPage() {
  return (
    <AppShell
      title="Today"
      subtitle="What matters right now on the road"
    >
      <Suspense fallback={<p className="text-muted">Loading today…</p>}>
        <TodayMode />
      </Suspense>
    </AppShell>
  );
}

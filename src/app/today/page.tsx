"use client";

import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";
import { TodayMode } from "@/components/TodayMode";
import { useLocale } from "@/i18n/LocaleProvider";

function TodayPageContent() {
  const { t } = useLocale();

  return (
    <AppShell title={t.today.title} subtitle={t.today.subtitle}>
      <Suspense fallback={<p className="text-muted">{t.common.loading}</p>}>
        <TodayMode />
      </Suspense>
    </AppShell>
  );
}

export default function TodayPage() {
  return <TodayPageContent />;
}

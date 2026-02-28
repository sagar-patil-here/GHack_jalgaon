"use client";

import { useRouter } from "next/navigation";
import { ExportSection } from "@/components/ExportSection";
import type { PrescriptionLanguage } from "@/lib/types";

export interface ResultActionsProps {
  onTranslate?: (lang: PrescriptionLanguage) => void;
}

export function ResultActions({ onTranslate }: ResultActionsProps) {
  const router = useRouter();
  return (
    <ExportSection
      onTranslate={onTranslate}
      onAddReminder={() => {
        // Placeholder: wire to calendar integrations later
        router.push("/dashboard");
      }}
      onViewDashboard={() => router.push("/dashboard")}
    />
  );
}


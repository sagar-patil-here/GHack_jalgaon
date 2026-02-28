"use client";

import * as React from "react";
import { UploadCard } from "@/components/UploadCard";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import type { PrescriptionResult } from "@/lib/types";
import { FadeIn } from "@/components/motion/fade-in";

export function UploadScreen() {
  const [result, setResult] = React.useState<PrescriptionResult | null>(null);

  return (
    <div className="space-y-8">
      {!result ? (
        <FadeIn>
          <div className="mx-auto max-w-2xl">
            <UploadCard onAnalyzed={setResult} />
          </div>
        </FadeIn>
      ) : (
        <FadeIn>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Analysis Result</h2>
              <button 
                onClick={() => setResult(null)}
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Upload another
              </button>
            </div>
            <AnalysisDashboard result={result} />
          </div>
        </FadeIn>
      )}
    </div>
  );
}

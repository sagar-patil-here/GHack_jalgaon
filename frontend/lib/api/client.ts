"use client";

import type { PrescriptionResult } from "@/lib/types";

export async function analyzePrescription(file: File): Promise<PrescriptionResult> {
  const formData = new FormData();
  formData.set("file", file);

  const res = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Analyze request failed");
  }

  return (await res.json()) as PrescriptionResult;
}


"use client";

import type { PrescriptionResult } from "@/lib/types";
import { transformBackendPrescription } from "@/lib/transform";


export async function uploadPrescription(
  file: File,
  language: string = "en"
): Promise<PrescriptionResult> {
  const formData = new FormData();
  formData.set("prescription", file);
  formData.set("language", language);
  formData.set("privacyConsent", "true");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prescriptions/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || err.message || "Analysis failed");
  }

  const json = await res.json();
  if (!json.success || !json.data?.prescription) {
    throw new Error(json.message || "Invalid response format");
  }

  return transformBackendPrescription(json.data.prescription);
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchPrescriptions(
  page: number = 1,
  limit: number = 10
): Promise<{ prescriptions: PrescriptionResult[]; total: number }> {
  if (!BACKEND_URL) return { prescriptions: [], total: 0 };

  const res = await fetch(
    `${BACKEND_URL}/api/prescriptions/userPrescriptions?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch prescriptions");

  const json = await res.json();
  const prescriptions = (json.data?.prescriptions ?? []).map(
    (p: unknown) => p as PrescriptionResult
  );
  return { prescriptions, total: json.meta?.total ?? prescriptions.length };
}

export async function translatePrescription(
  prescriptionId: string,
  language: string
): Promise<PrescriptionResult> {
  if (!BACKEND_URL) throw new Error("Backend not configured for translation");

  const res = await fetch(`${BACKEND_URL}/api/prescriptions/${prescriptionId}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language }),
  });

  if (!res.ok) throw new Error("Translation failed");

  const json = await res.json();
  if (!json.success || !json.data?.prescription) throw new Error(json.message);

  return transformBackendPrescription(json.data.prescription);
}

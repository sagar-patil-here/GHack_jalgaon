import type { PrescriptionResult, PriceLink, Reminder } from "@/lib/types";

declare global {
  // eslint-disable-next-line no-var
  var __remedixStore:
    | Map<string, PrescriptionResult>
    | undefined;
}

const store: Map<string, PrescriptionResult> =
  globalThis.__remedixStore ?? new Map<string, PrescriptionResult>();
globalThis.__remedixStore = store;

function baseLinks(): PriceLink[] {
  return [
    {
      vendor: "amazon",
      label: "Amazon Pharmacy",
      href: "#",
      note: "Placeholder link",
    },
    {
      vendor: "tata1mg",
      label: "Tata 1mg",
      href: "#",
      note: "Placeholder link",
    },
    {
      vendor: "pharmeasy",
      label: "PharmEasy",
      href: "#",
      note: "Placeholder link",
    },
  ];
}

function baseReminders(): Reminder[] {
  return [
    {
      id: "r1",
      title: "Morning dose",
      time: "09:00",
      schedule: "Daily",
    },
    {
      id: "r2",
      title: "Evening dose",
      time: "21:00",
      schedule: "Daily",
    },
  ];
}

export function createMockAnalysis(input: { fileName: string }): PrescriptionResult {
  const id = `rx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

  const result: PrescriptionResult = {
    id,
    createdAt: new Date().toISOString(),
    sourceFileName: input.fileName || "prescription",
    sourceKind: input.fileName.toLowerCase().endsWith(".pdf") ? "pdf" : "image",
    sourcePreviewUrl: "/prescription-placeholder.svg",
    doctorNote: "Take medicines after meals. Maintain hydration.",
    language: "en",
    patientSummary:
      "You have 3 medicines. Two are daily, one is for pain as needed. Avoid skipping doses; set reminders for consistency.",
    medicines: [
      {
        id: "m1",
        name: "Amoxicillin",
        dosage: "500 mg",
        frequency: "Twice daily",
        duration: "5 days",
        instructions: "After meals",
        genericAlternatives: ["Amox", "Amoxicillin (Generic)"],
      },
      {
        id: "m2",
        name: "Paracetamol",
        dosage: "650 mg",
        frequency: "As needed",
        duration: "Up to 3 days",
        instructions: "For fever/pain",
        genericAlternatives: ["Acetaminophen (Generic)"],
      },
      {
        id: "m3",
        name: "Pantoprazole",
        dosage: "40 mg",
        frequency: "Once daily",
        duration: "7 days",
        instructions: "30 mins before breakfast",
        genericAlternatives: ["Pantoprazole (Generic)"],
      },
    ],
    priceLinks: baseLinks(),
    reminders: baseReminders(),
  };

  store.set(id, result);
  return result;
}

export function getPrescription(id: string): PrescriptionResult | null {
  return store.get(id) ?? null;
}

export function listPrescriptions(): PrescriptionResult[] {
  return Array.from(store.values()).sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
}


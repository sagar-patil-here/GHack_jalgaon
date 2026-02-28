export type UploadKind = "image" | "pdf";

export type PrescriptionLanguage =
  | "en"
  | "hi"
  | "mr"
  | "ta"
  | "te"
  | "bn"
  | "gu"
  | "kn"
  | "ml"
  | "pa";

export type PriceVendor = "amazon" | "tata1mg" | "pharmeasy";

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  genericAlternatives?: string[];
}

export interface PriceLink {
  vendor: PriceVendor;
  label: string;
  href: string;
  price?: string;
  note?: string;
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
  schedule: string;
}

export interface PrescriptionResult {
  id: string;
  createdAt: string;
  sourceFileName: string;
  sourceKind: UploadKind;
  sourcePreviewUrl: string;
  doctorNote?: string;
  language: PrescriptionLanguage;
  patientSummary: string;
  medicines: Medicine[];
  priceLinks: PriceLink[];
  reminders: Reminder[];
}


"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Image as ImageIcon, Loader2, UploadCloud } from "lucide-react";
import { analyzePrescription } from "@/lib/api/client";
import type { PrescriptionResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  file: z
    .instanceof(File)
    .refine((f) => f.size > 0, "Please select a file.")
    .refine(
      (f) =>
        ["image/png", "image/jpeg", "image/webp", "application/pdf"].includes(
          f.type
        ),
      "Upload an image or PDF."
    )
    .refine((f) => f.size <= 12 * 1024 * 1024, "Max file size is 12MB."),
});

type FormValues = z.infer<typeof formSchema>;

export interface UploadCardProps {
  className?: string;
  onAnalyzed?: (result: PrescriptionResult) => void;
}

export function UploadCard({ className, onAnalyzed }: UploadCardProps) {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [previewKind, setPreviewKind] = React.useState<"image" | "pdf" | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onFile = React.useCallback(
    (file: File) => {
      setValue("file", file, { shouldValidate: true });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (file.type === "application/pdf") {
        setPreviewKind("pdf");
        setPreviewUrl(null);
        return;
      }
      setPreviewKind("image");
      setPreviewUrl(URL.createObjectURL(file));
    },
    [previewUrl, setValue]
  );

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const onSubmit = async (values: FormValues) => {
    const result = await analyzePrescription(values.file);
    onAnalyzed?.(result);
    if (!onAnalyzed) {
      router.push(`/result/${result.id}`);
    }
  };

  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader>
        <CardTitle>Upload prescription</CardTitle>
        <CardDescription>
          Drag & drop an image/PDF or browse files. We’ll return a clean,
          structured interpretation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="group relative rounded-xl border border-border bg-background/50 p-6 transition-colors hover:bg-muted/30"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/30">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Drop file here</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  PNG, JPG, WEBP, or PDF (max 12MB)
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              {(() => {
                const { ref, ...fileField } = register("file", {
                  setValueAs: (v) => (v instanceof FileList ? v.item(0) : v),
                  onChange: (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) onFile(file);
                  },
                });
                return (
                  <Input
                    type="file"
                    accept="image/*,application/pdf"
                    {...fileField}
                    ref={(node) => {
                      ref(node);
                      fileInputRef.current = node;
                    }}
                  />
                );
              })()}
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                Browse
              </Button>
            </div>

            {errors.file?.message ? (
              <div className="mt-3 text-sm text-muted-foreground">
                {errors.file.message}
              </div>
            ) : null}
          </div>

          <div className="rounded-xl border border-border bg-background/50 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Preview</div>
              <div className="text-xs text-muted-foreground">
                {previewKind ? previewKind.toUpperCase() : "—"}
              </div>
            </div>

            <div className="mt-4">
              {!previewKind ? (
                <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20">
                  <div className="text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      No file selected yet
                    </div>
                  </div>
                </div>
              ) : previewKind === "pdf" ? (
                <div className="flex h-56 items-center justify-center rounded-xl border border-border bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">PDF selected</div>
                      <div className="text-sm text-muted-foreground">
                        Preview will be available after analysis.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-56 overflow-hidden rounded-xl border border-border bg-muted/20">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Uploaded preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <Skeleton className="h-full w-full" />
                  )}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  "Analyze Prescription"
                )}
              </Button>
              <div className="mt-3 text-xs text-muted-foreground">
                Demo mode: returns mock structured output via `/api/analyze`.
              </div>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


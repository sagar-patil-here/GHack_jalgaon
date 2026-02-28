import Image from "next/image";
import { Scan } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PrescriptionViewerProps {
  title?: string;
  src: string;
  className?: string;
}

export function PrescriptionViewer({
  title = "Prescription",
  src,
  className,
}: PrescriptionViewerProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted/30">
            <Scan className="h-4 w-4" />
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-muted/20">
          <Image src={src} alt="Prescription preview" fill className="object-cover" />
        </div>
      </CardContent>
    </Card>
  );
}


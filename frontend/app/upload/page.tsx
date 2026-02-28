import { FadeIn } from "@/components/motion/fade-in";
import { UploadScreen } from "@/app/upload/_components/UploadScreen";

export default function UploadPage() {
  return (
    <div className="container-padded pt-10">
      <FadeIn>
        <div className="max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight">Prescription Upload Workspace</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload a prescription image/PDF, fetch structured data from backend, then edit and download.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.06}>
        <div className="mt-8">
          <UploadScreen />
        </div>
      </FadeIn>
    </div>
  );
}


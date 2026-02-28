import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import { getPrescription } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default function ResultPage({ params }: { params: { id: string } }) {
  const result = getPrescription(params.id);
  
  if (!result) {
    notFound();
  }

  return (
    <div className="container-padded pt-10 pb-20">
      <FadeIn>
        <AnalysisDashboard result={result} />
      </FadeIn>
    </div>
  );
}

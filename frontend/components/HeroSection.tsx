import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", className)}>
      <div className="container-padded">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
              Health-grade clarity, designed minimal.
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              From Illegible to Intelligent.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
              Upload your prescription. Get clarity. Compare prices. Stay on
              track.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/upload" className="inline-flex items-center gap-2">
                  Upload Prescription
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <Card className="glass-card mt-12 overflow-hidden">
            <div className="grid gap-0 border-border/70 bg-gradient-to-b from-transparent to-muted/30 md:grid-cols-3 md:divide-x md:divide-border/70">
              <div className="p-6">
                <div className="text-sm font-medium">AI Interpretation</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Structured medicines, dosage, frequency, and instructions.
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm font-medium">Price Comparison</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Quick vendor links with future real-time pricing.
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm font-medium">Reminders & Export</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Calendar-ready reminders and clean PDF export.
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}


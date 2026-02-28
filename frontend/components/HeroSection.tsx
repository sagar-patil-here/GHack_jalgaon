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
    <section className={cn("py-16 sm:py-24 relative overflow-hidden", className)}>
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />

      <div className="container-padded">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              Health-grade clarity, designed minimal.
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Your Personal AI Pharmacist.
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-5 text-pretty text-lg leading-8 text-muted-foreground">
              Upload your prescription. Get clarity, find generics, compare prices, and stay on track with smart reminders.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/upload" className="inline-flex items-center gap-2">
                  Analyze Prescription
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
          <Card className="glass-card mt-12 overflow-hidden border-primary/10 shadow-lg shadow-primary/5">
            <div className="grid gap-0 border-border/70 bg-gradient-to-b from-transparent to-muted/30 md:grid-cols-3 md:divide-x md:divide-border/70">
              <div className="p-6 hover:bg-muted/40 transition-colors">
                <div className="text-sm font-medium">AI Interpretation</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Powered by Gemini 2.0 Flash for accurate handwriting recognition.
                </div>
              </div>
              <div className="p-6 hover:bg-muted/40 transition-colors">
                <div className="text-sm font-medium">Smart Savings</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Find generic alternatives and compare prices across top vendors.
                </div>
              </div>
              <div className="p-6 hover:bg-muted/40 transition-colors">
                <div className="text-sm font-medium">Connected Health</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Sync with Google Calendar, Telegram, and listen in your language.
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
}

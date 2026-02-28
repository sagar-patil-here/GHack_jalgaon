import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Sparkles, Volume2, MessageCircle, FileText, Pill } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <section className="pb-16 sm:pb-24">
        <div className="container-padded">
          <FadeIn>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="glass-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Handwriting Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Convert messy handwriting into clean, structured medicine data using Gemini 2.0 Flash.
                </CardContent>
              </Card>

              <Card className="glass-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-4 w-4 text-primary" />
                    Generic Alternatives
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Save money with AI-suggested generic alternatives and best buying links.
                </CardContent>
              </Card>

              <Card className="glass-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-primary" />
                    Smart Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Sync schedules directly to Google Calendar and set alarms.
                </CardContent>
              </Card>

              <Card className="glass-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-primary" />
                    Listen in Your Language
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Text-to-speech support for prescriptions in multiple local languages.
                </CardContent>
              </Card>

              <Card className="glass-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    Telegram Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Receive reminders and prescription summaries directly on Telegram via n8n.
                </CardContent>
              </Card>

               <Card className="glass-card hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    PDF Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Download comprehensive PDF reports of your analysis for easy sharing.
                </CardContent>
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="mt-12 grid gap-6 rounded-2xl border border-border bg-muted/20 p-8 sm:grid-cols-3 text-center">
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Step 01
                </div>
                <div className="mt-2 text-lg font-semibold">Upload</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Drag & drop your prescription image or PDF.
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Step 02
                </div>
                <div className="mt-2 text-lg font-semibold">Analyze</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  AI extracts medicines, dosage, and suggests generics.
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Step 03
                </div>
                <div className="mt-2 text-lg font-semibold">Act</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Compare prices, sync to calendar, or listen to audio.
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/upload">Start Analyzing Now</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

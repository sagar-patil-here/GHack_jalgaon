"use client";

import * as React from "react";
import { 
  FileText, 
  MessageCircle, 
  Calendar, 
  Volume2, 
  Save, 
  ExternalLink, 
  TrendingDown, 
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { PrescriptionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AnalysisDashboardProps {
  result: PrescriptionResult;
}

export function AnalysisDashboard({ result }: AnalysisDashboardProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // Mock audio play
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleSave = () => {
    setIsSaved(true);
    // Mock save
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Patient Summary & Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Patient Summary</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handlePlayAudio}
              >
                <Volume2 className={cn("h-4 w-4", isPlaying && "animate-pulse text-primary")} />
                {isPlaying ? "Playing..." : "Listen in English"}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm leading-relaxed text-muted-foreground">
              {result.patientSummary}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                Model: {result.modelUsed}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3 text-blue-500" />
                Date: {new Date(result.createdAt).toLocaleDateString()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card flex flex-col justify-center gap-3 p-6">
          <Button className="w-full justify-start gap-3" variant="outline">
            <Calendar className="h-4 w-4 text-blue-500" />
            Add to Google Calendar
          </Button>
          <Button className="w-full justify-start gap-3" variant="outline">
            <MessageCircle className="h-4 w-4 text-sky-500" />
            Send to Telegram Bot
          </Button>
          <Button className="w-full justify-start gap-3" variant="outline">
            <FileText className="h-4 w-4 text-red-500" />
            Download PDF Report
          </Button>
          <Button 
            className="w-full justify-start gap-3" 
            onClick={handleSave}
            disabled={isSaved}
          >
            <Save className="h-4 w-4" />
            {isSaved ? "Saved!" : "Save Analysis"}
          </Button>
        </Card>
      </div>

      {/* 2. Medicines & Generics */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">Prescribed Medicines</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.medicines.map((med) => (
            <Card key={med.id} className="glass-card flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{med.name}</CardTitle>
                <CardDescription>{med.dosage} • {med.frequency}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  <span className="font-medium text-foreground">Instructions: </span>
                  {med.instructions}
                </div>
                
                {med.genericAlternatives && med.genericAlternatives.length > 0 && (
                  <div className="space-y-2">
                    <Separator />
                    <div className="flex items-center gap-2 text-xs font-medium text-green-600">
                      <TrendingDown className="h-3 w-3" />
                      Generic Alternatives Available
                    </div>
                    <div className="space-y-2">
                      {med.genericAlternatives.map((alt, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm rounded-md border border-green-100 bg-green-50/50 p-2 dark:border-green-900/30 dark:bg-green-900/10">
                          <div>
                            <div className="font-medium">{alt.name}</div>
                            <div className="text-xs text-muted-foreground">{alt.savings}</div>
                          </div>
                          <Button size="sm" variant="ghost" className="h-7 px-2 text-green-700 hover:text-green-800 hover:bg-green-100 dark:text-green-400">
                            Buy <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Price Comparison */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">Price Comparison</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {result.priceLinks.map((link) => (
            <Card key={link.vendor} className="glass-card hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{link.label}</div>
                    <div className="text-2xl font-bold mt-2">{link.price}</div>
                    <div className="text-xs text-muted-foreground mt-1">{link.note}</div>
                  </div>
                  <Button size="icon" variant="secondary" asChild>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Reminders Preview */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">Scheduled Reminders</h3>
        <Card className="glass-card">
          <CardContent className="p-0">
            {result.reminders.map((reminder, idx) => (
              <div key={reminder.id}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{reminder.title}</div>
                      <div className="text-sm text-muted-foreground">{reminder.schedule}</div>
                    </div>
                  </div>
                  <div className="text-lg font-mono font-medium">{reminder.time}</div>
                </div>
                {idx < result.reminders.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

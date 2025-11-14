'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Lightbulb, TriangleAlert, Loader2 } from "lucide-react";
import { aiSuggestions, conflicts, tasks, events } from "@/lib/data";
import { useToast } from '@/hooks/use-toast';
import { resolveConflict } from '@/ai/flows/ai-conflict-resolution';
import type { Conflict } from '@/lib/types';

export function AiSuggestions() {
  const { toast } = useToast();
  const [isResolving, setIsResolving] = useState<string | null>(null);
  const [resolution, setResolution] = useState<string | null>(null);

  const handleResolveConflict = async (conflict: Conflict) => {
    setIsResolving(conflict.id);
    setResolution(null);
    try {
      const result = await resolveConflict({
        calendarData: JSON.stringify(events),
        taskData: JSON.stringify(tasks),
        conflictDescription: conflict.description,
      });
      setResolution(result.suggestedResolution);
      toast({
        title: "AI Conflict Resolution",
        description: "A potential solution has been generated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not resolve the conflict.",
      });
    } finally {
      setIsResolving(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
        <CardDescription>Proactive suggestions and alerts from ChronoSync AI.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiSuggestions.map((suggestion) => (
          <Alert key={suggestion.id}>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>{suggestion.title}</AlertTitle>
            <AlertDescription>{suggestion.description}</AlertDescription>
          </Alert>
        ))}
        {conflicts.map((conflict) => (
          <Dialog key={conflict.id}>
            <Alert variant="destructive">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle>Scheduling Conflict Detected</AlertTitle>
              <AlertDescription className="flex justify-between items-center">
                {conflict.description}
                <DialogTrigger asChild>
                  <Button size="sm" variant="destructive" onClick={() => handleResolveConflict(conflict)}>Resolve</Button>
                </DialogTrigger>
              </AlertDescription>
            </Alert>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Conflict Resolution</DialogTitle>
                <DialogDescription>
                  ChronoSync AI has analyzed the conflict and suggests the following action.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {isResolving === conflict.id && (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Analyzing conflict...</span>
                  </div>
                )}
                {resolution && (
                  <p className="rounded-lg border bg-muted p-4 text-sm">{resolution}</p>
                )}
              </div>
              <DialogFooter>
                  <Button>Accept Suggestion</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
}

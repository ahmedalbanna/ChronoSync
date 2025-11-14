'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { suggestSchedule, type SuggestScheduleOutput } from '@/ai/flows/ai-schedule-suggestions';
import { tasks, events } from '@/lib/data';
import { Loader2, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

export function AiScheduler() {
  const { toast } = useToast();
  const [eventDescription, setEventDescription] = useState('');
  const [duration, setDuration] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<SuggestScheduleOutput | null>(null);

  const handleSuggestTime = async () => {
    if (!eventDescription) {
      toast({
        variant: 'destructive',
        title: 'معلومات ناقصة',
        description: 'الرجاء إدخال وصف الحدث.',
      });
      return;
    }
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestSchedule({
        schedule: JSON.stringify(events),
        taskList: JSON.stringify(tasks),
        priorities: JSON.stringify({ high: ['client work', 'reports'] }),
        eventDescription,
        duration,
      });
      setSuggestion(result);
      toast({
        title: 'اقتراح الذكاء الاصطناعي جاهز!',
        description: 'وجد كرونو سينك وقتًا مثاليًا لحدثك.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'خطأ في الذكاء الاصطناعي',
        description: 'تعذر إنشاء اقتراح للجدول الزمني.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="sm:col-span-2" id="ai-scheduler">
      <CardHeader className="pb-3">
        <CardTitle>جدولة مدعومة بالذكاء الاصطناعي</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          دع كرونو سينك يجد الوقت المثالي لحدثك القادم.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="event-description">وصف الحدث</Label>
          <Input
            id="event-description"
            placeholder='مثال: "جلسة عصف ذهني لمشروع فينيكس"'
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="duration">المدة (بالدقائق)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button onClick={handleSuggestTime} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="ml-2 h-4 w-4" />
          )}
          ابحث عن أفضل وقت
        </Button>
        {suggestion && (
          <div className="rounded-lg border bg-muted/50 p-4 w-full text-sm">
            <p className="font-semibold">الوقت المقترح: <span className="font-normal text-primary">{format(new Date(suggestion.suggestedTime), "d MMMM, yyyy 'الساعة' h:mm a")}</span></p>
            <p className="mt-2 text-muted-foreground"><span className="font-semibold text-foreground">السبب:</span> {suggestion.reasoning}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

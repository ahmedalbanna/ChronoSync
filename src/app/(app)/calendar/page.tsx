'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { events as allEvents } from '@/lib/data';
import { format, isSameDay } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ar } from 'date-fns/locale';

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = date ? allEvents.filter(event => isSameDay(event.startTime, date)) : [];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>التقويم الكامل</CardTitle>
          <CardDescription>اختر يومًا لرؤية أحداثك.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-0 sm:p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-b sm:border"
            locale={ar}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            جدول لـ {date ? format(date, 'd MMMM', { locale: ar }) : 'اليوم'}
          </CardTitle>
          <CardDescription>إليك ما في جدول أعمالك.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {selectedDayEvents.length > 0 ? selectedDayEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="text-sm font-medium text-muted-foreground w-16 text-right">
                    {format(event.startTime, "h:mm a")}
                  </div>
                  <div className="h-full w-px bg-border" />
                  <div className="flex-1 space-y-1 rounded-md border p-3">
                    <p className="font-medium leading-none">{event.title}</p>
                    <div className="flex items-center pt-2">
                      {event.attendees.map((attendee) => (
                        <Avatar key={attendee.id} className="h-6 w-6 -mr-2 border-2 border-card">
                          <AvatarImage src={attendee.avatarUrl} data-ai-hint="person portrait" />
                          <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center text-muted-foreground py-10">
                  <p>لا توجد أحداث مجدولة لهذا اليوم.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { events } from "@/lib/data";
import { format } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الأحداث القادمة</CardTitle>
        <CardDescription>اجتماعاتك ومواعيدك القليلة القادمة.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium text-muted-foreground">{format(event.startTime, "ha")}</div>
                  <div className="h-12 w-px bg-border" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(event.startTime, "HH:mm")} - {format(event.endTime, "HH:mm")}
                  </p>
                  <div className="flex items-center pt-1">
                    {event.attendees.map((attendee) => (
                      <Avatar key={attendee.id} className="h-6 w-6 -mr-2 border-2 border-card">
                        <AvatarImage src={attendee.avatarUrl} data-ai-hint="person portrait" />
                        <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

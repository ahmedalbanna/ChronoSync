import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CheckCircle, Clock, ListTodo } from "lucide-react";
import { tasks, events } from '@/lib/data';

export function OverviewCards() {
  const pendingTasks = tasks.filter(t => t.status !== 'done').length;
  const completedTasks = tasks.length - pendingTasks;
  const upcomingEvents = events.filter(e => e.startTime > new Date()).length;

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>الأحداث القادمة</CardDescription>
          <CardTitle className="text-4xl">{upcomingEvents}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">في الأيام السبعة القادمة</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>المهام المعلقة</CardDescription>
          <CardTitle className="text-4xl">{pendingTasks}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">{completedTasks} مكتملة هذا الأسبوع</div>
        </CardContent>
      </Card>
    </>
  );
}

'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { tasks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Clock, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { suggestTaskCompletionTime } from '@/ai/flows/ai-task-completion-time';
import type { Task } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';

const priorityColors = {
  High: "bg-red-500/10 text-red-700 border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  Low: "bg-green-500/10 text-green-700 border-green-500/20",
};

export function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [estimatingTaskId, setEstimatingTaskId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEstimateTime = async (task: Task) => {
    setEstimatingTaskId(task.id);
    try {
      const result = await suggestTaskCompletionTime({
        taskName: task.title,
        taskDescription: `A task with priority ${task.priority}.`,
        taskPriority: task.priority.toUpperCase() as 'LOW' | 'MEDIUM' | 'HIGH',
        historicalData: 'Similar tasks usually take 1-3 hours.',
        externalFactors: 'No immediate deadlines or meetings.',
      });
      
      setTaskList(prevTasks => prevTasks.map(t => 
        t.id === task.id ? { ...t, estimatedTime: result.estimatedCompletionTime } : t
      ));

      toast({
        title: "اكتمل تقدير الوقت بالذكاء الاصطناعي",
        description: `"${task.title}" ستستغرق حوالي ${result.estimatedCompletionTime}.`,
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في الذكاء الاصطناعي",
        description: "تعذر تقدير وقت إنجاز المهمة.",
      });
    } finally {
      setEstimatingTaskId(null);
    }
  };

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>المهام ذات الأولوية</CardTitle>
        <CardDescription>قائمة مهامك لهذا اليوم.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72">
          <div className="space-y-4">
            {taskList.map((task) => (
              <div key={task.id} className="flex items-start gap-4">
                <Checkbox id={`task-${task.id}`} className="mt-1" checked={task.status === 'done'} />
                <div className="grid gap-1.5 flex-1">
                  <label htmlFor={`task-${task.id}`} className="font-medium">{task.title}</label>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className={cn("text-xs", priorityColors[task.priority])}>
                      {task.priority === 'High' ? 'عالية' : task.priority === 'Medium' ? 'متوسطة' : 'منخفضة'}
                    </Badge>
                    {task.estimatedTime && (
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.estimatedTime}
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 shrink-0"
                  onClick={() => handleEstimateTime(task)}
                  disabled={estimatingTaskId === task.id}
                  aria-label={`Estimate time for ${task.title}`}
                >
                  {estimatingTaskId === task.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

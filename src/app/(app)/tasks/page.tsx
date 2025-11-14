import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { tasks } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { format } from 'date-fns';

const priorityColors: { [key: string]: string } = {
  High: "bg-red-500/10 text-red-700 border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  Low: "bg-green-500/10 text-green-700 border-green-500/20",
};

const statusColors: { [key: string]: string } = {
  "in-progress": "bg-blue-500/10 text-blue-700 border-blue-500/20",
  "todo": "bg-gray-500/10 text-gray-700 border-gray-500/20",
  "done": "bg-purple-500/10 text-purple-700 border-purple-500/20",
};

export default function TasksPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>إدارة المهام</CardTitle>
          <CardDescription>عرض وإدارة وتتبع جميع مهامك.</CardDescription>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            إضافة مهمة
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">الحالة</TableHead>
              <TableHead>العنوان</TableHead>
              <TableHead>الأولوية</TableHead>
              <TableHead>تاريخ الاستحقاق</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox checked={task.status === 'done'} />
                </TableCell>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(priorityColors[task.priority])}>{task.priority === 'High' ? 'عالية' : task.priority === 'Medium' ? 'متوسطة' : 'منخفضة'}</Badge>
                </TableCell>
                <TableCell>
                  {task.dueDate ? format(task.dueDate, "d MMM, yyyy") : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

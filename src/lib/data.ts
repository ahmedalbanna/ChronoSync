import type { Task, Event, User, TeamMember, AISuggestion, Conflict } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'أليكس دو', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
  { id: 'user-2', name: 'سام سميث', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
  { id: 'user-3', name: 'جوردان لي', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
  { id: 'user-4', name: 'كيسي بات', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

export const tasks: Task[] = [
  { id: 'task-1', title: 'مسودة تقرير الربع الثالث', status: 'in-progress', priority: 'High', dueDate: tomorrow },
  { id: 'task-2', title: 'مراجعة نسخة التسويق', status: 'todo', priority: 'Medium', dueDate: nextWeek },
  { id: 'task-3', title: 'التحضير لاجتماع العميل', status: 'todo', priority: 'High' },
  { id: 'task-4', title: 'تحديث الجدول الزمني للمشروع', status: 'done', priority: 'Medium' },
  { id: 'task-5', title: 'تأهيل عضو الفريق الجديد', status: 'in-progress', priority: 'Low', dueDate: nextWeek },
];

export const events: Event[] = [
  {
    id: 'event-1',
    title: 'مزامنة مشروع فينيكس',
    startTime: new Date(today.setHours(10, 30, 0, 0)),
    endTime: new Date(today.setHours(11, 0, 0, 0)),
    attendees: [users[0], users[1], users[2]],
    color: 'bg-primary/20 text-primary-foreground'
  },
  {
    id: 'event-2',
    title: 'مكالمة عميل: شركة أكمي',
    startTime: new Date(today.setHours(14, 0, 0, 0)),
    endTime: new Date(today.setHours(15, 0, 0, 0)),
    attendees: [users[0], users[3]],
    color: 'bg-accent/20 text-accent-foreground'
  },
  {
    id: 'event-3',
    title: 'جلسة عصف ذهني لفريق التصميم',
    startTime: new Date(tomorrow.setHours(11, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(12, 30, 0, 0)),
    attendees: [users[1], users[2]],
    color: 'bg-purple-500/20 text-purple-800'
  },
];

export const aiSuggestions: AISuggestion[] = [
  {
    id: 'sugg-1',
    title: 'تحسين تركيزك الصباحي',
    description: 'لديك مهمة ذات أولوية عالية "مسودة تقرير الربع الثالث". فكر في حجز الساعة 9:00-10:00 صباحًا للعمل العميق قبل اجتماعك الأول.',
    type: 'scheduling'
  },
];

export const conflicts: Conflict[] = [
  {
    id: 'conf-1',
    description: 'تداخل محتمل: "مكالمة عميل: شركة أكمي" مجدولة في نفس وقت كتلة تركيز عالية الأولوية لـ "مشروع فينيكس".',
    involved: [events[1]],
  },
];


export const teamMembers: TeamMember[] = [
  { id: 'team-1', name: 'سارة تشين', avatarUrl: 'https://picsum.photos/seed/user1/100/100', role: 'مديرة المشروع', availability: ['morning', 'afternoon'] },
  { id: 'team-2', name: 'ديفيد لي', avatarUrl: 'https://picsum.photos/seed/user2/100/100', role: 'كبير المصممين', availability: ['afternoon'] },
  { id: 'team-3', name: 'ماريا جارسيا', avatarUrl: 'https://picsum.photos/seed/user3/100/100', role: ' مطورة الواجهة الأمامية', availability: ['morning', 'evening'] },
  { id: 'team-4', name: 'جيمس كيم', avatarUrl: 'https://picsum.photos/seed/user4/100/100', role: ' مطور الواجهة الخلفية', availability: ['afternoon', 'evening'] },
  { id: 'team-5', name: 'إميلي وايت', avatarUrl: 'https://picsum.photos/seed/user5/100/100', role: 'مهندسة ضمان الجودة', availability: ['morning'] },
];

export const analyticsData = {
  timeAllocation: [
    { name: 'اجتماعات', value: 40, fill: 'var(--color-chart-1)' },
    { name: 'عمل عميق', value: 30, fill: 'var(--color-chart-2)' },
    { name: 'تواصل', value: 20, fill: 'var(--color-chart-3)' },
    { name: 'استراحات', value: 10, fill: 'var(--color-chart-4)' },
  ],
  productivity: [
    { date: '2024-04-01', tasksCompleted: 5 },
    { date: '2024-04-02', tasksCompleted: 7 },
    { date: '2024-04-03', tasksCompleted: 6 },
    { date: '2024-04-04', tasksCompleted: 8 },
    { date: '2024-04-05', tasksCompleted: 7 },
    { date: '2024-04-06', tasksCompleted: 9 },
    { date: '2024-04-07', tasksCompleted: 8 },
  ],
};

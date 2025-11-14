import type { Task, Event, User, TeamMember, AISuggestion, Conflict } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/user1/100/100' },
  { id: 'user-2', name: 'Sam Smith', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
  { id: 'user-3', name: 'Jordan Lee', avatarUrl: 'https://picsum.photos/seed/user3/100/100' },
  { id: 'user-4', name: 'Casey Pat', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

export const tasks: Task[] = [
  { id: 'task-1', title: 'Draft Q3 report', status: 'in-progress', priority: 'High', dueDate: tomorrow },
  { id: 'task-2', title: 'Review marketing copy', status: 'todo', priority: 'Medium', dueDate: nextWeek },
  { id: 'task-3', title: 'Prepare for client meeting', status: 'todo', priority: 'High' },
  { id: 'task-4', title: 'Update project timeline', status: 'done', priority: 'Medium' },
  { id: 'task-5', title: 'Onboard new team member', status: 'in-progress', priority: 'Low', dueDate: nextWeek },
];

export const events: Event[] = [
  {
    id: 'event-1',
    title: 'Project Phoenix Sync',
    startTime: new Date(today.setHours(10, 30, 0, 0)),
    endTime: new Date(today.setHours(11, 0, 0, 0)),
    attendees: [users[0], users[1], users[2]],
    color: 'bg-primary/20 text-primary-foreground'
  },
  {
    id: 'event-2',
    title: 'Client Call: Acme Corp',
    startTime: new Date(today.setHours(14, 0, 0, 0)),
    endTime: new Date(today.setHours(15, 0, 0, 0)),
    attendees: [users[0], users[3]],
    color: 'bg-accent/20 text-accent-foreground'
  },
  {
    id: 'event-3',
    title: 'Design Team Brainstorm',
    startTime: new Date(tomorrow.setHours(11, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(12, 30, 0, 0)),
    attendees: [users[1], users[2]],
    color: 'bg-purple-500/20 text-purple-800'
  },
];

export const aiSuggestions: AISuggestion[] = [
  {
    id: 'sugg-1',
    title: 'Optimize Your Morning Focus',
    description: 'You have a high-priority task "Draft Q3 report". Consider blocking 9:00-10:00 AM for deep work before your first meeting.',
    type: 'scheduling'
  },
];

export const conflicts: Conflict[] = [
  {
    id: 'conf-1',
    description: 'Potential Overlap: "Client Call: Acme Corp" is scheduled at the same time as a high-priority focus block for "Project Phoenix".',
    involved: [events[1]],
  },
];


export const teamMembers: TeamMember[] = [
  { id: 'team-1', name: 'Sarah Chen', avatarUrl: 'https://picsum.photos/seed/user1/100/100', role: 'Project Manager', availability: ['morning', 'afternoon'] },
  { id: 'team-2', name: 'David Lee', avatarUrl: 'https://picsum.photos/seed/user2/100/100', role: 'Lead Designer', availability: ['afternoon'] },
  { id: 'team-3', name: 'Maria Garcia', avatarUrl: 'https://picsum.photos/seed/user3/100/100', role: 'Frontend Developer', availability: ['morning', 'evening'] },
  { id: 'team-4', name: 'James Kim', avatarUrl: 'https://picsum.photos/seed/user4/100/100', role: 'Backend Developer', availability: ['afternoon', 'evening'] },
  { id: 'team-5', name: 'Emily White', avatarUrl: 'https://picsum.photos/seed/user5/100/100', role: 'QA Engineer', availability: ['morning'] },
];

export const analyticsData = {
  timeAllocation: [
    { name: 'Meetings', value: 40, fill: 'var(--color-chart-1)' },
    { name: 'Deep Work', value: 30, fill: 'var(--color-chart-2)' },
    { name: 'Communication', value: 20, fill: 'var(--color-chart-3)' },
    { name: 'Breaks', value: 10, fill: 'var(--color-chart-4)' },
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

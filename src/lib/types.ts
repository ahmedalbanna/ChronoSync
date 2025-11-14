export type Task = {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
  estimatedTime?: string;
};

export type Event = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  attendees: User[];
  description?: string;
  color: string;
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type TeamMember = {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  availability: ('morning' | 'afternoon' | 'evening')[];
};

export type AISuggestion = {
  id: string;
  title: string;
  description: string;
  type: 'scheduling' | 'conflict' | 'prioritization';
};

export type Conflict = {
  id: string;
  description: string;
  involved: (Event | Task)[];
};

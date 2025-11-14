import { OverviewCards } from '@/components/dashboard/overview-cards';
import { UpcomingEvents } from '@/components/dashboard/upcoming-events';
import { TaskList } from '@/components/dashboard/task-list';
import { AiSuggestions } from '@/components/dashboard/ai-suggestions';
import { AiScheduler } from '@/components/dashboard/ai-scheduler';

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
       <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <AiScheduler />
          <OverviewCards />
       </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <UpcomingEvents />
        <TaskList />
      </div>
      <AiSuggestions />
    </div>
  );
}

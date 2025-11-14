import { TimeAllocationChart } from '@/components/analytics/time-allocation-chart';
import { ProductivityChart } from '@/components/analytics/productivity-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Time Allocation</CardTitle>
          <CardDescription>How you spent your time this week.</CardDescription>
        </CardHeader>
        <CardContent>
          <TimeAllocationChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Productivity</CardTitle>
          <CardDescription>Your task completion trend over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductivityChart />
        </CardContent>
      </Card>
    </div>
  );
}

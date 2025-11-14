import { TimeAllocationChart } from '@/components/analytics/time-allocation-chart';
import { ProductivityChart } from '@/components/analytics/productivity-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>تخصيص الوقت</CardTitle>
          <CardDescription>كيف قضيت وقتك هذا الأسبوع.</CardDescription>
        </CardHeader>
        <CardContent>
          <TimeAllocationChart />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>الإنتاجية</CardTitle>
          <CardDescription>اتجاه إنجاز مهامك خلال الأسبوع الماضي.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductivityChart />
        </CardContent>
      </Card>
    </div>
  );
}

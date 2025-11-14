import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>الإعدادات</CardTitle>
        <CardDescription>
          قم بتخصيص تجربتك مع ChronoSync.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="work-hours-start">بداية ساعات العمل</Label>
            <Input id="work-hours-start" type="time" defaultValue="09:00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="work-hours-end">نهاية ساعات العمل</Label>
            <Input id="work-hours-end" type="time" defaultValue="17:00" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>حساسية الذكاء الاصطناعي</Label>
          <p className="text-sm text-muted-foreground">
            اضبط مدى استباقية الذكاء الاصطناعي في اقتراح تغييرات على جدولك.
          </p>
           {/* A slider would be great here, but a placeholder works for now */}
          <Input type="range" min="1" max="5" defaultValue="3" />
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Switch id="email-notifications" defaultChecked />
          <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Switch id="ai-conflict-resolution" defaultChecked />
          <Label htmlFor="ai-conflict-resolution">تمكين حل النزاعات بالذكاء الاصطناعي</Label>
        </div>
        <Button>حفظ التفضيلات</Button>
      </CardContent>
    </Card>
  );
}

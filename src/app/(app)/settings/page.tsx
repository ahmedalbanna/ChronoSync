import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Customize your ChronoSync experience.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="work-hours-start">Work Hours Start</Label>
            <Input id="work-hours-start" type="time" defaultValue="09:00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="work-hours-end">Work Hours End</Label>
            <Input id="work-hours-end" type="time" defaultValue="17:00" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>AI Sensitivity</Label>
          <p className="text-sm text-muted-foreground">
            Adjust how proactively the AI suggests changes to your schedule.
          </p>
           {/* A slider would be great here, but a placeholder works for now */}
          <Input type="range" min="1" max="5" defaultValue="3" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="email-notifications" defaultChecked />
          <Label htmlFor="email-notifications">Email Notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="ai-conflict-resolution" defaultChecked />
          <Label htmlFor="ai-conflict-resolution">Enable AI Conflict Resolution</Label>
        </div>
        <Button>Save Preferences</Button>
      </CardContent>
    </Card>
  );
}

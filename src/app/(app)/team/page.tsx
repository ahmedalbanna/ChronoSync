import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { teamMembers } from "@/lib/data";

export default function TeamPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team View</CardTitle>
        <CardDescription>Collaborate and check your team's availability.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person portrait" />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-medium mb-2">Availability</h4>
              <div className="flex gap-2">
                {['morning', 'afternoon', 'evening'].map(slot => (
                  <Badge
                    key={slot}
                    variant={member.availability.includes(slot as any) ? 'default' : 'outline'}
                    className={`capitalize ${member.availability.includes(slot as any) ? 'bg-primary/80' : 'text-muted-foreground'}`}
                  >
                    {slot}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

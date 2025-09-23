import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";

export default function ProfilePage() {
  return (
    <main className="container max-w-4xl mx-auto py-8">
      <h1 className="mb-4">Profile Page</h1>
      <Card>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Avatar className="w-16 h-16 rounded-full justify-center items-center flex bg-accent">
              <AvatarFallback>L</AvatarFallback>
              <AvatarImage sizes="42" src=""></AvatarImage>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="font-bold text-lg">LIand</p>
              <p className="text-sm text-muted-foreground">@liand</p>
              <p>liand</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
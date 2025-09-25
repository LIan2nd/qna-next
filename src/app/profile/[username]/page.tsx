import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { api } from '~/trpc/server'

// server component = component yang dirender di server kita (vps/hosting)
// client component = component yang dirender di client atau browser user

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = await api.user.getProfileByUsername({ username })

  return (
    <main className="container max-w-4xl mx-auto py-8">
      <h1 className="mb-4">Profile Page</h1>
      <Card>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Avatar className="w-16 h-16 rounded-full justify-center items-center flex bg-accent">
              <AvatarFallback>{profile.username?.charAt(0).toUpperCase()}</AvatarFallback>
              <AvatarImage sizes="42" src={profile.image ?? ""}></AvatarImage>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="font-bold text-lg">{profile.name}</p>
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
              <p>{profile.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
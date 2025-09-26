import { CreatePostCard } from "~/components/shared/CreatePostCard";
import { HomePostList } from "~/components/shared/HomePostList";


export default async function Home() {
  return (

    <main className="space-y-8">
      <div className="space-y-1">
        <h1 className="font-bold text-4xl">QnA Forum</h1>
        <p className="text-muted-foreground">Ask questions, share knowledge, and help the community grow</p>
      </div>

      <CreatePostCard />

      <HomePostList />
    </main>
  );
}

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/server";

export default async function PostDetail({ params }: { params: Promise<{ postId: string }> }) {

  const { postId } = await params;

  const postDetail = await api.post.getPostById({ postId });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Post Detail</h1>
      <div className="p-6 rounded-xl border space-y-6">
        {/* Header */}
        <div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-14">
                <AvatarImage src={postDetail?.author.image ?? ""} />
                {postDetail?.author.username ? (
                  <AvatarFallback>
                    {postDetail?.author.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                ) : (
                  <AvatarFallback>?</AvatarFallback>
                )}
              </Avatar>

              <div className="space-y-0.5">
                <Link href={`/profile/${postDetail?.author?.username}`}>
                  <p className="font-medium">{postDetail?.author.username}</p>
                </Link>
                <p className="text-muted-foreground">{postDetail?.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            <Badge variant={"secondary"} className="h-fit">Unanswered</Badge>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl">{postDetail?.title}</h1>
          <p>{postDetail?.description}</p>
        </div>
      </div>

    </div>
  )
}
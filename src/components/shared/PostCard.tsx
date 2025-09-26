import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { ArrowRight, MessageSquareMore } from "lucide-react"

type PostCardProps = {
  id: string;
  userImage: string;
  username: string;
  createdDate: Date;
  title: string;
  description: string;
  commentCount: number;
  status: "ANSWERED" | "UNANSWERED";
}

export const PostCard = (props: PostCardProps) => {
  const postDetailURL = `/post/${props.id}`;

  return (
    <div className="rounded-xl border shadow p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-14">
            <AvatarImage src={props.userImage} />
            <AvatarFallback>
              {props.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <Link href={`/profile/${props.username}`}>
              <p className="font-medium">{props.username}</p>
            </Link>
            <p className="text-muted-foreground">{props.createdDate.toLocaleDateString()}</p>
          </div>
        </div>
        {
          props.status === "ANSWERED" ? (
            <Badge variant={"default"} className="h-fit">Answered</Badge>
          ) : (
            <Badge variant={"secondary"} className="h-fit">Unanswered</Badge>
          )
        }
      </div>

      {/* Content */}
      <Link href={postDetailURL} className="group">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg group-hover:text-destructive">{props.title}</h3>
          <p>{props.description}</p>
        </div>
      </Link>

      {/* Footer */}
      <div className="flex justify-between mt-4 border-t pt-3">
        <div className="flex gap-2 text-sm text-muted-foreground items-center">
          <MessageSquareMore className="size-4" />
          {props.commentCount} Comments
        </div>

        <Link href={postDetailURL} className="text-sm text-primary flex items-center gap-1">
          View Post <ArrowRight />
        </Link>
      </div>
    </div>
  )
}
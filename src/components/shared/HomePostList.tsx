'use client'

import { api } from "~/trpc/react"
import { PostCard } from "./PostCard"

export const HomePostList = () => {
  const postsQuery = api.post.getAllPost.useQuery();

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold">Recent Questions</h2>
      {
        postsQuery.data?.map((post) => {
          return <PostCard
            id={post.id}
            createdDate={post.createdAt}
            description={post.description}
            title={post.title}
            status="UNANSWERED"
            commentCount={0}
            userImage={post.author.image ?? ""}
            username={post.author.username ?? "unknown"}
            key={post.id}
          />
        })
      }
    </div>
  )
}
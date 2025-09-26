import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure // Pake "Protected Procedure", biar postnya cuma bisa dilakukan oleh orang yang sudah login.
    .input(z.object({
      title: z.string(),
      description: z.string(),
    }),
    ).mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { description, title } = input;

      const newPost = await db.post.create({
        data: {
          title,
          description,
          userId: session.user.id,
        }
      });

      return newPost;
    }),

  getAllPost: publicProcedure
    .query(async ({ ctx }) => {
      const { db } = ctx;
      const posts = await db.post.findMany({
        select: {
          id: true,
          description: true,
          title: true,
          author: {
            select: {
              username: true,
              image: true,
            }
          },
          createdAt: true,
        }
      });

      return posts;
    }),

  getPostById: publicProcedure
    .input(z.object({
      postId: z.string(),
    })).query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { postId } = input;

      const postDetail = await db.post.findUnique({
        where: {
          id: postId
        },
        select: {
          title: true,
          description: true,
          createdAt: true,
          author: {
            select: {
              username: true,
              image: true,
            }
          }
        }
      })

      return postDetail;
    })
});

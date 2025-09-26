'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Avatar } from "@radix-ui/react-avatar"
import { useForm } from "react-hook-form"
import z from "zod"
import { AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { api } from "~/trpc/react"
import { signIn, useSession } from "next-auth/react"

// Validasi
const createPostFormSchema = z.object({
  title: z.string().max(100).min(10),
  description: z.string().max(1000).min(10),
});

// Typescript type
type CreatePostFormSchema = z.infer<typeof createPostFormSchema>

export const CreatePostCard = () => {
  const { data: session } = useSession()

  const form = useForm<CreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: "",
      description: "",
    }
  });

  const apiUtils = api.useUtils();

  const createPostMutation = api.post.createPost.useMutation({
    onSuccess: async () => {
      alert("Created post!");

      form.reset();
      await apiUtils.post.getAllPost.invalidate();
    }
  });

  const handleCreatePost = (values: CreatePostFormSchema) => {
    createPostMutation.mutate({
      title: values.title,
      description: values.description,
    });
  }

  const handleLogin = async () => {
    await signIn("google");
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ask a question</CardTitle>
        </CardHeader>
        {!!session ? (
          <CardContent>
            <div className='flex gap-4'>
              <Avatar className="size-14">
                <AvatarFallback>{session.user.name?.charAt(0).toUpperCase() ?? ""}</AvatarFallback>
                <AvatarImage src={session.user.image ?? ''}></AvatarImage>
              </Avatar>

              {/* Input section */}
              <div className="w-full space-y-1.5">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Title of your question" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Details of your question.." className="min-h-24" {...field}></Textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <div className="space-y-4 text-center">
              <p className="text-xl">
                You have to be signed in to ask a question
              </p>
              <Button onClick={handleLogin} size="lg">
                Sign In
              </Button>
            </div>
          </CardContent>
        )}
        {!!session && (
          <CardFooter className="flex justify-end">
            <Button
              disabled={createPostMutation.isPending}
              onClick={form.handleSubmit(handleCreatePost)}
            >
              {createPostMutation.isPending
                ? "Submitting post..."
                : "Submit Question"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </Form>
  )
}
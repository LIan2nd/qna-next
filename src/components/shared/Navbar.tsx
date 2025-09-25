'use client';

import { Button } from "~/components/ui/button"
import { signIn } from 'next-auth/react'

export const Navbar = () => {
  const handleSignIn = async () => {
    await signIn('google');
  }

  return (
    <header className="h-16 flex justify-between py-2 px-6 border-b items-center">
      <h1>Ls QNA Forum</h1>

      <div>
        <Button onClick={handleSignIn}>Sign In with Google</Button>
      </div>
    </header>
  )
}
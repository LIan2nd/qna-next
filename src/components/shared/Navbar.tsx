'use client';

import { Button } from "~/components/ui/button"
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from "next/link";

export const Navbar = () => {
  const session = useSession();

  const handleSignIn = async () => {
    await signIn('google');
  }

  const handleLogOut = async () => {
    await signOut();
  }

  return (
    <header className="h-16 flex justify-between py-2 px-6 border-b items-center">
      <Link href={"/"} className="font-bold text-lg">
        <h1>Ls QNA Forum</h1>
      </Link>

      <div>
        {session?.data?.user ? (
          <Button onClick={handleLogOut}>Sign Out</Button>
        ) : (
          <Button onClick={handleSignIn}>Sign In with Google</Button>
        )}
      </div>
    </header>
  )
}
import { Button } from "~/components/ui/button"

export const Navbar = () => {
  return (
    <header className="h-16 flex justify-between py-2 px-6 border-b items-center">
      <h1>L's QNA Forum</h1>

      <div>
        <Button>Sign In</Button>
      </div>
    </header>
  )
}
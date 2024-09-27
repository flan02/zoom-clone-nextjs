import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { buttonClassName } from "../reutilizable/Button";

export default function Navbar() {
  return (
    <header className="shadow">
      <div className="mx-auto flex py-4 items-center justify-between p-3 font-medium bg-slate-950">
        <Link href="/" className={buttonClassName}>New meeting</Link>
        <SignedIn>
          <div className="flex items-center gap-5">
            <Link href="/meetings" className={buttonClassName}>Meetings</Link>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}
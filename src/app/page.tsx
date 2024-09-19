import { SignedOut, SignOutButton } from "@clerk/nextjs";


export default function Home() {
  return (
    <main className='text-blue-600'>
      <h1>
        Welcome to ZUM
      </h1>
      <SignOutButton redirectUrl="/" />
    </main>
  );
}

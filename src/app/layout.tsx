import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "@/components/layout/Navbar";
import ClientProvider from "./ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "zum | Home",
  description: "get instant videocalls with your friends",
  authors: {
    name: "Dan Chanivet",
    url: "https://www.danchanivet.tech"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={`${inter.className} bg-night text-crybaby/70`}>
          <ClientProvider>
            <Navbar />
            <main className="max-w-5xl mx-auto px-3 py-6" >
              {children}
            </main>
          </ClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

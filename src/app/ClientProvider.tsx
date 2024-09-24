"use client";

import { StreamVideo } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useInitializeVideoClient } from "@/hooks/useInitializeVideoClient";

interface ClientProviderProps { children: React.ReactNode }


export default function ClientProvider({ children }: ClientProviderProps) {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}



'use client'
import FlexibleCallLayout from "@/components/custom/meeting/FlexibleCallLayout";
import { CallingState, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";

export function CallUI() {
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader2 className="mx-auto animate-spin" />;

  return <FlexibleCallLayout />;
}
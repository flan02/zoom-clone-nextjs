"use client";

import { MeetingScreen } from "@/components/custom/meeting/MeetingScreen";
import useLoadCall from "@/hooks/useLoadCall";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";


interface MeetingPageProps {
  id: string;
}

export default function MeetingPage({ id }: MeetingPageProps) {
  const { user, isLoaded: userLoaded } = useUser();

  const { call, callLoading } = useLoadCall(id);

  if (!userLoaded || callLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  if (!call) {
    return <p className="text-center font-bold">Call not found</p>;
  }

  const notAllowedToJoin =
    call.type === "private-meeting" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowedToJoin) {
    return (
      <p className="text-center font-bold">
        You are not allowed to view this meeting
      </p>
    );
  }

  return (
    <StreamCall call={call}> { /* This context provider is provided by Stream */}
      <StreamTheme>
        <MeetingScreen />
      </StreamTheme>
    </StreamCall>
  );
}










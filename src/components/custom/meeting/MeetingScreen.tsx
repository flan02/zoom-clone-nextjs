'use client'
import useStreamCall from "@/hooks/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { MeetingEndedScreen } from "./MeetingEndedScreen";
import { UpcomingMeetingScreen } from "./UpcomingMeetingScreen";
import { SetupUI } from "./SetupUI";
import { CallUI } from "./CallUI";



export function MeetingScreen() {
  const call = useStreamCall();

  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();

  const callEndedAt = useCallEndedAt();
  const callStartsAt = useCallStartsAt();

  const [setupComplete, setSetupComplete] = useState(false);

  async function handleSetupComplete() {
    call.join();
    setSetupComplete(true);
  }

  const callIsInFuture = callStartsAt && new Date(callStartsAt) > new Date();

  const callHasEnded = !!callEndedAt; // ? (!!) converts to boolean

  if (callHasEnded) {
    return <MeetingEndedScreen />;
  }

  if (callIsInFuture) {
    return <UpcomingMeetingScreen />;
  }

  const description = call.state.custom.description;

  return (
    <div className="space-y-6">
      {
        description &&
        <p className="text-center">
          Meeting description: &nbsp;&nbsp; <span className="font-bold">{description}</span>
        </p>
      }

      {
        setupComplete
          ? <CallUI />
          : <SetupUI onSetupComplete={handleSetupComplete} />
      }
    </div>
  )
}
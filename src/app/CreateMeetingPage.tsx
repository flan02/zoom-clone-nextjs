"use client";

import Button from "@/components/reutilizable/Button";
import { useUser } from "@clerk/nextjs";
import {
  Call,
  MemberRequest,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { getUserIds } from "./actions";
import { DescriptionInput } from "@/components/custom/home/DescriptionInput";
import { StartTimeInput } from "@/components/custom/home/StartTime";
import { ParticipantsInput } from "@/components/custom/home/ParticipantsInput";
import { MeetingLink } from "@/components/custom/home/MeetingLink";

export default function CreateMeetingPage() {
  const client = useStreamVideoClient(); // * Hook provided by the SDK
  const { user } = useUser();  // * Hook provided by Clerk with the user data

  const [descriptionInput, setDescriptionInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [participantsInput, setParticipantsInput] = useState("");

  const [call, setCall] = useState<Call>(); // * State to store the created call

  async function createMeeting() {
    if (!client || !user) {
      return;
    }

    try {
      const id = crypto.randomUUID(); // * Generate a random [unique] UUID for the call
      const callType = participantsInput ? "private-meeting" : "default";

      const call = client.call(callType, id);

      const memberEmails = participantsInput // * Get the emails from the input and separate them by commas
        .split(",")
        .map((email) => email.trim());

      const memberIds = await getUserIds(memberEmails); // * Call the function in actions.ts to get the user IDs
      const members: MemberRequest[] = memberIds
        .map((id) => ({ user_id: id, role: "call_member" }))
        .concat({ user_id: user.id, role: "call_member" })
        .filter((v, i, a) => a.findIndex((v2) => v2.user_id === v.user_id) === i);

      const starts_at = new Date(startTimeInput || Date.now()).toISOString();

      // * Create the call with the data provided
      await call.getOrCreate({
        data: {
          starts_at,
          members,
          custom: { description: descriptionInput },
        },
      });

      setCall(call); // * Set the call to the state to show the link after awaiting the call creation
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  }



  // ! Activate a loader while the client and user are being fetched
  if (!client || !user) return <Loader2 className="mx-auto animate-spin" />;


  return (
    <div className="flex flex-col items-center justify-center space-y-2 border border-white min-h-[80vh]">
      <h1 className="text-center text-2xl font-bold">
        Welcome {user.username}!
      </h1>
      <div className="mx-auto w-[450px] space-y-6 bg-[#191F1F] border border-slate-950 rounded-lg py-10 px-20">
        <h2 className="text-xl font-bold">Create a new meeting</h2>
        <DescriptionInput
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />
        <ParticipantsInput
          value={participantsInput}
          onChange={setParticipantsInput}
        />
        <Button onClick={createMeeting} className="w-full bg-crybaby hover:bg-crybaby/80 active:bg-crybaby/60">
          Create meeting
        </Button>
      </div>
      {
        call && <MeetingLink call={call} />
      }
    </div>
  );
}










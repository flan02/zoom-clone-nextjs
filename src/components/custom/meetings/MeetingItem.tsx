import { Call } from "@stream-io/video-react-sdk";
import Link from "next/link";

interface MeetingItemProps {
  call: Call;
}

export function MeetingItem({ call }: MeetingItemProps) {
  const meetingLink = `/meeting/${call.id}`;

  const isInFuture =
    call.state.startsAt && new Date(call.state.startsAt) > new Date();

  const hasEnded = !!call.state.endedAt;

  return (
    <li className="bg-crybaby/50 hover:bg-crybaby/60 w-[400px] py-4 pl-4 rounded-lg">
      <Link href={meetingLink} className="hover:underline hover:text-slate-800 text-slate-700">
        {call.state.startsAt?.toLocaleString()}
        {isInFuture && " (Upcoming)"}
        {hasEnded && " (Ended)"}
      </Link>
      <p className="ml-2 text-slate-800 font-bold ">{call.state.custom.description}</p>
    </li>
  );
}
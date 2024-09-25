import CopyClipboardButton from "@/components/reutilizable/CopyClipboardButton";
import { getMailToLink } from "@/lib/utils";
import { Call } from "@stream-io/video-react-sdk";
import Link from "next/link";

interface MeetingLinkProps {
  call: Call; // An object that represents a call provided by the SDK
}

export function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3">
        <span>
          Invitation link:{" "}
          <Link href={meetingLink} className="font-medium">
            {meetingLink}
          </Link>
        </span>
        <CopyClipboardButton text={meetingLink} />
      </div>
      <a
        href={getMailToLink(
          meetingLink,
          call.state.startsAt,
          call.state.custom.description,
        )}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Send email invitation
      </a>
    </div>
  );
}



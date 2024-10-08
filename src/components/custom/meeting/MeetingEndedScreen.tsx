import { buttonClassName } from "@/components/reutilizable/Button";
import RecordingsList from "@/components/reutilizable/RecordingList";
import Link from "next/link";


export function MeetingEndedScreen() {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has ended</p>
      <Link href="/" className={buttonClassName} >
        Go home
      </Link>
      <div className="space-y-3">
        <h2 className="text-center text-xl font-bold">Recordings</h2>
        <RecordingsList />
      </div>
    </div>
  );
}
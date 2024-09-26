'use client'
import { buttonClassName } from "@/components/reutilizable/Button";
import useStreamCall from "@/hooks/useStreamCall";
import Link from "next/link";



export function UpcomingMeetingScreen() {
  const call = useStreamCall(); // * Custom hook

  return (
    <div className="flex flex-col items-center gap-6">
      <p>This meeting has not started yet. It will start at{" "}
        <span className="font-bold">{call.state.startsAt?.toLocaleString()}</span>
      </p>
      {
        call.state.custom.description && (
          <p>Description:{" "}
            <span className="font-bold">{call.state.custom.description}</span>
          </p>
        )}
      <Link href="/" className={buttonClassName}>Go home</Link>
    </div>
  );
}
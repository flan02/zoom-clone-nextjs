import useStreamCall from "@/hooks/useStreamCall";
import { CallControls } from "@stream-io/video-react-sdk";

import { useRouter } from "next/navigation";
import { useState } from "react";
import EndCallButton from "../../reutilizable/EndCallButton";
import { CallLayoutButtons } from "./CallLayoutButtons";
import { CallLayoutView } from "./CallLayoutView";

export type CallLayout = "speaker-vert" | "speaker-horiz" | "grid";

export default function FlexibleCallLayout() {
  const [layout, setLayout] = useState<CallLayout>("speaker-vert");
  const call = useStreamCall();
  const router = useRouter();

  return (
    <div className="space-y-3">
      <CallLayoutButtons layout={layout} setLayout={setLayout} />
      <CallLayoutView layout={layout} />
      <CallControls onLeave={() => router.push(`/meeting/${call.id}/left`)} />
      <EndCallButton />
    </div>
  );
}




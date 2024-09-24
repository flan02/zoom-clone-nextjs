'use client'
import AudioVolumeIndicator from "@/components/reutilizable/AudioVolumeIndicator";
import Button from "@/components/reutilizable/Button";
import PermissionPrompt from "@/components/reutilizable/PermissionPrompt";
import useStreamCall from "@/hooks/useStreamCall";
import { DeviceSettings, MenuVisualType, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";



interface SetupUIProps {
  onSetupComplete: () => void;
}

export function SetupUI({ onSetupComplete }: SetupUIProps) {
  const call = useStreamCall();

  const { useMicrophoneState, useCameraState } = useCallStateHooks();

  const micState = useMicrophoneState();
  const camState = useCameraState();

  const [micCamDisabled, setMicCamDisabled] = useState(false);

  useEffect(() => {
    if (micCamDisabled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [micCamDisabled, call]);

  if (!micState.hasBrowserPermission || !camState.hasBrowserPermission) {
    return <PermissionPrompt />;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview className="border border-crybaby" />
      <div className="flex h-16 items-center gap-3">
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>
      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={micCamDisabled}
          onChange={(e) => setMicCamDisabled(e.target.checked)}
        />
        Join with mic and camera off
      </label>
      <Button className="bg-crybaby hover:bg-crybaby/90" onClick={onSetupComplete}>Join meeting</Button>
    </div>
  );
}

import useStreamCall from "@/hooks/useStreamCall";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

export default function EndCallButton() {
  const call = useStreamCall(); // * Custom hook. It ensures that "the call" is available in the component if not it throws an error

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const participantIsChannelOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!participantIsChannelOwner) return null;

  return (
    <button
      onClick={call.endCall} // * We can express this fc as a callback function without () => fc() sintax since it doesn't receive any argument
      className="mx-auto block font-medium text-red-500 hover:underline"
    >
      End call for everyone
    </button>
  );
}
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export default function useLoadCall(id: string) {
  const client = useStreamVideoClient();

  const [call, setCall] = useState<Call>(); // ? Call is a type from the SDK
  const [callLoading, setCallLoading] = useState(true);

  useEffect(() => {
    async function loadCall() {
      setCallLoading(true);

      if (!client) return;

      const { calls } = await client.queryCalls({
        filter_conditions: { id },
      });

      if (calls.length > 0) {
        const call = calls[0]; // ? If calls is greater than 0, get the first call

        await call.get(); // ? to load info about the call

        setCall(call);
      }

      setCallLoading(false);
    }
    loadCall();
  }, [client, id]);

  return { call, callLoading };
}
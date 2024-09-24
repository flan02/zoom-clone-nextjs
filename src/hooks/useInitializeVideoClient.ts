import { useUser } from "@clerk/nextjs";
import { StreamVideoClient, User } from "@stream-io/video-react-sdk";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { getToken } from "@/app/actions";

// TODO This hook initializes the StreamVideoClient with the current user and token provider
export function useInitializeVideoClient() {
  const { user, isLoaded: userLoaded } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );

  useEffect(() => {
    if (!userLoaded) return;

    let streamUser: User;

    if (user?.id) {
      streamUser = {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl
      }
    } else {
      const id = nanoid();
      streamUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;

    if (!apiKey) {
      throw new Error("Stream API key not set");
    }

    // TODO Connect the StreamVideoClient with the current user and token provider
    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: user?.id ? getToken : undefined,
    });

    setVideoClient(client); // * This is the key line that initializes the client

    return () => { // This is the cleanup function
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user?.id, user?.username, user?.imageUrl, userLoaded]);

  return videoClient;
}
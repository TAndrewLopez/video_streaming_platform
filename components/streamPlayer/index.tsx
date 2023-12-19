"use client";

import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Video } from "./video";

type Props = {
  user: User & {
    stream: Stream | null;
  };
  stream: Stream;
  isFollowing: boolean;
};

export const StreamPlayer = ({ user, stream, isFollowing }: Props) => {
  const { identity, name, token } = useViewerToken(user.id);

  if (!identity || !name || !token) {
    return <div>Cannot watch the stream</div>;
  }

  return (
    <>
      <LiveKitRoom
        className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}>
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 ">
          <Video hostIdentity={user.id} hostName={user.username} />
        </div>
      </LiveKitRoom>
    </>
  );
};

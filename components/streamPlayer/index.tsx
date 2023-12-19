"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { Stream, User } from "@prisma/client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/useChatSidebar";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chatToggle";
import { Header, HeaderSkeleton } from "./header";
import { Video, VideoSkeleton } from "./video";
import { InfoCard } from "./infoCard";
import { AboutCard } from "./aboutCard";

type Props = {
  user: User & {
    stream: Stream | null;
    _count: {
      followedBy: number
    }
  };
  stream: Stream;
  isFollowing: boolean;
};

export const StreamPlayer = ({ user, stream, isFollowing }: Props) => {
  const { identity, name, token } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((s) => s);

  if (!identity || !name || !token) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}

      <LiveKitRoom
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}>
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 ">
          <Video hostIdentity={user.id} hostName={user.username} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageURL={user.imageURL}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailURL={stream.thumbnailURL}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};

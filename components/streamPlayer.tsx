"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";

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

  return <div>Can watch the stream</div>;
};

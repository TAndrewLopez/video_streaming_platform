import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/userService";
import { isFollowingUser } from "@/lib/followService";
import { isBlockedByUser } from "@/lib/blockedService";
import { StreamPlayer } from "@/components/streamPlayer";

type Props = {
  params: {
    username: string;
  };
};

const Page = async ({ params }: Props) => {
  const user = await getUserByUsername(params.username)

  if (!user || !user.stream) notFound()

  const isFollowing = await isFollowingUser(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  if (isBlocked) notFound()

  return <StreamPlayer
    isFollowing={isFollowing}
    stream={user.stream}
    user={user}
  />

};

export default Page;

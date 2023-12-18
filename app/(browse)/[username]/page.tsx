import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/userService";
import { isFollowingUser } from "@/lib/followService";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/blockedService";

type Props = {
  params: {
    username: string;
  };
};

const Page = async ({ params }: Props) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  // if (isBlocked) notFound();

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>UserID: {user.id}</p>
      <p>Is following: {`${isFollowing}`}</p>
      <p>Is blocked by this user: {`${isBlocked}`}</p>
      <Actions
        isFollowing={isFollowing}
        isBlocked={isBlocked}
        userID={user.id}
      />
    </div>
  );
};

export default Page;

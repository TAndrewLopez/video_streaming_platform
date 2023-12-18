import { notFound } from "next/navigation";

import { getUserByUsername } from "@/lib/userService";
import { isFollowingUser } from "@/lib/followService";
import { Actions } from "./_components/actions";

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

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>UserID: {user.id}</p>
      <p>Is following: {`${isFollowing}`}</p>
      <Actions isFollowing={isFollowing} />
    </div>
  );
};

export default Page;

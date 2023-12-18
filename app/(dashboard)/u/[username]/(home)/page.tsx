import { StreamPlayer } from "@/components/streamPlayer";
import { getUserByUsername } from "@/lib/userService";
import { currentUser } from "@clerk/nextjs";

type Props = {
  params: {
    username: string;
  };
};

const Page = async ({ params }: Props) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserID !== externalUser?.id || !user.stream)
    throw new Error("Unauthorized");

  return (
    <div className="w-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default Page;

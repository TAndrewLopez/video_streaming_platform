"use client";

import { useAuth } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { onFollow, onUnFollow } from "@/actions/follow";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

type Props = {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
};

export const Actions = ({ hostIdentity, isFollowing, isHost }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId: userID } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const toggleFollow = () => {
    if (!userID) {
      return router.push("/sign-in");
    }
    if (isHost) return;

    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto">
      <HeartIcon
        className={cn("w-4 h-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};

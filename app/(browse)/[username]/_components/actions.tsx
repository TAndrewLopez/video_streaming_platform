"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { onBlock, onUnblock } from "@/actions/block";

type Props = {
  isFollowing: boolean;
  isBlocked: boolean;
  userID: string;
};

export const Actions = ({ isFollowing, isBlocked, userID }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userID)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userID)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userID)
        .then((data) =>
          toast.success(`Blocked the user ${data?.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnblock = () => {
    startTransition(() => {
      onUnblock(userID)
        .then((data) =>
          toast.success(`Unblocked the user ${data.blocked.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onClickFollow = () => (isFollowing ? handleUnFollow() : handleFollow());
  const onClickBlock = () => (isBlocked ? handleUnblock() : handleBlock());

  return (
    <>
      <Button disabled={isPending} onClick={onClickFollow} variant="primary">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} onClick={handleUnblock}>
        {isBlocked ? "Unblock" : "Block"}
      </Button>
    </>
  );
};

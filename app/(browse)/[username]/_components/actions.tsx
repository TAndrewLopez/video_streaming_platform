"use client";

import { useTransition } from "react";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  isFollowing: boolean;
  userID: string;
};

export const Actions = ({ isFollowing, userID }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onFollow(userID)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <Button
      disabled={isFollowing || isPending}
      onClick={onClick}
      variant="primary">
      Follow
    </Button>
  );
};

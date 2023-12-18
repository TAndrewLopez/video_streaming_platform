"use client";

import { useTransition } from "react";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

type Props = {
  isFollowing: boolean;
};

export const Actions = ({ isFollowing }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onFollow("123");
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

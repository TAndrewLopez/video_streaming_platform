"use client";

import { User } from "@prisma/client";
import { useSidebar } from "@/store/useSidebar";
import { UserItem, UserItemSkelton } from "./userItem";

type Props = {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
};

export const Recommended = ({ data }: Props) => {
  const { collapsed } = useSidebar((s) => s);
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map(({ id, imageURL, username, stream }) => (
          <UserItem
            key={id}
            imageURL={imageURL}
            username={username}
            isLive={stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkelton key={i} />
      ))}
    </ul>
  );
};

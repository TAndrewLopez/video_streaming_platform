"use client";

import { useSidebar } from "@/store/useSidebar";
import { Follow, Stream, User } from "@prisma/client";
import { UserItem, UserItemSkelton } from "./userItem";

type Props = {
  data: (Follow & {
    following: User & {
      stream: Stream | null;
    };
  })[];
};

export const Following = ({ data }: Props) => {
  const { collapsed } = useSidebar((s) => s);

  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map(({ id, following: { username, imageURL, stream } }) => (
          <UserItem
            key={id}
            username={username}
            imageURL={imageURL}
            isLive={stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkelton key={i} />
      ))}
    </ul>
  );
};

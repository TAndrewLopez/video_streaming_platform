"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/useSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/userAvatar";
import { LiveBadge } from "@/components/liveBadge";

type Props = {
  username: string;
  imageURL: string;
  isLive?: boolean;
};

export const UserItem = ({ imageURL, username, isLive }: Props) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar((s) => s);

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}>
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center"
          )}>
          <UserAvatar imageURL={imageURL} username={username} isLive={isLive} />
          {!collapsed && <p className="truncate">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkelton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

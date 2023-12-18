"use client";

import { useIsClient } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

type Props = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((s) => s);

  // OLD FIX FOR HYDRATION ERROR
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50",
        collapsed && "w-[70px]"
      )}>
      {children}
    </aside>
  );
};

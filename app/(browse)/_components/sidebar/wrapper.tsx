"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/useSidebar";

type Props = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
  const { collapsed } = useSidebar((s) => s);
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

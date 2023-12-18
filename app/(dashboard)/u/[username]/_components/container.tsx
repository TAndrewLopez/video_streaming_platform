"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/useCreatorSidebar";

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar((s) => s);
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    matches ? onCollapse() : onExpand();
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>
      {children}
    </div>
  );
};

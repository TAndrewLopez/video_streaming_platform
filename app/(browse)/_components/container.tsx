"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

import { useSidebar } from "@/store/useSidebar";

type Props = {
  children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  const matches = useMediaQuery("(max-width:1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebar((s) => s);

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

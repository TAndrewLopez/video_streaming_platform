"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Hint } from "../hint";
import { Button } from "../ui/button";
import { useChatSidebar } from "@/store/useChatSidebar";

type Props = {};

export const ChatToggle = ({}: Props) => {
  const { collapsed, onExpand, onCollapse } = useChatSidebar();

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => (collapsed ? onExpand() : onCollapse());
  const label = collapsed ? "Expand" : "Collapse";

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent">
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};

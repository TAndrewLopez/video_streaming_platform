"use client";

import moment from 'moment'
import { ReceivedChatMessage } from "@livekit/components-react";

import { stringToColor } from "@/lib/utils";

type Props = {
  data: ReceivedChatMessage;
};

export const ChatMessage = ({ data }: Props) => {
  const color = stringToColor(data.from?.name || "");

  return (
    <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
      <p className="text-sm text-white/40">{moment(data.timestamp).format('hh:mm A')}</p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {data.from?.name}
          </span>
          :
        </p>
        <p className="text-sm break-all">{data.message}</p>
      </div>
    </div>
  );
};

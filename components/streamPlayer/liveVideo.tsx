"use client";

import { useRef } from "react";
import { Participant, Track } from "livekit-client";
import { useTracks } from "@livekit/components-react";

type Props = {
  participant: Participant;
};

export const LiveVideo = ({ participant }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });
  return (
    <div className="relative h-full flex" ref={wrapperRef}>
      <video width="100%" ref={videoRef} />
    </div>
  );
};

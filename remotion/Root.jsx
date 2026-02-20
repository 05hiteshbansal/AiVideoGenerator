"use client";
import React from "react";
import { Composition } from "remotion";
import VideoPlayer from "../src/components/Player/VideoPlayer";

export const RemotionRoot = () => {
  return (
    <Composition
      id="VideoPlayer"
      component={VideoPlayer}
      durationInFrames={100}
      fps={30}
      width={300}
      height={450}
      defaultProps={{}}
      calculateMetadata={({ props }) => {
        if (!props?.scripts?.length) {
          return { durationInFrames: 100 };
        }

        const duration = Math.floor(
          (props.scripts[props.scripts.length - 1].end / 1000) * 30 + 20,
        );

        return {
          durationInFrames: duration,
        };
      }}
    />
  );
};

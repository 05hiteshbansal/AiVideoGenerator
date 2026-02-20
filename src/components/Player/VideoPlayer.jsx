"use client";
import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useVideoConfig,
  Audio,
  useCurrentFrame,
  interpolate,
} from "remotion";

const VideoPlayer = ({ scripts = [], images = [], audioUrl }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const hasScripts = Array.isArray(scripts) && scripts.length > 0;

  const getDuration = () => {
    if (!hasScripts) return fps * 3;

    const lastScript = scripts[scripts.length - 1];
    return (lastScript.end / 1000) * fps + 10;
  };

  const getCaption = () => {
    if (!hasScripts) return "";

    const currentTime = (frame / fps) * 1000;
    const currentCaption = scripts.find(
      (word) => currentTime >= word.start && currentTime <= word.end,
    );

    if (currentCaption) {
      return currentCaption.text;
    }

    return "";
  };

  const totalDuration = getDuration();

  return (
    <div>
      <AbsoluteFill>
        {images &&
          images.map((img, index) => {
            const startTime = (index * totalDuration) / images.length;
            const duration =
              (hasScripts
                ? scripts[scripts.length - 1].end / 1000
                : totalDuration / fps) * fps;
            const scaleKeyframes =
              index % 2 === 0 ? [1, 1.8, 1] : [2, 1, 2];

            const scale = interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              scaleKeyframes,
            );

            return (
              <Sequence
                key={index}
                from={startTime}
                durationInFrames={totalDuration}
              >
                <Img
                  src={img}
                  id="download"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale})`,
                  }}
                />
                {/* 
                <AbsoluteFill className="text-white font-bold border-solid border-2 font-ubuntu text-xl text-center justify-center">
                  <h2 className="absolute bottom-[150px] right-[115px] z-10">
                    {getCaption()}
                  </h2>
                </AbsoluteFill> 
                */}
              </Sequence>
            );
          })}
        {images && <Audio src={audioUrl} />}
      </AbsoluteFill>
    </div>
  );
};

export default VideoPlayer;
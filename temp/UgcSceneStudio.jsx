"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const UgcSceneStudio = ({
  scenes,
  isGenerating,
  onGenerateAll,
  onPromptChange,
  onRemakeImage,
  onContinue,
  isGeneratingVideos,
}) => {
  const allHaveImages = scenes.length > 0 && scenes.every((s) => !!s.imageUrl);

  return (
    <div className="m-5 rounded-2xl bg-white p-5 shadow-lg md:m-8 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-col gap-1 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
              Step 2 · Scene Studio
            </p>
            <h1 className="mt-1 font-sans text-xl font-semibold text-slate-900 md:text-2xl">
              Refine UGC Scenes & Visuals
            </h1>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">
              Adjust image prompts for each scene and regenerate visuals. Once
              images are finalized, videos will be generated using Kling 3.0.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-3 md:pt-0">
            <Button
              size="sm"
              variant="flat"
              color="secondary"
              onPress={onGenerateAll}
              isDisabled={isGenerating || scenes.length === 0}
            >
              {isGenerating ? "Generating images..." : "Generate all images"}
            </Button>
            <Button
              size="sm"
              color="primary"
              onPress={onContinue}
              isDisabled={!allHaveImages || isGeneratingVideos}
            >
              {isGeneratingVideos
                ? "Generating videos with Kling..."
                : "Generate videos & continue"}
            </Button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Scene {scene.id + 1}
                </div>
                {scene.videoUrl && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                    Video ready
                  </span>
                )}
              </div>

              <p className="rounded-md bg-white/80 p-2 text-xs text-slate-700">
                {scene.contentText}
              </p>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-800">
                  Image Prompt
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-xs outline-none ring-0 placeholder:text-slate-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                  value={scene.imagePrompt}
                  onChange={(event) =>
                    onPromptChange(scene.id, event.target.value)
                  }
                  placeholder="Describe the image for this scene..."
                />
              </div>

              <div className="flex items-start gap-3">
                <div className="relative h-32 w-24 overflow-hidden rounded-md bg-slate-200">
                  {scene.imageUrl ? (
                    <Image
                      src={scene.imageUrl}
                      alt={`Scene ${scene.id + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">
                      No image yet
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <Button
                    size="sm"
                    variant="bordered"
                    className="text-xs"
                    onPress={() => onRemakeImage(scene.id)}
                    isDisabled={isGenerating}
                  >
                    {scene.imageUrl ? "Remake image" : "Generate image"}
                  </Button>
                  {scene.videoUrl && (
                    <p className="text-[10px] text-green-600">
                      ✓ Video generated
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UgcSceneStudio;

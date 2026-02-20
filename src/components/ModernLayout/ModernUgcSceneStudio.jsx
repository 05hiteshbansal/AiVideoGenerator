"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import StudioContainer from "./StudioContainer";

const ModernUgcSceneStudio = ({
  scenes,
  isGenerating,
  onGenerateAll,
  onPromptChange,
  onRemakeImage,
  onContinue,
  isGeneratingVideos,
}) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const currentScene = scenes[selectedSceneIndex];
  const allHaveImages = scenes.length > 0 && scenes.every((s) => !!s.imageUrl);

  const LeftPanel = (
    <div className="space-y-4">
      {/* Scene Preview */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-200/50">
        <div className="relative w-full aspect-video bg-gradient-to-br from-slate-200 to-slate-300">
          {currentScene?.imageUrl ? (
            <Image
              src={currentScene.imageUrl}
              alt={`Scene ${selectedSceneIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center flex-col gap-2 bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="text-6xl">🎬</div>
              <p className="text-center text-sm text-slate-500 font-medium">
                Generate image to preview
              </p>
            </div>
          )}
        </div>

        {/* Video Status */}
        {currentScene?.videoUrl && (
          <div className="p-4 bg-green-500/20 border-t border-green-600/50">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <span className="text-sm font-semibold text-green-400">
                Video generated and ready
              </span>
            </div>
          </div>
        )}

        {/* Scene Info */}
        <div className="p-6 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-purple-600">
              Scene {selectedSceneIndex + 1} of {scenes.length}
            </p>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200/50">
              {currentScene?.imageUrl ? "✓ Ready" : "Pending"}
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
            {currentScene?.contentText}
          </p>
        </div>
      </div>

      {/* Scene Thumbnails */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">All Scenes</h3>
        <div className="grid grid-cols-4 gap-2">
          {scenes.map((scene, index) => (
            <button
              key={scene.id}
              onClick={() => setSelectedSceneIndex(index)}
              className={`relative overflow-hidden rounded-lg aspect-video border-2 transition-all ${
                selectedSceneIndex === index
                  ? "border-purple-500 shadow-lg ring-2 ring-purple-500/30 bg-white"
                  : "border-slate-200 hover:border-purple-400 bg-slate-100"
              }`}
            >
              {scene.imageUrl ? (
                <Image
                  src={scene.imageUrl}
                  alt={`Scene ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                  {index + 1}
                </div>
              )}
              {scene.videoUrl && (
                <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const RightPanel = (
    <div className="space-y-6">
      {/* Prompt Editor Card */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow hover:bg-white/80">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">
              Image Prompt for Scene {selectedSceneIndex + 1}
            </label>
            <p className="text-xs text-slate-600 mb-3">
              Refine the image generation prompt to get the exact visual you
              want
            </p>
          </div>
          <textarea
            rows={5}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
            value={currentScene?.imagePrompt || ""}
            onChange={(event) =>
              onPromptChange(currentScene.id, event.target.value)
            }
            placeholder="Describe the visual elements you want to see..."
          />
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-xl transition-all"
            onPress={() => onRemakeImage(currentScene.id)}
            isDisabled={isGenerating || !currentScene?.imagePrompt}
          >
            {isGenerating ? "🔄 Regenerating..." : "🎨 Regenerate Image"}
          </Button>
        </div>
      </div>

      {/* Scene Navigation */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:bg-white/80">
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              size="lg"
              onPress={onGenerateAll}
              isDisabled={isGenerating || scenes.length === 0}
              className="text-sm bg-slate-200/60 hover:bg-slate-300/60 text-slate-900 font-semibold border border-slate-200"
            >
              {isGenerating ? "Generating..." : "🖼️ Generate All"}
            </Button>
            <Button
              size="lg"
              onPress={onContinue}
              isDisabled={!allHaveImages || isGeneratingVideos}
              className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
            >
              {isGeneratingVideos ? "🎥..." : "Continue →"}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Info */}
      <div className="rounded-2xl bg-purple-50/50 border border-purple-200/50 p-6 shadow-lg hover:bg-purple-50/70">
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Progress</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-700">Images Done</span>
              <span className="font-bold text-purple-600">
                {scenes.filter((s) => s.imageUrl).length}/{scenes.length}
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                style={{
                  width: `${(scenes.filter((s) => s.imageUrl).length / scenes.length) * 100}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-sm mt-3 pt-3 border-t border-purple-200/50">
              <span className="text-slate-700">Videos Generated</span>
              <span className="font-bold text-green-600">
                {scenes.filter((s) => s.videoUrl).length}/{scenes.length}
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300"
                style={{
                  width: `${(scenes.filter((s) => s.videoUrl).length / scenes.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <StudioContainer
      title="Refine UGC Scenes & Visuals"
      subtitle="Adjust image prompts and generate videos with Kling 3.0"
      step="Step 2 · UGC Scene Studio"
      showSplitLayout={true}
      leftPanel={LeftPanel}
      rightPanel={RightPanel}
    />
  );
};

export default ModernUgcSceneStudio;

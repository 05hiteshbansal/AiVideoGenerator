"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import StudioContainer from "./StudioContainer";

const dummyLibrary = [
  {
    id: "calm",
    name: "Calm Background",
    description: "Soft ambient bed perfect for educational content",
    emoji: "🌙",
  },
  {
    id: "energetic",
    name: "Energetic Beat",
    description: "Up-tempo drums for fast cuts and dynamic content",
    emoji: "⚡",
  },
  {
    id: "uplifting",
    name: "Uplifting Vibes",
    description: "Bright chords for positive ads and promotions",
    emoji: "✨",
  },
];

const ModernAudioStudio = ({
  selectedId,
  isGenerating,
  onSelectFromLibrary,
  onUploadFile,
  onGenerateAi,
  onFinish,
  onBack,
}) => {
  const [uploadFileName, setUploadFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
      onUploadFile(file);
    }
  };

  const LeftPanel = (
    <div className="space-y-4 sticky top-24">
      {/* Audio Preview */}
      <div className="rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl border border-purple-200/50 p-8 aspect-square flex flex-col items-center justify-center">
        <div className="text-7xl mb-4">🎵</div>
        <p className="text-center text-sm font-medium text-slate-700 mb-2">
          Audio Selection
        </p>
        <p className="text-center text-xs text-slate-600">
          {selectedId
            ? `Selected: ${dummyLibrary.find((t) => t.id === selectedId)?.name || "Custom Audio"}`
            : "Choose or upload audio"}
        </p>

        {/* Mini Player */}
        {selectedId && (
          <div className="mt-6 w-full">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-3">
              <button className="h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors">
                ▶
              </button>
              <div className="flex-1 h-1.5 bg-slate-300 rounded-full" />
              <span className="text-xs text-slate-600 font-medium">0:00</span>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-4">
        <p className="text-xs font-semibold text-slate-900 mb-1">💡 Pro Tips</p>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>• Keep audio under 60 seconds</li>
          <li>• Use clear narration or music</li>
          <li>• Match mood to your product</li>
        </ul>
      </div>
    </div>
  );

  const RightPanel = (
    <div className="space-y-6">
      {/* Library Section */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow hover:bg-white/80">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              🎼 Audio Library
            </h2>
            <p className="text-sm text-slate-700">
              Choose from royalty-free tracks
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {dummyLibrary.map((track) => (
              <button
                key={track.id}
                onClick={() => onSelectFromLibrary(track)}
                className={`group rounded-2xl border-2 p-4 text-left transition-all ${
                  selectedId === track.id
                    ? "border-purple-500 bg-purple-50/50 shadow-lg"
                    : "border-slate-200 bg-slate-50/30 hover:border-purple-400 hover:bg-slate-100/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{track.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">
                      {track.name}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {track.description}
                    </p>
                  </div>
                  {selectedId === track.id && (
                    <div className="h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                      ✓
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow hover:bg-white/80">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              📤 Upload Your Audio
            </h2>
            <p className="text-sm text-slate-700">
              Import your own MP3 or WAV files
            </p>
          </div>

          <label className="group cursor-pointer">
            <div className="rounded-xl border-2 border-dashed border-slate-300 hover:border-purple-400 bg-slate-50/50 hover:bg-slate-100/70 p-6 text-center transition-all">
              <div className="text-3xl mb-2">📁</div>
              <p className="font-semibold text-slate-900 text-sm">
                {uploadFileName ? uploadFileName : "Choose audio file"}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                or drag and drop (Max 60s)
              </p>
            </div>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      {/* AI Generation Section */}
      <div className="rounded-2xl bg-purple-50/70 border border-purple-200/50 p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              🤖 AI Voice Over
            </h2>
            <p className="text-sm text-slate-700">
              Generate natural-sounding narration from your script
            </p>
          </div>

          <Button
            size="lg"
            variant="flat"
            color="secondary"
            onPress={onGenerateAi}
            isDisabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-purple-400/30 border-t-purple-600 animate-spin" />
                Generating Voice...
              </div>
            ) : (
              "🎙️ Generate AI Voice"
            )}
          </Button>

          <p className="text-xs text-slate-600 text-center">
            Uses your script text and AI provider configuration
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="space-y-3">
        <Button
          size="lg"
          color="primary"
          onPress={onFinish}
          isDisabled={isGenerating || !selectedId}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-base py-6 rounded-xl hover:shadow-xl transition-all"
        >
          {isGenerating
            ? "⏳ Creating Video..."
            : "✨ Generate Video & Preview"}
        </Button>
        <Button
          size="lg"
          variant="bordered"
          onPress={onBack}
          className="w-full text-slate-900 border-slate-300 hover:bg-slate-100"
        >
          ← Back to Scenes
        </Button>
      </div>
    </div>
  );

  return (
    <StudioContainer
      title="Choose or Create Audio"
      subtitle="Select from our library, upload your own, or generate with AI"
      step="Step 3 · Audio Studio"
      showSplitLayout={true}
      leftPanel={LeftPanel}
      rightPanel={RightPanel}
    />
  );
};

export default ModernAudioStudio;

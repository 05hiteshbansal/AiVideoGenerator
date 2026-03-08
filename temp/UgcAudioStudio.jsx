"use client";
import React from "react";
import { Button } from "@nextui-org/react";

const audioLibrary = [
  {
    id: "calm",
    name: "Calm Background",
    description: "Soft ambient bed for relaxed UGC.",
  },
  {
    id: "energetic",
    name: "Energetic Beat",
    description: "Up-tempo drums perfect for dynamic ads.",
  },
  {
    id: "uplifting",
    name: "Uplifting",
    description: "Bright chords for positive UGC content.",
  },
  {
    id: "trendy",
    name: "Trendy Pop",
    description: "Modern pop track for viral-style ads.",
  },
];

const UgcAudioStudio = ({
  selectedId,
  isGenerating,
  onSelectFromLibrary,
  onUploadFile,
  onGenerateAi,
  onFinish,
}) => {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadFile(file);
    }
  };

  return (
    <div className="m-5 rounded-2xl bg-white p-5 shadow-lg md:m-8 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="flex flex-col gap-1 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
              Step 3 · Audio Selection
            </p>
            <h1 className="mt-1 font-sans text-xl font-semibold text-slate-900 md:text-2xl">
              Choose or Upload Audio
            </h1>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">
              Select from library, upload your own, or generate AI voice-over
              using ElevateEleven.
            </p>
          </div>
          <Button
            size="sm"
            color="primary"
            onPress={onFinish}
            isDisabled={isGenerating || !selectedId}
          >
            Generate Final Video
          </Button>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Audio Library
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {audioLibrary.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => onSelectFromLibrary(track)}
                className={`rounded-xl border p-3 text-left text-xs transition ${
                  selectedId === track.id
                    ? "border-purple-500 bg-purple-50 ring-2 ring-purple-200"
                    : "border-slate-200 bg-slate-50 hover:border-purple-200"
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">
                  {track.name}
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  {track.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Upload Your Audio
          </h2>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="cursor-pointer rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:border-purple-400 hover:bg-purple-50">
              Choose Audio File
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <p className="text-[11px] text-slate-400">
              Supported: MP3, WAV, M4A. Recommended length: 15-60 seconds for
              best results.
            </p>
          </div>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Generate AI Voice (ElevateEleven)
          </h2>
          <p className="text-[11px] text-slate-500">
            Create a synthetic voice-over narration from your script text using
            ElevateEleven AI voice generation.
          </p>
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={onGenerateAi}
            isDisabled={isGenerating}
          >
            {isGenerating ? "Generating voice..." : "Generate AI Voice"}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default UgcAudioStudio;

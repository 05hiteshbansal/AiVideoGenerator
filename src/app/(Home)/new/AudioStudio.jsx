"use client";
import React from "react";
import { Button } from "@nextui-org/react";

const dummyLibrary = [
  { id: "calm", name: "Calm background", description: "Soft ambient bed." },
  {
    id: "energetic",
    name: "Energetic beat",
    description: "Up‑tempo drums for fast cuts.",
  },
  {
    id: "uplifting",
    name: "Uplifting",
    description: "Bright chords for positive ads.",
  },
];

const AudioStudio = ({
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
              Step 3 · Audio
            </p>
            <h1 className="mt-1 font-sans text-xl font-semibold text-slate-900 md:text-2xl">
              Choose or upload audio
            </h1>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">
              Pick a track from the library, upload your own, or generate an AI
              voice‑over.
            </p>
          </div>
          <Button
            size="sm"
            color="primary"
            onPress={onFinish}
            isDisabled={isGenerating || !selectedId}
          >
            Generate video
          </Button>
        </header>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">
            Library tracks
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {dummyLibrary.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => onSelectFromLibrary(track)}
                className={`rounded-xl border p-3 text-left text-xs transition ${
                  selectedId === track.id
                    ? "border-purple-500 bg-purple-50"
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
          <h2 className="text-sm font-semibold text-slate-800">Upload audio</h2>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:border-purple-400">
              Choose file
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <p className="text-[11px] text-slate-400">
              Supported formats: MP3, WAV. For best results keep under 60s.
            </p>
          </div>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-sm font-semibold text-slate-800">
            Generate AI voice
          </h2>
          <p className="text-[11px] text-slate-500">
            This will use your script text to create a synthetic narration using
            your configured audio provider.
          </p>
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={onGenerateAi}
            isDisabled={isGenerating}
          >
            {isGenerating ? "Generating voice..." : "Generate AI voice"}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default AudioStudio;


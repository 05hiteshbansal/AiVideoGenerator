"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import DropdownOptions from "@/components/NewOptions/DropdownOptions";
import StyleOptions from "@/components/NewOptions/StyleOptions";
import DurationOption from "@/components/NewOptions/DurationOption";

const SectionBadge = ({ number, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/50",
    blue: "bg-blue-50 text-blue-600 ring-1 ring-blue-200/50",
    emerald: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50",
  };
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold shadow-sm ${colors[color]}`}
    >
      {number}
    </span>
  );
};

const ModernNewVideoForm = ({ onSelectionChange, isLoading, onSubmit }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSelectionChange = (key, value) => {
    onSelectionChange(key, value);
    setIsFormValid(true);
  };

  return (
    <div className="min-h-screen bg-[#f8faff] p-4 md:p-10 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="mx-auto max-w-4xl animate-fade-in">
        <header className="mb-10 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 ring-1 ring-indigo-100 mb-4">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            AI Video Studio
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Generate Cinematic AI Video
          </h1>
          <p className="mt-4 text-slate-500 text-sm md:text-lg max-w-2xl leading-relaxed">
            Choose your core topic, artistic style, and duration to craft a unique visual story instantly.
          </p>
        </header>

        <div className="space-y-8">
          {/* STEP 1: TOPIC */}
          <div className="glass-card rounded-3xl bg-white/70 p-8 ring-1 ring-slate-200/50 hover:ring-indigo-300 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <SectionBadge number="1" color="indigo" />
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight transition-colors group-hover:text-indigo-600">Content Topic</h2>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-0.5">Define your narrative</p>
              </div>
            </div>
            <div className="pl-12">
              <DropdownOptions onUserSelect={handleSelectionChange} />
            </div>
          </div>

          {/* STEP 2: STYLE */}
          <div className="glass-card rounded-3xl bg-white/70 p-8 ring-1 ring-slate-200/50 hover:ring-indigo-300 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <SectionBadge number="2" color="blue" />
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight transition-colors group-hover:text-indigo-600">Visual Aesthetic</h2>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-0.5">Choose the artistic look</p>
              </div>
            </div>
            <div className="pl-12">
              <StyleOptions onUserSelect={handleSelectionChange} />
            </div>
          </div>

          {/* STEP 3: DURATION */}
          <div className="glass-card rounded-3xl bg-white/70 p-8 ring-1 ring-slate-200/50 hover:ring-indigo-300 transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-6">
              <SectionBadge number="3" color="emerald" />
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight transition-colors group-hover:text-indigo-600">Project Length</h2>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-0.5">Set the timing</p>
              </div>
            </div>
            <div className="pl-12">
              <DurationOption onUserSelect={handleSelectionChange} />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex flex-col items-center pt-8">
            <button
              onClick={onSubmit}
              disabled={isLoading || !isFormValid}
              className="btn-primary w-full max-w-md h-16 text-lg tracking-tight shadow-xl relative group overflow-hidden"
            >
              <span className="flex items-center gap-3 relative z-10 font-bold uppercase tracking-widest text-sm">
                {isLoading ? (
                  <><span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Crafting Script...</>
                ) : (
                  <>✨ Launch Production Scan</>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <p className="mt-4 text-[10px] items-center flex gap-2 font-bold text-slate-400 uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              AI-Powered Content Generation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernNewVideoForm;

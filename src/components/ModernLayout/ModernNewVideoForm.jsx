"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import DropdownOptions from "@/components/NewOptions/DropdownOptions";
import StyleOptions from "@/components/NewOptions/StyleOptions";
import DurationOption from "@/components/NewOptions/DurationOption";

const ModernNewVideoForm = ({ onSelectionChange, isLoading, onSubmit }) => {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSelectionChange = (key, value) => {
    onSelectionChange(key, value);
    // Simple validation - at least 2 fields selected
    setIsFormValid(true);
  };

  return (
    <div className="m-5 rounded-2xl bg-white p-5 shadow-lg md:m-8 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
            Create Your Video
          </p>
          <h1 className="font-sans text-2xl font-semibold text-slate-900 md:text-3xl">
            Generate AI Video
          </h1>
          <p className="text-sm text-slate-500 md:text-base">
            Choose your topic, style, and duration to generate a unique video
            instantly.
          </p>
        </header>

        {/* Form Sections Grid */}
        <div className="space-y-6">
          {/* Content Topic Section */}
          <section className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg">
                1
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Content Topic
                </h2>
                <p className="text-sm text-slate-600">
                  What would you like your video to be about?
                </p>
              </div>
            </div>
            <div className="pl-13">
              <DropdownOptions onUserSelect={handleSelectionChange} />
            </div>
          </section>

          {/* Visual Style Section */}
          <section className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg">
                2
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Visual Style
                </h2>
                <p className="text-sm text-slate-600">
                  Choose the aesthetic for your video
                </p>
              </div>
            </div>
            <div className="pl-13">
              <StyleOptions onUserSelect={handleSelectionChange} />
            </div>
          </section>

          {/* Duration Section */}
          <section className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-lg">
                3
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Duration
                </h2>
                <p className="text-sm text-slate-600">
                  How long should your video be?
                </p>
              </div>
            </div>
            <div className="pl-13">
              <DurationOption onUserSelect={handleSelectionChange} />
            </div>
          </section>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center pt-4">
          <Button
            onPress={onSubmit}
            disabled={isLoading || !isFormValid}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Generating Script...
              </div>
            ) : (
              "✨ Generate Script & Scenes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernNewVideoForm;

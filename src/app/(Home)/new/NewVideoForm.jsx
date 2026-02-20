"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import DropdownOptions from "@/components/NewOptions/DropdownOptions";
import StyleOptions from "@/components/NewOptions/StyleOptions";
import DurationOption from "@/components/NewOptions/DurationOption";

const NewVideoForm = ({
  onSelectionChange,
  isLoading,
  onSubmit,
}) => {
  return (
    <div className="m-5 rounded-2xl bg-white p-5 shadow-lg md:m-8 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
            AI Script Assistant
          </p>
          <h1 className="font-sans text-2xl font-semibold text-slate-900 md:text-3xl">
            Create Video with AI
          </h1>
          <p className="text-sm text-slate-500 md:text-base">
            Generate a script and scenes automatically using AI assistance.
          </p>
        </header>

        {/* Main content controls */}
        <div>
          <div className="text-3xl font-rubik font-semibold text-purple-600">
            Content
          </div>
          <div className="font-ubuntu text-lg text-gray-700">
            What is the topic of your video 📽️
          </div>

          <div className="mt-4">
            <DropdownOptions onUserSelect={onSelectionChange} />
          </div>
        </div>

        <div>
          <div className="pt-5 text-3xl font-rubik font-semibold text-purple-600">
            Style
          </div>
          <div className="font-ubuntu text-lg text-gray-700">
            Select a style for your video
          </div>
          <div className="mt-4">
            <StyleOptions onUserSelect={onSelectionChange} />
          </div>
        </div>
      </div>

      <div className="pt-5 text-3xl font-rubik font-semibold text-purple-600">
        Duration
      </div>
      <DurationOption onUserSelect={onSelectionChange} />

      <div className="flex items-center justify-center py-5">
        <Button
          onPress={onSubmit}
          disabled={isLoading}
          className="m-auto w-[80%] bg-purple-600 p-5 font-ubuntu text-white md:w-[20%]"
        >
          {isLoading ? "Creating..." : "Make Video"}
        </Button>
      </div>
    </div>
  );
};

export default NewVideoForm;


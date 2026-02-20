"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import DropdownOptions from "@/components/NewOptions/DropdownOptions";
import DurationOption from "@/components/NewOptions/DurationOption";

// Avatar library
const avatarLibrary = [
  {
    id: "avatar1",
    url: "https://res.cloudinary.com/dpc29aatx/image/upload/v1733495210/bu8im2stk96srjyuuptd.png",
    name: "Friendly Creator",
  },
  {
    id: "avatar2",
    url: "https://res.cloudinary.com/dpc29aatx/image/upload/v1733495210/bu8im2stk96srjyuuptd.png",
    name: "Professional",
  },
  {
    id: "avatar3",
    url: "https://res.cloudinary.com/dpc29aatx/image/upload/v1733495210/bu8im2stk96srjyuuptd.png",
    name: "Casual",
  },
];

const ModernUgcForm = ({
  ugcConfig,
  onUgcConfigChange,
  prompt,
  onSelectionChange,
  isLoading,
  onSubmit,
}) => {
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingPrimary, setUploadingPrimary] = useState(false);

  const handleAvatarUpload = async (event) => {
    try {
      setUploadingAvatar(true);
      const uploadedUrl = await ImageUpload(event);
      onUgcConfigChange((prev) => ({
        ...prev,
        avatarImage: uploadedUrl,
      }));
    } catch (error) {
      console.error("Avatar upload failed:", error);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handlePrimaryImageUpload = async (event) => {
    try {
      setUploadingPrimary(true);
      const uploadedUrl = await ImageUpload(event);
      onUgcConfigChange((prev) => ({
        ...prev,
        primaryImage: uploadedUrl,
      }));
    } catch (error) {
      console.error("Primary image upload failed:", error);
    } finally {
      setUploadingPrimary(false);
    }
  };

  const handleSelectAvatar = (avatar) => {
    onUgcConfigChange((prev) => ({
      ...prev,
      avatarImage: avatar.url,
    }));
  };

  const handleSelectPrimaryImage = (image) => {
    onUgcConfigChange((prev) => ({
      ...prev,
      primaryImage: image.url,
    }));
  };

  return (
    <div className="m-5 rounded-2xl bg-white p-5 shadow-lg md:m-8 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-purple-500">
            User-Generated Content
          </p>
          <h1 className="font-sans text-2xl font-semibold text-slate-900 md:text-3xl">
            Create UGC Advertisement
          </h1>
          <p className="text-sm text-slate-500 md:text-base">
            Upload or select images, then generate authentic user-generated
            style ad content.
          </p>
        </header>

        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left Column - Image Selection */}
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="space-y-4 rounded-2xl bg-purple-50/70 p-4">
              <div>
                <h2 className="text-lg font-semibold text-purple-900">
                  Avatar Selection
                </h2>
                <p className="mt-1 text-xs text-purple-800/80">
                  Choose or upload an avatar image
                </p>
              </div>

              {/* Avatar Preview */}
              <div className="flex items-center gap-3">
                {ugcConfig.avatarImage && (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-purple-300">
                    <Image
                      src={ugcConfig.avatarImage}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <label className="cursor-pointer rounded-lg border border-purple-300 bg-white px-4 py-2 text-xs font-medium text-purple-700 hover:bg-purple-50">
                  {uploadingAvatar ? "Uploading..." : "Choose File"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploadingAvatar}
                  />
                </label>
              </div>

              {/* Avatar Library */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-purple-900">
                  Select from Library
                </label>
                <div className="flex gap-2">
                  {avatarLibrary.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => handleSelectAvatar(avatar)}
                      className={`relative h-16 w-16 overflow-hidden rounded-full border-2 transition ${
                        ugcConfig.avatarImage === avatar.url
                          ? "border-purple-600 ring-2 ring-purple-200"
                          : "border-purple-200 hover:border-purple-400"
                      }`}
                    >
                      <Image
                        src={avatar.url}
                        alt={avatar.name}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Primary Image Section */}
            <div className="space-y-4 rounded-2xl bg-blue-50/70 p-4">
              <div>
                <h2 className="text-lg font-semibold text-blue-900">
                  Primary Visual
                </h2>
                <p className="mt-1 text-xs text-blue-800/80">
                  Upload or select the main product image
                </p>
              </div>

              {/* Primary Image Preview */}
              <div className="flex items-center gap-3">
                {ugcConfig.primaryImage && (
                  <div className="relative h-24 w-32 overflow-hidden rounded-lg border-2 border-blue-300">
                    <Image
                      src={ugcConfig.primaryImage}
                      alt="Primary visual"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <label className="cursor-pointer rounded-lg border border-blue-300 bg-white px-4 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50">
                  {uploadingPrimary ? "Uploading..." : "Choose File"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePrimaryImageUpload}
                    disabled={uploadingPrimary}
                  />
                </label>
              </div>

              {/* Primary Image Library */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-blue-900">
                  Select from Library
                </label>
                <div className="flex gap-2">
                  {avatarLibrary.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => handleSelectPrimaryImage(image)}
                      className={`relative h-16 w-20 overflow-hidden rounded-lg border-2 transition ${
                        ugcConfig.primaryImage === image.url
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : "border-blue-200 hover:border-blue-400"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.name}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content Options */}
          <div className="space-y-6">
            {/* Content Section */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-sm font-bold text-purple-600">
                    1
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Content Topic
                    </h2>
                    <p className="text-xs text-slate-600">
                      What is your product about?
                    </p>
                  </div>
                </div>
                <DropdownOptions onUserSelect={onSelectionChange} />
              </div>
            </div>

            {/* Prompt Section */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-sm font-bold text-purple-600">
                    2
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Custom Prompt
                    </h2>
                    <p className="text-xs text-slate-600">
                      Describe your UGC video focus
                    </p>
                  </div>
                </div>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
                  placeholder="E.g., Show how the product solves a common problem. Make it feel natural and authentic..."
                  value={prompt?.ugcPrompt || ""}
                  onChange={(e) =>
                    onSelectionChange("ugcPrompt", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Duration Section */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-sm font-bold text-purple-600">
                    3
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Duration
                    </h2>
                    <p className="text-xs text-slate-600">
                      Video length preference
                    </p>
                  </div>
                </div>
                <DurationOption onUserSelect={onSelectionChange} />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onPress={onSubmit}
              disabled={isLoading || !ugcConfig.avatarImage}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Generating Script..." : "Generate Script & Scenes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernUgcForm;

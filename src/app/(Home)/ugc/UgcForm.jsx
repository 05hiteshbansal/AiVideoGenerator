"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import DropdownOptions from "@/components/NewOptions/DropdownOptions";
import StyleOptions from "@/components/NewOptions/StyleOptions";
import DurationOption from "@/components/NewOptions/DurationOption";

// Avatar library - in production, fetch from API
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

const UgcForm = ({
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

        {/* Avatar Section */}
        <section className="space-y-4 rounded-2xl bg-purple-50/70 p-4">
          <div>
            <h2 className="text-lg font-semibold text-purple-900">
              Avatar Selection
            </h2>
            <p className="mt-1 text-xs text-purple-800/80">
              Choose or upload an avatar image that will appear in your ad
              scenes.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Upload Avatar */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-purple-900">
                Upload Avatar
              </label>
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

          {/* Avatar Description */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-purple-900">
              Avatar Description (Optional)
            </label>
            <textarea
              rows={2}
              className="w-full rounded-md border border-purple-200 bg-white px-3 py-2 text-xs outline-none ring-0 placeholder:text-purple-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
              placeholder="e.g. Young creator wearing your brand colors, friendly and energetic"
              value={ugcConfig.avatarDescription}
              onChange={(event) =>
                onUgcConfigChange((prev) => ({
                  ...prev,
                  avatarDescription: event.target.value,
                }))
              }
            />
          </div>
        </section>

        {/* Primary Image Section */}
        <section className="space-y-4 rounded-2xl bg-blue-50/70 p-4">
          <div>
            <h2 className="text-lg font-semibold text-blue-900">
              Primary Visual
            </h2>
            <p className="mt-1 text-xs text-blue-800/80">
              Upload or select the main product/image that will be featured in
              your ad.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Upload Primary Image */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-blue-900">
                Upload Image
              </label>
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

          {/* Primary Image Description */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-blue-900">
              Primary Visual Description (Optional)
            </label>
            <textarea
              rows={2}
              className="w-full rounded-md border border-blue-200 bg-white px-3 py-2 text-xs outline-none ring-0 placeholder:text-blue-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. Close-up of the product on a clean gradient background"
              value={ugcConfig.primaryImageDescription}
              onChange={(event) =>
                onUgcConfigChange((prev) => ({
                  ...prev,
                  primaryImageDescription: event.target.value,
                }))
              }
            />
          </div>
        </section>

        {/* Content Section */}
        <section>
          <div className="text-2xl font-rubik font-semibold text-purple-600">
            Content
          </div>
          <div className="font-ubuntu text-lg text-gray-700">
            What is the topic of your UGC video 📽️
          </div>
          <div className="mt-4">
            <DropdownOptions onUserSelect={onSelectionChange} />
          </div>
        </section>

        {/* Style Section */}
        <section>
          <div className="pt-5 text-2xl font-rubik font-semibold text-purple-600">
            Style
          </div>
          <div className="font-ubuntu text-lg text-gray-700">
            Select a style for your video
          </div>
          <div className="mt-4">
            <StyleOptions onUserSelect={onSelectionChange} />
          </div>
        </section>

        {/* Duration Section */}
        <section>
          <div className="pt-5 text-2xl font-rubik font-semibold text-purple-600">
            Duration
          </div>
          <DurationOption onUserSelect={onSelectionChange} />
        </section>

        {/* Submit Button */}
        <div className="flex items-center justify-center py-5">
          <Button
            onPress={onSubmit}
            disabled={isLoading || !ugcConfig.avatarImage}
            className="m-auto w-[80%] bg-purple-600 p-5 font-ubuntu text-white md:w-[20%]"
          >
            {isLoading ? "Generating Script..." : "Generate Script & Scenes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UgcForm;

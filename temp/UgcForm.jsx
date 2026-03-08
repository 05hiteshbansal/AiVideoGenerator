"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import ImageUpload from "@/components/ImageUpload";
import DropdownOptions from "@/components/NewOptions/DropdownOptions";
import DurationOption from "@/components/NewOptions/DurationOption";
import { useDropdownConfig } from "@/hooks/useDropdownConfig";

const visualFocusOptions = [
  {
    key: "avatar",
    title: "Avatar Focus",
    description:
      "Let the creator lead the frame while keeping the product present.",
    icon: "👤",
  },
  {
    key: "product",
    title: "Product Focus",
    description:
      "Zoom the product as the hero while the avatar reacts in support.",
    icon: "🎯",
  },
  {
    key: "interaction",
    title: "Interaction",
    description: "Show both avatar and product interacting naturally.",
    icon: "🤝",
  },
];

const SectionBadge = ({ number, color = "purple" }) => {
  const colors = {
    purple: "bg-purple-100 text-purple-600 ring-1 ring-purple-200",
    blue: "bg-blue-100 text-blue-600 ring-1 ring-blue-200",
    emerald: "bg-emerald-100 text-emerald-600 ring-1 ring-emerald-200",
  };
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${colors[color]}`}
    >
      {number}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md ${className}`}
  >
    {children}
  </div>
);

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
  const { config } = useDropdownConfig();

  const avatarLibrary =
    config?.avatarLibrary && config.avatarLibrary.length > 0
      ? config.avatarLibrary
      : [];
  const currentFocus = ugcConfig.visualFocus || "interaction";

  const handleAvatarUpload = async (event) => {
    try {
      setUploadingAvatar(true);
      const uploadedUrl = await ImageUpload(event);
      onUgcConfigChange((prev) => ({
        ...prev,
        avatarImages: [...prev.avatarImages, uploadedUrl],
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
        primaryImages: [...prev.primaryImages, uploadedUrl],
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
      avatarImages: prev.avatarImages.includes(avatar.url)
        ? prev.avatarImages.filter((img) => img !== avatar.url)
        : [...prev.avatarImages, avatar.url],
    }));
  };

  const handleSelectPrimaryImage = (image) => {
    onUgcConfigChange((prev) => ({
      ...prev,
      primaryImages: prev.primaryImages.includes(image.url)
        ? prev.primaryImages.filter((img) => img !== image.url)
        : [...prev.primaryImages, image.url],
    }));
  };

  const removeAvatarImage = (imageUrl) => {
    onUgcConfigChange((prev) => ({
      ...prev,
      avatarImages: prev.avatarImages.filter((img) => img !== imageUrl),
    }));
  };

  const removePrimaryImage = (imageUrl) => {
    onUgcConfigChange((prev) => ({
      ...prev,
      primaryImages: prev.primaryImages.filter((img) => img !== imageUrl),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/40 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Shell */}
        <div className="rounded-3xl border border-white/60 bg-white/70 shadow-xl shadow-slate-200/60 backdrop-blur-md">
          {/* Header */}
          <header className="border-b border-slate-100 px-6 py-6 md:px-8 md:py-7">
            <div className="flex flex-col gap-1.5">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-purple-600">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                User-Generated Content
              </span>
              <h1 className="mt-1 font-semibold text-slate-900 text-2xl md:text-3xl tracking-tight">
                Create UGC Advertisement
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
                Upload or select images, configure your content style, then
                generate authentic user-generated ad content.
              </p>
            </div>
          </header>

          <div className="p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* ── LEFT COLUMN ── */}
              <div className="space-y-5">
                {/* Avatar Section */}
                <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 p-5 ring-1 ring-purple-200/60">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-purple-900">
                        Avatar Selection
                      </h2>
                      <p className="mt-0.5 text-xs text-purple-700/70">
                        Choose or upload avatar images
                      </p>
                    </div>
                    <span className="rounded-full bg-purple-200/70 px-2.5 py-0.5 text-xs font-semibold text-purple-700 tabular-nums">
                      {ugcConfig.avatarImages.length} selected
                    </span>
                  </div>

                  {/* Previews */}
                  {ugcConfig.avatarImages.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {ugcConfig.avatarImages.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="group relative h-16 w-16 overflow-hidden rounded-full border-2 border-purple-400 shadow-sm"
                        >
                          <Image
                            src={imageUrl}
                            alt={`Avatar ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => removeAvatarImage(imageUrl)}
                            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/55 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <svg
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload */}
                  <label
                    className={`mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-purple-300 bg-white/70 py-2.5 text-xs font-medium text-purple-700 transition hover:border-purple-500 hover:bg-white active:scale-[0.98] ${uploadingAvatar ? "pointer-events-none opacity-60" : ""}`}
                  >
                    {uploadingAvatar ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-purple-400 border-t-transparent" />{" "}
                        Uploading…
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>{" "}
                        Add Avatar
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                    />
                  </label>

                  {/* Library */}
                  {avatarLibrary.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-medium text-purple-800">
                        From Library
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {avatarLibrary.map((avatar) => {
                          const selected = ugcConfig.avatarImages.includes(
                            avatar.url,
                          );
                          return (
                            <button
                              key={avatar.id}
                              type="button"
                              onClick={() => handleSelectAvatar(avatar)}
                              className={`relative h-12 w-12 overflow-hidden rounded-full border-2 transition-all duration-150 ${selected ? "border-purple-600 shadow-md shadow-purple-200 ring-2 ring-purple-300" : "border-purple-200 hover:border-purple-500 hover:scale-105"}`}
                              title={avatar.name}
                            >
                              <Image
                                src={avatar.url}
                                alt={avatar.name}
                                fill
                                className="object-cover"
                              />
                              {selected && (
                                <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] text-white">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Visual Section */}
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-5 ring-1 ring-blue-200/60">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-blue-900">
                        Primary Visual
                      </h2>
                      <p className="mt-0.5 text-xs text-blue-700/70">
                        Upload or select product images
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-200/70 px-2.5 py-0.5 text-xs font-semibold text-blue-700 tabular-nums">
                      {ugcConfig.primaryImages.length} selected
                    </span>
                  </div>

                  {/* Previews */}
                  {ugcConfig.primaryImages.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {ugcConfig.primaryImages.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="group relative h-16 w-20 overflow-hidden rounded-xl border-2 border-blue-400 shadow-sm"
                        >
                          <Image
                            src={imageUrl}
                            alt={`Product ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => removePrimaryImage(imageUrl)}
                            className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/55 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <svg
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload */}
                  <label
                    className={`mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-300 bg-white/70 py-2.5 text-xs font-medium text-blue-700 transition hover:border-blue-500 hover:bg-white active:scale-[0.98] ${uploadingPrimary ? "pointer-events-none opacity-60" : ""}`}
                  >
                    {uploadingPrimary ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />{" "}
                        Uploading…
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                        </svg>{" "}
                        Add Product Image
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePrimaryImageUpload}
                      disabled={uploadingPrimary}
                    />
                  </label>

                  {/* Library */}
                  {avatarLibrary.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-medium text-blue-800">
                        From Library
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {avatarLibrary.map((image) => {
                          const selected = ugcConfig.primaryImages.includes(
                            image.url,
                          );
                          return (
                            <button
                              key={image.id}
                              type="button"
                              onClick={() => handleSelectPrimaryImage(image)}
                              className={`relative h-12 w-16 overflow-hidden rounded-xl border-2 transition-all duration-150 ${selected ? "border-blue-600 shadow-md shadow-blue-200 ring-2 ring-blue-300" : "border-blue-200 hover:border-blue-500 hover:scale-105"}`}
                              title={image.name}
                            >
                              <Image
                                src={image.url}
                                alt={image.name}
                                fill
                                className="object-cover"
                              />
                              {selected && (
                                <span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] text-white">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── RIGHT COLUMN ── */}
              <div className="space-y-5">
                {/* Content Topic */}
                <Card>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SectionBadge number="1" />
                    <div>
                      <h2 className="text-sm font-semibold text-slate-800">
                        Content Topic
                      </h2>
                      <p className="text-xs text-slate-500">
                        What style fits your product?
                      </p>
                    </div>
                  </div>
                  <DropdownOptions
                    onUserSelect={onSelectionChange}
                    dropdownfield={"styles"}
                  />
                </Card>

                {/* Custom Prompt */}
                <Card>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SectionBadge number="2" />
                    <div>
                      <h2 className="text-sm font-semibold text-slate-800">
                        Custom Prompt
                      </h2>
                      <p className="text-xs text-slate-500">
                        Describe your UGC video focus
                      </p>
                    </div>
                  </div>
                  <textarea
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="E.g., Show how the product solves a common problem. Make it feel natural and authentic..."
                    value={prompt?.ugcPrompt || ""}
                    onChange={(e) =>
                      onSelectionChange("ugcPrompt", e.target.value)
                    }
                  />
                </Card>

                {/* Duration */}
                <Card>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SectionBadge number="3" />
                    <div>
                      <h2 className="text-sm font-semibold text-slate-800">
                        Duration
                      </h2>
                      <p className="text-xs text-slate-500">
                        Video length preference
                      </p>
                    </div>
                  </div>
                  <DurationOption onUserSelect={onSelectionChange} />
                </Card>

                {/* Visual Focus */}
                <Card>
                  <div className="flex items-center gap-2.5 mb-4">
                    <SectionBadge number="4" />
                    <div>
                      <h2 className="text-sm font-semibold text-slate-800">
                        Visual Focus
                      </h2>
                      <p className="text-xs text-slate-500">
                        Tell Gemini which shot should stand out
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {visualFocusOptions.map((option) => {
                      const isActive = currentFocus === option.key;
                      return (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() =>
                            onUgcConfigChange((prev) => ({
                              ...prev,
                              visualFocus: option.key,
                            }))
                          }
                          className={`group relative text-left rounded-xl border p-3.5 transition-all duration-150 ${
                            isActive
                              ? "border-purple-500 bg-purple-50 shadow-sm shadow-purple-100"
                              : "border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/40"
                          }`}
                        >
                          {isActive && (
                            <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] text-white">
                              ✓
                            </span>
                          )}
                          <span className="block text-lg mb-1">
                            {option.icon}
                          </span>
                          <div
                            className={`text-xs font-semibold ${isActive ? "text-purple-800" : "text-slate-800"}`}
                          >
                            {option.title}
                          </div>
                          <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                            {option.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>

            {/* ── PRODUCT INFO ── Full Width */}
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 p-5 ring-1 ring-emerald-200/60">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm ring-1 ring-emerald-200">
                  📦
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-emerald-900">
                    Product & Audience Details
                  </h2>
                  <p className="text-xs text-emerald-700/70">
                    Help AI understand your product and target audience
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    key: "product",
                    label: "Product Name",
                    placeholder: "e.g. Ultra Glow Serum",
                  },
                  {
                    key: "productType",
                    label: "Product Type",
                    placeholder: "e.g. Skincare, Tech",
                  },
                  {
                    key: "targetAudience",
                    label: "Target Audience",
                    placeholder: "e.g. Women 25–35",
                  },
                  {
                    key: "environment",
                    label: "Environment / Setting",
                    placeholder: "e.g. Modern bathroom",
                  },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="block text-xs font-medium text-emerald-800">
                      {label}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-emerald-200 bg-white/80 px-3 py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-400/20 transition-all"
                      placeholder={placeholder}
                      value={ugcConfig[key] || ""}
                      onChange={(event) =>
                        onUgcConfigChange((prev) => ({
                          ...prev,
                          [key]: event.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── SUBMIT ── */}
            <div className="mt-6">
              <button
                onClick={onSubmit}
                disabled={isLoading || ugcConfig.avatarImages.length === 0}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 py-4 text-base font-semibold text-white shadow-lg shadow-purple-300/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-300/50 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                <span className="relative flex items-center justify-center gap-2.5">
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Generating Script…
                    </>
                  ) : (
                    <>
                      <svg
                        className="h-4 w-4 opacity-80 transition-transform group-hover:rotate-12"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.894 2.553a1 1 0 0 0-1.788 0l-7 14a1 1 0 0 0 1.169 1.409l5-1.429A1 1 0 0 0 9 15.571V11a1 1 0 1 1 2 0v4.571a1 1 0 0 0 .725.962l5 1.428a1 1 0 0 0 1.17-1.408l-7-14Z" />
                      </svg>
                      Generate Script & Scenes
                    </>
                  )}
                </span>
                {/* Shimmer overlay */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
              </button>
              {ugcConfig.avatarImages.length === 0 && (
                <p className="mt-2 text-center text-xs text-slate-400">
                  Select at least one avatar image to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernUgcForm;

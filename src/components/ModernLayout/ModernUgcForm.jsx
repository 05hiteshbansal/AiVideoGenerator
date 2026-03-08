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

const Card = ({ children, className = "" }) => (
  <div
    className={`glass-card rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-0.5 ${className}`}
  >
    {children}
  </div>
);

const PageHeader = ({ badge, title, description }) => (
  <header className="mb-10 animate-fade-in">
    <div className="flex flex-col gap-2">
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 ring-1 ring-indigo-100">
        <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
        {badge}
      </span>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mt-1">
        {title}
      </h1>
      <p className="text-slate-500 max-w-2xl text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  </header>
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
    <div className="min-h-screen bg-[#f8faff] p-4 md:p-10 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="mx-auto max-w-7xl animate-fade-in">
        <PageHeader
          badge="AI UGC Studio 3.0"
          title="Create Product Advertisement"
          description="Leverage high-end AI agents to transform your product images into viral-ready UGC content with professional scripts and cinematic visuals."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* 🚀 MAIN FORM AREA (8/12) */}
          <div className="lg:col-span-8 space-y-10">

            {/* STEP 1 & 2: VISUAL ASSETS */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Creator Selection */}
              <div className="glass-card rounded-2xl bg-white/50 p-6 ring-1 ring-slate-200/50 hover:ring-indigo-300 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <SectionBadge number="1" color="indigo" />
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
                        Creator / Avatar
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Define the persona in your ad
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg ring-1 ring-indigo-100 uppercase tracking-wider">
                    {ugcConfig.avatarImages.length} Ready
                  </span>
                </div>

                {/* Previews */}
                {ugcConfig.avatarImages.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-3">
                    {ugcConfig.avatarImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="group relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-white shadow-xl shadow-indigo-500/10"
                      >
                        <Image src={imageUrl} alt="Avatar" fill className="object-cover" />
                        <button
                          onClick={() => removeAvatarImage(imageUrl)}
                          className="absolute inset-0 flex items-center justify-center bg-indigo-600/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]"
                        >
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className={`group mb-6 flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-indigo-400 hover:bg-white active:scale-[0.98] ${uploadingAvatar ? "pointer-events-none opacity-60" : ""}`}>
                  {uploadingAvatar ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                  ) : (
                    <>
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Upload New</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>

                {avatarLibrary.length > 0 && (
                  <div>
                    <p className="mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Library</p>
                    <div className="flex flex-wrap gap-3">
                      {avatarLibrary.slice(0, 8).map((avatar) => {
                        const isSelected = ugcConfig.avatarImages.includes(avatar.url);
                        return (
                          <button
                            key={avatar.id}
                            onClick={() => handleSelectAvatar(avatar)}
                            className={`group relative h-12 w-12 overflow-hidden rounded-xl transition-all ${isSelected ? "ring-2 ring-indigo-600 ring-offset-2 scale-95 shadow-lg" : "ring-1 ring-slate-200 hover:scale-110"}`}
                          >
                            <Image src={avatar.url} alt={avatar.name} fill className="object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Visual */}
              <div className="glass-card rounded-2xl bg-white/50 p-6 ring-1 ring-slate-200/50 hover:ring-blue-300 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <SectionBadge number="2" color="blue" />
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
                        Product Assets
                      </h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      Select your hero product shots
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg ring-1 ring-blue-100 uppercase tracking-wider">
                    {ugcConfig.primaryImages.length} Ready
                  </span>
                </div>

                <label className={`group mb-6 flex h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-blue-400 hover:bg-white active:scale-[0.98] ${uploadingPrimary ? "pointer-events-none opacity-60" : ""}`}>
                  {uploadingPrimary ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
                  ) : (
                    <>
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Add Media</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handlePrimaryImageUpload} />
                </label>

                {ugcConfig.primaryImages.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {ugcConfig.primaryImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="group relative h-16 w-20 overflow-hidden rounded-xl border-2 border-white shadow-xl shadow-blue-500/10"
                      >
                        <Image src={imageUrl} alt="Product" fill className="object-cover" />
                        <button
                          onClick={() => removePrimaryImage(imageUrl)}
                          className="absolute inset-0 flex items-center justify-center bg-blue-600/60 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]"
                        >
                          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* STEP 3: CONTENT CONTEXT */}
            <div className="glass-card rounded-3xl bg-white p-8 space-y-8">
              <div className="flex items-center gap-4">
                <SectionBadge number="3" color="indigo" />
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Campaign Intelligence</h2>
                  <p className="text-sm text-slate-500">Provide high-level context for the AI agents</p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Engagement Style</label>
                    <DropdownOptions onUserSelect={onSelectionChange} dropdownfield={"styles"} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Video Duration</label>
                    <DurationOption onUserSelect={onSelectionChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Creative Directive</label>
                  <textarea
                    rows={6}
                    className="form-input resize-none"
                    placeholder="E.g., Highlight the natural ingredients and the instant glow. Keep the tone enthusiastic and relatable..."
                    value={prompt?.ugcPrompt || ""}
                    onChange={(e) => onSelectionChange("ugcPrompt", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* STEP 4: VISUAL SETTINGS */}
            <div className="glass-card rounded-3xl bg-white p-8">
              <div className="flex items-center gap-4 mb-8">
                <SectionBadge number="4" color="blue" />
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Visual Prioritization</h2>
                  <p className="text-sm text-slate-500">How should the AI frame the scenes?</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {visualFocusOptions.map((option) => {
                  const isActive = currentFocus === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => onUgcConfigChange((prev) => ({ ...prev, visualFocus: option.key }))}
                      className={`group relative flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all duration-200 ${isActive
                        ? "border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100"
                        : "border-slate-100 bg-slate-50/30 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      <span className="text-3xl mb-3 group-hover:scale-125 transition-transform">{option.icon}</span>
                      <h3 className={`text-sm font-bold mb-1 ${isActive ? "text-indigo-900" : "text-slate-800"}`}>{option.title}</h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{option.description}</p>
                      {isActive && <div className="absolute top-3 right-3 h-4 w-4 rounded-full bg-indigo-600 flex items-center justify-center"><svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 🎯 SIDEBAR ACTIONS (4/12) */}
          <div className="lg:col-span-4 space-y-8 animate-fade-in delay-100">
            {/* AGENT SELECTOR */}
            <div className="glass-card rounded-3xl p-8 bg-indigo-600 text-white border-0 shadow-2xl shadow-indigo-500/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h2 className="text-lg font-bold tracking-tight">AI Engine Stack</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Image Generation</label>
                  <DropdownOptions onUserSelect={(f, v) => onUgcConfigChange(p => ({ ...p, imageModel: v }))} dropdownfield={"imageModels"} />
                </div>
                <div className="space-y-2 border-t border-white/10 pt-6">
                  <label className="text-[10px] font-black text-indigo-100 uppercase tracking-widest">Video Synthesis (Kling)</label>
                  <DropdownOptions onUserSelect={(f, v) => onUgcConfigChange(p => ({ ...p, videoModel: v }))} dropdownfield={"videoModels"} />
                </div>
              </div>
            </div>

            {/* PRODUCT METADATA */}
            <div className="glass-card rounded-3xl p-8 bg-white space-y-6 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-3 mb-2">
                <SectionBadge number="5" color="emerald" />
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Core Metadata</h2>
              </div>

              <div className="space-y-5">
                {[
                  { key: "product", label: "Product Identity", placeholder: "e.g. Aura Smart Watch" },
                  { key: "productType", label: "Category", placeholder: "e.g. Wearables" },
                  { key: "targetAudience", label: "Audience Persona", placeholder: "e.g. Fitness Enthusiasts" },
                  { key: "environment", label: "Visual Setting", placeholder: "e.g. Vibrant Gym" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{label}</label>
                    <input
                      type="text"
                      className="form-input placeholder:opacity-50"
                      placeholder={placeholder}
                      value={ugcConfig[key] || ""}
                      onChange={(e) => onUgcConfigChange(prev => ({ ...prev, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                onClick={onSubmit}
                disabled={isLoading || ugcConfig.avatarImages.length === 0}
                className="btn-primary w-full h-16 text-lg tracking-tight shadow-2xl relative group overflow-hidden"
              >
                <span className="flex items-center gap-3 relative z-10">
                  {isLoading ? (
                    <><span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Optimizing Content...</>
                  ) : (
                    <><svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 0 0-1.788 0l-7 14a1 1 0 0 0 1.169 1.409l5-1.429A1 1 0 0 0 9 15.571V11a1 1 0 1 1 2 0v4.571a1 1 0 0 0 .725.962l5 1.428a1 1 0 0 0 1.17-1.408l-7-14Z" /></svg> Launch Production</>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              {ugcConfig.avatarImages.length === 0 && (
                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Assets required to proceed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernUgcForm;

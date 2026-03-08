import mongoose from "mongoose";

const dropdownConfigSchema = new mongoose.Schema(
  {
    configName: {
      type: String,
      unique: true,
      required: true,
      default: "default",
    },
    storyCategories: [
      {
        key: String,
        label: String,
      },
    ],
    durations: [
      {
        key: String,
        label: String,
      },
    ],
    styles: [
      {
        key: String,
        label: String,
      },
    ],
    videoStyles: [
      {
        key: String,
        label: String,
      },
    ],
    avatarLibrary: [
      {
        id: String,
        name: String,
        url: String,
      },
    ],
    audioLibrary: [
      {
        id: String,
        name: String,
        description: String,
        emoji: String,
      },
    ],
    ugcAudioLibrary: [
      {
        id: String,
        name: String,
        description: String,
        emoji: String,
      },
    ],
    imageModels: [
      {
        key: String,
        label: String,
        provider: String,
      },
    ],
    videoModels: [
      {
        key: String,
        label: String,
        provider: String,
      },
    ],
    aiModels: [
      {
        key: String,
        label: String,
        provider: String,
        type: String, // 'text', 'image', 'video', 'audio'
      },
    ],
    customFields: {
      type: Map,
      of: Array,
      default: new Map(),
    },
    ugcPrompt: {
      type: String,
      default: "",
    },
    basePrompt: {
      type: String,
      default: "",
    },
    negativePrompt: {
      type: String,
      default: "",
    },
    blockedKeywords: {
      type: [String],
      default: [],
    },
    contentGuardrails: {
      type: String,
      default: "",
    },
    enableContentFilter: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.DropdownConfig ||
  mongoose.model("DropdownConfig", dropdownConfigSchema);

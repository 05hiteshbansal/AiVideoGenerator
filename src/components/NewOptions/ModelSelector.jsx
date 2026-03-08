"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import { useDropdownConfig } from "@/hooks/useDropdownConfig";

const defaultImageModels = [
  { key: "dalle3", label: "DALL-E 3", provider: "OpenAI" },
  { key: "midjourney", label: "Midjourney", provider: "Midjourney" },
  {
    key: "stable-diffusion",
    label: "Stable Diffusion",
    provider: "Stability AI",
  },
];

const defaultVideoModels = [
  { key: "kling", label: "Kling AI", provider: "Kuaishou" },
  { key: "runway", label: "Runway Gen-2", provider: "Runway" },
  { key: "pika", label: "Pika Labs", provider: "Pika" },
];

const defaultAiModels = [
  { key: "gpt4", label: "GPT-4", provider: "OpenAI", type: "text" },
  {
    key: "claude-sonnet",
    label: "Claude Sonnet",
    provider: "Anthropic",
    type: "text",
  },
  { key: "gemini-pro", label: "Gemini Pro", provider: "Google", type: "text" },
];

export default function ModelSelector({
  modelType = "image",
  onUserSelect,
  fieldName = "model",
}) {
  const [selected, setSelected] = useState([]);
  const { config, loading, error } = useDropdownConfig();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (config) {
      switch (modelType) {
        case "image":
          setOptions(
            config.imageModels && config.imageModels.length > 0
              ? config.imageModels
              : defaultImageModels,
          );
          break;
        case "video":
          setOptions(
            config.videoModels && config.videoModels.length > 0
              ? config.videoModels
              : defaultVideoModels,
          );
          break;
        case "ai":
          setOptions(
            config.aiModels && config.aiModels.length > 0
              ? config.aiModels
              : defaultAiModels,
          );
          break;
        default:
          setOptions(defaultImageModels);
      }
    }
  }, [config, modelType]);

  const handleSelectionChange = (e) => {
    setSelected(e.target.value);
    onUserSelect(fieldName, e.target.value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Spinner size="sm" />
      </div>
    );
  }

  const getLabel = () => {
    switch (modelType) {
      case "image":
        return "Select Image Model";
      case "video":
        return "Select Video Model";
      case "ai":
        return "Select AI Model";
      default:
        return "Select Model";
    }
  };

  const getPlaceholder = () => {
    switch (modelType) {
      case "image":
        return "Choose an image generation model";
      case "video":
        return "Choose a video generation model";
      case "ai":
        return "Choose an AI model";
      default:
        return "Choose a model";
    }
  };

  return (
    <div>
      <Select
        items={options}
        name={`${modelType}Model`}
        label={getLabel()}
        placeholder={getPlaceholder()}
        className="w-full text-lg font-ubuntu pl-10 pr-10 pb-2 pt-4"
        onChange={handleSelectionChange}
        value={selected}
      >
        {(option) => (
          <SelectItem key={option.key} value={option.key}>
            <div className="flex flex-col">
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-slate-500">{option.provider}</span>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
}

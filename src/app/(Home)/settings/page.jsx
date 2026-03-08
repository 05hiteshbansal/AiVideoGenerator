"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import axios from "axios";

export default function AdminSettingsPage() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dropdownConfig");
      setConfig(response.data);
    } catch (error) {
      console.error("Error fetching config:", error);
      setMessage("Error loading configuration");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    try {
      setSaving(true);
      const response = await axios.post("/api/dropdownConfig", {
        storyCategories: config.storyCategories,
        durations: config.durations,
        styles: config.styles,
        videoStyles: config.videoStyles,
        avatarLibrary: config.avatarLibrary,
        audioLibrary: config.audioLibrary,
        ugcAudioLibrary: config.ugcAudioLibrary,
        imageModels: config.imageModels,
        videoModels: config.videoModels,
        aiModels: config.aiModels,
        customFields: config.customFields,
        ugcPrompt: config.ugcPrompt,
        basePrompt: config.basePrompt,
        negativePrompt: config.negativePrompt,
        blockedKeywords: config.blockedKeywords,
        contentGuardrails: config.contentGuardrails,
        enableContentFilter: config.enableContentFilter,
      });
      setMessage("Configuration saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving config:", error);
      setMessage("Error saving configuration");
    } finally {
      setSaving(false);
    }
  };

  const updateArrayItem = (arrayName, index, field, value) => {
    setConfig((prev) => {
      const updated = { ...prev };
      if (Array.isArray(updated[arrayName]) && updated[arrayName][index]) {
        updated[arrayName][index][field] = value;
      }
      return updated;
    });
  };

  const addArrayItem = (arrayName, defaultItem = {}) => {
    setConfig((prev) => {
      const updated = { ...prev };
      if (!Array.isArray(updated[arrayName])) {
        updated[arrayName] = [];
      }
      updated[arrayName].push(defaultItem);
      return updated;
    });
  };

  const removeArrayItem = (arrayName, index) => {
    setConfig((prev) => {
      const updated = { ...prev };
      if (Array.isArray(updated[arrayName])) {
        updated[arrayName].splice(index, 1);
      }
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading configuration...</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Error loading configuration</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Admin Configuration Settings
          </h1>
          <p className="text-slate-600">
            Manage all dropdown values and configuration fields
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 border border-green-300">
            {message}
          </div>
        )}

        {/* Configuration Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Story Categories */}
          <Card className="shadow-md">
            <CardHeader className="flex gap-3 bg-purple-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-purple-900">
                  Story Categories
                </p>
                <p className="text-xs text-purple-700">
                  Configure available story categories
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              {config.storyCategories?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-slate-50 p-3 rounded-lg"
                >
                  <Input
                    label="Key"
                    size="sm"
                    value={item.key}
                    onChange={(e) =>
                      updateArrayItem(
                        "storyCategories",
                        index,
                        "key",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., custom"
                  />
                  <Input
                    label="Label"
                    size="sm"
                    value={item.label}
                    onChange={(e) =>
                      updateArrayItem(
                        "storyCategories",
                        index,
                        "label",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., Custom Prompt"
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeArrayItem("storyCategories", index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                variant="flat"
                onClick={() => addArrayItem("storyCategories")}
              >
                + Add Category
              </Button>
            </CardBody>
          </Card>

          {/* Durations */}
          <Card className="shadow-md">
            <CardHeader className="flex gap-3 bg-blue-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-blue-900">Durations</p>
                <p className="text-xs text-blue-700">
                  Configure video duration options
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              {config.durations?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-slate-50 p-3 rounded-lg"
                >
                  <Input
                    label="Key"
                    size="sm"
                    value={item.key}
                    onChange={(e) =>
                      updateArrayItem("durations", index, "key", e.target.value)
                    }
                    placeholder="e.g., 30"
                  />
                  <Input
                    label="Label"
                    size="sm"
                    value={item.label}
                    onChange={(e) =>
                      updateArrayItem(
                        "durations",
                        index,
                        "label",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., 30 Seconds"
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeArrayItem("durations", index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                variant="flat"
                onClick={() => addArrayItem("durations")}
              >
                + Add Duration
              </Button>
            </CardBody>
          </Card>

          {/* Styles */}
          <Card className="shadow-md">
            <CardHeader className="flex gap-3 bg-green-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-green-900">Styles</p>
                <p className="text-xs text-green-700">
                  Configure available style options
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              {config.styles?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-slate-50 p-3 rounded-lg"
                >
                  <Input
                    label="Key"
                    size="sm"
                    value={item.key}
                    onChange={(e) =>
                      updateArrayItem("styles", index, "key", e.target.value)
                    }
                    placeholder="e.g., realistic"
                  />
                  <Input
                    label="Label"
                    size="sm"
                    value={item.label}
                    onChange={(e) =>
                      updateArrayItem("styles", index, "label", e.target.value)
                    }
                    placeholder="e.g., Realistic"
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeArrayItem("styles", index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                variant="flat"
                onClick={() => addArrayItem("styles")}
              >
                + Add Style
              </Button>
            </CardBody>
          </Card>

          {/* Video Styles */}
          <Card className="shadow-md">
            <CardHeader className="flex gap-3 bg-orange-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-orange-900">
                  Video Styles
                </p>
                <p className="text-xs text-orange-700">
                  Configure video style categories
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              {config.videoStyles?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-slate-50 p-3 rounded-lg"
                >
                  <Input
                    label="Key"
                    size="sm"
                    value={item.key}
                    onChange={(e) =>
                      updateArrayItem(
                        "videoStyles",
                        index,
                        "key",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., ugc"
                  />
                  <Input
                    label="Label"
                    size="sm"
                    value={item.label}
                    onChange={(e) =>
                      updateArrayItem(
                        "videoStyles",
                        index,
                        "label",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., UGC"
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeArrayItem("videoStyles", index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                variant="flat"
                onClick={() => addArrayItem("videoStyles")}
              >
                + Add Video Style
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Library Management Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-8">
          {/* Avatar Library */}
          <Card className="shadow-md">
            <CardHeader className="flex gap-3 bg-indigo-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-indigo-900">
                  Avatar Library
                </p>
                <p className="text-xs text-indigo-700">
                  Configure available avatar images for UGC
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              {config.avatarLibrary?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-slate-50 p-3 rounded-lg"
                >
                  <Input
                    label="ID"
                    size="sm"
                    value={item.id}
                    onChange={(e) =>
                      updateArrayItem(
                        "avatarLibrary",
                        index,
                        "id",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., avatar1"
                  />
                  <Input
                    label="Name"
                    size="sm"
                    value={item.name}
                    onChange={(e) =>
                      updateArrayItem(
                        "avatarLibrary",
                        index,
                        "name",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., Friendly Creator"
                  />
                  <Input
                    label="Image URL"
                    size="sm"
                    value={item.url}
                    onChange={(e) =>
                      updateArrayItem(
                        "avatarLibrary",
                        index,
                        "url",
                        e.target.value,
                      )
                    }
                    placeholder="https://..."
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeArrayItem("avatarLibrary", index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                variant="flat"
                onClick={() =>
                  addArrayItem("avatarLibrary", { id: "", name: "", url: "" })
                }
              >
                + Add Avatar
              </Button>
            </CardBody>
          </Card>

          {/* Audio Library (Regular) */}
          <Card className="shadow-md">
            <CardHeader className="flex gap-3 bg-cyan-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-cyan-900">
                  Audio Library
                </p>
                <p className="text-xs text-cyan-700">
                  Configure audio tracks for regular studio
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              {config.audioLibrary?.map((item, index) => (
                <div
                  key={index}
                  className="space-y-2 bg-slate-50 p-3 rounded-lg"
                >
                  <div className="flex gap-3">
                    <Input
                      label="ID"
                      size="sm"
                      value={item.id}
                      onChange={(e) =>
                        updateArrayItem(
                          "audioLibrary",
                          index,
                          "id",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., calm"
                    />
                    <Input
                      label="Emoji"
                      size="sm"
                      value={item.emoji}
                      onChange={(e) =>
                        updateArrayItem(
                          "audioLibrary",
                          index,
                          "emoji",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., 🌙"
                      maxLength="2"
                    />
                  </div>
                  <Input
                    label="Name"
                    size="sm"
                    value={item.name}
                    onChange={(e) =>
                      updateArrayItem(
                        "audioLibrary",
                        index,
                        "name",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., Calm Background"
                  />
                  <Input
                    label="Description"
                    size="sm"
                    value={item.description}
                    onChange={(e) =>
                      updateArrayItem(
                        "audioLibrary",
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., Soft ambient bed perfect for..."
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeArrayItem("audioLibrary", index)}
                    className="w-full"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                variant="flat"
                onClick={() =>
                  addArrayItem("audioLibrary", {
                    id: "",
                    name: "",
                    description: "",
                    emoji: "",
                  })
                }
              >
                + Add Audio Track
              </Button>
            </CardBody>
          </Card>

          {/* UGC Audio Library */}
          <Card className="shadow-md lg:col-span-2">
            <CardHeader className="flex gap-3 bg-rose-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-rose-900">
                  UGC Audio Library
                </p>
                <p className="text-xs text-rose-700">
                  Configure audio tracks for UGC studio
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {config.ugcAudioLibrary?.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-2 bg-slate-50 p-3 rounded-lg"
                  >
                    <div className="flex gap-3">
                      <Input
                        label="ID"
                        size="sm"
                        value={item.id}
                        onChange={(e) =>
                          updateArrayItem(
                            "ugcAudioLibrary",
                            index,
                            "id",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., calm"
                      />
                      <Input
                        label="Emoji"
                        size="sm"
                        value={item.emoji}
                        onChange={(e) =>
                          updateArrayItem(
                            "ugcAudioLibrary",
                            index,
                            "emoji",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., 🌙"
                        maxLength="2"
                      />
                    </div>
                    <Input
                      label="Name"
                      size="sm"
                      value={item.name}
                      onChange={(e) =>
                        updateArrayItem(
                          "ugcAudioLibrary",
                          index,
                          "name",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., Calm Background"
                    />
                    <Input
                      label="Description"
                      size="sm"
                      value={item.description}
                      onChange={(e) =>
                        updateArrayItem(
                          "ugcAudioLibrary",
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., Soft ambient bed for relaxed UGC"
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onClick={() => removeArrayItem("ugcAudioLibrary", index)}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                color="primary"
                variant="flat"
                onClick={() =>
                  addArrayItem("ugcAudioLibrary", {
                    id: "",
                    name: "",
                    description: "",
                    emoji: "",
                  })
                }
              >
                + Add Audio Track
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* AI Models Management Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            🤖 AI Models Configuration
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Image Models */}
          <Card className="shadow-md">
            <CardHeader className="flex gap-3 bg-emerald-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-emerald-900">
                  Image Generation Models
                </p>
                <p className="text-xs text-emerald-700">
                  Configure AI models for image generation
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              {config.imageModels?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-slate-50 p-3 rounded-lg"
                >
                  <Input
                    label="Key"
                    size="sm"
                    value={item.key}
                    onChange={(e) =>
                      updateArrayItem(
                        "imageModels",
                        index,
                        "key",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., dalle3"
                  />
                  <Input
                    label="Label"
                    size="sm"
                    value={item.label}
                    onChange={(e) =>
                      updateArrayItem(
                        "imageModels",
                        index,
                        "label",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., DALL-E 3"
                  />
                  <Input
                    label="Provider"
                    size="sm"
                    value={item.provider}
                    onChange={(e) =>
                      updateArrayItem(
                        "imageModels",
                        index,
                        "provider",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., OpenAI"
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeArrayItem("imageModels", index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                variant="flat"
                onClick={() =>
                  addArrayItem("imageModels", {
                    key: "",
                    label: "",
                    provider: "",
                  })
                }
              >
                + Add Image Model
              </Button>
            </CardBody>
          </Card>

          {/* Video Models */}
          <Card className="shadow-md">
            <CardHeader className="flex gap-3 bg-violet-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-violet-900">
                  Video Generation Models
                </p>
                <p className="text-xs text-violet-700">
                  Configure AI models for video generation
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              {config.videoModels?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 bg-slate-50 p-3 rounded-lg"
                >
                  <Input
                    label="Key"
                    size="sm"
                    value={item.key}
                    onChange={(e) =>
                      updateArrayItem(
                        "videoModels",
                        index,
                        "key",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., kling"
                  />
                  <Input
                    label="Label"
                    size="sm"
                    value={item.label}
                    onChange={(e) =>
                      updateArrayItem(
                        "videoModels",
                        index,
                        "label",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., Kling AI"
                  />
                  <Input
                    label="Provider"
                    size="sm"
                    value={item.provider}
                    onChange={(e) =>
                      updateArrayItem(
                        "videoModels",
                        index,
                        "provider",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., Kuaishou"
                  />
                  <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => removeArrayItem("videoModels", index)}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                color="primary"
                variant="flat"
                onClick={() =>
                  addArrayItem("videoModels", {
                    key: "",
                    label: "",
                    provider: "",
                  })
                }
              >
                + Add Video Model
              </Button>
            </CardBody>
          </Card>

          {/* AI Models (All Types) */}
          <Card className="shadow-md lg:col-span-2">
            <CardHeader className="flex gap-3 bg-amber-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-amber-900">
                  General AI Models
                </p>
                <p className="text-xs text-amber-700">
                  Configure all AI models (text, image, video, audio)
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {config.aiModels?.map((item, index) => (
                  <div
                    key={index}
                    className="space-y-2 bg-slate-50 p-3 rounded-lg"
                  >
                    <div className="flex gap-3">
                      <Input
                        label="Key"
                        size="sm"
                        value={item.key}
                        onChange={(e) =>
                          updateArrayItem(
                            "aiModels",
                            index,
                            "key",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., gpt4"
                      />
                      <Input
                        label="Type"
                        size="sm"
                        value={item.type}
                        onChange={(e) =>
                          updateArrayItem(
                            "aiModels",
                            index,
                            "type",
                            e.target.value,
                          )
                        }
                        placeholder="text/image/video"
                      />
                    </div>
                    <Input
                      label="Label"
                      size="sm"
                      value={item.label}
                      onChange={(e) =>
                        updateArrayItem(
                          "aiModels",
                          index,
                          "label",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., GPT-4"
                    />
                    <Input
                      label="Provider"
                      size="sm"
                      value={item.provider}
                      onChange={(e) =>
                        updateArrayItem(
                          "aiModels",
                          index,
                          "provider",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., OpenAI"
                    />
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onClick={() => removeArrayItem("aiModels", index)}
                      className="w-full"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                color="primary"
                variant="flat"
                onClick={() =>
                  addArrayItem("aiModels", {
                    key: "",
                    label: "",
                    provider: "",
                    type: "",
                  })
                }
              >
                + Add AI Model
              </Button>
            </CardBody>
          </Card>

          {/* UGC Prompt Template */}
          <Card className="shadow-md lg:col-span-2">
            <CardHeader className="flex gap-3 bg-indigo-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-indigo-900">
                  UGC Prompt Template
                </p>
                <p className="text-xs text-indigo-700">
                  Configure the UGC (User Generated Content) prompt template
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <textarea
                className="w-full rounded-md border border-indigo-200 bg-white px-3 py-3 text-sm font-mono outline-none ring-0 placeholder:text-indigo-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
                rows={12}
                placeholder="Enter UGC prompt template..."
                value={config.ugcPrompt || ""}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, ugcPrompt: e.target.value }))
                }
              />
              <p className="mt-2 text-xs text-indigo-700">
                This template is used for generating UGC-style ad content. You
                can use placeholders like {"{avatarDescription}"}, {"{product}"}
                , {"{targetAudience}"}, etc.
              </p>
            </CardBody>
          </Card>

          {/* Base Prompt Template */}
          <Card className="shadow-md lg:col-span-2">
            <CardHeader className="flex gap-3 bg-violet-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-violet-900">
                  Base Prompt Template
                </p>
                <p className="text-xs text-violet-700">
                  Configure the base prompt template for general content
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <textarea
                className="w-full rounded-md border border-violet-200 bg-white px-3 py-3 text-sm font-mono outline-none ring-0 placeholder:text-violet-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
                rows={12}
                placeholder="Enter base prompt template..."
                value={config.basePrompt || ""}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, basePrompt: e.target.value }))
                }
              />
              <p className="mt-2 text-xs text-violet-700">
                This template is used as a base for all content generation. You
                can use placeholders like {"{duration}"}, {"{topic}"},{" "}
                {"{style}"}, etc.
              </p>
            </CardBody>
          </Card>

          {/* Negative Prompt */}
          <Card className="shadow-md lg:col-span-2">
            <CardHeader className="flex gap-3 bg-red-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-red-900">
                  Negative Prompt
                </p>
                <p className="text-xs text-red-700">
                  Specify what should NOT appear in generated images/videos
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <textarea
                className="w-full rounded-md border border-red-200 bg-white px-3 py-3 text-sm font-mono outline-none ring-0 placeholder:text-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
                rows={8}
                placeholder="e.g., blurry, low quality, distorted faces, watermarks, text overlays, nudity, violence..."
                value={config.negativePrompt || ""}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    negativePrompt: e.target.value,
                  }))
                }
              />
              <p className="mt-2 text-xs text-red-700">
                This negative prompt is automatically added to all AI
                image/video generation requests to avoid unwanted elements.
              </p>
            </CardBody>
          </Card>

          {/* Content Guardrails */}
          <Card className="shadow-md lg:col-span-2">
            <CardHeader className="flex gap-3 bg-orange-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-orange-900">
                  Content Guardrails
                </p>
                <p className="text-xs text-orange-700">
                  Safety guidelines that are enforced during content generation
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <textarea
                className="w-full rounded-md border border-orange-200 bg-white px-3 py-3 text-sm font-mono outline-none ring-0 placeholder:text-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                rows={10}
                placeholder="Enter content safety guidelines..."
                value={config.contentGuardrails || ""}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    contentGuardrails: e.target.value,
                  }))
                }
              />
              <p className="mt-2 text-xs text-orange-700">
                These guidelines are included in prompts to ensure safe,
                appropriate content generation. Example: "No violence, hate
                speech, explicit content, or harmful stereotypes."
              </p>
            </CardBody>
          </Card>

          {/* Blocked Keywords */}
          <Card className="shadow-md lg:col-span-2">
            <CardHeader className="flex gap-3 bg-rose-50">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-rose-900">
                  🚫 Blocked Keywords
                </p>
                <p className="text-xs text-rose-700">
                  Words/phrases that trigger content filtering
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="enableContentFilter"
                  checked={config.enableContentFilter ?? true}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      enableContentFilter: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-rose-600 rounded focus:ring-rose-500"
                />
                <label
                  htmlFor="enableContentFilter"
                  className="text-sm font-medium text-rose-900"
                >
                  Enable Content Filtering
                </label>
              </div>

              <div>
                <label className="text-sm font-medium text-rose-900 block mb-2">
                  Blocked Keywords (comma-separated)
                </label>
                <textarea
                  className="w-full rounded-md border border-rose-200 bg-white px-3 py-3 text-sm outline-none ring-0 placeholder:text-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-200"
                  rows={6}
                  placeholder="e.g., violence, explicit, hate, weapon, drug, gambling, scam, fake..."
                  value={
                    Array.isArray(config.blockedKeywords)
                      ? config.blockedKeywords.join(", ")
                      : config.blockedKeywords || ""
                  }
                  onChange={(e) => {
                    const keywords = e.target.value
                      .split(",")
                      .map((k) => k.trim())
                      .filter((k) => k.length > 0);
                    setConfig((prev) => ({
                      ...prev,
                      blockedKeywords: keywords,
                    }));
                  }}
                  disabled={!config.enableContentFilter}
                />
                <p className="mt-2 text-xs text-rose-700">
                  Users will be notified if their input contains any of these
                  keywords. Separate keywords with commas.
                </p>
                {config.blockedKeywords &&
                  Array.isArray(config.blockedKeywords) &&
                  config.blockedKeywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {config.blockedKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-medium"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => {
                              const newKeywords = config.blockedKeywords.filter(
                                (_, i) => i !== index,
                              );
                              setConfig((prev) => ({
                                ...prev,
                                blockedKeywords: newKeywords,
                              }));
                            }}
                            className="ml-1 text-rose-500 hover:text-rose-700"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button
            color="default"
            variant="bordered"
            onClick={fetchConfig}
            isDisabled={loading}
          >
            Reset Changes
          </Button>
          <Button
            color="success"
            onClick={handleSaveConfig}
            isLoading={saving}
            className="text-white font-semibold"
          >
            Save All Changes
          </Button>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800">
          <p className="text-sm font-semibold mb-2">ℹ️ How to use:</p>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li>
              Edit the Key (value used in code) and Label (displayed to users)
            </li>
            <li>Click "+ Add [Item]" to add new options</li>
            <li>Click "✕" to remove options</li>
            <li>Click "Save All Changes" to apply your configuration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

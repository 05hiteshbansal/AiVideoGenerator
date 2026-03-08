"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PlayerModel from "@/components/Player/Player";
import Loading from "@/loading";
import ModernNewVideoForm from "@/components/ModernLayout/ModernNewVideoForm";
import ModernSceneStudio from "@/components/ModernLayout/ModernSceneStudio";
import ModernAudioStudio from "@/components/ModernLayout/ModernAudioStudio";

const NewVideoPage = () => {
  const [step, setStep] = useState("form"); // form | studio | audio | preview
  const [prompt, setPrompt] = useState({});
  const [data, setData] = useState({ message: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [videoData, setVideoData] = useState({
    images: [],
    audioUrl: "",
    scripts: [],
  });

  const [scenes, setScenes] = useState([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [selectedAudioId, setSelectedAudioId] = useState("");
  const [id, setId] = useState(0);

  const handleSelectionChange = (key, value) => {
    setPrompt((previous) => ({ ...previous, [key]: value }));
  };

  const createScript = async () => {
    const basePrompt = `write a script to generate ${prompt.Duration} s video on topic with complete sentences: ${prompt.value} along with AI image prompt in ${prompt.style} format for each scene and give me result in JSON format with image_prompt and content_text as fields`;

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/script`,
        { prompt: basePrompt, type: "new" },
      );

      const userId = uuidv4();

      setId(userId);
      setData(response.data);

      const scenesFromScript = (response.data.message || []).map(
        (scene, index) => ({
          id: index,
          contentText: scene.content_text,
          imagePrompt: scene.image_prompt,
          imageUrl: "",
        }),
      );

      setScenes(scenesFromScript);
      setStep("studio");
    } catch (error) {
      console.error("Error creating script:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAudioText = (text) => {
    let finalText = "";

    text.forEach((element) => {
      finalText += `${element.content_text} `;
    });

    return finalText;
  };

  const generateImagesForScenes = async (targetScenes) => {
    try {
      setIsGeneratingImages(true);

      const updatedScenes = await Promise.all(
        targetScenes.map(async (scene) => {
          const generateImageResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/GenerateImage`,
            {
              prompt: scene.imagePrompt,
              id,
            },
          );

          const result =
            generateImageResponse.data?.imageUrl ||
            generateImageResponse.data?.result;

          return {
            ...scene,
            imageUrl:
              result ||
              "https://res.cloudinary.com/dpc29aatx/image/upload/v1733495210/bu8im2stk96srjyuuptd.png",
          };
        }),
      );

      setScenes(updatedScenes);
      setVideoData((previous) => ({
        ...previous,
        images: updatedScenes.map((s) => s.imageUrl),
      }));

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/saveImages`, {
        images: updatedScenes.map((s) => s.imageUrl),
        id,
      });
    } catch (error) {
      console.error("Error generating images: ", error);
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleGenerateAllImages = () => {
    generateImagesForScenes(scenes);
  };

  const handlePromptChange = (sceneId, newPrompt) => {
    setScenes((prev) =>
      prev.map((scene) =>
        scene.id === sceneId ? { ...scene, imagePrompt: newPrompt } : scene,
      ),
    );
  };

  const handleRemakeImage = (sceneId) => {
    const target = scenes.find((s) => s.id === sceneId);
    if (!target) return;
    generateImagesForScenes([target]);
  };

  const handleContinueToAudio = () => {
    setStep("audio");
  };

  const handleBackFromStudio = () => {
    setStep("form");
  };

  const handleBackFromAudio = () => {
    setStep("studio");
  };

  const handleSelectFromLibrary = (track) => {
    setSelectedAudioId(track.id);
    // In a full implementation, map track.id to a real URL.
    setVideoData((prev) => ({
      ...prev,
      audioUrl: prev.audioUrl,
    }));
  };

  const handleUploadAudio = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAudioId("uploaded");
    setVideoData((prev) => ({
      ...prev,
      audioUrl: url,
    }));
  };

  const handleGenerateAiAudio = async () => {
    try {
      setIsLoading(true);
      const audioText = getAudioText(data.message || []);
      const generateAudio = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/audiogeneration`,
        { text: audioText, id },
      );

      const transcribe = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Transcripts`,
        { audioFile: generateAudio.data.url, id },
      );

      setSelectedAudioId("ai");
      setVideoData((previous) => ({
        ...previous,
        audioUrl: generateAudio.data.url,
        scripts: transcribe.data.message,
      }));
    } catch (error) {
      console.error("Error generating AI audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinish = () => {
    setIsPlayerOpen(true);
    setStep("preview");
  };

  return (
    <>
      {step === "form" && (
        <ModernNewVideoForm
          onSelectionChange={handleSelectionChange}
          isLoading={isLoading}
          onSubmit={createScript}
        />
      )}

      {step === "studio" && (
        <ModernSceneStudio
          scenes={scenes}
          isGenerating={isGeneratingImages}
          onGenerateAll={handleGenerateAllImages}
          onPromptChange={handlePromptChange}
          onRemakeImage={handleRemakeImage}
          onContinue={handleContinueToAudio}
          onBack={handleBackFromStudio}
        />
      )}

      {step === "audio" && (
        <ModernAudioStudio
          selectedId={selectedAudioId}
          isGenerating={isLoading}
          onSelectFromLibrary={handleSelectFromLibrary}
          onUploadFile={handleUploadAudio}
          onGenerateAi={handleGenerateAiAudio}
          onFinish={handleFinish}
          onBack={handleBackFromAudio}
        />
      )}

      {isPlayerOpen && (
        <PlayerModel
          data={videoData}
          open={isPlayerOpen}
          setData={setVideoData}
          setOpen={setIsPlayerOpen}
        />
      )}
      {isLoading && <Loading load={isLoading} />}
    </>
  );
};

export default NewVideoPage;

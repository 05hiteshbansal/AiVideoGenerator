"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PlayerModel from "@/components/Player/Player";
import Loading from "@/loading";
import ModernUgcForm from "@/components/ModernLayout/ModernUgcForm";
import ModernUgcSceneStudio from "@/components/ModernLayout/ModernUgcSceneStudio";
import ModernUgcAudioStudio from "@/components/ModernLayout/ModernUgcAudioStudio";

const UgcPage = () => {
  const [step, setStep] = useState("form"); // form | studio | audio | preview
  const [prompt, setPrompt] = useState({});
  const [data, setData] = useState({ message: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [videoData, setVideoData] = useState({
    images: [],
    audioUrl: "",
    scripts: [],
    videoUrls: [], // For Kling-generated videos per scene
  });

  const [ugcConfig, setUgcConfig] = useState({
    avatarImage: "",
    avatarDescription: "",
    primaryImage: "",
    primaryImageDescription: "",
  });

  const [scenes, setScenes] = useState([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isGeneratingVideos, setIsGeneratingVideos] = useState(false);
  const [selectedAudioId, setSelectedAudioId] = useState("");
  const [id, setId] = useState(0);

  const handleSelectionChange = (key, value) => {
    setPrompt((previous) => ({ ...previous, [key]: value }));
  };

  const createScript = async () => {
    const {
      avatarImage,
      avatarDescription,
      primaryImage,
      primaryImageDescription,
    } = ugcConfig;

    const basePrompt = `write a script to generate ${prompt.Duration} s advertisement video on topic with complete sentences: ${prompt.value} along with AI image prompt in ${prompt.style} format for each scene and give me result in JSON format with image_prompt and content_text as fields`;

    const userGeneratedPrompt = `You are a creative director generating a user-generated content (UGC) advertisement video.

Avatar image: ${avatarImage ? "User has uploaded/selected an avatar image" : "No avatar image provided"}
Avatar description: ${avatarDescription || "a generic friendly brand avatar"}
Primary visual image: ${primaryImage ? "User has uploaded/selected a primary product image" : "No primary image provided"}
Primary visual description: ${primaryImageDescription || "a relevant product image"}

Using these elements, ${basePrompt}. Make sure scenes feel like authentic UGC ad creatives that naturally feature the avatar and primary visual in engaging, relatable ways. Each scene should feel like real user content, not overly polished corporate ads.`;

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/script`,
        { prompt: userGeneratedPrompt },
      );

      const userId = uuidv4();
      setId(userId);
      setData(response.data);
      console.log(response.data);
      const scenesFromScript = (response.data.message || []).map(
        (scene, index) => ({
          id: index,
          contentText: scene.content_text,
          imagePrompt: scene.image_prompt,
          imageUrl: "",
          videoUrl: "", // Will be filled when Kling generates videos
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

          const result = generateImageResponse.data?.result;

          return {
            ...scene,
            imageUrl:
              result ||
              "https://res.cloudinary.com/dpc29aatx/image/upload/v1733495210/bu8im2stk96srjyuuptd.png",
          };
        }),
      );

      setScenes((prev) => {
        const updated = [...prev];
        targetScenes.forEach((target, idx) => {
          const index = prev.findIndex((s) => s.id === target.id);
          if (index !== -1) {
            updated[index] = updatedScenes[idx];
          }
        });
        return updated;
      });

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

  const generateVideosWithKling = async () => {
    try {
      setIsGeneratingVideos(true);

      // TODO: Replace with actual Kling 3.0 API integration
      // For now, this is a placeholder that simulates video generation
      const videoPromises = scenes.map(async (scene, index) => {
        // Placeholder: In real implementation, call Kling API
        // const klingResponse = await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_URL}/api/kling/generate`,
        //   {
        //     sceneId: scene.id,
        //     imageUrl: scene.imageUrl,
        //     contentText: scene.contentText,
        //     id,
        //   }
        // );
        // return klingResponse.data.videoUrl;

        // Simulated delay
        await new Promise((resolve) => setTimeout(resolve, 1000 * (index + 1)));
        return `https://example.com/kling-video-${scene.id}.mp4`;
      });

      const videoUrls = await Promise.all(videoPromises);

      setScenes((prev) =>
        prev.map((scene, index) => ({
          ...scene,
          videoUrl: videoUrls[index],
        })),
      );

      setVideoData((previous) => ({
        ...previous,
        videoUrls,
      }));
    } catch (error) {
      console.error("Error generating videos with Kling:", error);
    } finally {
      setIsGeneratingVideos(false);
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

  const handleContinueToAudio = async () => {
    // Generate videos using Kling before moving to audio step
    await generateVideosWithKling();
    setStep("audio");
  };

  const handleSelectFromLibrary = (track) => {
    setSelectedAudioId(track.id);
    // In a full implementation, map track.id to a real URL
    setVideoData((prev) => ({
      ...prev,
      audioUrl: prev.audioUrl || `https://example.com/audio/${track.id}.mp3`,
    }));
  };

  const handleUploadAudio = async (file) => {
    try {
      // Upload audio file to your server/CDN
      const formData = new FormData();
      formData.append("audio", file);
      formData.append("id", id);

      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/uploadAudio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSelectedAudioId("uploaded");
      setVideoData((prev) => ({
        ...prev,
        audioUrl: uploadResponse.data.url,
      }));
    } catch (error) {
      console.error("Error uploading audio:", error);
      // Fallback to local URL for preview
      const url = URL.createObjectURL(file);
      setSelectedAudioId("uploaded");
      setVideoData((prev) => ({
        ...prev,
        audioUrl: url,
      }));
    }
  };

  const handleGenerateAiAudio = async () => {
    try {
      setIsLoading(true);
      const audioText = getAudioText(data.message || []);

      // Use ElevateEleven or your configured audio provider
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
        <ModernUgcForm
          ugcConfig={ugcConfig}
          onUgcConfigChange={setUgcConfig}
          prompt={prompt}
          onSelectionChange={handleSelectionChange}
          isLoading={isLoading}
          onSubmit={createScript}
        />
      )}

      {step === "studio" && (
        <ModernUgcSceneStudio
          scenes={scenes}
          isGenerating={isGeneratingImages}
          onGenerateAll={handleGenerateAllImages}
          onPromptChange={handlePromptChange}
          onRemakeImage={handleRemakeImage}
          onContinue={handleContinueToAudio}
          isGeneratingVideos={isGeneratingVideos}
        />
      )}

      {step === "audio" && (
        <ModernUgcAudioStudio
          selectedId={selectedAudioId}
          isGenerating={isLoading}
          onSelectFromLibrary={handleSelectFromLibrary}
          onUploadFile={handleUploadAudio}
          onGenerateAi={handleGenerateAiAudio}
          onFinish={handleFinish}
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
      {(isLoading || isGeneratingImages || isGeneratingVideos) && (
        <Loading load={isLoading || isGeneratingImages || isGeneratingVideos} />
      )}
    </>
  );
};

export default UgcPage;

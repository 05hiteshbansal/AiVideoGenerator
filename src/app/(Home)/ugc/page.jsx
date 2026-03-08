"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PlayerModel from "@/components/Player/Player";
import Loading from "@/loading";
import ModernUgcForm from "@/components/ModernLayout/ModernUgcForm";
import ModernUgcSceneStudio from "@/components/ModernLayout/ModernUgcSceneStudio";
import ModernUgcAudioStudio from "@/components/ModernLayout/ModernUgcAudioStudio";
import VariationSelector from "@/components/NewOptions/VariationSelector";
import userGeneratedPrompt from "@/components/constants/UGCPrompt";
import { downloadScriptPDF } from "@/utils/pdfExport";
import { Button } from "@nextui-org/react";
import { useContentFilter } from "@/hooks/useContentFilter";
import { toast, Toaster } from "react-hot-toast";

const UgcPage = () => {
  const [step, setStep] = useState("form"); // form | variations | studio | audio | preview
  const [prompt, setPrompt] = useState({});
  const [data, setData] = useState({ message: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { validateFields, getErrorMessage, filterEnabled, config, mounted } =
    useContentFilter();

  // Prevent hydration errors
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [videoData, setVideoData] = useState({
    images: [],
    audioUrl: "",
    scripts: [],
    videoUrls: [], // For Kling-generated videos per scene
  });

  const [ugcConfig, setUgcConfig] = useState({
    avatarImages: [],
    avatarDescription: "",
    primaryImages: [],
    primaryImageDescription: "",
    visualFocus: "interaction",
    product: "",
    productType: "",
    targetAudience: "",
    environment: "",
    imageModel: "",
    videoModel: "",
  });

  const [scenes, setScenes] = useState([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isGeneratingVideos, setIsGeneratingVideos] = useState(false);
  const [selectedAudioId, setSelectedAudioId] = useState("");
  const [id, setId] = useState(0);
  const [scriptVariations, setScriptVariations] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);

  const handleSelectionChange = (key, value) => {
    setPrompt((previous) => ({ ...previous, [key]: value }));
  };

  const createScript = async () => {
    console.log("Creating script with config:", { prompt, ugcConfig });

    // Content filtering validation
    if (filterEnabled && config) {
      const fieldsToValidate = {
        "Product Name": ugcConfig.product,
        "Product Type": ugcConfig.productType,
        "Avatar Description": ugcConfig.avatarDescription,
        "Primary Image Description": ugcConfig.primaryImageDescription,
        "Target Audience": ugcConfig.targetAudience,
        Environment: ugcConfig.environment,
        "Custom Prompt": prompt.ugcPrompt,
        Topic: prompt.value,
      };

      const validation = validateFields(fieldsToValidate);

      if (!validation.isValid) {
        const blockedField = validation.blockedFields[0];
        const errorMsg = `🚫 ${blockedField.field}: ${getErrorMessage(blockedField.keywords)}`;

        toast.error(errorMsg, {
          duration: 5000,
          position: "top-center",
          style: {
            background: "#FEE2E2",
            color: "#991B1B",
            border: "2px solid #DC2626",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "600",
          },
          icon: "🚫",
        });

        return; // Stop execution
      }

      // Show success if validation passed
      toast.success("✓ Content validation passed", {
        duration: 2000,
        position: "top-right",
      });
    }

    const {
      avatarImages,
      avatarDescription,
      primaryImages,
      primaryImageDescription,
      product,
      productType,
      targetAudience,
      environment,
      visualFocus,
    } = ugcConfig;

    // Build a more contextual base prompt
    const productInfo = product || prompt.value || "the product";
    const customDescription = prompt.ugcPrompt || "";
    const duration = prompt.Duration || "30";

    const basePrompt = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎬 VIDEO SCRIPT REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Duration: ${duration} seconds
Product/Topic: "${productInfo}"
${customDescription ? `Additional Context: ${customDescription}` : ""}

📋 SCENE STRUCTURE (Follow this flow):

1. HOOK (First 2-3 seconds)
   - Grab attention immediately with a problem, question, or bold statement
   - Show product prominently or tease the transformation
   - Example: "I was struggling with [problem] until I found this..."

2. INTRODUCTION (Next 3-5 seconds)
   - Introduce the product by name: "${productInfo}"
   - Brief context about what it is
   - Personal connection or discovery story

3. DEMONSTRATION (Middle 10-15 seconds)
   - Show the product in use
   - Highlight 2-3 key features or benefits
   - Make it visual and tangible
   - Use before/after or step-by-step if relevant

4. RESULTS/PROOF (Next 5-8 seconds)
   - Show the transformation or outcome
   - Personal testimonial about results
   - Close-up of results or happy reaction

5. CALL-TO-ACTION (Final 3-5 seconds)
   - Direct but natural CTA
   - Sense of urgency or exclusivity
   - Where to get it/what to do next
   - End with enthusiasm

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📤 OUTPUT FORMAT (STRICT REQUIREMENT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ONLY a valid JSON array with NO markdown formatting.
Each scene object must have:
{
  "image_prompt": "[Detailed visual description: Include product name '${productInfo}', creator action, environment '${environment || "appropriate setting"}', lighting type, camera angle, 9:16 aspect ratio, UGC smartphone style]",
  "content_text": "[Natural, conversational voiceover text that mentions the product and connects emotionally with ${targetAudience || "viewers"}. First-person perspective. One complete sentence or short phrase.]"
}

⚠️ IMPORTANT: 
- NO markdown code blocks (no \`\`\`json)
- NO explanatory text outside the JSON
- Start directly with [ and end with ]
- Each scene should be 5-10 seconds of content
- Total scenes should fit within ${duration} seconds
`;

    const UGCPrompt = userGeneratedPrompt(
      avatarImages,
      avatarDescription,
      primaryImages,
      primaryImageDescription,
      basePrompt,
      visualFocus,
      product,
      productType,
      targetAudience,
      environment,
      config?.negativePrompt || "",
      config?.contentGuardrails || "",
    );
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/script`,
        {
          prompt: {
            productName: product || "the product",
            productDescription: prompt.ugcPrompt || "",
            brandName: prompt.brandName || "Brand",
            productType,
            targetAudience,
            environment,
            videoStyle: prompt.styles || "realistic",
            imageModel: ugcConfig.imageModel,
            videoModel: ugcConfig.videoModel,
          },
          type: "ugc",
          generateVariations: true, // Request all 3 variations
        },
      );

      const userId = uuidv4();
      setId(userId);

      // Check if we got variations
      if (response.data.hasVariations) {
        setScriptVariations(response.data.message);
        setStep("variations");
      } else {
        // Fallback to old behavior
        setData(response.data);
        const scenesFromScript = (response.data.message || []).map(
          (scene, index) => ({
            id: index,
            contentText: scene.content_text,
            imagePrompt: scene.image_prompt,
            imageUrl: "",
            videoUrl: "",
          }),
        );
        setScenes(scenesFromScript);
        setStep("studio");
      }
    } catch (error) {
      console.error("Error creating script:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVariation = (variationType) => {
    setSelectedVariation(variationType);
  };

  const handleContinueWithVariation = () => {
    if (!selectedVariation || !scriptVariations) return;

    const variation = scriptVariations[selectedVariation];
    const scenesFromScript = variation.scenes.map((scene, index) => ({
      id: index,
      contentText: scene.content_text,
      imagePrompt: scene.image_prompt,
      imageUrl: "",
      videoUrl: "",
      emotion: scene.emotion,
    }));

    setScenes(scenesFromScript);
    setData({ message: variation.scenes });
    setStep("studio");
  };

  const handleDownloadPDF = () => {
    if (!scriptVariations) return;

    const productInfo = {
      productName: prompt.value || "Product",
      brandName: prompt.brandName || "Brand",
      productDescription: prompt.productDescription || "",
    };

    downloadScriptPDF(scriptVariations, productInfo);
  };

  const handleBackFromVariations = async () => {
    try {
      setScriptVariations(null);
      setSelectedVariation(null);
      setStep("form");
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
              avatarImages: ugcConfig.avatarImages,
              primaryImages: ugcConfig.primaryImages,
              visualFocus: ugcConfig.visualFocus,
              avatarDescription: ugcConfig.avatarDescription,
              primaryImageDescription: ugcConfig.primaryImageDescription,
              productName: ugcConfig.product,
              imageModel: ugcConfig.imageModel,
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
    if (ugcConfig.videoModel !== "kling") {
      console.log("Kling not selected as video model, skipping AI video synthesis.");
      return;
    }

    try {
      setIsGeneratingVideos(true);
      toast.loading("🎬 Synthesizing cinematic videos with Kling AI...", { id: "kling-status" });

      const videoPromises = scenes.map(async (scene) => {
        // Collect relevant images for the multi-image-to-video prompt
        const imagesForKling = [scene.imageUrl];

        if (ugcConfig.avatarImages?.[0]) imagesForKling.push(ugcConfig.avatarImages[0]);
        if (ugcConfig.primaryImages?.[0]) imagesForKling.push(ugcConfig.primaryImages[0]);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/kling/generate`,
          {
            images: imagesForKling,
            prompt: scene.imagePrompt,
            options: {
              duration: "5",
              aspect_ratio: "9:16",
              mode: "pro"
            }
          }
        );

        if (response.data.success) {
          return response.data.videoUrl;
        } else {
          throw new Error(response.data.message || "Failed to generate video");
        }
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

      toast.success("✨ Cinematic videos generated successfully!", { id: "kling-status" });
    } catch (error) {
      console.error("Error generating videos with Kling:", error);
      toast.error(`❌ Kling Error: ${error.message}`, { id: "kling-status" });
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
      {isMounted && <Toaster position="top-center" reverseOrder={false} />}
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

      {step === "variations" && scriptVariations && (
        <div className="m-5 rounded-2xl bg-white p-5 shadow-lg md:m-8 md:p-8">
          <div className="mx-auto max-w-6xl space-y-6">
            <VariationSelector
              variations={scriptVariations}
              selectedVariation={selectedVariation}
              onSelectVariation={handleSelectVariation}
            />

            <div className="flex justify-center gap-4 pt-6 border-t border-slate-200">
              <Button variant="bordered" onPress={handleBackFromVariations}>
                ← Back to Form
              </Button>
              <Button
                variant="flat"
                color="secondary"
                onPress={handleDownloadPDF}
              >
                📄 Download All Scripts (PDF)
              </Button>
              <Button
                color="primary"
                size="lg"
                onPress={handleContinueWithVariation}
                isDisabled={!selectedVariation}
                className="px-8"
              >
                Continue with Selected →
              </Button>
            </div>
          </div>
        </div>
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

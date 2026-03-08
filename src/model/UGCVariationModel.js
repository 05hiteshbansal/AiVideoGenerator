import { GoogleGenAI } from "@google/genai";
import {
  VARIATION_TYPES,
  getEmotionPromptModifier,
  getToneModifier,
  getHookDirective,
  getCtaDirective,
  getVariationMetadata,
} from "@/utils/emotionEngine";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Generate a single script variation with specific emotional approach
 */
async function generateSingleVariation(
  productName,
  productDescription,
  brandName,
  variationType,
  additionalContext = {}
) {
  const { productType, targetAudience, environment, videoStyle } = additionalContext;
  const metadata = getVariationMetadata(variationType);
  const toneModifier = getToneModifier(variationType);
  const hookDirective = getHookDirective(variationType);
  const ctaDirective = getCtaDirective(variationType);

  const sceneEmotionGuidance = metadata.emotionalArc
    .map(
      (arc, idx) =>
        `Scene ${arc.scene}: ${arc.emotion} - ${getEmotionPromptModifier(variationType, idx)}`,
    )
    .join("\n");

  const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      systemInstruction: "You are a specialized JSON generator. You MUST ONLY output a valid JSON array. Never include any conversational text, explanations, or greeting. Your output must start with '[' and end with ']'.",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
      },
    contents: [
      {
        role: "user",
        parts: [
            {
              text: `
STRICTLY generate a viral UGC script JSON for:
PRODUCT: ${productName} (${brandName})
TYPE: ${productType || "N/A"}
DESCRIPTION: ${productDescription}
AUDIENCE: ${targetAudience || "General"}
SETTING: ${environment || "Lived-in space"}

STRATEGY: ${metadata.hookStyle.toUpperCase()} approach (${metadata.tone})
${toneModifier}

DIRECTIVES:
- Hook (Scene 1): ${hookDirective}
- ARC: ${sceneEmotionGuidance}
- CTA (Final): ${ctaDirective}
- VISUAL MIX: Use Intimate Close-ups, Low Angles, Side Views, and POC shots.
- IMAGE_PROMPT: 9:16, ${videoStyle || "Cinematic UGC"}, Hyper-realistic 8K, [Angle], [Emotional Expression], [Action], rich background detail in ${environment || "setting"}.
- CONSISTENCY: Exact same avatar & product design. Zero text overlays.

OUTPUT (JSON array only):
[
  {
    "image_prompt": "Cinematic visual description",
    "content_text": "Spoken line (max 18 words)",
    "emotion": "string"
  }
]
`,
            },
        ],
      },
    ],
  });

  const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("No text returned");

  let cleanedText = rawText.trim();
  
  // Extract content between [ and ] if model added conversational text
  const jsonStart = cleanedText.indexOf('[');
  const jsonEnd = cleanedText.lastIndexOf(']');
  
  if (jsonStart !== -1 && jsonEnd !== -1) {
    cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
  } else {
    // Fallback cleanup if indices not found
    cleanedText = cleanedText.replace(/```json|```/g, "").trim();
  }

  const parsed = JSON.parse(cleanedText);

  if (!Array.isArray(parsed)) {
    throw new Error("Response is not a JSON array");
  }

  parsed.forEach((scene, index) => {
    if (!scene.image_prompt || !scene.content_text) {
      throw new Error(`Invalid structure at index ${index}`);
    }
  });

  return {
    variationType,
    metadata,
    scenes: parsed,
  };
}

/**
 * Generate all three variations in parallel
 */
export async function generateUGCVideoVariations(
  productName,
  productDescription,
  brandName,
  additionalContext = {}
) {
  try {
    const [fearBased, relatable, authority] = await Promise.all([
      generateSingleVariation(
        productName,
        productDescription,
        brandName,
        VARIATION_TYPES.FEAR_BASED,
        additionalContext
      ),
      generateSingleVariation(
        productName,
        productDescription,
        brandName,
        VARIATION_TYPES.RELATABLE,
        additionalContext
      ),
      generateSingleVariation(
        productName,
        productDescription,
        brandName,
        VARIATION_TYPES.AUTHORITY,
        additionalContext
      ),
    ]);

    return {
      fear_based: fearBased,
      relatable: relatable,
      authority: authority,
    };
  } catch (error) {
    console.error("UGC Variation Generation Error:", error);
    throw error;
  }
}

/**
 * Backwards compatible - generate single UGC video (relatable variation by default)
 */
export async function generateUGCVideo(
  productName,
  productDescription,
  brandName,
  additionalContext = {}
) {
  const result = await generateSingleVariation(
    productName,
    productDescription,
    brandName,
    VARIATION_TYPES.RELATABLE,
    additionalContext
  );
  return result.scenes;
}

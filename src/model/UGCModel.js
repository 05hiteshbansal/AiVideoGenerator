import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateUGCVideo(productName, productDescription, brandName, additionalContext = {}) {
  const { productType, targetAudience, environment, videoStyle } = additionalContext;
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        systemInstruction: "You are a specialized JSON generator. You MUST ONLY output a valid JSON array. Never include anything else.",
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

DIRECTIVES:
- Hook -> Problem -> Solution -> CTA
- REQUIRED: Every scene must feature the product/brand mentioned.
- VISUAL MIX: Use Intimate Close-ups, Low Angles, Side Views, and POC shots.
- IMAGE_PROMPT: 9:16, ${videoStyle || "Cinematic UGC"}, Hyper-realistic 8K, [Angle], [Emotional Expression], [Action], rich background detail in ${environment || "setting"}.
- CONSISTENCY: Exact same avatar & product design. Zero text overlays.

OUTPUT (JSON array only):
[
  {
    "image_prompt": "Cinematic visual description",
    "content_text": "Spoken line (max 18 words)"
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
    const jsonStart = cleanedText.indexOf('[');
    const jsonEnd = cleanedText.lastIndexOf(']');
    
    if (jsonStart !== -1 && jsonEnd !== -1) {
      cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
    } else {
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

    return parsed;
  } catch (error) {
    console.error("UGC Generation Error:", error);
    throw error;
  }
}
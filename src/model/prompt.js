import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateStory(promptTopic) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // ✅ changed model
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate a 10-second historical story about "${promptTopic}" in maximum 7 scenes.
Return ONLY valid JSON array.
Each object must contain:
- "image_prompt"
- "content_text"
No markdown. No explanation.`,
            },
          ],
        },
      ],
    });

    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No text returned");

    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

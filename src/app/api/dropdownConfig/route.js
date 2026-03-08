import connection from "@/dbconfig/connection";
import DropdownConfig from "@/model/dropdownConfig";
import { NextResponse } from "next/server";

await connection();

const normalizeAiModels = (value, fallback = []) => {
  if (Array.isArray(value)) {
    const objectItems = value.filter(
      (item) => item && typeof item === "object" && !Array.isArray(item),
    );
    if (objectItems.length === value.length) {
      return value;
    }

    const stringItems = value.filter((item) => typeof item === "string");
    if (stringItems.length === value.length && value.length === 1) {
      const parsed = parseLooseJsonArray(value[0]);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  }

  if (typeof value === "string") {
    const parsed = parseLooseJsonArray(value);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  }

  return fallback;
};

const parseLooseJsonArray = (rawValue) => {
  const trimmed = rawValue.trim();
  if (!trimmed.startsWith("[")) {
    return null;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    try {
      const normalized = trimmed
        .replace(/(\w+)\s*:/g, '"$1":')
        .replace(/'/g, '"');
      return JSON.parse(normalized);
    } catch {
      return null;
    }
  }
};

const hasAiModelsCastError = (error) => {
  if (!error) {
    return false;
  }

  if (error.name === "CastError") {
    return true;
  }

  if (error.message && error.message.includes("aiModels.0")) {
    return true;
  }

  if (error.errors && error.errors["aiModels.0"]?.name === "CastError") {
    return true;
  }

  return false;
};

const defaultConfig = {
  storyCategories: [
    { key: "custom", label: "Custom Prompt" },
    { key: "Randamaistory", label: "Random AI Story" },
    { key: "scary", label: "Scary Story" },
    { key: "historicalfacts", label: "Historical Facts" },
    { key: "bedTime", label: "Bed Time Story" },
    { key: "motivation", label: "Motivation" },
    { key: "Fun Facts", label: "Fact" },
  ],
  durations: [
    { key: "10", label: "10 Seconds" },
    { key: "30", label: "30 Seconds" },
    { key: "60", label: "60 Seconds" },
  ],
  styles: [
    { key: "realistic", label: "Realistic" },
    { key: "animated", label: "Animated" },
    { key: "cinematic", label: "Cinematic" },
    { key: "sketch", label: "Sketch" },
  ],
  videoStyles: [
    { key: "ugc", label: "UGC" },
    { key: "commercial", label: "Commercial" },
    { key: "viral", label: "Viral" },
    { key: "educational", label: "Educational" },
  ],
  avatarLibrary: [
    {
      id: "avatar1",
      name: "Friendly Creator",
      url: "https://res.cloudinary.com/dpc29aatx/image/upload/v1733495210/bu8im2stk96srjyuuptd.png",
    },
    {
      id: "avatar2",
      name: "Professional",
      url: "https://res.cloudinary.com/dpc29aatx/image/upload/v1733495210/bu8im2stk96srjyuuptd.png",
    },
  ],
  audioLibrary: [
    {
      id: "calm",
      name: "Calm Background",
      description: "Soft ambient bed perfect for educational content",
      emoji: "🌙",
    },
    {
      id: "energetic",
      name: "Energetic Beat",
      description: "Up-tempo drums for fast cuts and dynamic content",
      emoji: "⚡",
    },
    {
      id: "uplifting",
      name: "Uplifting Vibes",
      description: "Bright chords for positive ads and promotions",
      emoji: "✨",
    },
  ],
  ugcAudioLibrary: [
    {
      id: "calm",
      name: "Calm Background",
      description: "Soft ambient bed for relaxed UGC",
      emoji: "🌙",
    },
    {
      id: "energetic",
      name: "Energetic Beat",
      description: "Up-tempo drums perfect for dynamic ads",
      emoji: "⚡",
    },
    {
      id: "uplifting",
      name: "Uplifting",
      description: "Bright chords for positive UGC",
      emoji: "✨",
    },
    {
      id: "trendy",
      name: "Trendy Pop",
      description: "Modern pop track for viral ads",
      emoji: "🎸",
    },
  ],
  imageModels: [
    { key: "dalle3", label: "DALL-E 3", provider: "OpenAI" },
    { key: "midjourney", label: "Midjourney", provider: "Midjourney" },
    {
      key: "stable-diffusion",
      label: "Stable Diffusion",
      provider: "Stability AI",
    },
    { key: "flux", label: "Flux", provider: "Black Forest Labs" },
  ],
  videoModels: [
    { key: "kling", label: "Kling AI", provider: "Kuaishou" },
    { key: "runway", label: "Runway Gen-2", provider: "Runway" },
    { key: "pika", label: "Pika Labs", provider: "Pika" },
    { key: "sora", label: "Sora", provider: "OpenAI" },
  ],
  aiModels: [
    { key: "gpt4", label: "GPT-4", provider: "OpenAI", type: "text" },
    {
      key: "claude-sonnet",
      label: "Claude Sonnet",
      provider: "Anthropic",
      type: "text",
    },
    {
      key: "gemini-pro",
      label: "Gemini Pro",
      provider: "Google",
      type: "text",
    },
    { key: "dalle3", label: "DALL-E 3", provider: "OpenAI", type: "image" },
    { key: "kling", label: "Kling AI", provider: "Kuaishou", type: "video" },
  ],
  ugcPrompt: `This is the admin-configurable UGC prompt template. 

You can customize this template and use placeholders like:
- {product} - Product name
- {productType} - Type/category
- {targetAudience} - Target demographic
- {environment} - Setting/location
- {avatarDescription} - Creator description
- {primaryImageDescription} - Product visual details

The system will automatically build a comprehensive prompt using these inputs.`,
  basePrompt: `This is the admin-configurable base prompt template.

You can customize the script structure and requirements here.

Available placeholders:
- {duration} - Video duration
- {topic} - Main topic/product
- {value} - Topic value
- {ugcPrompt} - Custom UGC description

The system automatically creates detailed scene requirements based on this template.`,
  negativePrompt: `blurry, low quality, distorted, deformed, disfigured, bad anatomy, bad proportions, watermark, signature, text overlay, logo, amateur, unprofessional lighting, grainy, pixelated, artificial, CGI artifacts, studio background, stock photo aesthetic`,
  blockedKeywords: [
    "violence",
    "explicit",
    "nude",
    "nudity",
    "sexual",
    "weapon",
    "gun",
    "blood",
    "death",
    "kill",
    "hate",
    "racist",
    "discriminate",
    "drug",
    "cocaine",
    "heroin",
    "gambling",
    "casino",
    "scam",
    "fraud",
    "illegal",
    "pornography",
    "xxx",
  ],
  contentGuardrails: `CONTENT SAFETY GUIDELINES:

✓ ALLOWED:
- Professional product demonstrations
- Educational content
- Entertainment and storytelling
- Honest reviews and testimonials
- Age-appropriate marketing
- Respectful representations of all people

✗ PROHIBITED:
- Violence, weapons, or harm
- Sexually explicit or suggestive content
- Hate speech or discrimination
- Illegal activities or substances
- Deceptive or fraudulent claims
- Content targeting minors inappropriately
- Harassment or bullying
- Harmful stereotypes
- Medical/health misinformation
- Financial scams or pyramid schemes

All generated content must be:
1. Truthful and non-deceptive
2. Respectful of all individuals
3. Legal and compliant
4. Age-appropriate
5. Brand-safe and professional`,
  enableContentFilter: true,
};

export async function GET(request) {
  try {
    let config = await DropdownConfig.findOne({ configName: "default" });

    if (!config) {
      config = new DropdownConfig({
        configName: "default",
        ...defaultConfig,
      });
      await config.save();
    } else {
      // Merge defaults with existing config to ensure new fields are populated
      let needsUpdate = false;
      const updatePayload = {};

      const normalizedAiModels = normalizeAiModels(
        config.aiModels,
        defaultConfig.aiModels,
      );
      if (normalizedAiModels !== config.aiModels) {
        config.aiModels = normalizedAiModels;
        needsUpdate = true;
        updatePayload.aiModels = normalizedAiModels;
      }

      for (const key in defaultConfig) {
        if (
          !config[key] ||
          (Array.isArray(config[key]) && config[key].length === 0)
        ) {
          config[key] = defaultConfig[key];
          needsUpdate = true;
          updatePayload[key] = defaultConfig[key];
        }
      }

      if (needsUpdate) {
        try {
          await config.save();
        } catch (error) {
          if (hasAiModelsCastError(error)) {
            await DropdownConfig.collection.updateOne(
              { _id: config._id },
              { $set: updatePayload },
            );
            config = await DropdownConfig.findById(config._id);
          } else {
            throw error;
          }
        }
      }
    }

    return NextResponse.json(config, { status: 200 });
  } catch (error) {
    console.error("Error fetching config:", error);
    return NextResponse.json(
      { message: "Error fetching configuration", error: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.aiModels) {
      body.aiModels = normalizeAiModels(body.aiModels, defaultConfig.aiModels);
    }

    let config = await DropdownConfig.findOne({ configName: "default" });

    if (!config) {
      config = new DropdownConfig({
        configName: "default",
        ...body,
      });
    } else {
      Object.assign(config, body);
    }

    try {
      await config.save();
    } catch (error) {
      if (hasAiModelsCastError(error)) {
        await DropdownConfig.collection.updateOne(
          { _id: config._id },
          { $set: body },
        );
        config = await DropdownConfig.findById(config._id);
      } else {
        throw error;
      }
    }

    return NextResponse.json(
      { message: "Configuration updated successfully", config },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating config:", error);
    return NextResponse.json(
      { message: "Error updating configuration", error: error.message },
      { status: 500 },
    );
  }
}

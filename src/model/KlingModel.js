import axios from "axios";

const KLING_API_BASE = "https://api-singapore.klingai.com/v1/videos";

/**
 * Generates a video using Kling AI multi-image2video API
 * @param {Array} images - Array of image URLs [{image: "url"}]
 * @param {string} prompt - Text prompt for video generation
 * @param {Object} options - Additional options (model_name, duration, etc.)
 */
export async function generateKlingVideo(images, prompt, options = {}) {
  const apiKey = process.env.KLING_API_KEY;
  
  if (!apiKey) {
    throw new Error("KLING_API_KEY is not defined in environment variables");
  }

  const payload = {
    model_name: options.model_name || "kling-v1-6",
    image_list: images.map(url => ({ image: url })),
    prompt: prompt,
    negative_prompt: options.negative_prompt || "",
    mode: options.mode || "pro",
    duration: options.duration || "5",
    aspect_ratio: options.aspect_ratio || "16:9",
    callback_url: options.callback_url || "",
    external_task_id: options.external_task_id || ""
  };

  try {
    const response = await axios.post(`${KLING_API_BASE}/multi-image2video`, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Kling API Generation Error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Polls the Kling API for task status
 * @param {string} taskId - The ID of the generation task
 */
export async function getKlingTaskStatus(taskId) {
  const apiKey = process.env.KLING_API_KEY;

  if (!apiKey) {
    throw new Error("KLING_API_KEY is not defined in environment variables");
  }

  try {
    // Note: The actual status endpoint might vary, 
    // using the common pattern for Kling API
    const response = await axios.get(`${KLING_API_BASE}/video-result`, {
      params: { task_id: taskId },
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Kling API Status Error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * High-level function to generate and wait for a Kling video
 */
export async function createVideoWithKling(images, prompt, options = {}) {
  const { data } = await generateKlingVideo(images, prompt, options);
  const taskId = data.task_id;

  if (!taskId) {
    throw new Error("Failed to get task_id from Kling API");
  }

  // Polling logic
  let attempts = 0;
  const maxAttempts = 60; // 5 minutes with 5s interval
  const interval = 5000;

  while (attempts < maxAttempts) {
    const statusResponse = await getKlingTaskStatus(taskId);
    const { data: statusData } = statusResponse;

    if (statusData.task_status === "succeeded") {
      return statusData.video_url || statusData.task_result?.video_url;
    } else if (statusData.task_status === "failed") {
      throw new Error(`Kling video generation failed: ${statusData.task_status_msg}`);
    }

    await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error("Kling video generation timed out");
}

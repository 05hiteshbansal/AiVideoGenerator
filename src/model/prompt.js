const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
 export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate 10seconds script with complete sentences and smooth ending  not more than 7 frames in a video on topic :Intresting historical story along with AI image prompt in realistic format for each scene and give me result on JSON formate with image prompt and content text as field\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"image_prompt\": \"A realistic painting of a bustling 19th-century London street, fog swirling, horse-drawn carriages, gas lamps flickering.\",\n    \"content_text\": \"In 1888, London was gripped by fear.  A serial killer, known as Jack the Ripper, was terrorizing the Whitechapel district.\"\n  },\n  {\n    \"image_prompt\": \"A realistic depiction of a dimly lit alleyway in 19th-century London, rain slicking the cobblestones, a single gas lamp casting long shadows.\",\n    \"content_text\": \"His victims were all women, and the brutality of the murders shocked the nation.\"\n  },\n  {\n    \"image_prompt\": \"A realistic portrait of a determined police detective, weary but focused, examining a crime scene sketch.\",\n    \"content_text\": \"Scotland Yard threw its best detectives at the case, but the Ripper remained elusive.\"\n  },\n  {\n    \"image_prompt\": \"A realistic illustration of newspaper headlines screaming about the murders, crowds gathering, a sense of panic in the air.\",\n    \"content_text\": \"The intense media coverage fueled public hysteria and conspiracy theories.\"\n  },\n  {\n    \"image_prompt\": \"A realistic image of a shadowy figure disappearing into the fog of a London street at night.\",\n    \"content_text\": \"Despite numerous suspects, the Ripper was never caught, leaving behind a legacy of mystery.\"\n  },\n  {\n    \"image_prompt\": \"A realistic close-up of an old, faded police file, detailing the unsolved case of Jack the Ripper.\",\n    \"content_text\": \"The case remains one of the most infamous unsolved mysteries in history.\"\n  },\n  {\n    \"image_prompt\": \"A realistic panoramic view of modern-day Whitechapel, contrasting the historic events with the present day.\",\n    \"content_text\": \"Even today, the legend of Jack the Ripper continues to fascinate and terrify.\"\n  }\n]\n```\n\n**Note:**  This JSON provides seven scenes, not six as initially requested.  A 10-second video with 7 scenes,  assuming roughly 1.5 seconds per scene, is achievable.  To reduce to six, you would have to shorten sentences or combine scenes.  The image prompts aim for a realistic style to match the request.  The time constraint necessitates concise sentences.  You'll need a video editing software and an AI image generator (like Midjourney, Dall-E 2, Stable Diffusion) to create the video using this JSON data.  Remember to adjust the timing to fit your chosen video editing software.\n"},
          ],
        },
      ],
    });

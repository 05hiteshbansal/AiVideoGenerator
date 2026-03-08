export default function userGeneratedPrompt(
  avatarImages,
  avatarDescription,
  primaryImages,
  primaryImageDescription,
  basePrompt,
  visualFocus = "interaction",
  product = "",
  productType = "",
  targetAudience = "",
  environment = "",
  negativePrompt = "",
  contentGuardrails = ""
) {
  const visualFocusMap = {
    avatar: "Keep the avatar front and center; product stays as a supporting detail in the background.",
    product: "Product dominates the frame with crisp detail; avatar reacts or gestures toward it.",
    interaction: "Avatar and product interact naturally together in the same shot.",
  };

  const focusCopy = visualFocusMap[visualFocus] || visualFocusMap.interaction;

  // Core identity strings — keep these short and direct
  const productName    = product      || "the product";
  const productLabel   = productType  ? `${product} (${productType})` : productName;
  const audience       = targetAudience || "general audience";
  const setting        = environment  || "a natural, lived-in space";
  const avatarDesc     = avatarDescription || "a relatable, authentic creator";
  const productDesc    = primaryImageDescription || "the product, clearly visible";
  const hasAvatar      = avatarImages?.length > 0;
  const hasProduct     = primaryImages?.length > 0;

  return `You are a UGC video ad script writer. Your ONLY job is to write a script for the EXACT product below.

=== PRODUCT (USE THIS IN EVERY SINGLE SCENE) ===
Product name: "${productName}"
Product type: ${productType || "unspecified"}
Full label: ${productLabel}
Extra context: ${basePrompt || "none"}

=== AUDIENCE ===
Write for: ${audience}
Tone: casual, conversational, first-person ("I", "my") — like a friend recommending it

=== SETTING ===
Film all scenes in: ${setting}

=== VISUAL STYLE ===
- 9:16 vertical smartphone UGC aesthetic
- Handheld camera, slight shake for realism
- Natural or soft ambient lighting
- Shallow depth of field, soft bokeh background
- Close-up intimate framing
- Real skin texture, no studio polish
- Focus style: ${focusCopy}

=== CREATOR & PRODUCT VISUALS ===
Avatar: ${avatarDesc}${hasAvatar ? ` (${avatarImages.length} reference image(s) provided — use this exact person in every scene)` : " (no image provided — keep appearance consistent throughout)"}
Product: ${productDesc}${hasProduct ? ` (${primaryImages.length} reference image(s) provided — use this exact product design in every scene)` : " (no image provided — follow description precisely)"}

=== SCENE RULES ===
1. EVERY scene must say "${productName}" by name — no exceptions
2. EVERY scene must show "${productName}" in "${setting}"
3. Build emotional arc: relatable problem → discovery → solution → result → CTA
4. Voiceover must sound natural, NOT like an ad script
5. End with a clear, enthusiastic call-to-action

${negativePrompt ? `=== DO NOT INCLUDE ===\n${negativePrompt}\n` : ""}

=== OUTPUT FORMAT (STRICT) ===
Return ONLY a valid JSON array. No markdown. No explanation. No code fences.
Start with [ and end with ].

Each scene object must follow this exact shape:
{
  "image_prompt": "9:16 UGC smartphone shot, [avatar action] in ${setting}, holding/using ${productName}, [lighting], [camera angle], handheld feel, shallow depth of field",
  "content_text": "Natural first-person voiceover mentioning ${productName} and speaking to ${audience}"
}

REMEMBER: The product is "${productName}". Every scene. No exceptions. Start now.`;
}
export function generateExpansionPrompt({
  skeleton,
  productType,
  avatarDescription,
  environment
}) {
  return `
Expand the following structured UGC outline into cinematic 9:16 UGC image prompts.

Rules:
- iPhone handheld realism
- Natural lighting
- Same avatar and environment
- Product visible in every scene
- No CGI
- No random objects

Product Type: ${productType}
Avatar: ${avatarDescription}
Environment: ${environment}

Skeleton:
${JSON.stringify(skeleton)}

Return strict JSON:
[
  {
    "image_prompt": "...",
    "content_text": "..."
  }
]
`;
}
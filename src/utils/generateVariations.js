import { injectArc } from "./injectArc";
import { validateConfig } from "./conflictValidator";

export async function generateUGCVariations({
  product,
  productType,
  avatarDescription,
  targetAudience,
  environment,
  variationTypes = ["fear", "relatable", "authority"]
}) {

  const results = [];

  for (const type of variationTypes) {

    const arc = injectArc(type);

    const config = {
      productType,
      targetAudience,
      environment,
      tone: type
    };

    const { errors } = validateConfig(config);
    if (errors.length) continue;

    results.push({
      variation: type,
      arc,
      status: "ready_for_generation"
    });
  }

  return results;
}
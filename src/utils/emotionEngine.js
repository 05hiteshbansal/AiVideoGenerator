/**
 * Emotion Engine for Script Variations
 * Generates three different emotional approaches for the same script
 */

export const VARIATION_TYPES = {
  FEAR_BASED: "fear_based",
  RELATABLE: "relatable",
  AUTHORITY: "authority",
};

export const EMOTION_ARCS = {
  fear_based: {
    hookStyle: "fear trigger",
    tone: "urgent protective",
    emotionalArc: [
      { scene: 1, emotion: "fear" },
      { scene: 2, emotion: "vulnerability" },
      { scene: 3, emotion: "action" },
      { scene: 4, emotion: "security proof" },
      { scene: 5, emotion: "relief" },
      { scene: 6, emotion: "authority CTA" },
    ],
  },
  relatable: {
    hookStyle: "shared struggle",
    tone: "empathetic friendly",
    emotionalArc: [
      { scene: 1, emotion: "frustration" },
      { scene: 2, emotion: "recognition" },
      { scene: 3, emotion: "curiosity" },
      { scene: 4, emotion: "excitement" },
      { scene: 5, emotion: "satisfaction" },
      { scene: 6, emotion: "encouraging CTA" },
    ],
  },
  authority: {
    hookStyle: "credibility hook",
    tone: "confident expert",
    emotionalArc: [
      { scene: 1, emotion: "attention grab" },
      { scene: 2, emotion: "problem identification" },
      { scene: 3, emotion: "expert insight" },
      { scene: 4, emotion: "proof demonstration" },
      { scene: 5, emotion: "transformation" },
      { scene: 6, emotion: "direct command CTA" },
    ],
  },
};

/**
 * Generate emotion-driven prompt modifications
 */
export function getEmotionPromptModifier(variationType, sceneIndex) {
  const arc = EMOTION_ARCS[variationType];
  if (!arc || !arc.emotionalArc[sceneIndex]) {
    return "";
  }

  const sceneEmotion = arc.emotionalArc[sceneIndex].emotion;

  const modifiers = {
    fear_based: {
      fear: "Show urgent warning, worried expression, dramatic lighting with shadows",
      vulnerability:
        "Confused, helpless body language, soft concerned lighting",
      action: "Determined expression, taking control, dynamic movement",
      "security proof":
        "Relief washing over face, protective stance, warm reassuring lighting",
      relief: "Calm confident smile, relaxed posture, bright safe lighting",
      "authority CTA":
        "Direct eye contact, assertive gesture, professional commanding presence",
    },
    relatable: {
      frustration:
        "Relatable annoyed expression, everyday setting, natural realistic lighting",
      recognition:
        "Head nodding, 'I get it' moment, warm empathetic eye contact",
      curiosity: "Eyebrows raised, leaning in, bright interested expression",
      excitement:
        "Genuine smile forming, energetic body language, vibrant lighting",
      satisfaction: "Authentic happy expression, relaxed confident posture",
      "encouraging CTA":
        "Friendly smile, inviting gesture, warm approachable lighting",
    },
    authority: {
      "attention grab":
        "Confident direct stare, professional setting, sharp clean lighting",
      "problem identification":
        "Knowing expression, pointing out issue, authoritative stance",
      "expert insight":
        "Teaching gesture, credible backdrop, professional lighting",
      "proof demonstration":
        "Showing evidence, detailed close-up, clear demonstration",
      transformation:
        "Before/after contrast, impressive reveal, dramatic lighting shift",
      "direct command CTA":
        "Pointing at camera, commanding presence, bold direct lighting",
    },
  };

  return modifiers[variationType]?.[sceneEmotion] || "";
}

/**
 * Generate tone modifications for content text
 */
export function getToneModifier(variationType) {
  const toneModifiers = {
    fear_based:
      "Use urgent language, highlight risks, create protective urgency, end with authoritative call to action",
    relatable:
      "Use conversational language, acknowledge shared struggles, be empathetic and encouraging, end with friendly invitation",
    authority:
      "Use expert terminology, demonstrate credibility, be direct and confident, end with commanding instruction",
  };

  return toneModifiers[variationType] || "";
}

/**
 * Get hook directive for first scene
 */
export function getHookDirective(variationType) {
  const hookDirectives = {
    fear_based:
      "Start with a shocking statistic or warning that creates immediate concern",
    relatable:
      "Start with a frustrating scenario your audience instantly recognizes",
    authority:
      "Start with a bold credibility statement or surprising expert insight",
  };

  return hookDirectives[variationType] || "";
}

/**
 * Get CTA directive for final scene
 */
export function getCtaDirective(variationType) {
  const ctaDirectives = {
    fear_based:
      "End with protective action: 'Don't let this happen to you - get [product] now'",
    relatable:
      "End with friendly encouragement: 'You deserve this - try [product] today'",
    authority: "End with expert command: 'Do what the pros do - use [product]'",
  };

  return ctaDirectives[variationType] || "";
}

/**
 * Generate complete variation metadata
 */
export function getVariationMetadata(variationType) {
  const arc = EMOTION_ARCS[variationType];

  return {
    variationType,
    hookStyle: arc.hookStyle,
    tone: arc.tone,
    emotionalArc: arc.emotionalArc,
    scenes: arc.emotionalArc.length,
  };
}

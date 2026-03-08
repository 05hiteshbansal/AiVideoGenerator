"use client";
import React from "react";
import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";

const VariationSelector = ({
  variations,
  onSelectVariation,
  selectedVariation,
}) => {
  if (!variations) return null;

  const variationInfo = {
    fear_based: {
      title: "Fear-Based",
      emoji: "⚠️",
      description: "Creates urgency through protective messaging",
      color: "danger",
      hookExample: "Fear trigger with urgent protective tone",
    },
    relatable: {
      title: "Relatable",
      emoji: "🤝",
      description: "Empathetic approach with shared struggles",
      color: "primary",
      hookExample: "Shared struggle with empathetic friendly tone",
    },
    authority: {
      title: "Authority",
      emoji: "👔",
      description: "Expert credibility and confident direction",
      color: "secondary",
      hookExample: "Credibility hook with confident expert tone",
    },
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">
          Choose Your Emotional Strategy
        </h2>
        <p className="text-sm text-slate-600">
          Three variations crafted with different emotional approaches. Select
          one to continue with image generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(variations).map(([varType, variation]) => {
          const info = variationInfo[varType];
          const isSelected = selectedVariation === varType;

          return (
            <Card
              key={varType}
              isPressable
              isHoverable
              className={`transition-all ${
                isSelected
                  ? "ring-4 ring-purple-500 shadow-xl scale-105"
                  : "hover:shadow-lg"
              }`}
              onPress={() => onSelectVariation(varType)}
            >
              <CardHeader className="flex-col items-start gap-2 pb-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{info.emoji}</span>
                    <h3 className="text-lg font-bold">{info.title}</h3>
                  </div>
                  {isSelected && (
                    <Chip color="success" size="sm" variant="flat">
                      ✓ Selected
                    </Chip>
                  )}
                </div>
                <p className="text-xs text-slate-600">{info.description}</p>
              </CardHeader>

              <CardBody className="space-y-3 pt-2">
                {/* Metadata */}
                <div className="space-y-1 bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                      Hook Style:
                    </span>
                    <span className="text-xs text-slate-700">
                      {variation.metadata.hookStyle}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                      Tone:
                    </span>
                    <span className="text-xs text-slate-700">
                      {variation.metadata.tone}
                    </span>
                  </div>
                </div>

                {/* Emotional Arc Preview */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Emotional Arc:
                  </p>
                  <div className="space-y-1">
                    {variation.metadata.emotionalArc.slice(0, 3).map((arc) => (
                      <div
                        key={arc.scene}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Chip size="sm" variant="flat" color={info.color}>
                          {arc.scene}
                        </Chip>
                        <span className="text-slate-600">{arc.emotion}</span>
                      </div>
                    ))}
                    {variation.metadata.emotionalArc.length > 3 && (
                      <p className="text-xs text-slate-400 italic">
                        +{variation.metadata.emotionalArc.length - 3} more
                        scenes
                      </p>
                    )}
                  </div>
                </div>

                {/* Scene count */}
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    {variation.scenes.length} scenes • Ready for generation
                  </p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VariationSelector;

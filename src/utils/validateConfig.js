export function validateConfig(config) {
  const errors = [];
  const warnings = [];

  // Animated vs realism conflict
  if (config.animated && config.style?.includes("No CGI")) {
    errors.push("Conflict: Cannot request animated visuals and 'No CGI' realism.");
  }

  // Product-environment mismatch
  if (
    config.productType === "mobile_app" &&
    config.environment === "bathroom"
  ) {
    warnings.push("Mobile app in bathroom may cause contextual drift.");
  }

  // Sensitive audience + hype tone
  if (
    config.targetAudience?.includes("children") &&
    config.tone?.toLowerCase().includes("aggressive")
  ) {
    errors.push("Aggressive tone not suitable for children.");
  }

  return { errors, warnings };
}
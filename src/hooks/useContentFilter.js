"use client";
import { useState, useEffect, useCallback } from "react";
import { useDropdownConfig } from "./useDropdownConfig";
import {
  checkBlockedContent,
  validateMultipleFields,
  getBlockedContentMessage,
} from "@/utils/contentFilter";

/**
 * Hook for content filtering functionality
 */
export function useContentFilter() {
  const { config, loading } = useDropdownConfig();
  const [mounted, setMounted] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [blockedKeywords, setBlockedKeywords] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (config) {
      setFilterEnabled(config.enableContentFilter ?? true);
      setBlockedKeywords(config.blockedKeywords || []);
    }
  }, [config]);

  /**
   * Check if a single text field contains blocked content
   */
  const checkText = useCallback(
    (text) => {
      if (!mounted || !filterEnabled || !text) {
        return { isBlocked: false, matchedKeywords: [] };
      }
      return checkBlockedContent(text, blockedKeywords);
    },
    [mounted, filterEnabled, blockedKeywords],
  );

  /**
   * Validate multiple fields at once
   */
  const validateFields = useCallback(
    (fields) => {
      if (!mounted || !filterEnabled) {
        return { isValid: true, blockedFields: [] };
      }
      return validateMultipleFields(fields, blockedKeywords);
    },
    [mounted, filterEnabled, blockedKeywords],
  );

  /**
   * Get user-friendly error message
   */
  const getErrorMessage = useCallback((matchedKeywords) => {
    return getBlockedContentMessage(matchedKeywords);
  }, []);

  return {
    checkText,
    validateFields,
    getErrorMessage,
    filterEnabled,
    blockedKeywords,
    config,
    loading,
    mounted,
  };
}

export default useContentFilter;

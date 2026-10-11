"use client";

import { useState, useCallback, useEffect } from "react";

export interface LeadSubmissionData {
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  location?: string;
  propertyType?: "Residential" | "Commercial" | "Other";
  monthlyBill?: string;
  monthlyElectricityBill?: string;
  interestedService?: string;
  estimatedCapacityKW?: string;
  message?: string;
  source?: string;
  website?: string; // Honeypot field
  [key: string]: any;
}

export interface UseLeadSubmitOptions {
  defaultSource?: string;
  onSuccess?: (leadId: string) => void;
  onError?: (error: string) => void;
}

export function useLeadSubmit(options: UseLeadSubmitOptions = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [utmParams, setUtmParams] = useState<{
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }>({});

  // Capture UTM parameters from URL on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setUtmParams({
        utmSource: searchParams.get("utm_source") || undefined,
        utmMedium: searchParams.get("utm_medium") || undefined,
        utmCampaign: searchParams.get("utm_campaign") || undefined,
      });
    }
  }, []);

  const submitLead = useCallback(
    async (formData: LeadSubmissionData): Promise<boolean> => {
      // Prevent duplicate submissions while in progress
      if (isSubmitting) return false;

      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        const payload = {
          ...formData,
          source: formData.source || options.defaultSource || "website",
          utmSource: utmParams.utmSource,
          utmMedium: utmParams.utmMedium,
          utmCampaign: utmParams.utmCampaign,
        };

        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          const userFriendlyError =
            data.message ||
            "Something went wrong. Please try again or contact us directly.";
          setErrorMessage(userFriendlyError);
          options.onError?.(userFriendlyError);
          return false;
        }

        setIsSuccess(true);
        setLeadId(data.leadId || null);
        options.onSuccess?.(data.leadId);
        return true;
      } catch (err: unknown) {
        console.error("[Lead Submission Error]:", err);
        const fallbackMsg =
          "Something went wrong. Please try again or contact us directly.";
        setErrorMessage(fallbackMsg);
        options.onError?.(fallbackMsg);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, options, utmParams]
  );

  const resetState = useCallback(() => {
    setIsSuccess(false);
    setErrorMessage(null);
    setLeadId(null);
  }, []);

  return {
    submitLead,
    isSubmitting,
    isSuccess,
    errorMessage,
    leadId,
    resetState,
    setIsSuccess,
  };
}

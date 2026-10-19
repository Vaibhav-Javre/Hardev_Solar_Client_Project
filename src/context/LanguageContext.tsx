"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type Language = "en" | "mr" | "hi";

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
];

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const DICTIONARY: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { en: "Home", mr: "मुख्यपृष्ठ", hi: "होम" },
  "nav.about": { en: "About", mr: "आमच्याबद्दल", hi: "हमारे बारे में" },
  "nav.solutions": { en: "Solutions", mr: "सोलर सोल्यूशन्स", hi: "सोलर समाधान" },
  "nav.projects": { en: "Projects", mr: "प्रकल्प", hi: "प्रोजेक्ट्स" },
  "nav.calculator": { en: "Solar Calculator", mr: "सोलर कॅल्क्युलेटर", hi: "सोलर कैलकुलेटर" },
  "nav.faq": { en: "FAQ", mr: "वारंवार विचारले जाणारे प्रश्न", hi: "अक्सर पूछे जाने वाले प्रश्न" },
  "nav.contact": { en: "Contact", mr: "संपर्क", hi: "संपर्क करें" },
  "nav.getQuote": { en: "Get Solar Estimate", mr: "सोलर अंदाज मिळवा", hi: "सोलर एस्टीमेट पाएं" },
  "nav.whatsapp": { en: "WhatsApp Us", mr: "व्हॉट्सॲप करा", hi: "व्हाट्सएप करें" },
  "nav.callNow": { en: "Call Now", mr: "आत्ताच कॉल करा", hi: "अभी कॉल करें" },
  "nav.scope": { en: "Solar Solutions Across Maharashtra", mr: "संपूर्ण महाराष्ट्रात सोलर सोल्यूशन्स", hi: "पूरे महाराष्ट्र में सोलर समाधान" },
  "nav.partnership": { en: "In partnership with Swayam Infraverse", mr: "स्वयं इन्फ्राव्हर्सच्या सहकार्याने", hi: "स्वयं इंफ्रावर्स के सहयोग से" },

  // Consultation Form
  "form.badge": { en: "Zero Obligation Rooftop Survey", mr: "विनामूल्य छताचे सर्वेक्षण", hi: "निःशुल्क छत सर्वेक्षण" },
  "form.title": { en: "Request a Quote from Hardev Solar Services", mr: "हरदेव सोलर सर्व्हिसेसकडून कोटेशन मिळवा", hi: "हरदेव सोलर सर्विसेज से कोटेशन प्राप्त करें" },
  "form.subtitle": { en: "Fill in a few details and our solar team will calculate your rooftop potential and prepare a customized solar plan across Maharashtra.", mr: "काही माहिती भरा आणि आमची सोलर टीम आपल्या छताच्या क्षमतेनुसार संपूर्ण महाराष्ट्रात सोलर योजना तयार करेल.", hi: "कुछ विवरण भरें और हमारी सोलर टीम आपकी छत की क्षमता के अनुसार अनुकूलित सोलर योजना तैयार करेगी।" },
  "form.fullName": { en: "Full Name", mr: "पूर्ण नाव", hi: "पूरा नाम" },
  "form.mobileNumber": { en: "Mobile Number", mr: "मोबाईल नंबर", hi: "मोबाइल नंबर" },
  "form.email": { en: "Customer Email", mr: "ईमेल पत्ता", hi: "ईमेल पता" },
  "form.propertyType": { en: "Property Type", mr: "इमारत / मालमत्तेचा प्रकार", hi: "संपत्ति का प्रकार" },
  "form.location": { en: "City / Location", mr: "शहर / ठिकाण", hi: "शहर / स्थान" },
  "form.monthlyBill": { en: "Monthly Electricity Bill", mr: "मासिक वीज बिल", hi: "मासिक बिजली बिल" },
  "form.requirements": { en: "Describe Your Requirements / Questions (Optional)", mr: "आपल्या गरजा किंवा प्रश्न नमूद करा (ऐच्छिक)", hi: "अपनी आवश्यकताएं या प्रश्न लिखें (वैकल्पिक)" },
  "form.submit": { en: "Get My Solar Estimate", mr: "माझा सोलर अंदाज मिळवा", hi: "मेरा सोलर एस्टीमेट प्राप्त करें" },
  "form.submitting": { en: "Submitting Enquiry...", mr: "माहिती पाठवत आहे...", hi: "जानकारी सबमिट हो रही है..." },
  "form.trust": { en: "Your information is safe with us.", mr: "तुमची माहिती आमच्याकडे पूर्णपणे सुरक्षित आहे.", hi: "आपकी जानकारी हमारे पास सुरक्षित है।" },

  // Common CTAs & Labels
  "cta.requestSimilar": { en: "Request Similar Installation", mr: "अशाच इन्स्टॉलेशनची विनंती करा", hi: "समान इंस्टॉलेशन का अनुरोध करें" },
  "cta.viewProjects": { en: "Explore All Installations", mr: "सर्व प्रकल्प एक्सप्लोर करा", hi: "सभी प्रोजेक्ट्स देखें" },
  "cta.calculateSavings": { en: "Calculate Solar Savings", mr: "सोलर बचत मोजा", hi: "सोलर बचत की गणना करें" },
  // Admin Navigation & Layout
  "admin.nav.dashboard": { en: "Dashboard", mr: "डॅशबोर्ड", hi: "डैशबोर्ड" },
  "admin.nav.leads": { en: "Leads Management", mr: "लीड्स व्यवस्थापन", hi: "लीड्स प्रबंधन" },
  "admin.nav.projects": { en: "Projects", mr: "सोलर प्रकल्प", hi: "सोलर प्रोजेक्ट्स" },
  "admin.nav.testimonials": { en: "Testimonials", mr: "प्रशंसापत्रे", hi: "प्रशंसापत्र" },
  "admin.nav.management": { en: "Management Navigation", mr: "व्यवस्थापन मेनू", hi: "प्रबंधन नेविगेशन" },
  "admin.workspace": { en: "Admin Workspace", mr: "प्रशासक कार्यक्षेत्र", hi: "एडमिन कार्यक्षेत्र" },
  "admin.changePassword": { en: "Change Password", mr: "पासवर्ड बदला", hi: "पासवर्ड बदलें" },
  "admin.viewPublic": { en: "View Public Website", mr: "सार्वजनिक वेबसाइट पहा", hi: "पब्लिक वेबसाइट देखें" },
  "admin.signOut": { en: "Sign Out", mr: "साइन आउट", hi: "साइन आउट" },
  "admin.signingOut": { en: "Signing Out...", mr: "साइन आउट होत आहे...", hi: "साइन आउट हो रहे हैं..." },
  "admin.active": { en: "Admin Active", mr: "प्रशासक सक्रिय", hi: "एडमिन सक्रिय" },
  "admin.language": { en: "Language", mr: "भाषा", hi: "भाषा" },
  "admin.languageSelect": { en: "Select Language / भाषा निवडा", mr: "भाषा निवडा / Select Language", hi: "भाषा चुनें / Select Language" },
  "admin.administrator": { en: "Administrator", mr: "प्रशासक", hi: "एडमिनिस्ट्रेटर" },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

// Helper to thoroughly clear all Google Translate cookies across paths and domains
function clearGoogleTranslateCookies() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`];

  const parts = host.split(".");
  for (let i = 0; i < parts.length; i++) {
    const d = parts.slice(i).join(".");
    domains.push(d);
    domains.push(`.${d}`);
  }

  const paths = ["/", "", "/en", "/mr", "/hi"];
  const cookiesToClear = ["googtrans", "googtrans_en", "goog_pem_mod"];

  cookiesToClear.forEach((name) => {
    domains.forEach((d) => {
      paths.forEach((p) => {
        const domainStr = d ? `; domain=${d}` : "";
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${p}${domainStr};`;
        document.cookie = `${name}=; max-age=0; path=${p}${domainStr};`;
      });
    });
  });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  // Apply language change to both custom state and Google Translate engine
  const applyLanguage = useCallback((lang: Language) => {
    if (typeof window === "undefined") return;

    if (lang === "en") {
      // 1. Thoroughly wipe all Google Translate cookies
      clearGoogleTranslateCookies();
      localStorage.setItem("hardev_language", "en");
      setLanguageState("en");

      // 2. Reset the combo box if available
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = "";
        select.dispatchEvent(new Event("change"));
      }

      // 3. Remove translate classes from html/body
      document.documentElement.classList.remove("translated-ltr", "translated-rtl");
      document.body.classList.remove("translated-ltr", "translated-rtl");

      // 4. Reload page cleanly to restore original English React DOM without font tags
      setTimeout(() => {
        window.location.reload();
      }, 50);
      return;
    }

    // Switching to Marathi or Hindi
    try {
      localStorage.setItem("hardev_language", lang);
      setLanguageState(lang);

      // Set cookie for root path and current domain
      const host = window.location.hostname;
      const cookieValue = `/en/${lang}`;

      document.cookie = `googtrans=${cookieValue}; path=/;`;
      if (host && host !== "localhost") {
        document.cookie = `googtrans=${cookieValue}; path=/; domain=${host};`;
        document.cookie = `googtrans=${cookieValue}; path=/; domain=.${host};`;
      }

      // Trigger Google Translate dropdown element if present
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change"));
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        // If select isn't available yet, reload so the cookie takes effect on mount
        setTimeout(() => {
          window.location.reload();
        }, 50);
      }
    } catch (err) {
      console.warn("[Language] Error persisting language:", err);
    }
  }, []);

  // Initialize from localStorage or cookie
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = (localStorage.getItem("hardev_language") as Language) || "en";

      if (savedLang === "en") {
        // Clear any leftover translation cookies from past sessions
        clearGoogleTranslateCookies();
        setLanguageState("en");
      } else if (savedLang === "mr" || savedLang === "hi") {
        setLanguageState(savedLang);
        const host = window.location.hostname;
        const cookieValue = `/en/${savedLang}`;
        document.cookie = `googtrans=${cookieValue}; path=/;`;
        if (host && host !== "localhost") {
          document.cookie = `googtrans=${cookieValue}; path=/; domain=${host};`;
          document.cookie = `googtrans=${cookieValue}; path=/; domain=.${host};`;
        }
      }

      // Initialize Google Translate Script dynamically if not already injected
      if (!document.getElementById("google-translate-script")) {
        window.googleTranslateElementInit = () => {
          if (window.google?.translate?.TranslateElement) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,mr,hi",
                autoDisplay: false,
                layout: window.google.translate.TranslateElement.InlineLayout?.HORIZONTAL,
              },
              "google_translate_element"
            );

            // If a non-English language is active, ensure the combo matches after init
            if (savedLang && savedLang !== "en") {
              setTimeout(() => {
                const select = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
                if (select && select.value !== savedLang) {
                  select.value = savedLang;
                  select.dispatchEvent(new Event("change"));
                }
              }, 300);
            }
          }
        };

        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      setIsInitialized(true);
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const entry = DICTIONARY[key];
      if (entry && entry[language]) {
        return entry[language];
      }
      return fallback || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage: applyLanguage, t }}>
      {children}
      {/* Hidden container for Google Translate Engine */}
      <div
        id="google_translate_element"
        className="hidden"
        style={{ display: "none", position: "absolute", top: "-9999px" }}
      />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

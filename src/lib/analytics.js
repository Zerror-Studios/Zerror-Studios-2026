// Google Analytics 4. Set NEXT_PUBLIC_GA_ID (starts with "G-") to switch it on.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Call after any form is sent successfully.
export function trackLead(formName) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "generate_lead", { form_name: formName });
}

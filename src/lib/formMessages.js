// Shared form copy (see zerror-website-handoff/09-contact.md). Every form uses these.
export const STUDIO_EMAIL = "admin@zerrorstudios.com";

export const FORM_MESSAGES = {
  sentTitle: "Thank you. It's with us.",
  sentText: "We read every message ourselves and will be in touch soon. Until then, have a look at our work.",
  sentButton: "See our work",
  careersSent: "Thank you. Your work is with us. If there is a fit, we will reach out.",
  errorTitle: "That didn't go through.",
  errorText: `Something broke on our side, not yours. Try again in a moment, or write to us at ${STUDIO_EMAIL}.`,
  offline: "You seem to be offline. Check your connection and try again.",
  sending: "Sending…",
  send: "Send",
  fields: {
    name: "We'll need your name.",
    brand: "Which brand is this for?",
    email: "That email doesn't look quite right.",
    phone: "That number doesn't look quite right.",
    services: "Pick at least one, or \"Not sure yet\".",
  },
};

export const SERVICE_OPTIONS = ["Website", "eCommerce", "Software", "Branding, marketing and SEO", "Not sure yet"];

export const isValidEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export const isValidPhone = (value = "") => /^\+?[\d\s()-]{7,16}$/.test(value.trim());

// Returns "offline" | "error" for a failed send.
export const failureKind = () =>
  typeof navigator !== "undefined" && navigator.onLine === false ? "offline" : "error";

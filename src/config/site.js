export const siteConfig = {
  name: "Zerror Studios | Animated Websites, eCommerce & Custom CMS",
  description: "Zerror Studios crafts next-gen GSAP-powered websites, custom eCommerce solutions, and advanced CMS for brands that dare to stand out. Elevate your digital presence today.",
  url: "https://www.zerrorstudios.com/",
  locale: "en_IN",
  language: "en-IN",
  ogImage: "/favicon/favicon.ico",
  keywords: [],
  contact: {
    phone: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "IN",
  },
  socials: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  },
};

export const siteRoutes = [
  {
    path: "/",
    label: "Home",
    title: "Home",
    description: siteConfig.description,
    priority: 1,
  },
  {
    path: "/about",
    label: "About",
    title: "About",
    description: "",
    priority: 0.8,
  },
  {
    path: "/contact",
    label: "Contact",
    title: "Contact",
    description: "",
    priority: 0.7,
  },
  {
    path: "/demo",
    label: "Demo",
    title: "Demo",
    description: "",
    priority: 0.7,
  },
  {
    path: "/expertise",
    label: "Expertise",
    title: "Expertise",
    description: "",
    priority: 0.8,
  },
  {
    path: "/pitchdeck",
    label: "Pitchdeck",
    title: "Pitchdeck",
    description: "",
    priority: 0.7,
  },
  {
    path: "/work",
    label: "Work",
    title: "Work",
    description: "",
    priority: 0.8,
  },
];

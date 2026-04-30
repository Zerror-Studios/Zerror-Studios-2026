import ContactHome from "@/components/contact/ContactHome";
import WebPageSchema from "@/components/seo/WebPageSchema";

const contact = () => {

  return (
    <>
      <WebPageSchema
        name="Contact Zerror Studios | Start Your Project"
        description="Have a project in mind? Contact Zerror Studios for GSAP-powered animations, Next.js development, Three.js experiences, and high-performance websites."
        url="https://www.zerrorstudios.com/contact"
      />
      <ContactHome />
    </>
  );
};

export default contact;

export const metadata = {
  title: "Contact Zerror Studios | Start Your Project",
  description:
    "Have a project in mind? Contact Zerror Studios for GSAP-powered animations, Next.js development, Three.js experiences, and high-performance websites.",

  keywords: [
    "contact Zerror Studios",
    "hire web development agency",
    "GSAP animation experts",
    "Next.js development agency",
    "Three.js developers",
    "start web project",
    "creative web studio contact",
  ].join(", "),

  alternates: {
    canonical: "https://www.zerrorstudios.com/contact",
  },

  openGraph: {
    title: "Contact Zerror Studios | Start Your Project",
    description:
      "Let’s build something exceptional. Reach out for animation-driven websites, interactive experiences, and modern web development.",
    url: "https://www.zerrorstudios.com/contact",
    siteName: "Zerror Studios",
    type: "website",
    images: ["/og.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Zerror Studios | Start Your Project",
    description:
      "Start your next web project with Zerror Studios—experts in GSAP, Next.js, and immersive digital experiences.",
    images: ["/og.png"],
  },
};
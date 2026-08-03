import ContactHome from "@/components/contact/ContactHome";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Start a Project — Zerror Studios",
  description: "Tell us what you're building. Zerror Studios, Mumbai. We reply the way we build: fast, and with intent.",
  path: "/contact",
});

const contact = () => {

  return (
    <>
      <ContactHome />
    </>
  );
};

export default contact;
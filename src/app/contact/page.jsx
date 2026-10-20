import ContactHome from "@/components/contact/ContactHome";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Start a project | Zerror Studios",
  description: "Tell us about your brand and what you need. Write to admin@zerrorstudios.com or use the form.",
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
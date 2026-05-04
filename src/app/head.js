// app/head.js
export default function Head() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zerror Studios",
    description: "Zerror Studios crafts next-gen GSAP-powered websites, custom eCommerce solutions, and advanced CMS for brands that dare to stand out. Elevate your digital presence today.",
    url: "https://www.zerrorstudios.com",
    logo: "https://www.zerrorstudios.com/logo.svg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </>
  );
}
import "../styles/globals.css";
import "../styles/fonts.css";
import Script from "next/script";
import { createRootMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { GA_ID } from "@/lib/analytics";
import SiteLayout from "@/components/common/SiteLayout";

export const experimental = {
  viewTransition: true,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.zerrorstudios.com/#org",
      "name": "Zerror Studios",
      "url": "https://www.zerrorstudios.com/",
      "logo": "https://www.zerrorstudios.com/logo_white.svg",
      "email": siteConfig.contact.email,
      "foundingDate": "2022-02",
      "description": "A design studio in Mumbai building brands, websites, online stores, software and marketing.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.street,
        "addressLocality": siteConfig.address.city,
        "addressRegion": siteConfig.address.state,
        "postalCode": siteConfig.address.postalCode,
        "addressCountry": siteConfig.address.country
      },
      // Placeholder profiles until the final Instagram and LinkedIn URLs arrive.
      "sameAs": [
        siteConfig.socials.instagram,
        siteConfig.socials.linkedin
      ].filter(Boolean)
    },
    {
      "@type": "WebSite",
      "url": "https://www.zerrorstudios.com/",
      "publisher": { "@id": "https://www.zerrorstudios.com/#org" }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <SiteLayout>{children}</SiteLayout>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

export const metadata = createRootMetadata();

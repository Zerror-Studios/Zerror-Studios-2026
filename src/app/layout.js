import "../styles/globals.css";
import "../styles/fonts.css";
import { createRootMetadata } from "@/lib/seo";
import SiteLayout from "@/components/common/SiteLayout";

export const experimental = {
  viewTransition: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.zerrorstudios.com/#org",
                  "name": "Zerror Studios",
                  "url": "https://www.zerrorstudios.com",
                  "logo": "https://www.zerrorstudios.com/logo_white.svg",
                  "email": "hello@zerrorstudios.com",
                  "sameAs": [
                    "https://www.instagram.com/wearezerrorians",
                    "https://www.linkedin.com/company/official-zerror-studios"
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Mumbai",
                    "addressCountry": "IN"
                  }
                },
                {
                  "@type": "WebSite",
                  "url": "https://www.zerrorstudios.com",
                  "publisher": { "@id": "https://www.zerrorstudios.com/#org" }
                }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}

export const metadata = createRootMetadata();

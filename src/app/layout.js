import "../styles/globals.css";
import "../styles/fonts.css";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import { Const } from "@/components/utils/Constants";

export const experimental = {
  viewTransition: true,
};

export const metadata = {
  metadataBase: new URL(Const?.ClientLink || ""),

  title: {
    default: Const.Brand,
    template: "%s | " + Const.Brand,
  },

  description: Const.Desc,

  keywords: Const.keywords.join(", "),

  authors: [{ name: Const.Brand }],
  publisher: Const.Brand,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  alternates: {
    canonical: "/", // auto-resolves via metadataBase
    languages: {
      "en-IN": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: Const.Brand,
    title: Const.Brand,
    description: Const.Desc,
    url: Const.ClientLink,
    images: [
      {
        url: "/favicon/favicon.ico", // fallback OG image
        width: 1200,
        height: 630,
        alt: Const.Brand,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: Const.Brand,
    description: Const.Desc,
    images: ["/favicon/favicon.ico"],
  },

  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  other: {
    "view-transition": "same-origin",
  },

  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}

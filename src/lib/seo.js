import { siteConfig, siteRoutes } from "@/config/site";
import { absoluteUrl, normalizePath } from "@/utils/url";

export function getPageSeo(path = "/") {
  const normalizedPath = normalizePath(path);
  return (
    siteRoutes.find((route) => route.path === normalizedPath) || {
      path: normalizedPath,
      title: siteConfig.name,
      description: siteConfig.description,
      priority: 0.5,
    }
  );
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  keywords = siteConfig.keywords,
  type = "website",
  noIndex = false,
} = {}) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const pageTitle = title || siteConfig.name;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description,
    keywords,
    authors: [],
    creator: "Zerror Studios",
    publisher: "",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
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
      image_src: imageUrl,
      "view-transition": "same-origin",
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export function createRootMetadata() {
  return {
    ...createMetadata(),
    title: {
      default: siteConfig.name,
      template: "%s | Zerror Studios",
    },
  };
}

export function createPageMetadata(path) {
  const page = getPageSeo(path);

  return createMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

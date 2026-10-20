import { siteConfig, siteRoutes } from "@/config/site";
import { absoluteUrl, normalizePath } from "@/utils/url";

export function getPageSeo(path = "/") {
  const normalizedPath = normalizePath(path);
  return (
    siteRoutes.find((route) => route.path === normalizedPath) || {
      path: normalizedPath,
      title: siteConfig.defaultTitle,
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
  // Titles come in full (they already end in "| Zerror Studios"), so they are
  // used as they are, never run through a template.
  const pageTitle = title || siteConfig.defaultTitle;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { absolute: pageTitle },
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
  // No canonical at the root: each page sets its own, so a page without
  // metadata never points its canonical at the home page.
  // eslint-disable-next-line no-unused-vars
  const { alternates, ...rest } = createMetadata();
  return {
    ...rest,
    title: {
      default: siteConfig.defaultTitle,
    },
  };
}

export function createPageMetadata(path) {
  const page = getPageSeo(path);

  return createMetadata({
    title: page.title,
    description: page.description || siteConfig.description,
    path: page.path,
  });
}

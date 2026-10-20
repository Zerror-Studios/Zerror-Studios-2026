import NotFoundClient from "@/components/common/NotFoundClient";
import { siteConfig } from "@/config/site";

// Next.js already adds <meta name="robots" content="noindex"> to every 404
// response. Clearing the inherited robots metadata here leaves that as the
// only robots tag (noindex; links are still followed by default).
export const metadata = {
  title: { absolute: `Page not found | ${siteConfig.name}` },
  robots: null,
};

export default function NotFound() {
  return <NotFoundClient />;
}

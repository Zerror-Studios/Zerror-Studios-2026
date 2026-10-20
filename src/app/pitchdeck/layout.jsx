import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pitch deck | Zerror Studios",
  description: "The Zerror Studios pitch deck: who we are, the brands we've built and how we work.",
  path: "/pitchdeck",
});

export default function PitchdeckLayout({ children }) {
  return children;
}

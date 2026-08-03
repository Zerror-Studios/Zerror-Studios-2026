import { caseStudies } from '@/data/ProjectsData';
import { createMetadata } from "@/lib/seo";
import WorkDetailClient from './WorkDetailClient';

export function generateMetadata({ params }) {
  const { slug } = params;
  const project = caseStudies.find((p) => p.slug === slug);
  
  if (!project) return {};

  return createMetadata({
    title: `${project.title || 'Client'} Case Study — Zerror Studios`,
    description: `${project.title || 'Client'} case study. Real clients, real stakes, real results.`,
    path: `/work/${slug}`,
    noIndex: slug === 'deveshe-dreams',
  });
}

export default function Page() {
  // Pass down params or let the client component read them via useParams
  return <WorkDetailClient />;
}

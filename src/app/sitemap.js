import { absoluteUrl } from "@/utils/url";
import { caseStudies } from "@/data/ProjectsData";

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/contact',
    '/work',
    '/expertise/websites',
    '/expertise/ecommerce',
    '/expertise/software-and-tools',
    '/expertise/branding-marketing-and-seo',
    '/pitchdeck',
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const legalRoutes = ['/privacy', '/terms'].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  const projectRoutes = caseStudies
    .filter(project => project.slug !== 'deveshe-dreams')
    .map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...routes, ...legalRoutes, ...projectRoutes];
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudy from '@/components/case-study';
import {
  getCaseStudy,
  getNextPublishedCaseStudy,
  publishedCaseStudies,
} from '@/data/case-studies';
import '@/styles/case-study.css';

export function generateStaticParams() {
  return publishedCaseStudies.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project || project.status !== 'published') return {};
  return {
    title: `${project.title} case study — Pozan`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: project.heroImage ? { images: [project.heroImage] } : undefined,
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project || project.status !== 'published') notFound();
  return <CaseStudy project={project} next={getNextPublishedCaseStudy(slug)} />;
}

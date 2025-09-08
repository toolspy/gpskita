import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    type?: string;
    url?: string;
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: string;
  };
  additionalMetaTags?: Array<{
    name: string;
    content: string;
  }>;
}

export function generateMetadata({
  title = 'PureLanding - Beautiful Shadcn UI Landing Page',
  description = 'A beautiful landing page built with Shadcn UI, Next.js 15, Tailwind CSS, and Shadcn UI Blocks.',
  canonical,
  openGraph,
  twitter,
  additionalMetaTags = [],
}: SEOProps): Metadata {
  const defaultOpenGraph = {
    type: 'website' as const,
    url: canonical || 'https://shadcn-landing-page.vercel.app',
    title,
    description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    ...openGraph,
  };

  const defaultTwitter = {
    handle: '@shadcnui',
    site: '@shadcnui',
    cardType: 'summary_large_image' as const,
    ...twitter,
  };

  return {
    title,
    description,
    openGraph: defaultOpenGraph,
    twitter: defaultTwitter,
    other: additionalMetaTags.reduce((acc, tag) => {
      acc[tag.name] = tag.content;
      return acc;
    }, {} as Record<string, string>),
  };
}

// Legacy component for backward compatibility
const SEO = () => null;
export default SEO;

import type { Metadata } from 'next';
import LandingContent, { frontmatter } from '../../content/landing.mdx';
import { LandingNavigation } from '@/components/landing/landing-navigation';
import { LandingFooter, landingMdxComponents } from '@/components/landing/landing-sections';

export const metadata: Metadata = {
  title: frontmatter.title,
  description: frontmatter.description,
  openGraph: {
    title: frontmatter.title,
    description: frontmatter.description,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="landing-page">
      <LandingNavigation />
      <main>
        <LandingContent components={landingMdxComponents} />
      </main>
      <LandingFooter />
    </div>
  );
}

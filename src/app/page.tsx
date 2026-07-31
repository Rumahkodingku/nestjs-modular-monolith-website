import type { Metadata } from 'next';
import { ArchitectureSection } from '@/components/landing/architecture-section';
import { DeveloperExperienceSection } from '@/components/landing/developer-experience-section';
import { FeatureGridSection } from '@/components/landing/feature-grid-section';
import { FinalCtaSection } from '@/components/landing/final-cta-section';
import { HeroSection } from '@/components/landing/hero-section';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingNavigation } from '@/components/landing/landing-navigation';
import { ProductMetaSection } from '@/components/landing/product-meta-section';
import { WorkflowSection } from '@/components/landing/workflow-section';

const title = 'NestJS Modular Monolith Starter Kit';
const description =
  'A production-minded NestJS backend foundation with authentication, user management, RBAC, PostgreSQL, OpenAPI, and operational tooling.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="landing-page">
      <LandingNavigation />
      <main>
        <HeroSection />
        <ProductMetaSection />
        <FeatureGridSection />
        <ArchitectureSection />
        <DeveloperExperienceSection />
        <WorkflowSection />
        <FinalCtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}

import type { Metadata } from "next";
import { ArchitectureSection } from "@/components/landing/section/architecture-section";
import { DeveloperExperienceSection } from "@/components/landing/section/developer-experience-section";
import { FeatureGridSection } from "@/components/landing/section/feature-grid-section";
import { FinalCtaSection } from "@/components/landing/section/final-cta-section";
import { HeroSection } from "@/components/landing/section/hero-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingNavigation } from "@/components/landing/landing-navigation";
import { ProductMetaSection } from "@/components/landing/section/product-meta-section";
import { WorkflowSection } from "@/components/landing/section/workflow-section";

const title = "NestJS Modular Monolith Starter Kit";
const description =
    "A production-minded NestJS backend foundation with authentication, user management, RBAC, PostgreSQL, OpenAPI, and operational tooling.";

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        type: "website",
    },
};

export default function HomePage() {
    return (
        <div className="landing-page">
            <LandingNavigation />
            <main id="main-content">
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

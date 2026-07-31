import Image from "next/image";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { appName, githubUrl } from "@/lib/shared";
import { LandingIcon } from "./landing-icon";
import { Reveal, ScrollStory } from "./landing-motion";

type HeroSectionProps = {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
};

export function HeroSection({
    eyebrow,
    title,
    description,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
}: HeroSectionProps) {
    return (
        <section className="landing-hero border-b border-line">
            <div aria-hidden="true" className="landing-hero-wash" />
            <div className="site-container relative grid min-h-[calc(100dvh-4.5rem)] items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(28rem,0.95fr)] lg:gap-10 lg:py-16">
                <div className="relative z-[1] max-w-3xl">
                    <p className="landing-accent-label landing-enter font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                        {eyebrow}
                    </p>
                    <h1 className="landing-enter landing-enter-delay-1 mt-5 text-[clamp(3rem,5vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.065em]">
                        {title}
                    </h1>
                    <p className="landing-enter landing-enter-delay-2 mt-7 max-w-[38rem] text-base leading-7 text-ink-secondary sm:text-lg sm:leading-8">
                        {description}
                    </p>
                    <div className="landing-enter landing-enter-delay-3 mt-9 flex flex-col gap-3 min-[420px]:flex-row">
                        <Link className="landing-button landing-button-primary" href={primaryHref}>
                            {primaryLabel}
                            <LandingIcon className="size-4" icon="ph:arrow-right" />
                        </Link>
                        <Link
                            className="landing-button landing-button-secondary"
                            href={secondaryHref}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <LandingIcon className="size-4" icon="ph:github-logo" />
                            {secondaryLabel}
                        </Link>
                    </div>
                </div>

                <div className="landing-enter landing-enter-delay-2 relative lg:-mr-[7vw]">
                    <div
                        aria-hidden="true"
                        className="absolute -inset-4 rounded-md border border-brand/15 bg-brand/5"
                    />
                    <div className="landing-hero-visual relative aspect-video overflow-hidden rounded-md border border-line bg-code shadow-panel">
                        <Image
                            alt="OpenAPI documentation and RBAC capabilities shown in the light theme"
                            className="object-cover dark:hidden"
                            fill
                            priority
                            sizes="(min-width: 1024px) 58vw, 100vw"
                            src="/images/images-2.webp"
                        />
                        <Image
                            alt="OpenAPI documentation and RBAC capabilities shown in the dark theme"
                            className="hidden object-cover dark:block"
                            fill
                            priority
                            sizes="(min-width: 1024px) 58vw, 100vw"
                            src="/images/images-1.webp"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

type ProductMetaItem = {
    label: string;
    value: string;
    icon: string;
};

type ProductMetaProps = {
    items: ProductMetaItem[];
};

export function ProductMeta({ items }: ProductMetaProps) {
    return (
        <section aria-label="Product metadata" className="border-b border-line">
            <div className="site-container">
                <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {items.map((item) => (
                        <div className="flex min-h-28 gap-4 bg-canvas px-5 py-6" key={item.label}>
                            <LandingIcon className="mt-0.5 size-5 shrink-0 text-brand" icon={item.icon} />
                            <div>
                                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                                    {item.label}
                                </p>
                                <p className="mt-2 text-sm font-semibold leading-5">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

type FeatureGridProps = {
    title: string;
    description: string;
    children: ReactNode;
};

export function FeatureGrid({ title, description, children }: FeatureGridProps) {
    return (
        <section className="section" id="features">
            <div className="site-container">
                <Reveal className="max-w-3xl">
                    <h2 className="landing-section-title">{title}</h2>
                    <p className="landing-section-copy mt-5">{description}</p>
                </Reveal>
                <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
                    {children}
                </div>
            </div>
        </section>
    );
}

type FeatureCardProps = {
    icon: string;
    title: string;
    description: string;
    items: string[];
    size?: "standard" | "wide";
    tone?: "base" | "accent" | "code";
};

const featureSizeClasses = {
    standard: "xl:col-span-5",
    wide: "md:col-span-2 xl:col-span-7",
} as const;

const featureToneClasses = {
    base: "bg-surface text-ink",
    accent: "bg-brand text-brand-foreground",
    code: "bg-code text-white",
} as const;

export function FeatureCard({ icon, title, description, items, size = "standard", tone = "base" }: FeatureCardProps) {
    const mutedClass =
        tone === "accent" ? "text-brand-foreground" : tone === "code" ? "text-white/65" : "text-ink-secondary";
    const itemClass =
        tone === "accent"
            ? "border-white/20 bg-white/10 text-white"
            : tone === "code"
              ? "border-white/10 bg-white/5 text-white/80"
              : "border-line bg-elevated text-ink-secondary";

    return (
        <Reveal className={`${featureSizeClasses[size]} h-full`}>
            <article
                className={`landing-feature-card flex h-full min-h-[22rem] flex-col justify-between rounded-md border border-line p-6 sm:p-8 ${featureToneClasses[tone]}`}
            >
                <div>
                    <LandingIcon
                        className={`size-8 ${tone === "accent" ? "text-white" : tone === "code" ? "text-brand" : "text-brand"}`}
                        icon={icon}
                    />
                    <h3 className="mt-8 max-w-xl text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{title}</h3>
                    <p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${mutedClass}`}>{description}</p>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                    {items.map((item) => (
                        <span
                            className={`rounded-sm border px-3 py-2 font-mono text-[0.6875rem] ${itemClass}`}
                            key={item}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </article>
        </Reveal>
    );
}

type ArchitectureModule = {
    label: string;
    icon: string;
};

type ArchitectureSectionProps = {
    title: string;
    description: string;
    detail: string;
    modules: ArchitectureModule[];
    ctaLabel: string;
    ctaHref: string;
};

export function ArchitectureSection({
    title,
    description,
    detail,
    modules,
    ctaLabel,
    ctaHref,
}: ArchitectureSectionProps) {
    return (
        <section className="section border-y border-line bg-surface" id="architecture">
            <div className="site-container">
                <Reveal className="max-w-3xl">
                    <h2 className="landing-section-title">{title}</h2>
                    <p className="landing-section-copy mt-5">{description}</p>
                </Reveal>

                <div className="mt-14 grid items-start gap-5 lg:grid-cols-[minmax(20rem,0.72fr)_minmax(0,1.28fr)]">
                    <Reveal className="rounded-md border border-line bg-canvas p-5 sm:p-7">
                        <div
                            aria-label="Architecture flow from the API client through the NestJS API to application modules and infrastructure"
                            className="grid gap-4"
                            role="img"
                        >
                            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
                                <div className="architecture-node">
                                    <LandingIcon className="size-5 text-ink-muted" icon="ph:terminal-window" />
                                    <span>API client</span>
                                </div>
                                <LandingIcon className="size-4 text-brand" icon="ph:arrow-right" />
                                <div className="architecture-node border-brand bg-brand text-brand-foreground">
                                    <LandingIcon className="size-5" icon="ph:cube" />
                                    <span>NestJS API</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {modules.slice(0, 3).map((module) => (
                                    <div className="architecture-node flex-col text-center" key={module.label}>
                                        <LandingIcon className="size-5 text-brand" icon={module.icon} />
                                        <span>{module.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                {modules.slice(3).map((module) => (
                                    <div className="architecture-node" key={module.label}>
                                        <LandingIcon className="size-5 text-ink-muted" icon={module.icon} />
                                        <span>{module.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mt-8 text-sm leading-7 text-ink-secondary">{detail}</p>
                        <Link className="landing-text-link mt-6" href={ctaHref}>
                            {ctaLabel}
                            <LandingIcon className="size-4" icon="ph:arrow-right" />
                        </Link>
                    </Reveal>

                    <Reveal className="relative overflow-hidden rounded-md border border-line bg-code" delay={0.08}>
                        <Image
                            alt="NestJS modular monolith source tree and authentication use case in the editor"
                            className="aspect-video h-full min-h-[24rem] w-full object-cover lg:min-h-[38rem]"
                            height={1080}
                            sizes="(min-width: 1024px) 60vw, 100vw"
                            src="/images/images-3.webp"
                            width={1920}
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

type DeveloperCapability = {
    title: string;
    description: string;
    icon: string;
};

type StackItem = {
    layer: string;
    technology: string;
};

type DeveloperExperienceProps = {
    title: string;
    description: string;
    capabilities: DeveloperCapability[];
    stack: StackItem[];
    command: string;
    note: string;
    ctaLabel: string;
    ctaHref: string;
};

export function DeveloperExperience({
    title,
    description,
    capabilities,
    stack,
    command,
    note,
    ctaLabel,
    ctaHref,
}: DeveloperExperienceProps) {
    return (
        <section className="section" id="developer-experience">
            <div className="site-container">
                <Reveal className="max-w-3xl">
                    <h2 className="landing-section-title">{title}</h2>
                    <p className="landing-section-copy mt-5">{description}</p>
                </Reveal>

                <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(30rem,1.18fr)]">
                    <Reveal>
                        <div className="grid border-t border-line">
                            {capabilities.map((capability) => (
                                <article
                                    className="grid grid-cols-[auto_1fr] gap-5 border-b border-line py-6"
                                    key={capability.title}
                                >
                                    <LandingIcon className="mt-1 size-6 text-brand" icon={capability.icon} />
                                    <div>
                                        <h3 className="text-lg font-semibold tracking-tight">{capability.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-ink-secondary">
                                            {capability.description}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal
                        className="overflow-hidden rounded-md border border-line bg-code text-white shadow-panel"
                        delay={0.08}
                    >
                        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                            <div className="flex items-center gap-2 font-mono text-xs text-white/55">
                                <LandingIcon className="size-4 text-brand" icon="ph:terminal-window" />
                                local setup
                            </div>
                            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/55">
                                bash
                            </span>
                        </div>
                        <pre className="overflow-x-auto p-5 text-[0.75rem] leading-7 sm:p-7 sm:text-sm">
                            <code>{command}</code>
                        </pre>
                        <p className="border-t border-white/10 px-5 py-5 text-xs leading-6 text-white/55 sm:px-7">
                            {note}
                        </p>
                    </Reveal>
                </div>

                <Reveal className="mt-16">
                    <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                        Included technology
                    </h3>
                    <dl className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                        {stack.map((item) => (
                            <div className="border-l border-line pl-4" key={item.layer}>
                                <dt className="landing-accent-label font-mono text-[0.625rem] uppercase tracking-[0.14em]">
                                    {item.layer}
                                </dt>
                                <dd className="mt-2 text-sm leading-6 text-ink-secondary">{item.technology}</dd>
                            </div>
                        ))}
                    </dl>
                    <Link className="landing-text-link mt-10" href={ctaHref}>
                        {ctaLabel}
                        <LandingIcon className="size-4" icon="ph:arrow-right" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}

type FinalCtaProps = {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
};

export function FinalCta({
    title,
    description,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
}: FinalCtaProps) {
    return (
        <section className="section">
            <div className="site-container">
                <Reveal className="relative overflow-hidden rounded-md border border-brand/30 bg-elevated px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <LandingIcon
                        className="pointer-events-none absolute -right-10 -top-14 size-64 rotate-12 text-brand/10 sm:size-80"
                        icon="ph:cube"
                    />
                    <div className="relative max-w-3xl">
                        <h2 className="landing-section-title">{title}</h2>
                        <p className="landing-section-copy mt-5">{description}</p>
                        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                            <Link className="landing-button landing-button-primary" href={primaryHref}>
                                {primaryLabel}
                                <LandingIcon className="size-4" icon="ph:arrow-right" />
                            </Link>
                            <Link
                                className="landing-button landing-button-secondary"
                                href={secondaryHref}
                                rel="noreferrer"
                                target="_blank"
                            >
                                <LandingIcon className="size-4" icon="ph:github-logo" />
                                {secondaryLabel}
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

export function LandingFooter() {
    return (
        <footer className="border-t border-line py-8">
            <div className="site-container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="landing-brand-mark" aria-hidden="true">
                        <LandingIcon className="size-4" icon="ph:cube" />
                    </span>
                    <div>
                        <p className="text-sm font-semibold">{appName}</p>
                        <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
                            One deployable unit
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-secondary">
                    <Link className="landing-footer-link" href="/docs">
                        Documentation
                    </Link>
                    <Link className="landing-footer-link" href={githubUrl} rel="noreferrer" target="_blank">
                        GitHub
                    </Link>
                    <span>© {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}

export const landingMdxComponents = {
    HeroSection,
    ProductMeta,
    FeatureGrid,
    FeatureCard,
    ArchitectureSection,
    DeveloperExperience,
    ScrollStory,
    FinalCta,
} satisfies MDXComponents;

import Image from "next/image";
import Link from "next/link";
import { githubUrl } from "@/lib/shared";
import { LandingIcon } from "./landing-icon";

export function HeroSection() {
    return (
        <section className="landing-hero border-b border-line">
            <div aria-hidden="true" className="landing-hero-wash" />
            <div className="site-container relative grid min-h-[calc(100dvh-4.5rem)] items-center gap-12 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(28rem,0.95fr)] lg:gap-10 lg:py-16">
                <div className="relative z-[1] max-w-3xl">
                    <p className="landing-accent-label landing-enter font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                        NestJS Modular Monolith Starter Kit
                    </p>
                    <h1 className="landing-enter landing-enter-delay-1 mt-5 text-[clamp(3rem,5vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.065em]">
                        Build the product, not the backend foundation
                    </h1>
                    <p className="landing-enter landing-enter-delay-2 mt-7 max-w-[38rem] text-base leading-7 text-ink-secondary sm:text-lg sm:leading-8">
                        A production-minded NestJS modular monolith with security, data, documentation, and
                        operational building blocks already connected.
                    </p>
                    <div className="landing-enter landing-enter-delay-3 mt-9 flex flex-col gap-3 min-[420px]:flex-row">
                        <Link className="landing-button landing-button-primary" href="/docs">
                            Buy Pro Product
                            <LandingIcon className="size-4" icon="ph:arrow-right" />
                        </Link>
                        <Link
                            className="landing-button landing-button-secondary"
                            href={githubUrl}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <LandingIcon className="size-4" icon="ph:github-logo" />
                            Get Free Product
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

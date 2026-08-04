import Link from "next/link";
import { githubUrl, proRoute } from "@/lib/shared";
import { LandingIcon } from "../landing-icon";

export function HeroSection() {
    return (
        <section className="landing-hero border-b border-line">
            <div aria-hidden="true" className="landing-hero-v2-wash" />

            <div aria-hidden="true" className="landing-hero-v2-deco landing-hero-v2-deco-left">
                <span className="text-[clamp(5rem,10vw,11rem)] font-mono font-bold text-brand/6">{"{"}</span>
            </div>
            <div aria-hidden="true" className="landing-hero-v2-deco landing-hero-v2-deco-right">
                <span className="text-[clamp(4rem,7vw,8rem)] font-mono font-bold text-brand/6">{"<"}</span>
            </div>

            <div className="site-container relative flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center py-14 text-center lg:py-16">
                <div className="max-w-216">
                    <h1 className="landing-enter landing-enter-delay-1 mt-5 text-[clamp(3.25rem,6vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.065em]">
                        Skip the backend <span className="text-brand">boilerplate</span>
                        {". "}
                        <br className="hidden min-[420px]:block" />
                        <span className="text-brand">Ship</span> the product.
                    </h1>

                    <p className="landing-enter landing-enter-delay-2 mt-7 mx-auto max-w-152 text-base leading-7 text-ink-secondary sm:text-lg sm:leading-8">
                        Starting a NestJS backend from scratch costs weeks of wiring auth, RBAC, database, and ops. This
                        starter hands you the foundation so your first commit is product work, not plumbing.
                    </p>

                    <div className="landing-enter landing-enter-delay-3 mt-9 flex flex-col items-center gap-3 min-[420px]:flex-row min-[420px]:justify-center">
                        <Link className="landing-button landing-button-primary" href={proRoute}>
                            Get the Pro Starter
                            <LandingIcon className="size-4" icon="ph:arrow-right" />
                        </Link>
                        <Link
                            className="landing-button landing-button-secondary"
                            href={githubUrl}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <LandingIcon className="size-4" icon="ph:github-logo" />
                            Try the Free Edition
                        </Link>
                    </div>

                    <p className="landing-enter landing-enter-delay-3 mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
                        Open source core &middot; Production-tested &middot; Ready in minutes
                    </p>
                </div>
            </div>
        </section>
    );
}

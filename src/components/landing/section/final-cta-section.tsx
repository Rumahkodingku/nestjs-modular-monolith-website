import Link from "next/link";
import { githubUrl } from "@/lib/shared";
import { LandingIcon } from "../landing-icon";
import { Reveal } from "../landing-motion";
import { NestJsIcon } from "@/components/ui/icon";

export function FinalCtaSection() {
    return (
        <section className="section">
            <div className="site-container">
                <Reveal className="relative overflow-hidden rounded-md border border-brand/30 bg-elevated px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                    <NestJsIcon className="pointer-events-none absolute -right-10 -top-14 size-64 rotate-12 text-brand/10 sm:size-80 opacity-30" />
                    <div className="relative max-w-3xl">
                        <h2 className="landing-section-title">A foundation you can understand</h2>
                        <p className="landing-section-copy mt-5">
                            Explicit migrations, boring module boundaries, standard NestJS primitives, and one
                            deployable unit.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                            <Link className="landing-button landing-button-primary" href="/docs/getting-started">
                                Get started
                                <LandingIcon className="size-4" icon="ph:arrow-right" />
                            </Link>
                            <Link
                                className="landing-button landing-button-secondary"
                                href={githubUrl}
                                rel="noreferrer"
                                target="_blank"
                            >
                                <LandingIcon className="size-4" icon="ph:github-logo" />
                                Browse the repository
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

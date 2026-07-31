import Image from "next/image";
import Link from "next/link";
import { LandingIcon } from "../landing-icon";
import { Reveal } from "../landing-motion";

const modules = [
    { label: "Authentication", icon: "ph:key" },
    { label: "Users", icon: "ph:users-three" },
    { label: "RBAC", icon: "ph:shield-check" },
    { label: "PostgreSQL", icon: "ph:database" },
    { label: "SMTP", icon: "ph:envelope" },
    { label: "Logs", icon: "ph:file-text" },
    { label: "Health", icon: "ph:heartbeat" },
];

export function ArchitectureSection() {
    return (
        <section className="section border-y border-line bg-surface" id="architecture">
            <div className="site-container">
                <Reveal className="max-w-3xl">
                    <h2 className="landing-section-title">Start with one deployable application</h2>
                    <p className="landing-section-copy mt-5">
                        Keep the speed of one NestJS application while maintaining explicit boundaries between
                        authentication, users, RBAC, and shared infrastructure.
                    </p>
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

                        <p className="mt-8 text-sm leading-7 text-ink-secondary">
                            The application layer owns use cases, infrastructure implements persistence and external
                            services, and presentation exposes HTTP contracts. Cross-module calls use narrow public
                            services and ports.
                        </p>
                        <Link className="landing-text-link mt-6" href="/docs/architecture">
                            Explore the architecture
                            <LandingIcon className="size-4" icon="ph:arrow-right" />
                        </Link>
                    </Reveal>

                    <Reveal className="relative overflow-hidden rounded-md border border-line bg-code" delay={0.08}>
                        <Image
                            alt="NestJS modular monolith source tree and authentication use case in the editor"
                            className="aspect-video h-full min-h-96 w-full object-cover lg:min-h-152"
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

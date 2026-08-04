import Link from "next/link";
import { LandingIcon } from "../landing-icon";
import { Reveal } from "../landing-motion";

const appModules = [
    { label: "Authentication", icon: "ph:key", description: "JWT, access/refresh tokens, CSRF" },
    { label: "Users", icon: "ph:users-three", description: "Registration, verification, lifecycle" },
    { label: "RBAC", icon: "ph:shield-check", description: "Roles, permissions, audit log" },
    { label: "Health", icon: "ph:heartbeat", description: "Readiness probes, monitoring" },
];

const infraModules = [
    { label: "PostgreSQL", icon: "ph:database" },
    { label: "SMTP", icon: "ph:envelope" },
    { label: "Logs", icon: "ph:file-text" },
];

export function ArchitectureSection() {
    return (
        <section className="section border-y border-line bg-surface" id="architecture">
            <div className="site-container">
                <Reveal className="max-w-3xl">
                    <h2 className="landing-section-title">Skip the architecture debate</h2>
                    <p className="landing-section-copy mt-5">
                        Modular-monolith boundaries are already drawn — auth, users, RBAC, and infra live in their own
                        modules. You inherit the decisions, not the meetings.
                    </p>
                </Reveal>

                <Reveal className="mt-14">
                    <div className="relative overflow-hidden rounded-md border border-line bg-canvas px-5 py-10 sm:px-12 sm:py-14">
                        <div aria-hidden="true" className="architecture-v2-deco left-4 top-4 sm:left-6 sm:top-5">
                            <span className="text-[clamp(3rem,7vw,5rem)] font-mono font-bold text-brand/6">{'{'}</span>
                        </div>
                        <div
                            aria-hidden="true"
                            className="architecture-v2-deco bottom-4 right-4 sm:bottom-5 sm:right-6"
                        >
                            <span className="text-[clamp(2.5rem,5vw,4rem)] font-mono font-bold text-brand/6">{'}'}</span>
                        </div>

                        <div className="relative z-1 flex flex-wrap items-center justify-center gap-2 min-[480px]:gap-3">
                            <div className="architecture-v2-entry-node">
                                <LandingIcon className="size-4 text-ink-muted" icon="ph:terminal-window" />
                                <span>API Client</span>
                            </div>
                            <span className="architecture-v2-flow-arrow">
                                <LandingIcon className="size-4" icon="ph:arrow-right" />
                            </span>
                            <div className="architecture-v2-entry-node" data-accent="true">
                                <LandingIcon className="size-4" icon="ph:cube" />
                                <span>NestJS API</span>
                            </div>
                        </div>

                        <div className="architecture-v2-connector relative z-1" />

                        <div className="relative z-1 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                            {appModules.map((mod) => (
                                <div className="architecture-v2-module-card" key={mod.label}>
                                    <span className="architecture-v2-module-icon">
                                        <LandingIcon className="size-4" icon={mod.icon} />
                                    </span>
                                    <span className="architecture-v2-module-label">{mod.label}</span>
                                    <span className="architecture-v2-module-desc">{mod.description}</span>
                                </div>
                            ))}
                        </div>

                        <div className="architecture-v2-connector relative z-1" />

                        <div className="relative z-1 flex flex-wrap items-center justify-center gap-2">
                            {infraModules.map((mod) => (
                                <span className="architecture-v2-infra-chip" key={mod.label}>
                                    <LandingIcon className="size-3.5" icon={mod.icon} />
                                    {mod.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                <Reveal className="mt-7 max-w-2xl">
                    <p className="text-sm leading-7 text-ink-secondary">
                        Clear boundaries now, microservices later — only if you ever need them.
                    </p>
                    <Link className="landing-text-link mt-4" href="/docs/architecture">
                        See how it&apos;s structured
                        <LandingIcon className="size-4" icon="ph:arrow-right" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}

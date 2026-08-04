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

function entryNodeClasses(accent = false) {
    return accent
        ? "flex items-center gap-2 min-h-12 rounded-sm px-5 font-mono text-xs font-semibold bg-brand text-brand-foreground border-brand"
        : "flex items-center gap-2 min-h-12 rounded-sm px-5 font-mono text-xs font-semibold bg-surface text-ink border-line";
}

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
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-4 top-4 z-0 select-none sm:left-6 sm:top-5"
                        >
                            <span className="text-[clamp(3rem,7vw,5rem)] font-mono font-bold text-brand/6">{"{"}</span>
                        </div>
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute bottom-4 right-4 z-0 select-none sm:bottom-5 sm:right-6"
                        >
                            <span className="text-[clamp(2.5rem,5vw,4rem)] font-mono font-bold text-brand/6">
                                {"}"}
                            </span>
                        </div>

                        <div className="relative z-1 flex flex-wrap items-center justify-center gap-2 min-[480px]:gap-3">
                            <div className={`${entryNodeClasses()} border`}>
                                <LandingIcon className="size-4 text-ink-muted" icon="ph:terminal-window" />
                                <span>API Client</span>
                            </div>
                            <span className="flex items-center justify-center text-brand">
                                <LandingIcon className="size-4" icon="ph:arrow-right" />
                            </span>
                            <div className={entryNodeClasses(true)}>
                                <LandingIcon className="size-4 text-brand-foreground" icon="ph:cube" />
                                <span>NestJS API</span>
                            </div>
                        </div>

                        <div className="relative z-1 flex justify-center py-3">
                            <div className="h-8 w-px bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--accent)_55%,transparent),transparent_88%)]" />
                        </div>

                        <div className="relative z-1 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                            {appModules.map((mod) => (
                                <div
                                    className="flex flex-col items-start gap-2 rounded-sm border border-line bg-canvas p-4 transition-[border-color,transform,box-shadow] duration-180 ease-(--ease-out-ui) hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--accent)_38%,var(--border))] hover:shadow-soft active:-translate-y-0.5 active:scale-[0.98]"
                                    key={mod.label}
                                >
                                    <span className="flex size-9 flex-none items-center justify-center rounded-xs border border-line bg-surface text-brand">
                                        <LandingIcon className="size-4" icon={mod.icon} />
                                    </span>
                                    <span className="text-[0.8125rem] font-semibold text-ink">{mod.label}</span>
                                    <span className="text-[0.6875rem] leading-normal text-ink-secondary">
                                        {mod.description}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="relative z-1 flex justify-center py-3">
                            <div className="h-8 w-px bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--accent)_55%,transparent),transparent_88%)]" />
                        </div>

                        <div className="relative z-1 flex flex-wrap items-center justify-center gap-2">
                            {infraModules.map((mod) => (
                                <span
                                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-elevated px-3 py-1.5 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-ink-secondary"
                                    key={mod.label}
                                >
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

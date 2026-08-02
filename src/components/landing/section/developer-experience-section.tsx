import Link from "next/link";
import { LandingIcon } from "../landing-icon";
import { Reveal } from "../landing-motion";

const capabilities = [
    {
        title: "Email delivery",
        description:
            "SMTP, Handlebars templates, and a local Mailpit container mean you verify emails the same way locally and in production.",
        icon: "ph:envelope",
    },
    {
        title: "Consistent request handling",
        description:
            "No more dropping CORS or Helmet at the last minute — validation, rate limiting, serialization, and Problem Details are the default, not an afterthought.",
        icon: "ph:arrows-left-right",
    },
    {
        title: "Tested from the start",
        description:
            "Jest, Supertest, and Testcontainers run against your real database in CI — lint, type-check, and build pass before you merge.",
        icon: "ph:test-tube",
    },
    {
        title: "Container-ready",
        description:
            "A multi-stage Dockerfile and Compose services give you the same image from local dev to production. There is no &quot;works on my machine.&quot;",
        icon: "ph:package",
    },
];

const stack = [
    { layer: "API", technology: "NestJS 11, Express, TypeScript" },
    { layer: "Security", technology: "Passport, JWT, Argon2, Helmet, CSRF" },
    { layer: "Persistence", technology: "PostgreSQL 17, TypeORM, migrations" },
    { layer: "Quality", technology: "Jest, Supertest, CI, Docker" },
];

const command = `git clone <repo-url>
pnpm install
pnpm start:dev`;

export function DeveloperExperienceSection() {
    return (
        <section className="section" id="developer-experience">
            <div className="site-container">
                <Reveal className="max-w-3xl">
                    <h2 className="landing-section-title">Set up once, ship every day</h2>
                    <p className="landing-section-copy mt-5">
                        Same conventions across security, contracts, infra, and CI — so every new feature is just code.
                    </p>
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
                            Three commands from clone to a running API. The full setup guide covers databases, Docker, and
                            environment configuration.
                        </p>
                    </Reveal>
                </div>

                <Reveal className="mt-16">
                    <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                        Core technology highlights
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
                    <Link className="landing-text-link mt-10" href="/docs/getting-started">
                        Read the setup guide
                        <LandingIcon className="size-4" icon="ph:arrow-right" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}

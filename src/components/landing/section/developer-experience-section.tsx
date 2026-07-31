import Link from "next/link";
import { LandingIcon } from "../landing-icon";
import { Reveal } from "../landing-motion";

const capabilities = [
    {
        title: "Email delivery",
        description: "SMTP delivery, Handlebars templates, and Mailpit support local verification workflows.",
        icon: "ph:envelope",
    },
    {
        title: "Consistent request handling",
        description:
            "Validation, CORS, Helmet, rate limiting, serialization, URI versioning, and Problem Details are wired globally.",
        icon: "ph:arrows-left-right",
    },
    {
        title: "Tested workflows",
        description:
            "Jest, Supertest, Testcontainers, migrations, linting, formatting, type checking, and production builds run in CI.",
        icon: "ph:test-tube",
    },
    {
        title: "Container-ready development",
        description:
            "A multi-stage Dockerfile and Compose services provide the same path from local development to production.",
        icon: "ph:package",
    },
];

const stack = [
    { layer: "API", technology: "NestJS 11, Express, TypeScript" },
    { layer: "Security", technology: "Passport, JWT, Argon2, Helmet, CSRF" },
    { layer: "Persistence", technology: "PostgreSQL 17, TypeORM migrations" },
    { layer: "Documentation", technology: "OpenAPI, Swagger, Scalar" },
    { layer: "Messaging", technology: "SMTP, Nodemailer, Handlebars, Mailpit" },
    { layer: "Observability", technology: "Winston, daily rotation, Terminus" },
    { layer: "Quality", technology: "Jest, Supertest, Testcontainers, ESLint" },
    { layer: "Runtime", technology: "Node.js 24, pnpm, Docker" },
];

const command = `pnpm install --frozen-lockfile
cp .env.example .env
docker compose up -d postgres mailpit
pnpm migration:run
pnpm start:dev`;

export function DeveloperExperienceSection() {
    return (
        <section className="section" id="developer-experience">
            <div className="site-container">
                <Reveal className="max-w-3xl">
                    <h2 className="landing-section-title">A workflow built for shipping</h2>
                    <p className="landing-section-copy mt-5">
                        Security, API contracts, local infrastructure, and quality checks follow the same explicit
                        conventions.
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
                            Use postgresql://postgres:postgres@localhost:5433/nestjs for DATABASE_URL. The API runs at
                            /api/v1 and Scalar at /docs.
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
                    <Link className="landing-text-link mt-10" href="/docs/getting-started">
                        Follow the complete setup guide
                        <LandingIcon className="size-4" icon="ph:arrow-right" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}

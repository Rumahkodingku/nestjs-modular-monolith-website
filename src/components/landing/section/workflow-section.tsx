"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { LandingIcon } from "../landing-icon";

const softEase = [0.16, 1, 0.3, 1] as const;

type TerminalLine = { text: string; type: "cmd" | "ok" };

const steps: {
    title: string;
    description: string;
    icon: string;
    tasks: string[];
    snippet: TerminalLine[];
}[] = [
    {
        title: "Day 1: Auth that already works",
        description:
            "Skip the two weeks most teams lose to JWT, refresh rotation, email verification, and session revocation. The first request you send registers a real user, verifies an email, and returns tokens — through tested flows, not a blog-post scaffold.",
        icon: "ph:fingerprint",
        tasks: [
            "Register, verify, and log in users from commit one — no auth wiring, no passport tutorials, no refresh-rotation bugs to chase in prod.",
            "Sessions, profile updates, email changes, and revocation all run through code that already has tests.",
        ],
        snippet: [
            { text: "$ curl -X POST /auth/register \\", type: "cmd" },
            { text: '  -d \'{"email":"dev@..."}\'', type: "cmd" },
            { text: "✓ User registered", type: "ok" },
            { text: "", type: "cmd" },
            { text: "$ curl -X POST /auth/login \\", type: "cmd" },
            { text: '  -d \'{"email":"dev@..."}\'', type: "cmd" },
            { text: "✓ Access + refresh tokens", type: "ok" },
        ],
    },
    {
        title: "Day 2: Production-shaped from commit one",
        description:
            "The path from pnpm test to a pushed image is one command, not a sprint. Roles, permissions, audit logs, health checks, and a multi-stage Dockerfile all ship modeled and tested — local and prod run the same way, with nothing to reconfigure.",
        icon: "ph:git-branch",
        tasks: [
            "Roles, permissions, and audit logs ship modeled, tested, and wired — not as TODOs for sprint three.",
            "47 tests, a multi-stage Docker image, and CI pass identically on your machine and in production.",
        ],
        snippet: [
            { text: "$ pnpm test", type: "cmd" },
            { text: "✓ 47 tests passed", type: "ok" },
            { text: "", type: "cmd" },
            { text: "$ docker compose up -d", type: "cmd" },
            { text: "✓ PostgreSQL + SMTP running", type: "ok" },
            { text: "", type: "cmd" },
            { text: "$ pnpm build && docker push", type: "cmd" },
            { text: "✓ Ready for deployment", type: "ok" },
        ],
    },
    {
        title: "Day 3: Migrations, not surprises",
        description:
            "Stop hand-writing SQL in app code or rescuing a drifted schema in prod. TypeORM migrations with pgcrypto UUID defaults run in a transaction, preview via dry-run, and revert in one command — every change is auditable, reversible, and never a surprise.",
        icon: "ph:database",
        tasks: [
            "Generate, preview with --dryrun, and revert migrations in one command — no manual SQL, no drift, no 2 a.m. schema fires.",
            "Every migration runs inside a transaction with pgcrypto UUID defaults on day one.",
        ],
        snippet: [
            { text: "$ pnpm migration:show", type: "cmd" },
            { text: "[X] 0001_enable_pgcrypto · [ ] 0002_add_tz", type: "cmd" },
            { text: "", type: "cmd" },
            { text: "$ pnpm migration:generate \\", type: "cmd" },
            { text: "  add-user-timezone --pretty --dryrun", type: "cmd" },
            { text: "✓ 1 pending migration previewed", type: "ok" },
            { text: "", type: "cmd" },
            { text: "$ pnpm migration:run", type: "cmd" },
            { text: "✓ Migrations applied in transaction", type: "ok" },
        ],
    },
    {
        title: "Day 4: Contracts, not comments",
        description:
            "Stop documenting your API in a wiki nobody reads. Scalar serves /docs straight from your OpenAPI spec, Problem Details (application/problem+json) return stable error codes with JSON Pointer fields, and X-Request-Id correlates every request across logs and audit — contracts your frontend can code against, not comments that drift.",
        icon: "ph:file-code",
        tasks: [
            "Ship /docs (Scalar) and /openapi.json with auth, refresh, and CSRF security schemes spec'd — your frontend team codes against the contract, not a Slack thread.",
            "Return Problem Details with JSON Pointer fields and stable error codes — invalid_email means invalid_email in every client, every time.",
        ],
        snippet: [
            { text: "$ OPENAPI_ENABLED=true pnpm start:dev", type: "cmd" },
            { text: "✓ /docs + /openapi.json ready", type: "ok" },
            { text: "", type: "cmd" },
            { text: "$ curl :3000/api/v1/auth/register \\", type: "cmd" },
            { text: '  -d \'{"email":"bad"}\'', type: "cmd" },
            { text: "✓ 422 · invalid_email · pointer /email", type: "ok" },
        ],
    },
    {
        title: "Day 5: Operate like it's production",
        description:
            "Day-two ops aren't a phase you bolt on later. Winston logs ship as JSON in prod and human-readable in dev, /health/liveness and /health/readiness (Postgres + heap) feed your container's probe every 30s, and X-Request-Id correlates any request across logs and audit — so the 3 a.m. incident takes minutes, not hours.",
        icon: "ph:activity",
        tasks: [
            "Container health checks probe /health/readiness (Postgres + heap) every 30s — orchestrators pull before traffic routes.",
            "Any request is one X-Request-Id away across logs and audit; Mailpit catches every email in dev so nothing reaches a real customer by accident.",
        ],
        snippet: [
            { text: "$ curl :3000/health/readiness", type: "cmd" },
            { text: '✓ {"status":"ok","db":"ok","heap":"ok"}', type: "ok" },
            { text: "", type: "cmd" },
            { text: "$ docker compose up -d mailpit", type: "cmd" },
            { text: "✓ SMTP :1025 · UI :8025", type: "ok" },
            { text: "", type: "cmd" },
            { text: "$ rg 'checkout-2026-0001' logs/", type: "cmd" },
            { text: "✓ correlated request + 2 audit records", type: "ok" },
        ],
    },
];

function TerminalDots() {
    return (
        <span className="flex flex-none gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="size-2 rounded-full" style={{ background: "#febc2e" }} />
            <span className="size-2 rounded-full" style={{ background: "#28c840" }} />
        </span>
    );
}

function TerminalBar() {
    return (
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <TerminalDots />
            <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-white/35">terminal</span>
        </div>
    );
}

function TerminalBlock({ lines }: { lines: TerminalLine[] }) {
    return (
        <div className="flex-1 overflow-y-auto p-4 font-mono text-[0.6875rem] leading-[1.85]">
            {lines.map((line, i) =>
                line.text === "" ? (
                    <div className="h-2.5" key={i} />
                ) : (
                    <div
                        className={`whitespace-pre-wrap break-all ${line.type === "ok" ? "text-emerald-400" : "text-white/45"}`}
                        key={i}
                    >
                        {line.text}
                    </div>
                ),
            )}
        </div>
    );
}

export function WorkflowSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        const nextIndex = Math.min(steps.length - 1, Math.floor(value * steps.length));
        setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    });

    const activeStep = steps[activeIndex];
    const progressPct = ((activeIndex + 1) / steps.length) * 100;

    return (
        <section className="section border-y border-line" id="workflows" ref={containerRef}>
            <div className="site-container">
                <div className="max-w-3xl">
                    <h2 className="landing-section-title">
                        Skip sprint zero. Ship product from commit one.
                    </h2>
                    <p className="landing-section-copy mt-5">
                        Five days, zero plumbing. Auth, deployment, migrations, API contracts, and observability —
                        scaffolded, tested, and waiting before your first product commit. The weeks you&apos;d lose to
                        wiring become weeks you spend on the actual product.
                    </p>
                </div>

                <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)] lg:gap-16">
                    <div className="sticky top-24 hidden h-[calc(100dvh-8rem)] min-h-136 max-h-208 md:block">
                        <div className="flex h-full flex-col overflow-hidden rounded-sm border border-line bg-code">
                            <TerminalBar />

                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                                    className="flex flex-1 flex-col overflow-hidden"
                                    exit={{ opacity: 0, transform: "translateY(-6px)" }}
                                    initial={reduceMotion ? false : { opacity: 0, transform: "translateY(6px)" }}
                                    key={activeStep.title}
                                    transition={{ duration: reduceMotion ? 0 : 0.4, ease: softEase }}
                                >
                                    <TerminalBlock lines={activeStep.snippet} />

                                    <div className="border-t border-white/6 px-4 py-3">
                                        <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/8">
                                            <div
                                                className="h-full rounded-full transition-[width] duration-500 ease-(--ease-out-ui)"
                                                style={{
                                                    width: `${progressPct}%`,
                                                    background:
                                                        "linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 70%, rgb(255 255 255)))",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t border-white/6 px-4 py-3">
                                        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-white/35">
                                            Active workflow
                                        </span>
                                        <p className="mt-1 text-base font-semibold tracking-[-0.01em] text-[#f7f3f4]">
                                            {activeStep.title}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div>
                        {steps.map((step, index) => {
                            const active = activeIndex === index;

                            return (
                                <article
                                    className="flex min-h-0 flex-col justify-center border-t border-line py-10 md:min-h-[68dvh] md:py-16"
                                    key={step.title}
                                >
                                    <div className="mb-6 overflow-hidden rounded-md border border-line bg-code md:hidden">
                                        <TerminalBar />
                                        <TerminalBlock lines={step.snippet} />
                                    </div>

                                    <div
                                        className={`transition-[opacity,transform] duration-400 ease-out ${
                                            active ? "opacity-100 md:translate-x-0" : "opacity-50 md:translate-x-1.5"
                                        }`}
                                    >
                                        <LandingIcon
                                            className={`size-7 ${active ? "text-brand/85" : "text-ink-muted"}`}
                                            icon={step.icon}
                                        />
                                        <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                                            {step.title}
                                        </h3>
                                        <p className="mt-4 max-w-xl leading-7 text-ink-secondary">{step.description}</p>
                                        <ul className="mt-7 grid gap-3">
                                            {step.tasks.map((task) => (
                                                <li
                                                    className="flex gap-3 text-sm leading-6 text-ink-secondary"
                                                    key={task}
                                                >
                                                    <LandingIcon
                                                        className="mt-1 size-4 shrink-0 text-brand"
                                                        icon="ph:check-circle"
                                                    />
                                                    <span>{task}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

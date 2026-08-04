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
        title: "Day 1: Users are real",
        description:
            "Auth, sessions, and the user lifecycle are already wired — so the first request you send actually logs someone in, verifies an email, or manages a role.",
        icon: "ph:fingerprint",
        tasks: [
            "Register, verify, and log in users on day one — no auth wiring needed.",
            "Manage sessions, profile updates, and email changes through tested flows.",
        ],
        snippet: [
            { text: '$ curl -X POST /auth/register \\', type: "cmd" },
            { text: '  -d \'{"email":"dev@..."}\'', type: "cmd" },
            { text: "✓ User registered", type: "ok" },
            { text: "", type: "cmd" },
            { text: '$ curl -X POST /auth/login \\', type: "cmd" },
            { text: '  -d \'{"email":"dev@..."}\'', type: "cmd" },
            { text: "✓ Access + refresh tokens", type: "ok" },
        ],
    },
    {
        title: "Day 2: Ship to prod",
        description:
            "Permissions, audit trails, health checks, CI, and the Docker image follow the same path from local to production — nothing to reconfigure.",
        icon: "ph:git-branch",
        tasks: [
            "Roles, permissions, and audit logs ship modeled and tested.",
            "Health checks, containers, and CI pass the same way locally and in production.",
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
];

function TerminalBlock({ lines }: { lines: TerminalLine[] }) {
    return (
        <div className="workflow-v2-terminal-body">
            {lines.map((line, i) =>
                line.text === "" ? (
                    <div className="h-2.5" key={i} />
                ) : (
                    <div
                        className={`workflow-v2-terminal-line ${line.type === "ok" ? "workflow-v2-terminal-line-ok" : ""}`}
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
                        From <code>git clone</code> to a live API
                    </h2>
                    <p className="landing-section-copy mt-5">
                        Two phases, no plumbing in between. Identity on day one, production on day two — that&apos;s the
                        gap this starter closes.
                    </p>
                </div>

                <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)] lg:gap-16">
                    <div className="sticky top-24 hidden h-[calc(100dvh-8rem)] min-h-136 max-h-208 md:block">
                        <div className="workflow-v2-visual h-full">
                            <div className="workflow-v2-terminal-bar">
                                <div className="workflow-v2-terminal-dots">
                                    <span className="workflow-v2-terminal-dot" />
                                    <span className="workflow-v2-terminal-dot" />
                                    <span className="workflow-v2-terminal-dot" />
                                </div>
                                <span className="workflow-v2-terminal-label">terminal</span>
                            </div>

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

                                    <div className="workflow-v2-progress">
                                        <div className="workflow-v2-progress-track">
                                            <div
                                                className="workflow-v2-progress-fill"
                                                style={{ width: `${progressPct}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="workflow-v2-visual-footer">
                                        <span className="workflow-v2-visual-tag">Active workflow</span>
                                        <p className="workflow-v2-visual-title">{activeStep.title}</p>
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
                                        <div className="workflow-v2-terminal-bar">
                                            <div className="workflow-v2-terminal-dots">
                                                <span className="workflow-v2-terminal-dot" />
                                                <span className="workflow-v2-terminal-dot" />
                                                <span className="workflow-v2-terminal-dot" />
                                            </div>
                                            <span className="workflow-v2-terminal-label">terminal</span>
                                        </div>
                                        <TerminalBlock lines={step.snippet} />
                                    </div>

                                    <div
                                        className={`transition-[opacity,transform] duration-400 ease-out ${
                                            active ? "opacity-100 md:translate-x-0" : "opacity-50 md:translate-x-[0.375rem]"
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

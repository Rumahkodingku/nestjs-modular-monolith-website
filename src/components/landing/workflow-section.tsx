"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { LandingIcon } from "./landing-icon";

const easeOut = [0.23, 1, 0.32, 1] as const;

const steps = [
    {
        title: "Identity and access",
        description:
            "Build account and authorization flows on top of explicit contracts instead of reconnecting the same security primitives.",
        icon: "ph:fingerprint",
        image: "/images/images-4.webp",
        imageAlt: "API client showing structured validation errors for an invalid registration request",
        tasks: [
            "Register a user and deliver an email-verification link.",
            "Verify the account, log in, rotate tokens, and manage active sessions.",
            "Update a profile or request an authenticated email change.",
            "Create, suspend, soft-delete, restore, and inspect managed users.",
        ],
    },
    {
        title: "Authorization and operations",
        description:
            "Carry the same request context through permissions, audit records, readiness checks, CI, and the production image.",
        icon: "ph:git-branch",
        image: "/images/images-5.webp",
        imageAlt: "API client showing a successful typed user registration response",
        tasks: [
            "Create roles and permissions, assign access, and calculate effective permissions.",
            "Preserve RBAC changes in an audit log associated with the request ID.",
            "Check process, database, and heap readiness.",
            "Build and run the same application in development, CI, and containers.",
        ],
    },
];

export function WorkflowSection() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });
    const visualScale = useTransform(scrollYProgress, [0, 1], [0.985, 1.015]);

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        const nextIndex = Math.min(steps.length - 1, Math.floor(value * steps.length));
        setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    });

    const activeStep = steps[activeIndex];

    return (
        <section className="section border-y border-line" id="workflows" ref={containerRef}>
            <div className="site-container">
                <div className="max-w-3xl">
                    <h2 className="landing-section-title">One foundation, complete workflows</h2>
                    <p className="landing-section-copy mt-5">
                        Follow identity and access changes from the first request through audit, health checks, CI, and
                        containers.
                    </p>
                </div>

                <div className="mt-14 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)] lg:gap-16">
                    <motion.div
                        className="sticky top-24 hidden h-[calc(100dvh-8rem)] min-h-[34rem] max-h-[52rem] overflow-hidden rounded-md border border-line bg-code md:block"
                        style={reduceMotion ? undefined : { scale: visualScale }}
                    >
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                animate={{ opacity: 1, transform: "scale(1)" }}
                                className="absolute inset-0"
                                exit={{ opacity: 0, transform: "scale(0.985)" }}
                                initial={reduceMotion ? false : { opacity: 0, transform: "scale(1.015)" }}
                                key={activeStep.image}
                                transition={{ duration: reduceMotion ? 0 : 0.35, ease: easeOut }}
                            >
                                <Image
                                    alt={activeStep.imageAlt}
                                    className="object-cover"
                                    fill
                                    sizes="(min-width: 768px) 55vw, 100vw"
                                    src={activeStep.image}
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-[linear-gradient(to_top,var(--code-background),transparent_45%)]"
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute inset-x-0 bottom-0 z-[1] p-6 lg:p-8">
                            <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/55">
                                Active workflow
                            </p>
                            <p className="mt-2 text-xl font-semibold tracking-tight text-white">{activeStep.title}</p>
                        </div>
                    </motion.div>

                    <div>
                        {steps.map((step, index) => {
                            const active = activeIndex === index;

                            return (
                                <article
                                    className="flex min-h-0 flex-col justify-center border-t border-line py-10 md:min-h-[68dvh] md:py-16"
                                    key={step.title}
                                >
                                    <div className="mb-6 overflow-hidden rounded-md border border-line bg-code md:hidden">
                                        <Image
                                            alt={step.imageAlt}
                                            className="aspect-video h-auto w-full object-cover"
                                            height={1080}
                                            sizes="100vw"
                                            src={step.image}
                                            width={1920}
                                        />
                                    </div>
                                    <div
                                        className={`transition-[opacity,transform] duration-300 ease-out ${
                                            active ? "opacity-100 md:translate-x-0" : "opacity-65 md:translate-x-2"
                                        }`}
                                    >
                                        <LandingIcon
                                            className={`size-7 ${active ? "text-brand" : "text-ink-muted"}`}
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

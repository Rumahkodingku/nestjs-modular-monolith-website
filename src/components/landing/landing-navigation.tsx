"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { useTheme } from "fumadocs-ui/provider/base";
import { appName, freeRoute, githubUrl, proRoute } from "@/lib/shared";
import { LandingIcon } from "./landing-icon";
import { NestJsIcon } from "../ui/icon";

const navigation = [
    { href: "/#features", label: "Features" },
    { href: "/#architecture", label: "Architecture" },
    { href: "/#workflows", label: "Workflows" },
] as const;

function subscribeToHydration() {
    return () => {};
}

function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );

    const dark = mounted && resolvedTheme === "dark";

    return (
        <button
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className="landing-icon-button"
            onClick={() => setTheme(dark ? "light" : "dark")}
            type="button"
        >
            <LandingIcon className="size-5" icon={mounted ? (dark ? "ph:sun" : "ph:moon") : "ph:circle-half"} />
        </button>
    );
}

export function LandingNavigation() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <a className="landing-skip-link" href="#main-content">
                Skip to main content
            </a>
            <header className="landing-nav">
                <div className="site-container flex h-18 items-center justify-between gap-4">
                    <Link
                        aria-label={`${appName} home`}
                        className="landing-brand min-w-0"
                        href="/"
                        onClick={() => setOpen(false)}
                    >
                        <span aria-hidden="true" className="px-3">
                            <NestJsIcon className="size-5" />
                        </span>
                        <span className="min-w-0 leading-none">
                            <span className="block truncate text-[0.8125rem] font-semibold tracking-[-0.02em] sm:text-sm">
                                Modular Monolith
                            </span>
                            <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted">
                                NestJS Starter
                            </span>
                        </span>
                    </Link>

                    <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
                        {navigation.map((item) => (
                            <Link className="landing-nav-link" href={item.href} key={item.href}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <Link
                            aria-label="Open the GitHub repository"
                            className="landing-github-button landing-icon-button"
                            href={githubUrl}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <LandingIcon className="size-5" icon="ph:github-logo" />
                        </Link>
                        <ThemeToggle />
                        <Link className="landing-pro-button landing-button landing-button-secondary" href={freeRoute}>
                            Explore Free Plan
                            <LandingIcon className="size-4" icon="ph:arrow-right" />
                        </Link>
                        <Link className="landing-pro-button landing-button landing-button-primary" href={proRoute}>
                            Explore Pro Plan
                            <LandingIcon className="size-4" icon="ph:arrow-right" />
                        </Link>
                        <button
                            aria-controls="mobile-navigation"
                            aria-expanded={open}
                            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                            className="landing-icon-button landing-menu-button"
                            onClick={() => setOpen((value) => !value)}
                            type="button"
                        >
                            <LandingIcon className="size-5" icon={open ? "ph:x" : "ph:list"} />
                        </button>
                    </div>
                </div>

                <nav
                    aria-hidden={!open}
                    aria-label="Mobile navigation"
                    className="site-container grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out lg:hidden"
                    id="mobile-navigation"
                    inert={!open}
                    style={{
                        gridTemplateRows: open ? "1fr" : "0fr",
                        opacity: open ? 1 : 0,
                    }}
                >
                    <div className="min-h-0">
                        <div className="mb-3 grid gap-1 border-t border-line py-3">
                            {navigation.map((item) => (
                                <Link
                                    className="landing-mobile-link"
                                    href={item.href}
                                    key={item.href}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                    <LandingIcon className="size-4" icon="ph:arrow-down-right" />
                                </Link>
                            ))}
                            <Link className="landing-mobile-link" href="/docs" onClick={() => setOpen(false)}>
                                Documentation
                                <LandingIcon className="size-4" icon="ph:arrow-right" />
                            </Link>
                            <Link className="landing-mobile-link" href={freeRoute} onClick={() => setOpen(false)}>
                                Free
                                <LandingIcon className="size-4" icon="ph:arrow-right" />
                            </Link>
                            <Link
                                className="landing-mobile-link landing-mobile-pro-link"
                                href={proRoute}
                                onClick={() => setOpen(false)}
                            >
                                Get Pro
                                <LandingIcon className="size-4" icon="ph:arrow-up-right" />
                            </Link>
                            <Link
                                className="landing-mobile-link"
                                href={githubUrl}
                                onClick={() => setOpen(false)}
                                rel="noreferrer"
                                target="_blank"
                            >
                                GitHub
                                <LandingIcon className="size-4" icon="ph:arrow-up-right" />
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

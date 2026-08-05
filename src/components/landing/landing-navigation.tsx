"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "fumadocs-ui/provider/base";
import { appName, freeRoute, githubUrl, proRoute } from "@/lib/shared";
import { landingButton, landingButtonPrimary, landingButtonSecondary } from "@/lib/button-styles";
import { LandingIcon } from "./landing-icon";
import { NestJsIcon } from "../ui/icon";

const navigation = [
    { href: "/#features", label: "Features" },
    { href: "/#architecture", label: "Architecture" },
    { href: "/#workflows", label: "Workflows" },
] as const;

const iconButton =
    "inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-line bg-surface text-ink active:scale-[0.97] hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:bg-surface-hover";

const mobileLink =
    "flex min-h-12 items-center justify-between rounded-sm border border-transparent px-3 text-[0.9375rem] font-semibold text-ink-secondary hover:border-[color-mix(in_srgb,var(--accent)_45%,var(--border))] hover:bg-surface-hover";

const mobileLinkPro =
    "flex min-h-12 items-center justify-between rounded-sm border border-brand bg-brand px-3 text-[0.9375rem] font-semibold text-brand-foreground hover:bg-[color-mix(in_srgb,var(--accent)_90%,var(--foreground))]";

const navLink = "inline-flex min-h-11 items-center text-[0.8125rem] font-semibold text-ink-secondary hover:text-ink";

function subscribeToHydration() {
    return () => {};
}

// Shared hook so the desktop icon-button and the mobile menu row can reuse the same theme state
function useThemeState() {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const dark = mounted && resolvedTheme === "dark";
    return { mounted, dark, setTheme };
}

// Desktop / tablet icon-only toggle — hidden below md
function ThemeToggle() {
    const { mounted, dark, setTheme } = useThemeState();

    return (
        <button
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className={`hidden md:inline-flex ${iconButton}`}
            onClick={() => setTheme(dark ? "light" : "dark")}
            type="button"
        >
            <LandingIcon className="size-5" icon={mounted ? (dark ? "ph:sun" : "ph:moon") : "ph:circle-half"} />
        </button>
    );
}

// Mobile menu row version — lives inside the hamburger dropdown
function MobileThemeToggle({ onToggle }: { onToggle?: () => void }) {
    const { mounted, dark, setTheme } = useThemeState();

    return (
        <button
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
            className={mobileLink}
            onClick={() => {
                setTheme(dark ? "light" : "dark");
                onToggle?.();
            }}
            type="button"
        >
            {dark ? "Light Mode" : "Dark Mode"}
            <LandingIcon className="size-4" icon={mounted ? (dark ? "ph:sun" : "ph:moon") : "ph:circle-half"} />
        </button>
    );
}

export function LandingNavigation() {
    const [open, setOpen] = useState(false);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const mobileNavRef = useRef<HTMLElement>(null);
    const wasOpenRef = useRef(false);

    useEffect(() => {
        if (!open) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [open]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const handler = (e: MediaQueryListEvent) => {
            if (e.matches) setOpen(false);
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open]);

    useEffect(() => {
        if (open) {
            wasOpenRef.current = true;
            const first = mobileNavRef.current?.querySelector<HTMLElement>("a,button");
            first?.focus();
        } else if (wasOpenRef.current) {
            hamburgerRef.current?.focus();
        }
    }, [open]);

    return (
        <>
            <header className="sticky top-0 z-20 border-b border-line bg-[color-mix(in_srgb,var(--background)_88%,transparent)] backdrop-blur-[18px]">
                <div className="site-container flex h-18 items-center justify-between gap-4">
                    <Link
                        aria-label={`${appName} home`}
                        className="inline-flex min-w-0 items-center gap-3"
                        href="/"
                        onClick={() => setOpen(false)}
                    >
                        <span aria-hidden="true" className="px-2 sm:px-3">
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

                    {/* Center nav links: only visible md and up */}
                    <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
                        {navigation.map((item) => (
                            <Link className={navLink} href={item.href} key={item.href}>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        {/* GitHub icon: hidden on mobile, shown md and up */}
                        <Link
                            aria-label="Open the GitHub repository"
                            className={`hidden md:inline-flex ${iconButton}`}
                            href={githubUrl}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <LandingIcon className="size-5" icon="ph:github-logo" />
                        </Link>

                        {/* Theme toggle: hidden on mobile, shown md and up */}
                        <ThemeToggle />

                        <Link
                            className={`min-h-12 items-center justify-center gap-2.5 border rounded-sm px-[1.15rem] text-[0.8125rem] font-bold whitespace-nowrap active:scale-[0.97] border-brand bg-brand text-brand-foreground hover:bg-[color-mix(in_srgb,var(--accent)_90%,var(--foreground))] hidden md:inline-flex`}
                            href={proRoute}
                        >
                            Explore Pro Plan
                            <LandingIcon className="size-4" icon="ph:arrow-right" />
                        </Link>

                        {/* Hamburger: only visible below md */}
                        <button
                            ref={hamburgerRef}
                            aria-controls="mobile-navigation"
                            aria-expanded={open}
                            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                            className={`inline-flex md:hidden ${iconButton}`}
                            onClick={() => setOpen((value) => !value)}
                            type="button"
                        >
                            <LandingIcon className="size-5" icon={open ? "ph:x" : "ph:list"} />
                        </button>
                    </div>
                </div>

                <nav
                    ref={mobileNavRef}
                    aria-hidden={!open}
                    aria-label="Mobile navigation"
                    className="site-container grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out md:hidden"
                    id="mobile-navigation"
                    inert={!open}
                    style={{
                        gridTemplateRows: open ? "1fr" : "0fr",
                        opacity: open ? 1 : 0,
                    }}
                >
                    <div className="min-h-0 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain">
                        <div className="mb-3 grid gap-1 border-t border-line py-3">
                            {navigation.map((item) => (
                                <Link
                                    className={mobileLink}
                                    href={item.href}
                                    key={item.href}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                    <LandingIcon className="size-4" icon="ph:arrow-down-right" />
                                </Link>
                            ))}
                            <Link className={mobileLink} href="/docs" onClick={() => setOpen(false)}>
                                Documentation
                                <LandingIcon className="size-4" icon="ph:arrow-right" />
                            </Link>
                            <MobileThemeToggle onToggle={() => setOpen(false)} />
                            <Link className={mobileLink} href={freeRoute} onClick={() => setOpen(false)}>
                                Free
                                <LandingIcon className="size-4" icon="ph:arrow-right" />
                            </Link>
                            <Link className={mobileLinkPro} href={proRoute} onClick={() => setOpen(false)}>
                                Get Pro
                                <LandingIcon className="size-4" icon="ph:arrow-up-right" />
                            </Link>
                            <Link
                                className={mobileLink}
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

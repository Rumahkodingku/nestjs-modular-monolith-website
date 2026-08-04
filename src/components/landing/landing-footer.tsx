import Link from "next/link";
import { appName, freeRoute, githubUrl, proRoute } from "@/lib/shared";
import { LandingIcon } from "./landing-icon";
import { NestJsIcon } from "../ui/icon";

export function LandingFooter() {
    return (
        <footer className="border-t border-line py-8">
            <div className="site-container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <span className="px-3" aria-hidden="true">
                        <NestJsIcon className="size-5" />
                    </span>
                    <div>
                        <p className="text-sm font-semibold">{appName}</p>
                        <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted">
                            One deployable unit
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-secondary">
                    <Link className="inline-flex min-h-11 items-center hover:text-ink" href="/docs">
                        Documentation
                    </Link>
                    <Link className="inline-flex min-h-11 items-center hover:text-ink" href={freeRoute}>
                        Free
                    </Link>
                    <Link className="inline-flex min-h-11 items-center hover:text-ink" href={proRoute}>
                        Pro
                    </Link>
                    <Link
                        className="inline-flex min-h-11 items-center hover:text-ink"
                        href={githubUrl}
                        rel="noreferrer"
                        target="_blank"
                    >
                        GitHub
                    </Link>
                    <span>© {new Date().getFullYear()}</span>
                </div>
            </div>
        </footer>
    );
}

import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingIcon } from "@/components/landing/landing-icon";
import { LandingNavigation } from "@/components/landing/landing-navigation";
import { landingButton, landingButtonPrimary, landingButtonSecondary } from "@/lib/button-styles";
import { githubUrl } from "@/lib/shared";

const title = "NestJS Modular Monolith Pro";
const description =
    "Explore the complete authentication, authorization, operations, documentation, and developer tooling included with the Pro product.";

const proFeatures = [
    {
        id: "full-featured-authentication",
        title: "Full-Featured Authentication",
        description:
            "Complete and secure authentication flow covering public registration, email verification, login, JWT access tokens, rotating refresh tokens, CSRF protection, password changes, email changes, logout, and session management.",
        items: [
            "Argon2id password hashing with configurable security parameters",
            "Separate access and refresh token secrets, expiry, issuer, and audience",
            "HTTP-only refresh cookies and signed CSRF tokens",
            "Refresh-token rotation with replay detection",
            "Session listing, individual revocation, and logout from all sessions",
            "Automatic token invalidation after password or account-status changes",
            "Active, suspended, and pending-verification account states",
            "Verification-token expiry and resend protection",
        ],
    },
    {
        id: "full-featured-rbac",
        title: "Full-Featured RBAC",
        description:
            "Flexible role-based access control for system roles, custom roles, permissions, and user-specific access requirements.",
        items: [
            "Built-in SUPER_ADMIN, ADMIN, and USER roles",
            "Custom role and permission management",
            "Role permission assignment",
            "Per-user ALLOW and DENY permission overrides",
            "Effective-permission resolution on authenticated requests",
            "Permission-based and super-admin-only route protection",
            "Protected system roles and permissions",
            "Last-active-super-admin safeguards",
        ],
    },
    {
        id: "full-featured-user-management",
        title: "Full-Featured User Management",
        description:
            "Complete self-service and administrative user lifecycle management from account creation through suspension, deletion, and restoration.",
        items: [
            "Current-user profile and effective-permission discovery",
            "Self-service profile and email updates",
            "Managed user creation",
            "Paginated user listing with search and filters",
            "Role and status filtering",
            "User profile and status updates",
            "Verified email-change workflow",
            "Soft delete and account restoration",
            "Self-management and super-admin safety rules",
        ],
    },
    {
        id: "docker-configuration",
        title: "Docker Configuration",
        description:
            "Containerized local and production-oriented setup with a multi-stage Docker build and Docker Compose services.",
        items: [
            "Optimized dependency, build, and runtime stages",
            "API, PostgreSQL, and Mailpit services",
            "PostgreSQL health checks and persistent volumes",
            "Service dependency orchestration",
            "Runtime log volume",
            "Reproducible Node.js and pnpm versions",
        ],
    },
    {
        id: "nginx-configuration",
        title: "Nginx Configuration",
        description: "Ready-to-customize reverse-proxy configuration for serving the API behind Nginx.",
        items: [
            "Upstream connection keepalive",
            "Forwarded host, IP, protocol, and request-ID headers",
            "Per-IP request limiting with burst support",
            "Dedicated liveness routing",
            "Connection, send, and read timeouts",
            "Proxy buffering configuration",
        ],
    },
    {
        id: "husky--commitlint",
        title: "Husky & Commitlint",
        description:
            "Automated Git workflow checks that keep commits and changed files consistent before they reach CI.",
        items: [
            "Husky Git hooks",
            "Conventional Commit validation",
            "Commitlint configuration",
            "Lint-staged integration",
            "Automatic ESLint and Prettier checks for staged files",
        ],
    },
    {
        id: "github-ci",
        title: "GitHub CI",
        description: "Continuous integration workflow for validating every pull request and main branch update.",
        items: [
            "Frozen-lockfile dependency installation",
            "Formatting and lint checks",
            "TypeScript type checking",
            "PostgreSQL migration verification",
            "Unit, coverage, and end-to-end tests",
            "Production build verification",
            "Production dependency security audit",
            "Concurrency control with stale-run cancellation",
        ],
    },
    {
        id: "environment-configuration--validation",
        title: "Environment Configuration & Validation",
        description: "Centralized, typed environment configuration validated at application startup with Joi.",
        items: [
            "Defaults and validation for application, database, authentication, email, logging, CORS, rate limiting, and cookies",
            "Required secret and connection checks",
            "Production-only HTTPS and secure-cookie enforcement",
            "SameSite=None cookie safety validation",
            "Configurable database SSL and pool size",
            "Separate development, test, and production loading behavior",
        ],
    },
    {
        id: "modular-monolith-architecture",
        title: "Modular Monolith Architecture",
        description: "Clear module ownership without the operational complexity of distributed services.",
        items: [
            "Independent authentication, users, and RBAC business modules",
            "Presentation, application, domain, infrastructure, and public API layers",
            "Explicit ports and adapters for cross-module communication",
            "Shared libraries for common HTTP, configuration, database, logging, mail, and observability concerns",
            "Transaction boundaries kept close to business operations",
            "Modules can evolve independently inside one deployable application",
        ],
    },
    {
        id: "nestjs-monorepo-workspace",
        title: "NestJS Monorepo Workspace",
        description: "NestJS workspace that keeps the API application and reusable libraries in one repository.",
        items: [
            "Application and library projects managed by Nest CLI",
            "TypeScript path aliases for public module APIs",
            "Shared build and testing configuration",
            "Strict TypeScript compiler settings",
            "Webpack production build",
            "Build-time copying of email assets",
        ],
    },
    {
        id: "eslint-boundaries-configuration",
        title: "ESLint Boundaries Configuration",
        description:
            "Enforced architectural boundaries prevent accidental coupling and internal imports between modules.",
        items: [
            "Explicit app, module, shared-library, script, and test boundaries",
            "Public API enforcement for cross-module imports",
            "Module-specific dependency policies",
            "Test-only dependency rules",
            "Unknown and ignored dependency detection",
            "Integrated with the standard ESLint workflow",
        ],
    },
    {
        id: "openapi--scalar-documentation",
        title: "OpenAPI + Scalar Documentation",
        description:
            "Interactive and machine-readable API documentation generated directly from the application contracts.",
        items: [
            "OpenAPI JSON document",
            "Scalar API reference",
            "Bearer token, refresh cookie, and CSRF authentication schemes",
            "Request, response, validation, pagination, and error schemas",
            "Endpoint tags, descriptions, badges, parameters, and status responses",
            "Configurable documentation availability",
            "Content Security Policy nonce for the Scalar interface",
        ],
    },
    {
        id: "rate-limiter",
        title: "Rate Limiter",
        description:
            "Global and endpoint-specific throttling protects the API from excessive traffic and common authentication abuse.",
        items: [
            "Configurable global request limit and time window",
            "Stricter limits for registration, login, and verification resend",
            "Standard 429 Too Many Requests responses",
            "Additional verification-email cooldown and hourly limits",
            "Nginx edge-level rate limiting configuration",
        ],
    },
    {
        id: "audit-log",
        title: "Audit Log",
        description: "Traceable RBAC administration history with before-and-after state for sensitive access changes.",
        items: [
            "Role, permission, role-assignment, and user-override events",
            "Actor, action, target, timestamp, and request-ID capture",
            "Before-and-after JSON snapshots",
            "Paginated audit history",
            "Filtering by actor, action, target, and date range",
            "Super-admin-only access",
        ],
    },
    {
        id: "winston-logging",
        title: "Winston Logging",
        description: "Structured application and HTTP logging for local development and production operations.",
        items: [
            "Readable colored development logs",
            "Structured JSON production logs",
            "Request method, path, status, and duration logging",
            "Correlated request IDs across responses, logs, and audit records",
            "Daily combined and error log files",
            "Size-based rotation, compression, and seven-day retention",
            "Safe server-error and email-delivery failure reporting",
        ],
    },
    {
        id: "health-check",
        title: "Health Check",
        description: "Public health endpoints for containers, load balancers, and orchestration platforms.",
        items: [
            "Lightweight liveness check",
            "PostgreSQL readiness check with timeout",
            "Heap-memory readiness threshold",
            "Health routes outside the versioned API prefix",
            "Docker and Nginx health-check integration",
        ],
    },
    {
        id: "database-migration--seeder",
        title: "Database Migration & Seeder",
        description: "Explicit PostgreSQL schema management and repeatable initial-data setup.",
        items: [
            "TypeORM migration create, generate, show, run, and revert commands",
            "Schema synchronization disabled for production safety",
            "Transactional migration execution",
            "PostgreSQL UUID extension setup",
            "User, verification, session, RBAC, and audit tables",
            "Idempotent system role and permission seeding",
            "Automatic default-role assignment for new users",
            "Bootstrap super-admin command",
        ],
    },
    {
        id: "complete-fumadocs-documentation",
        title: "Complete Fumadocs Documentation",
        description:
            "Structured product and developer documentation designed for a searchable, production-ready Fumadocs site.",
        items: [
            "Getting started and local setup",
            "Architecture and module-boundary guide",
            "Environment and application configuration",
            "Authentication and session-management guide",
            "User-management and RBAC guide",
            "API overview and OpenAPI usage",
            "Database migration and seeding guide",
            "Deployment and operations guide",
            "Testing and troubleshooting guide",
        ],
    },
] as const;

export const metadata: Metadata = {
    title,
    description,
    openGraph: {
        title,
        description,
        type: "website",
    },
};

export default function ProPage() {
    return (
        <div className="landing-page pro-page">
            <LandingNavigation />
            <main id="main-content">
                <section className="pro-content-shell border-b border-line">
                    <div aria-hidden="true" className="pro-page-wash" />
                    <div className="site-container">
                        <article className="pro-feature-content">
                            <header className="pro-hero">
                                <div className="pro-hero-copy">
                                    <p className="landing-accent-label font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
                                        NestJS Modular Monolith
                                    </p>
                                    <h1 id="pro-plan-features">Pro Plan Features</h1>
                                </div>
                                <div className="pro-hero-visual">
                                    <Image
                                        alt="OpenAPI documentation and RBAC capabilities included with the Pro product"
                                        className="object-cover dark:hidden"
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 52vw, 100vw"
                                        src="/images/images-2.webp"
                                    />
                                    <Image
                                        alt="OpenAPI documentation and RBAC capabilities included with the Pro product in dark mode"
                                        className="hidden object-cover dark:block"
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 52vw, 100vw"
                                        src="/images/images-1.webp"
                                    />
                                </div>
                            </header>
                            <p>
                                Production-ready backend foundation with complete authentication, authorization,
                                operations, documentation, and developer tooling. Built for teams that want to ship
                                business features without rebuilding backend infrastructure from scratch.
                            </p>
                            {proFeatures.map((feature) => (
                                <Fragment key={feature.id}>
                                    <h2 id={feature.id}>{feature.title}</h2>
                                    <p>{feature.description}</p>
                                    <ul>
                                        {feature.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </Fragment>
                            ))}
                        </article>
                    </div>
                </section>

                <section className="section">
                    <div className="site-container">
                        <div className="pro-final-cta relative overflow-hidden rounded-md border border-brand/30 bg-elevated px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                            <LandingIcon
                                className="pointer-events-none absolute -right-10 -top-14 size-64 rotate-12 text-brand/10 sm:size-80"
                                icon="ph:cube"
                            />
                            <div className="relative max-w-3xl">
                                <h2 className="landing-section-title">See how the foundation works</h2>
                                <p className="landing-section-copy mt-5">
                                    Follow the architecture, configuration, security, deployment, and operational
                                    workflows in the complete documentation.
                                </p>
                                <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                                    <Link className={`${landingButton} ${landingButtonPrimary}`} href="/docs">
                                        Read the documentation
                                        <LandingIcon className="size-4" icon="ph:arrow-right" />
                                    </Link>
                                    <Link
                                        className={`${landingButton} ${landingButtonSecondary}`}
                                        href={githubUrl}
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        <LandingIcon className="size-4" icon="ph:github-logo" />
                                        Get the free product
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <LandingFooter />
        </div>
    );
}

import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingIcon } from "@/components/landing/landing-icon";
import { LandingNavigation } from "@/components/landing/landing-navigation";
import { landingButton, landingButtonPrimary, landingButtonSecondary } from "@/lib/button-styles";
import { githubUrl } from "@/lib/shared";

const title = "NestJS Modular Monolith Free";
const description =
    "Explore the authentication, RBAC, user management, PostgreSQL, OpenAPI, and developer tooling included with the free product.";

const freeFeatures = [
    {
        id: "authentication",
        title: "Authentication",
        description:
            "Secure user authentication with modern password hashing, JWT tokens, and protected routes out of the box.",
        items: [
            "User registration with email, password, and display name",
            "Argon2id password hashing (64 MiB memory, 3 iterations, 1 parallelism)",
            "JWT access token generation with configurable secret and expiry",
            "JWT Bearer token extraction and validation via passport-jwt strategy",
            "JwtAuthGuard for protecting any route",
            "Password change with current-password verification",
            "Duplicate email detection with 409 Conflict",
            "Invalid credentials returning 401 Unauthorized",
            "Passwords excluded from all API responses",
        ],
    },
    {
        id: "role-based-access-control",
        title: "Role-Based Access Control (RBAC)",
        description: "Built-in role-based authorization with global guards, decorators, and automatic role assignment.",
        items: [
            "Two built-in roles — ADMIN and USER — seeded at startup",
            "Role entity with UUID primary key, unique name, and timestamps",
            "User-role junction entity with composite primary key",
            "Global RolesGuard checking @Roles() decorator metadata",
            "Route-level @Roles(...) decorator for per-endpoint access control",
            "ADMIN-only routes returning 403 for unauthorized users",
            "Routes without @Roles() allow any authenticated user",
            "Unauthenticated requests blocked on all protected routes",
            "Automatic USER role assignment on registration",
            "Duplicate role assignment prevention",
        ],
    },
    {
        id: "user-management",
        title: "User Management",
        description:
            "Self-service profile management for users and paginated admin-only user listing with role enrichment.",
        items: [
            "Current user profile endpoint — GET /api/v1/users/me",
            "Display name update with max-length validation",
            "Paginated user listing for admins with metadata",
            "User detail endpoint for admins with role enrichment",
            "Custom repository with findOneBy, findAndCount, and save",
            "Public service interface pattern for cross-module access",
            "Role enrichment from RBAC module on user responses",
        ],
    },
    {
        id: "database--typeorm",
        title: "Database & TypeORM",
        description:
            "PostgreSQL integration with auto-discovered entities, migration scripts, and production-safe settings.",
        items: [
            "TypeORM with PostgreSQL via @nestjs/typeorm forRootAsync",
            "autoLoadEntities discovering entities from forFeature() registrations",
            "synchronize disabled in production, configurable via DB_SYNC env",
            "Standalone DataSource for CLI tools with dotenv",
            "Migration CLI scripts for generate, show, run, and revert",
        ],
    },
    {
        id: "configuration--validation",
        title: "Configuration & Validation",
        description: "Centralized, typed environment configuration validated at bootstrap with Joi schemas.",
        items: [
            "Centralized .env loading via @nestjs/config",
            "Joi validation schema checking 12 environment variables at bootstrap",
            "Conditional JWT secret validation — minimum 32 characters in production",
            "Typed ConfigService with port, nodeEnv, database, jwt, and cors getters",
            "Sensible defaults for all environment variables in development",
        ],
    },
    {
        id: "openapi--swagger",
        title: "OpenAPI / Swagger",
        description: "Interactive API documentation generated automatically from DTOs and controller decorators.",
        items: [
            "Swagger UI at /api/docs via SwaggerModule.setup()",
            "Raw OpenAPI JSON at /api/docs-json for tooling consumption",
            "JWT Bearer auth scheme configured globally",
            "@ApiTags on every controller",
            "@ApiOperation summaries on every endpoint",
            "@ApiResponse with HTTP status codes on every endpoint",
            "@ApiBearerAuth() on all JWT-protected endpoints",
            "@ApiProperty with examples on all DTO fields",
        ],
    },
    {
        id: "health-checks",
        title: "Health Checks",
        description:
            "Liveness and readiness probes for container orchestration and load balancers outside the versioned API prefix.",
        items: [
            "Liveness — GET /health/live returns 200 without database access",
            "Readiness — GET /health/ready pings the database and returns 200 or 503",
            "Health routes live outside the /api/v1 prefix",
        ],
    },
    {
        id: "api-infrastructure",
        title: "API Infrastructure",
        description:
            "Global pipes, filters, and CORS configuration providing consistent validation and error handling.",
        items: [
            "Global prefix — /api/v1",
            "Global ValidationPipe with whitelist, forbidNonWhitelisted, and transform",
            "Global AllExceptionsFilter with unified error shape",
            "CORS configurable via CORS_ORIGIN env, defaulting to *",
            "No stack traces in production error responses",
        ],
    },
    {
        id: "seeder",
        title: "Idempotent Seeder",
        description: "Repeatable database seeding for roles and admin users that safely skips existing records.",
        items: [
            "Idempotent role seeding — ADMIN and USER skipped if already present",
            "Idempotent admin user seeding via ADMIN_EMAIL and ADMIN_PASSWORD env vars",
            "Argon2id password hashing in seeder matching auth service parameters",
            "Error handling with logged errors and exit code 1",
        ],
    },
    {
        id: "docker--compose",
        title: "Docker & Compose",
        description:
            "Containerized local development setup with multi-stage builds, health checks, and persistent data.",
        items: [
            "Multi-stage Dockerfile — builder stage with pnpm build, runtime on node:22-alpine",
            "docker-compose.yml with PostgreSQL 17 and API service",
            "PostgreSQL pg_isready health check and service dependency orchestration",
            "Named pgdata volume for persistent database storage",
            ".dockerignore excluding node_modules, dist, .git, and coverage",
        ],
    },
    {
        id: "testing",
        title: "Testing",
        description: "Unit and end-to-end test setup with Jest, path aliases, and dedicated configurations.",
        items: [
            "7 unit test spec files covering 33 test cases",
            "Auth — registration, login, and password-change flows",
            "RBAC — role assignment, retrieval, and duplicate prevention",
            "Users — find, create, update, and pagination operations",
            "Configuration, database, and common module spec coverage",
            "E2E smoke test verifying GET /api/v1 returns 200",
            "Jest path aliases synced with tsconfig.json",
            "Separate E2E Jest config with adjusted path resolution",
        ],
    },
    {
        id: "architecture-patterns",
        title: "Modular Monolith Architecture",
        description: "NestJS monorepo with seven libraries, public service interfaces, and strict module boundaries.",
        items: [
            "NestJS monorepo — one API application plus seven libraries",
            "Modular boundaries with public service interfaces and injection tokens",
            "Custom repository classes wrapping TypeORM Repository",
            "Cross-module communication only via public/ interfaces",
            "Barrel exports at every library root",
            "Path aliases (@modules/*, @shared/*) in tsconfig.json and Jest config",
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

export default function FreePage() {
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
                                    <h1 id="free-plan-features">Free Plan Features</h1>
                                </div>
                                <div className="pro-hero-visual">
                                    <Image
                                        alt="Authentication, RBAC, and PostgreSQL foundation included with the free product"
                                        className="object-cover dark:hidden"
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 52vw, 100vw"
                                        src="/images/images-4.webp"
                                    />
                                    <Image
                                        alt="Authentication, RBAC, and PostgreSQL foundation included with the free product in dark mode"
                                        className="hidden object-cover dark:block"
                                        fill
                                        priority
                                        sizes="(min-width: 1024px) 52vw, 100vw"
                                        src="/images/images-5.webp"
                                    />
                                </div>
                            </header>
                            <p>
                                Production-minded backend foundation with secure authentication, role-based access
                                control, user management, PostgreSQL, OpenAPI documentation, and operational tooling.
                                Everything you need to start shipping business logic without rebuilding authentication
                                and authorization from scratch.
                            </p>
                            {freeFeatures.map((feature) => (
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
                                <h2 className="landing-section-title">Start with the foundation</h2>
                                <p className="landing-section-copy mt-5">
                                    Follow the architecture, configuration, and deployment workflows in the complete
                                    documentation, or clone the repository and get started in minutes.
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

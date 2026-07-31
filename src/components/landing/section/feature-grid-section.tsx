import { LandingIcon } from "../landing-icon";
import { Reveal } from "../landing-motion";

type FeatureCardProps = {
    icon: string;
    title: string;
    description: string;
    items: string[];
    size?: "standard" | "wide";
    tone?: "base" | "accent" | "code";
};

const featureSizeClasses = {
    standard: "xl:col-span-5",
    wide: "md:col-span-2 xl:col-span-7",
} as const;

const featureToneClasses = {
    base: "bg-surface text-ink",
    accent: "bg-brand text-brand-foreground",
    code: "bg-code text-white",
} as const;

function FeatureCard({ icon, title, description, items, size = "standard", tone = "base" }: FeatureCardProps) {
    const mutedClass =
        tone === "accent" ? "text-brand-foreground" : tone === "code" ? "text-white/65" : "text-ink-secondary";
    const itemClass =
        tone === "accent"
            ? "border-white/20 bg-white/10 text-white"
            : tone === "code"
              ? "border-white/10 bg-white/5 text-white/80"
              : "border-line bg-elevated text-ink-secondary";

    return (
        <Reveal className={`${featureSizeClasses[size]} h-full`}>
            <article
                className={`landing-feature-card flex h-full min-h-88 flex-col justify-between rounded-md border border-line p-6 sm:p-8 ${featureToneClasses[tone]}`}
            >
                <div>
                    <LandingIcon className={`size-8 ${tone === "accent" ? "text-white" : "text-brand"}`} icon={icon} />
                    <h3 className="mt-8 max-w-xl text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{title}</h3>
                    <p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${mutedClass}`}>{description}</p>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                    {items.map((item) => (
                        <span
                            className={`rounded-sm border px-3 py-2 font-mono text-[0.6875rem] ${itemClass}`}
                            key={item}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </article>
        </Reveal>
    );
}

export function FeatureGridSection() {
    return (
        <section className="section" id="features">
            <div className="site-container">
                <Reveal className="max-w-3xl">
                    <h2 className="landing-section-title">Everything needed for a serious API foundation</h2>
                    <p className="landing-section-copy mt-5">
                        Start with production-minded defaults, then adapt only the parts your product actually needs.
                    </p>
                </Reveal>
                <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
                    <FeatureCard
                        description="JWT access tokens, rotating refresh tokens, HTTP-only cookies, CSRF protection, password changes, active-session listing, and session revocation."
                        icon="ph:key"
                        items={["Access token", "Refresh rotation", "HTTP-only cookies", "CSRF"]}
                        size="wide"
                        title="Authentication and sessions"
                    />
                    <FeatureCard
                        description="Public registration, email verification, profile updates, managed user creation, suspension, soft deletion, restoration, and administrative email changes."
                        icon="ph:users-three"
                        items={["Registration", "Verification", "Suspension", "Restoration"]}
                        title="Complete user lifecycle"
                    />
                    <FeatureCard
                        description="System and custom roles, granular permissions, per-user overrides, super-administrator safeguards, and auditable changes."
                        icon="ph:shield-star"
                        items={["Roles", "Permissions", "Allow or deny", "Audit log"]}
                        title="Role-based access control"
                        tone="accent"
                    />
                    <FeatureCard
                        description="TypeORM entities, explicit migrations, connection pooling, optional verified SSL, PostgreSQL-specific schemas, and safe migration conventions."
                        icon="ph:database"
                        items={["TypeORM", "Explicit migrations", "Pooling", "Verified SSL"]}
                        size="wide"
                        title="PostgreSQL by default"
                    />
                    <FeatureCard
                        description="OpenAPI metadata is generated from the application and rendered with Scalar. Success responses, errors, authentication, and operation descriptions share consistent contracts."
                        icon="ph:file-code"
                        items={["OpenAPI", "Swagger", "Scalar", "Problem Details"]}
                        size="wide"
                        title="Discoverable API contracts"
                        tone="code"
                    />
                    <FeatureCard
                        description="Structured Winston logs, correlation IDs, request-duration logging, daily rotation, liveness checks, and database and memory readiness checks."
                        icon="ph:activity"
                        items={["Correlation IDs", "Winston", "Liveness", "Readiness"]}
                        title="Operational visibility"
                    />
                </div>
            </div>
        </section>
    );
}

import { LandingIcon } from "../landing-icon";

const items = [
    { label: "Architecture", value: "Modular monolith", icon: "ph:cube" },
    { label: "Delivery", value: "One deployable app", icon: "ph:package" },
    { label: "Security", value: "JWT and RBAC", icon: "ph:shield-check" },
    { label: "Persistence", value: "PostgreSQL 17", icon: "ph:database" },
    { label: "Runtime", value: "Node.js and Docker", icon: "ph:package" },
    { label: "Quality", value: "Tested in CI", icon: "ph:check-square" },
];

export function ProductMetaSection() {
    return (
        <section aria-label="Product metadata" className="border-b border-line">
            <div className="site-container">
                <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {items.map((item) => (
                        <div className="flex min-h-28 gap-4 bg-canvas px-5 py-6" key={item.label}>
                            <LandingIcon className="mt-0.5 size-5 shrink-0 text-brand" icon={item.icon} />
                            <div>
                                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-muted">
                                    {item.label}
                                </p>
                                <p className="mt-2 text-sm font-semibold leading-5">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

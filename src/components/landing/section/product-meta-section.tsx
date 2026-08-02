import { LandingIcon } from "../landing-icon";

const items = [
    { label: "Weeks saved", value: "~40h boilerplate eliminated", icon: "ph:clock" },
    { label: "From clone to running", value: "Under 10 minutes", icon: "ph:rocket-launch" },
    { label: "Auth & RBAC", value: "Ready out of the box", icon: "ph:shield-check" },
    { label: "Production patterns", value: "Not just a demo", icon: "ph:check-square" },
    { label: "Open core", value: "MIT-licensed foundation", icon: "ph:code" },
    { label: "Upgradable", value: "Pro adds the hard parts", icon: "ph:package" },
];

export function ProductMetaSection() {
    return (
        <section aria-label="Why teams reach for this" className="border-b border-line">
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

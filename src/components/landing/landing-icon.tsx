"use client";

import { Icon } from "@iconify/react";
import { landingIcons } from "./landing-icons";

type LandingIconProps = {
    icon: string;
    className?: string;
    label?: string;
};

export function LandingIcon({ icon, className, label }: LandingIconProps) {
    return (
        <Icon
            aria-hidden={label ? undefined : true}
            aria-label={label}
            className={className}
            icon={landingIcons[icon] ?? landingIcons["ph:cube"]}
            ssr
        />
    );
}

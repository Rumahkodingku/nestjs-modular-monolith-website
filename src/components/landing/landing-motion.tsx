"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const easeOut = [0.23, 1, 0.32, 1] as const;

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? false : { opacity: 0, transform: "translateY(24px)" }}
            transition={{ delay, duration: 0.55, ease: easeOut }}
            viewport={{ amount: 0.18, once: true }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
        >
            {children}
        </motion.div>
    );
}

'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    animation?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'slide-in-left' | 'scale-up';
    duration?: number;
    delay?: number;
    className?: string;
    viewportAmount?: number;
}

export default function ScrollReveal({
    children,
    animation = 'fade-up',
    duration = 0.5,
    delay = 0,
    className = '',
    viewportAmount = 0.2
}: ScrollRevealProps) {
    const variants = {
        'fade-up': {
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
        },
        'fade-in': {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        'slide-in-right': {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
        },
        'slide-in-left': {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 }
        },
        'scale-up': {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: viewportAmount }}
            transition={{ duration, delay, ease: 'easeOut' }}
            variants={variants[animation]}
            className={className}
        >
            {children}
        </motion.div>
    );
}

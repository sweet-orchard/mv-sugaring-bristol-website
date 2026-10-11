import React from 'react';
import { motion } from 'framer-motion';
import { T } from '../context/ContentContext';

const benefits = [
    { num: '01', titleId: 'NEW_WHY_BENEFIT_1_TITLE', descId: 'NEW_WHY_BENEFIT_1_DESC' },
    { num: '02', titleId: 'NEW_WHY_BENEFIT_2_TITLE', descId: 'NEW_WHY_BENEFIT_2_DESC' },
    { num: '03', titleId: 'NEW_WHY_BENEFIT_3_TITLE', descId: 'NEW_WHY_BENEFIT_3_DESC' },
    { num: '04', titleId: 'NEW_WHY_BENEFIT_4_TITLE', descId: 'NEW_WHY_BENEFIT_4_DESC' },
];

// Line illustrations in the site's cream + gold palette (one per benefit).
const INK = '#2B2622';
const GOLD = '#D8B878';
const BLOB = '#EFE8D6';
const stroke = { stroke: INK, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };

const Blob = () => (
    <path d="M18 52 C14 28 38 8 64 12 C92 16 112 34 104 62 C98 86 72 104 44 98 C26 94 20 74 18 52 Z" fill={BLOB} />
);

const illustrations = [
    // Less painful — a light feather
    () => (
        <>
            <Blob />
            <path d="M30 94 C26 62 48 30 90 22 C88 56 68 84 30 94 Z" {...stroke} fill={GOLD} />
            <path d="M30 94 L78 36" {...stroke} />
            <path d="M52 66 L66 70 M60 54 L74 56 M44 78 L54 82" {...stroke} strokeWidth={1.5} />
            <path d="M98 20 L98 30 M93 25 L103 25" {...stroke} strokeWidth={1.5} />
        </>
    ),
    // Kinder to your skin — a gentle sprig with a drop
    () => (
        <>
            <Blob />
            <path d="M60 98 C60 74 60 50 62 24" {...stroke} />
            <path d="M60 74 C38 74 28 56 30 42 C50 42 60 54 60 74 Z" {...stroke} fill={GOLD} />
            <path d="M61 56 C80 56 92 42 90 28 C70 28 60 40 61 56 Z" {...stroke} fill="#fff" />
            <path d="M96 66 C96 66 88 76 88 82 C88 87 92 90 96 90 C100 90 104 87 104 82 C104 76 96 66 96 66 Z" {...stroke} fill={GOLD} strokeWidth={1.5} />
        </>
    ),
    // Softer skin, every time — a soft glow of sparkles
    () => (
        <>
            <Blob />
            <circle cx="60" cy="56" r="30" {...stroke} fill="#fff" strokeDasharray="2 6" />
            <path d="M60 26 C62 44 70 50 90 56 C70 62 62 70 60 88 C58 70 50 62 30 56 C50 50 58 44 60 26 Z" {...stroke} fill={GOLD} />
            <path d="M96 24 C97 30 99 32 105 33 C99 34 97 36 96 42 C95 36 93 34 87 33 C93 32 95 30 96 24 Z" {...stroke} fill="#fff" strokeWidth={1.5} />
            <path d="M26 84 C27 88 29 90 33 91 C29 92 27 94 26 98 C25 94 23 92 19 91 C23 90 25 88 26 84 Z" {...stroke} fill="#fff" strokeWidth={1.5} />
        </>
    ),
    // Less hair over time — strands growing finer
    () => (
        <>
            <Blob />
            <path d="M32 94 C22 70 42 50 34 24" {...stroke} strokeWidth={5} />
            <path d="M60 94 C50 70 70 50 62 24" {...stroke} strokeWidth={3} />
            <path d="M88 94 C78 70 98 50 90 24" {...stroke} strokeWidth={1.5} />
            <path d="M20 98 H104" stroke={GOLD} strokeWidth={3} strokeLinecap="round" />
        </>
    ),
];

export default function WhySugaringSection() {
    return (
        <section id="why-sugaring" className="py-12 md:py-20 lg:py-32 bg-[#FAF8F3] relative overflow-hidden">
            {/* Soft gold glow, same family as the rest of the site */}
            <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-[#B38B4D]/[0.07] blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16 items-start">
                    {/* Intro — sticks while the cards scroll on desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:sticky lg:top-32 text-center lg:text-left"
                    >
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                            <div className="h-px w-10 bg-[#B38B4D]/60" />
                            <span className="text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-[#B38B4D] font-body font-semibold"><T id="NEW_WHY_EYEBROW" /></span>
                        </div>
                        <h2 className="font-display font-light text-foreground mb-6 text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                            <T id="NEW_WHY_HEADING" />
                        </h2>
                        <p className="max-w-xl mx-auto lg:mx-0 font-body text-foreground/80 text-sm md:text-[17px] leading-[1.8]"><T id="NEW_WHY_SUBTEXT" /></p>
                    </motion.div>

                    {/* Benefit cards */}
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.num}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`group relative overflow-hidden rounded-2xl border border-[#EAE0C5]/80 bg-white p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(179,139,77,0.15)] ${i % 2 === 1 ? 'sm:mt-8' : ''}`}
                            >
                                <svg
                                    viewBox="0 0 120 110"
                                    className="absolute top-4 right-4 md:top-6 md:right-6 w-24 h-[5.5rem] md:w-32 md:h-[7rem] pointer-events-none"
                                    aria-hidden="true"
                                >
                                    {illustrations[i]()}
                                </svg>
                                <span
                                    className="block font-display font-light leading-none text-6xl md:text-7xl text-transparent mb-6 select-none"
                                    style={{ WebkitTextStroke: '1px rgba(179,139,77,0.7)' }}
                                    aria-hidden="true"
                                >
                                    {b.num}
                                </span>
                                <div className="h-[2px] w-10 bg-[#B38B4D]/60 mb-5 transition-all duration-300 group-hover:w-16" />
                                <h3 className="font-display font-semibold text-foreground mb-3 text-xl md:text-2xl leading-snug"><T id={b.titleId} /></h3>
                                <p className="font-body text-foreground/80 text-sm md:text-[15px] leading-[1.8]"><T id={b.descId} /></p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Closing quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-14 md:mt-20 text-center"
                >
                    <div className="flex justify-center mb-6">
                        <div className="h-[2px] w-12 bg-[#B38B4D]/60" />
                    </div>
                    <p className="font-display text-xl md:text-3xl italic text-foreground/80 max-w-3xl mx-auto leading-[1.6]"><T id="NEW_WHY_CLOSING_QUOTE" /></p>
                </motion.div>
            </div>
        </section>
    );
}

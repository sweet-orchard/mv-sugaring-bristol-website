import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { T } from '../context/ContentContext';
import ScrollButton from './ScrollButton';

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
    // Less painful — a healing plus
    () => (
        <>
            <Blob />
            <path d="M52 30 H68 V48 H86 V64 H68 V82 H52 V64 H34 V48 H52 Z" {...stroke} fill={GOLD} />
            <path d="M98 22 L98 32 M93 27 L103 27" {...stroke} strokeWidth={1.5} />
            <path d="M24 86 L24 94 M20 90 L28 90" {...stroke} strokeWidth={1.5} />
        </>
    ),
    // Kinder to your skin — a heart
    () => (
        <>
            <Blob />
            <path d="M60 90 C26 68 24 38 44 33 C53 31 60 37 60 45 C60 37 67 31 76 33 C96 38 94 68 60 90 Z" {...stroke} fill={GOLD} />
            <path d="M44 46 C46 42 50 41 53 43" {...stroke} stroke="#fff" strokeWidth={2.5} />
            <path d="M99 24 L99 34 M94 29 L104 29" {...stroke} strokeWidth={1.5} />
        </>
    ),
    // Softer skin, every time — soft flowing waves
    () => (
        <>
            <Blob />
            <path d="M14 66 C30 52 44 52 60 66 S90 80 106 66" {...stroke} stroke={GOLD} strokeWidth={4} />
            <path d="M14 52 C30 38 44 38 60 52 S90 66 106 52" {...stroke} />
            <path d="M14 80 C30 66 44 66 60 80 S90 94 106 80" {...stroke} strokeOpacity={0.45} />
            <path d="M92 18 C93 24 95 26 101 27 C95 28 93 30 92 36 C91 30 89 28 83 27 C89 26 91 24 92 18 Z" {...stroke} fill="#fff" strokeWidth={1.5} />
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
        <section id="why-sugaring" className="py-10 md:py-16 lg:py-24 bg-[#FAF8F3] relative overflow-hidden">
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
                            <div className="h-px w-10 bg-[#B38B4D]/60 lg:hidden" />
                        </div>
                        <h2 className="font-display font-semibold text-foreground mb-5 text-2xl md:text-4xl lg:text-5xl leading-[1.15]">
                            <T id="NEW_WHY_HEADING" />
                        </h2>
                        <p className="max-w-xl mx-auto lg:mx-0 font-body text-foreground/80 text-[13px] md:text-sm lg:text-[15px] leading-[1.65]"><T id="NEW_WHY_SUBTEXT" /></p>
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
                                <h3 className="font-display font-bold text-foreground mb-3 text-lg md:text-xl lg:text-2xl leading-snug"><T id={b.titleId} /></h3>
                                <p className="font-body text-foreground/80 text-xs md:text-[13px] lg:text-sm leading-[1.7]"><T id={b.descId} /></p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Closing review */}
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
                    <div className="flex justify-center gap-0.5 mb-4" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                        ))}
                    </div>
                    <p className="font-display text-lg md:text-2xl italic text-foreground/80 max-w-3xl mx-auto leading-[1.6]"><T id="NEW_WHY_CLOSING_QUOTE" /></p>
                    <p className="mt-5 font-body text-xs tracking-[0.2em] uppercase text-[#B38B4D] font-semibold">
                        <T id="NEW_WHY_CLOSING_AUTHOR" />
                        <span className="normal-case tracking-normal font-medium text-muted-foreground"> · <T id="NEW_WHY_CLOSING_SOURCE" /></span>
                    </p>
                    <div className="mt-8 md:mt-10 flex justify-center">
                        <ScrollButton
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-4 font-body text-xs tracking-[0.2em] uppercase font-medium rounded-sm"
                            textId="HERO_CTA_BOOK_SESSION"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

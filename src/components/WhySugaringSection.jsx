import React from 'react';
import { motion } from 'framer-motion';
import { T } from '../context/ContentContext';

const benefits = [
    { num: '01', titleId: 'NEW_WHY_BENEFIT_1_TITLE', descId: 'NEW_WHY_BENEFIT_1_DESC' },
    { num: '02', titleId: 'NEW_WHY_BENEFIT_2_TITLE', descId: 'NEW_WHY_BENEFIT_2_DESC' },
    { num: '03', titleId: 'NEW_WHY_BENEFIT_3_TITLE', descId: 'NEW_WHY_BENEFIT_3_DESC' },
    { num: '04', titleId: 'NEW_WHY_BENEFIT_4_TITLE', descId: 'NEW_WHY_BENEFIT_4_DESC' },
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
                                className={`group relative overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(179,139,77,0.15)] ${
                                    i === 0 || i === 3
                                        ? 'bg-[#EFE8D6]/70 border-[#EAE0C5]'
                                        : 'bg-background border-[#EAE0C5]/80'
                                } ${i % 2 === 1 ? 'sm:mt-8' : ''}`}
                            >
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

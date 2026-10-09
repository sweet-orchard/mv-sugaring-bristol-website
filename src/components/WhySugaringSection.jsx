import React from 'react';
import { motion } from 'framer-motion';
import { useContent, T } from '../context/ContentContext';

const benefits = [
    { icon: '♡', titleId: 'NEW_WHY_BENEFIT_1_TITLE', descId: 'NEW_WHY_BENEFIT_1_DESC' },
    { icon: '✿', titleId: 'NEW_WHY_BENEFIT_2_TITLE', descId: 'NEW_WHY_BENEFIT_2_DESC' },
    { icon: '✦', titleId: 'NEW_WHY_BENEFIT_3_TITLE', descId: 'NEW_WHY_BENEFIT_3_DESC' },
    { icon: '♦', titleId: 'NEW_WHY_BENEFIT_4_TITLE', descId: 'NEW_WHY_BENEFIT_4_DESC' },
];

export default function WhySugaringSection() {
    const { t } = useContent();

    return (
        <section id="why-sugaring" className="py-10 md:py-16 lg:py-32 bg-[#FAF8F3]">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-[11px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-[#B38B4D] font-body font-semibold"><T id="NEW_WHY_EYEBROW" /></span>
                    </div>
                    <h2 className="font-display text-foreground mb-4 text-3xl md:text-5xl lg:text-6xl">
                        <T id="NEW_WHY_HEADING" />
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="h-[2px] w-12 bg-[#B38B4D]/60" />
                    </div>
                    <p className="max-w-xl mx-auto font-body text-foreground/80 text-sm md:text-[17px] leading-[1.8]"><T id="NEW_WHY_SUBTEXT" /></p>
                </motion.div>

                <div className="space-y-0 border-t border-[#EAE0C5]/60">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex gap-4 md:gap-6 items-start py-8 md:py-10 border-b border-[#EAE0C5]/60"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-[10px] bg-[#EFE8D6] flex items-center justify-center text-[#B38B4D] shadow-sm mt-1">
                                <span className="text-xl md:text-2xl">{b.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-display font-semibold text-foreground mb-3 text-xl md:text-2xl"><T id={b.titleId} /></h3>
                                <p className="font-body text-foreground/80 text-sm md:text-[17px] leading-[1.8]"><T id={b.descId} /></p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Closing quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12 md:mt-16"
                >
                    <p className="font-display text-xl md:text-2xl italic text-foreground/80 max-w-2xl mx-auto leading-[1.8]"><T id="NEW_WHY_CLOSING_QUOTE" /></p>
                </motion.div>
            </div>
        </section>
    );
}
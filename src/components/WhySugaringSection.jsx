import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useContent, T } from '../context/ContentContext';
import ScrollButton from './ScrollButton';

const benefits = [
    { num: '01', titleId: 'NEW_WHY_BENEFIT_1_TITLE', descId: 'NEW_WHY_BENEFIT_1_DESC', image: '/why-sugaring/feather.webp', motion: 'feather' },
    { num: '02', titleId: 'NEW_WHY_BENEFIT_2_TITLE', descId: 'NEW_WHY_BENEFIT_2_DESC', image: '/why-sugaring/drop.webp', motion: 'drop' },
    { num: '03', titleId: 'NEW_WHY_BENEFIT_3_TITLE', descId: 'NEW_WHY_BENEFIT_3_DESC', image: '/why-sugaring/waves.webp', motion: 'waves' },
    { num: '04', titleId: 'NEW_WHY_BENEFIT_4_TITLE', descId: 'NEW_WHY_BENEFIT_4_DESC', image: '/why-sugaring/follicle.webp', motion: 'follicle' },
];

// Each illustration has its own gentle motion: the feather sways, the drop bobs and sends out
// ripples, the waves drift, the hair grows. Hover or tap makes it react; reduced-motion users get a still image.
const LOOPS = {
    feather: { animate: { rotate: [-4, 4, -4], y: [0, -6, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } },
    drop: { animate: { y: [0, -5, 0] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
    waves: { animate: { x: [-5, 5, -5], y: [0, -2, 0] }, transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' } },
    follicle: { animate: { scaleY: [0.96, 1.04, 0.96] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }, style: { transformOrigin: '50% 80%' } },
};

function ReactiveIllustration({ src, kind, index }) {
    const reduce = useReducedMotion();
    const loop = LOOPS[kind];
    return (
        <motion.div
            className="relative w-44 h-44 sm:w-32 sm:h-32 -mr-4 sm:-mr-3 -mt-10 -mb-10 sm:-mt-6 sm:-mb-6 shrink-0 cursor-pointer select-none"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 + index * 0.1, ease: 'easeOut' }}
            whileHover={reduce ? undefined : { scale: 1.12, rotate: kind === 'feather' ? 6 : 0 }}
            whileTap={reduce ? undefined : { scale: 1.12 }}
        >
            {kind === 'drop' && !reduce && [0, 1].map((r) => (
                <motion.span
                    key={r}
                    aria-hidden="true"
                    className="absolute left-1/2 top-[62%] w-[62%] h-[16%] -ml-[31%] rounded-[50%] border border-[#B38B4D]/60 pointer-events-none"
                    initial={{ scale: 0.55, opacity: 0 }}
                    animate={{ scale: [0.55, 1.35], opacity: [0.7, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: r * 1.5, ease: 'easeOut' }}
                />
            ))}
            <motion.img
                src={src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain pointer-events-none"
                loading="lazy"
                animate={reduce ? undefined : loop.animate}
                transition={loop.transition}
                style={loop.style}
            />
        </motion.div>
    );
}

// Wraps the key phrases of the review in <mark>; the review text itself is never altered.
function highlight(text, phrases) {
    const found = phrases
        .map((p) => ({ p, i: text.indexOf(p) }))
        .filter((x) => x.i >= 0)
        .sort((a, b) => a.i - b.i);
    const parts = [];
    let cursor = 0;
    found.forEach(({ p, i }) => {
        if (i < cursor) return;
        if (i > cursor) parts.push(text.slice(cursor, i));
        parts.push(<mark key={i} className="bg-transparent font-bold text-foreground underline decoration-foreground/30 decoration-1 underline-offset-[3px]">{p}</mark>);
        cursor = i + p.length;
    });
    parts.push(text.slice(cursor));
    return parts;
}

export default function WhySugaringSection() {
    const { t } = useContent();
    return (
        <section id="why-sugaring" className="py-10 md:py-16 lg:py-24 bg-[#FAF8F3] relative overflow-hidden">
            {/* Soft gold glow, same family as the rest of the site */}
            <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-[#B38B4D]/[0.07] blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
                {/* Centered Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-10 bg-[#B38B4D]/60" />
                        <span className="text-[11px] md:text-xs tracking-[0.25em] md:tracking-[0.3em] uppercase text-[#B38B4D] font-body font-semibold">
                            <T id="NEW_WHY_EYEBROW" />
                        </span>
                        <div className="h-px w-10 bg-[#B38B4D]/60" />
                    </div>
                    <h2 className="font-display font-semibold text-foreground mb-4 text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
                        <T id="NEW_WHY_HEADING" />
                    </h2>
                    <p className="font-body text-foreground/80 text-[15px] sm:text-base md:text-[17px] leading-[1.9] max-w-2xl mx-auto">
                        <T id="NEW_WHY_SUBTEXT" />
                    </p>
                </motion.div>

                {/* 4 Benefit Cards Grid (4 columns on desktop, 2 on tablet, 1 on mobile) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={b.num}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative flex flex-col justify-between rounded-2xl border border-[#EAE0C5]/80 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#B38B4D]/60 hover:shadow-[0_12px_32px_rgba(179,139,77,0.12)]"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span
                                        className="font-display font-semibold text-[40px] lg:text-5xl text-[#B38B4D] select-none leading-none"
                                        style={{ fontVariantNumeric: 'lining-nums' }}
                                        aria-hidden="true"
                                    >
                                        {b.num}
                                    </span>
                                    <ReactiveIllustration src={b.image} kind={b.motion} index={i} />
                                </div>
                                <div className="h-[2px] w-10 bg-[#B38B4D]/60 mb-4 transition-all duration-300 group-hover:w-16" />
                                <h3 className="font-display font-bold text-foreground mb-3 text-[28px] sm:text-2xl lg:text-[22px] xl:text-2xl leading-[1.15]">
                                    <T id={b.titleId} />
                                </h3>
                                <p className="font-body text-foreground/80 text-[14px] sm:text-[15px] leading-[1.85]">
                                    <T id={b.descId} />
                                </p>
                            </div>
                        </motion.div>
                    ))}
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
                            <Star key={i} className="w-5 h-5 fill-transparent text-[#B38B4D]" strokeWidth={1.75} />
                        ))}
                    </div>
                    <p className="font-display text-lg sm:text-xl md:text-2xl italic text-foreground/85 max-w-3xl mx-auto leading-[1.85]">
                        {highlight(t('NEW_WHY_CLOSING_QUOTE'), (t('NEW_WHY_CLOSING_HIGHLIGHTS') || '').split('|').filter(Boolean))}
                    </p>
                    <p className="mt-5 font-body text-xs md:text-sm tracking-[0.2em] uppercase text-[#B38B4D] font-semibold">
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

'use client';
/**
 * ServicesSection.jsx
 *
 * ─── WHAT TO ASK MARIIA BEFORE GOING LIVE ──────────────────────────────────
 *
 * 1. PHOTOS — she already has all of these in her price list; ask for
 *    high-resolution versions (at least 1200px wide):
 *    • Bikini/intimate result photo  → replace IMAGE_BIKINI placeholder
 *    • Underarms/arms result photo   → replace IMAGE_UPPER placeholder
 *    • Legs result photo             → replace IMAGE_DOWN placeholder
 *    • Face treatment photo          → replace IMAGE_FACE placeholder
 *
 * 2. DESCRIPTIONS — needed for every Upper Body and Face service:
 *    • Underarms — duration + 1-2 sentence description
 *    • Full Arms — duration + description
 *    • Half Arms — duration + which half (elbow down vs elbow up)
 *    • Stomach — duration + area covered (full stomach or just above navel?)
 *    • Nipple Aureolas — description (very brief is fine)
 *    • Fingers — description
 *    • All Face individual zones — 1-2 sentences each:
 *        Upper Lip, Chin, Nose Pores (what is this exactly?),
 *        Nostrils, Eyebrows, Sideburns, Neck, Nape Area
 *
 * 3. FACE COMBOS — confirm the "Save" amounts are correct:
 *    Upper Lip + Chin = £30 (save £5 vs buying separately)
 *    Nose Pores + Nostrils = £30 (save £5)
 *    Neck + Nape = £20 (save £10? — check this, seems very low)
 *
 * 4. ADDRESS — confirm: "1 Cranberry Walk, BS9 2RB" — add to Contact section
 *
 * 5. MISSING SERVICES — does she offer:
 *    • Chest / Décolletage sugaring?
 *    • Upper lip sugaring (also for men)?
 *    • Any other services not shown in the price list?
 * ────────────────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star, Clock, Check, Sparkles, ChevronDown,
    Heart, Layers, ArrowDown, Smile, Info, AlertCircle
} from 'lucide-react';
import { useLang } from '../context/LangContext';
import translations from '../translations';
import { getServicesData } from './ServicesData';

// Data is now imported from ServicesData.jsx

// ─── SERVICE ITEM CARD ───────────────────────────────────────────────────────

function ServiceCard({ item, index, isPremium }) {
    const isPopular = item.badge === 'Most Popular' || item.badge === 'Найпопулярніше';
    const isPackage = item.badge && !isPopular && !isPremium;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`group relative border rounded-sm transition-all duration-500 hover:shadow-lg flex flex-col bg-background ${isPremium
                ? 'border-primary/40 shadow-md hover:border-primary/60 hover:shadow-lg relative after:absolute after:inset-0 after:bg-primary/10 after:pointer-events-none'
                : isPopular
                ? 'border-primary/50 shadow-sm'
                : isPackage
                    ? 'border-primary/30 relative after:absolute after:inset-0 after:bg-primary/5 after:pointer-events-none'
                    : 'border-border/50 hover:border-primary/30'
                }`}
        >
            {item.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm flex items-center gap-1 z-20 shadow-sm whitespace-nowrap bg-primary text-primary-foreground`}>
                    {isPopular && <Star className="w-3 h-3 fill-current" />}
                    {item.badge}
                </div>
            )}

            {/* Picture/Graphic Placeholder or Real Image */}
            {item.image ? (
                <div className="w-full aspect-[16/9] border-b border-border/30 shrink-0 relative overflow-hidden rounded-t-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
            ) : item.placeholderLabel ? (
                <div className="w-full aspect-[16/9] bg-gradient-to-br from-secondary/50 via-accent/35 to-secondary/50 flex items-center justify-center border-b border-border/30 shrink-0 relative overflow-hidden rounded-t-sm">
                    <span className="text-[10px] tracking-[0.12em] uppercase text-muted-foreground/60 font-body px-4 text-center">
                        📸 {item.placeholderLabel}
                    </span>
                </div>
            ) : null}

            <div className="p-6 lg:p-8 flex flex-col flex-1 relative">
                <div className="flex justify-between items-start mb-4 mt-2">
                    <h4 className={`font-display text-xl font-semibold pr-4 leading-tight text-foreground`}>
                        {item.name}
                    </h4>
                    <span className={`font-display text-2xl font-semibold whitespace-nowrap font-medium text-primary`}>
                        {item.price}
                    </span>
                </div>

                {item.duration && (
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className={`w-3.5 h-3.5 text-muted-foreground/60`} />
                        <span className={`text-sm font-body tracking-wide text-muted-foreground`}>
                            {item.duration}
                        </span>
                    </div>
                )}

                {item.desc && (
                    <p className={`text-sm leading-relaxed whitespace-pre-line font-body mt-2 text-muted-foreground`}>
                        {item.desc}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

// ─── ADD-ON ITEM CARD ────────────────────────────────────────────────────────

function AddOnCard({ item, index }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { lang } = useLang();
    const readMoreText = translations[lang].blog.readMore;

    React.useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isExpanded]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className={`group relative bg-background/40 hover:bg-background border border-dashed border-border/60 hover:border-primary/50 hover:shadow-md rounded-sm p-5 transition-all duration-300 flex flex-col justify-between ${item.extendedDesc ? 'cursor-pointer' : ''}`}
            onClick={() => item.extendedDesc && setIsExpanded(true)}
        >
            <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="flex items-start gap-1.5">
                        <span className="text-primary font-semibold text-sm leading-none shrink-0 mt-0.5">+</span>
                        <div className="flex flex-col items-start gap-1">
                            <h5 className="font-display text-[17px] font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                                {item.name}
                            </h5>
                        </div>
                    </div>
                    <span className="font-display text-lg font-semibold text-primary shrink-0 leading-none">
                        {item.price}
                    </span>
                </div>

                {/* Picture/Graphic Placeholder or Real Image */}
                {item.image && (
                    <div className="w-full h-16 rounded-sm overflow-hidden mb-3 border border-border/30">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                )}

                {item.desc && (
                    <p className="text-sm text-muted-foreground leading-relaxed font-body mt-1.5 whitespace-pre-line">
                        {item.desc}
                    </p>
                )}
            </div>

            {/* Click to read more indicator */}
            {item.extendedDesc && (
                <div className="mt-4 flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-medium text-primary/60 group-hover:text-primary transition-colors font-body border-t border-dashed border-border/50 pt-3">
                    <Info className="w-3.5 h-3.5" />
                    <span>{readMoreText}</span>
                </div>
            )}

            {/* Modal Popup (Mobile & Desktop) */}
            {item.extendedDesc && (
                <AnimatePresence>
                    {isExpanded && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExpanded(false);
                                }}
                            />
                            
                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full max-w-md bg-background border border-border shadow-2xl rounded-md p-6 sm:p-8 flex flex-col max-h-full"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsExpanded(false);
                                    }}
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                                    aria-label="Close"
                                >
                                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                
                                <h4 className="font-display text-xl font-semibold text-foreground mb-4 pr-6 shrink-0">
                                    {item.name}
                                </h4>
                                <div className="text-sm text-muted-foreground leading-relaxed font-body whitespace-pre-line overflow-y-auto pr-2">
                                    {item.extendedDesc}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            )}
        </motion.div>
    );
}



// ─── FACE CARE GUIDE ─────────────────────────────────────────────────────────

function FaceCareGuide() {
    const { lang } = useLang();
    const t = translations[lang].services;
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
        >
            <button
                onClick={() => setIsOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border/40 rounded-sm hover:border-primary/30 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium font-body">
                        {t.faceCareGuideToggle}
                    </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-background border border-t-0 border-border/40 rounded-b-sm p-6 md:p-8 space-y-10 text-[15px] font-body leading-relaxed text-muted-foreground">
                            
                            {/* Intro */}
                            <div className="space-y-4">
                                <p>{t.faceGuideIntro1}</p>
                                <p>{t.faceGuideIntro2}</p>
                                <p>{t.faceGuideIntro3}</p>
                            </div>

                            {/* Section 1 */}
                            <div>
                                <h5 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                                    {t.faceGuideSection1Heading}
                                </h5>
                                <div className="space-y-4">
                                    <p>{t.faceGuideSection1Para1}</p>
                                    <ul className="space-y-3 pl-2 list-none">
                                        <li className="relative before:content-[''] before:absolute before:-left-5 before:w-1.5 before:h-1.5 before:bg-foreground before:rounded-full before:top-2 ml-5">
                                            {t.faceGuideSection1Bullet1}
                                        </li>
                                        <li className="relative before:content-[''] before:absolute before:-left-5 before:w-1.5 before:h-1.5 before:bg-foreground before:rounded-full before:top-2 ml-5">
                                            {t.faceGuideSection1Bullet2}
                                        </li>
                                    </ul>
                                    <p>{t.faceGuideSection1Para2}</p>
                                    <blockquote className="border-l-2 border-primary/40 pl-4 py-1 my-6 italic text-foreground/80 bg-primary/5 rounded-r-sm p-4">
                                        {t.faceGuideSection1Quote}
                                    </blockquote>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h5 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
                                    {t.faceGuideSection2Heading}
                                </h5>
                                <div className="space-y-5">
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">{t.faceGuideItem1Strong}</strong> {t.faceGuideItem1Text}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">{t.faceGuideItem2Strong}</strong> {t.faceGuideItem2Text}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">{t.faceGuideItem3Strong}</strong> {t.faceGuideItem3Text}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">{t.faceGuideItem4Strong}</strong> {t.faceGuideItem4Text}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">{t.faceGuideItem5Strong}</strong> {t.faceGuideItem5Text}</p>
                                    </div>
                                    <div className="mt-6 bg-secondary/50 rounded-sm p-4 text-primary font-medium flex items-start gap-3">
                                        <span className="text-lg leading-none mt-0.5">💬</span>
                                        <p>{t.faceGuideSendPhotoNote}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h5 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                                    {t.faceGuideSection3Heading}
                                </h5>
                                <div className="space-y-4">
                                    <p>{t.faceGuideSection3Intro}</p>
                                    <div className="grid sm:grid-cols-2 gap-5 mt-6">
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">{t.faceGuideAftercare1Strong}</strong> {t.faceGuideAftercare1Text}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">{t.faceGuideAftercare2Strong}</strong> {t.faceGuideAftercare2Text}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">{t.faceGuideAftercare3Strong}</strong> {t.faceGuideAftercare3Text}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">{t.faceGuideAftercare4Strong}</strong> {t.faceGuideAftercare4Text}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">{t.faceGuideAftercare5Strong}</strong> {t.faceGuideAftercare5Text}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">{t.faceGuideAftercare6Strong}</strong> {t.faceGuideAftercare6Text}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 space-y-4">
                                        <p className="italic border-l-2 border-primary/40 pl-4 py-1 text-foreground/80">
                                            {t.faceGuideClosingNote}
                                        </p>
                                        <div className="bg-primary text-primary-foreground rounded-sm p-4 font-medium flex items-start gap-3">
                                            <span className="text-lg leading-none mt-0.5">💬</span>
                                            <p>{t.faceGuideClosingCta}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── MOBILE FLASHCARD CAROUSEL ──────────────────────────────────────────────

function MobileFlashcards({ items, isPremium }) {
    const [[current, direction], setPage] = useState([0, 0]);

    const total = items.length;

    const paginate = (dir) => {
        setPage(([prev]) => [
            (prev + dir + total) % total,
            dir,
        ]);
    };

    const variants = {
        enter: (dir) => {
            if (dir > 0) {
                return { x: 0, y: 15, scale: 0.9, opacity: 0, zIndex: 0 };
            } else {
                return { x: -300, y: 0, scale: 1, opacity: 0, rotate: -10, zIndex: 10 };
            }
        },
        center: {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: 0,
            zIndex: 5,
        },
        exit: (dir) => {
            if (dir > 0) {
                return { x: -300, y: 0, scale: 1, opacity: 0, rotate: -10, zIndex: 10 };
            } else {
                return { x: 0, y: 15, scale: 0.9, opacity: 0, zIndex: 0 };
            }
        },
    };

    return (
        <div className="md:hidden pb-4">
            {/* Card area */}
            <div className="relative pt-3 pb-2">
                {/* Visual Stack Cards Behind */}
                <div className="absolute inset-0 top-3 pointer-events-none flex justify-center z-0">
                    <div className="w-[92%] h-full bg-background border border-border/60 rounded-sm shadow-sm absolute top-3 opacity-60" />
                    <div className="w-[84%] h-full bg-background border border-border/40 rounded-sm shadow-sm absolute top-6 opacity-30" />
                </div>

                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="relative z-10 w-full"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            if (offset.x < -40 || velocity.x < -400) {
                                paginate(1);
                            } else if (offset.x > 40 || velocity.x > 400) {
                                paginate(-1);
                            }
                        }}
                    >
                        <ServiceCard item={items[current]} index={current} isPremium={isPremium} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8 px-1">
                {/* Prev */}
                <button
                    onClick={() => paginate(-1)}
                    className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary transition-all active:scale-95 bg-background shadow-sm"
                    aria-label="Previous"
                >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                        <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Dots */}
                <div className="flex items-center gap-2">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage([i, i > current ? 1 : -1])}
                            className={`rounded-full transition-all duration-300 ${
                                i === current
                                    ? 'w-6 h-1.5 bg-primary shadow-sm'
                                    : 'w-1.5 h-1.5 bg-border hover:bg-primary/50'
                            }`}
                            aria-label={`Go to card ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={() => paginate(1)}
                    className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-foreground/60 hover:border-primary hover:text-primary transition-all active:scale-95 bg-background shadow-sm"
                    aria-label="Next"
                >
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            {/* Counter */}
            <p className="text-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 mt-4 font-body">
                {current + 1} / {total}
            </p>
        </div>
    );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function ServicesSection() {
    const { lang } = useLang();
    const t = translations[lang].services;
    const { inclusions, durationNotes, categories } = getServicesData(t);

    const [activeTab, setActiveTab] = useState('bikini');
    const [notesOpen, setNotesOpen] = useState(false);

    const active = categories.find(c => c.id === activeTab);

    return (
        <section id="services" className="py-16 lg:py-32 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">
                            {t.eyebrow}
                        </span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
                        {t.heading.split(' ')[0]} <span className="font-semibold italic">{t.heading.split(' ').slice(1).join(' ')}</span>
                    </h2>
                </motion.div>

                {/* ── What's Included ── */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className="bg-background border border-border/40 rounded-sm p-6 lg:p-8">
                        <div className="flex items-center gap-2.5 mb-5">
                            <p className="text-xs tracking-[0.25em] uppercase text-primary font-medium">
                                {t.inclusionsLabel}
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-5">
                            {inclusions.map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <Check className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground font-body mb-1">{item.title}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed font-body">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Tab Navigation ── */}
                <div className="mb-8 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
                    <div className="flex gap-0 border-b border-border/30 min-w-max lg:min-w-0">
                        {categories.map(cat => {
                            const isActive = activeTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className="relative px-5 py-3.5 text-xs tracking-[0.18em] uppercase font-medium font-body transition-colors"
                                    style={{ color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}
                                >
                                    {cat.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="tab-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Tab Content ── */}
                <AnimatePresence mode="wait">
                    {active && (
                        <motion.div
                            key={active.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                        >


                            {/* Category header */}
                            <div className="mb-8">
                                <h3 className="font-display text-3xl md:text-4xl font-light text-foreground mb-2">
                                    {active.fullLabel}
                                </h3>
                                <p className="text-sm font-body text-muted-foreground italic">
                                    {active.tagline}
                                </p>
                            </div>

                            {/* Service Groups */}
                            <div className="space-y-10">
                                {active.groups.map((group, gi) => (
                                    <div key={gi}>
                                        {/* Group heading */}
                                        {group.groupName && (
                                            <div className={`flex items-center gap-3 mb-4 ${group.isAddOn ? 'mt-6' : ''}`}>
                                                <p className="text-[10px] tracking-[0.28em] uppercase font-medium font-body text-muted-foreground">
                                                    {group.groupName}
                                                </p>
                                                <div className={`flex-1 h-px ${group.isAddOn ? 'border-t border-dashed border-border/40' : 'bg-border/30'}`} />
                                            </div>
                                        )}

                                        {/* Cards grid */}
                                        {group.isAddOn ? (
                                            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {group.items.map((item, i) => (
                                                    <AddOnCard key={i} item={item} index={i} />
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                {/* Mobile: flashcard carousel */}
                                                <MobileFlashcards items={group.items} isPremium={group.isPremium} />

                                                {/* Desktop: grid */}
                                                <div className={`hidden md:grid md:grid-cols-2 gap-6 ${group.isPremium ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
                                                    {group.items.map((item, i) => (
                                                        <ServiceCard key={i} item={item} index={i} isPremium={group.isPremium} />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Face Care Guide specifically for Face tab */}
                            {active.id === 'face' && (
                                <FaceCareGuide />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Collapsible Duration Notes ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8"
                >
                    <button
                        onClick={() => setNotesOpen(o => !o)}
                        className="w-full flex items-center justify-between px-6 py-4 bg-background border border-border/40 rounded-sm hover:border-primary/30 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-primary" />
                            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium font-body">
                                {t.durationToggle}
                            </p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${notesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {notesOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-background border border-t-0 border-border/40 rounded-b-sm px-6 py-6">
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 font-body">
                                        {t.durationIntro}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {durationNotes.map((note, i) => (
                                            <div key={i} className="flex gap-3 items-start">
                                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground font-body mb-0.5">{note.title}</p>
                                                    <p className="text-sm text-muted-foreground leading-relaxed font-body">{note.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ── Book CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-14 text-center"
                >
                    <p className="font-display italic text-lg text-foreground/50 mb-6">
                        {t.servicesBottomQuote}
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:bg-primary/90 active:scale-95 transition-all"
                    >
                        {t.servicesBottomCta}
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
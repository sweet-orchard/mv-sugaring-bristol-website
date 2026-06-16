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

// ─── DATA ────────────────────────────────────────────────────────────────────

const inclusions = [
    {
        title: 'Professional Skin Consultation',
        desc: 'A detailed analysis of your skin\'s current condition before we begin.',
    },
    {
        title: 'Bespoke Expert Advice',
        desc: 'Personalised home-care recommendations to keep your skin radiant between visits.',
    },
    {
        title: 'Luxury Aftercare',
        desc: 'Premium cosmeceuticals and delicate spa-exfoliation techniques applied during your session.',
    },
];

const durationNotes = [
    {
        title: 'How I Work',
        desc: 'My expertise lies in performing hair removal with minimal discomfort and zero skin trauma — to the absolute greatest extent possible in your individual case.',
    },
    {
        title: 'Bespoke Technique',
        desc: 'My experience allows me to custom-select paste density and technique just for you — my actions always depend on the live condition of your skin during your visit.',
    },
    {
        title: 'No Client Conveyor Belt',
        desc: 'I do not operate on a high-volume, rushed schedule. Every treatment perfectly matches your individual needs in a calm, stress-free atmosphere.',
    },
    {
        title: 'Individual Factors',
        desc: 'Hair length, density, volume, and complexity all affect duration. For your very first visit, please plan around the maximum indicated time.',
    },
    {
        title: 'Time Savings with Combos',
        desc: 'Combining multiple zones into a single session will often be quicker than booking each zone separately.',
    },
    {
        title: 'Flexibility for Your Schedule',
        desc: 'If speed is your priority today, let me know in advance. Your safety and results always come first.',
    },
];

const categories = [
    {
        id: 'bikini',
        label: 'Bikini',
        fullLabel: 'Bikini & Intimate Sugaring',
        Icon: Heart,
        beforeImage: null,
        afterImage: null,
        tagline: 'My most-requested treatments — designed for total confidence and comfort.',
        groups: [
            {
                groupName: null,
                items: [
                    {
                        name: 'Hollywood',
                        price: '£45',
                        badge: 'Most Popular',
                        duration: '40 min – 1 hour',
                        desc: 'Complete hair removal from front to back for a perfectly smooth finish. Ideal if you prefer a fully bare, long-lasting result.',
                        image: '/price-list/bikini/hollywood-bikini.jpeg',
                    },
                    {
                        name: 'Brazilian',
                        price: '£45',
                        duration: '40 min – 1 hour',
                        desc: 'Full hair removal but with a small strip or triangle on the front if you prefer to leave something. If you want a stylised and natural look choose this option.',
                        image: '/price-list/bikini/brazilian-bikini.jpeg',
                    },
                    {
                        name: 'G-String / Extended Bikini',
                        price: '£35',
                        duration: '30 – 40 min',
                        desc: 'Targets hair outside the bikini line and slightly deeper for a neat, more defined shape. Perfect for higher-cut underwear or swimwear.',
                        image: '/price-list/bikini/g-string-bikini.jpeg',
                    },
                    {
                        name: 'Basic Bikini Line',
                        price: '£25',
                        duration: '20 – 30 min',
                        desc: 'Removes hair along the sides of the bikini line for a clean and tidy appearance. Quick, simple, and perfect for beginners.',
                        image: '/price-list/bikini/basic-bikini.jpg',
                    },
                ],
            },
            {
                groupName: 'Add-ons',
                isAddOn: true,
                items: [
                    {
                        name: 'Extra Long Hair & Extended Intervals',
                        price: '+£5 to £20',
                        desc: 'Applies if it\'s been over 4 weeks since shaving or 7–8 weeks since your last professional treatment. The fee reflects the extra time and technique involved — but rewards you with a much longer-lasting result. Please let me know your hair length before your visit.',
                        extendedDesc: 'The Rule: The additional fee applies if it has been over 4 weeks since shaving, or over 7–8 weeks since your last professional treatment.\n\nWhy? Working with longer hair or extended gaps requires extra time and meticulous technique.\n\nYour Benefit: A wonderful advantage of this session is a longer-lasting result, as we thoroughly remove the maximum volume of hairs that have appeared.\n\nMaintenance: The standard regular interval for maintenance is 4–5–6 weeks. Please kindly let me know about your hair length beforehand so I can guide you. The cost is adjusted individually based on time and complexity.',
                        isAddOn: true,
                        placeholderLabel: 'Extra Long Hair Graphic',
                    },
                    {
                        name: 'Extra Patch',
                        price: '£5',
                        desc: 'For small stray hairs or minor spots outside the standard menu — e.g. a few dark hairs on the back of the thighs, or a small partial patch on the butt cheeks.',
                        extendedDesc: 'The Rule: Designed specifically for clearing small, stray hairs or minor individual spots outside our standard menu.\n\nPlease Note: Standard bikini treatments do not include the butt cheeks or hair growing on the thighs beyond 4 fingers\' width.\n\nWhen to book: If you need to add a small custom area (e.g., single dark stray hairs on the back of the thighs, or a small partial patch slightly deeper onto the butt cheeks without clearing the full buttocks).',
                        isAddOn: true,
                        placeholderLabel: 'Extra Patch Graphic',
                    },
                    {
                        name: 'Belly Line',
                        price: '£5',
                        desc: 'A neat single line of hair removal from the navel downwards.',
                        isAddOn: true,
                        placeholderLabel: 'Belly Line Graphic',
                    },
                ],
            },
        ],
    },
    {
        id: 'upper',
        label: 'Upper Body',
        fullLabel: 'Upper Body Sugaring',
        Icon: Sparkles,
        beforeImage: null,
        afterImage: null,
        tagline: 'Silky femininity — from your fingertips to your shoulders.',
        groups: [
            {
                groupName: null,
                items: [
                    {
                        name: 'Underarms',
                        price: '£20',
                        duration: '10 – 15 min',
                        desc: 'Complete hair removal for the underarm area, ensuring clean, fresh, and smooth skin.',
                        placeholderLabel: 'Underarms Graphic',
                    },
                    {
                        name: 'Full Arms',
                        price: '£50',
                        duration: '1 hour',
                        desc: 'Total hair removal from the shoulders down to the wrists, including the hands.',
                        placeholderLabel: 'Full Arms Graphic',
                    },
                    {
                        name: 'Half Arms',
                        price: '£40',
                        duration: '30 – 40 min',
                        desc: 'Hair removal from the elbow down to the tips of your fingers, with the elbow fully included in the service.',
                        placeholderLabel: 'Half Arms Graphic',
                    },
                    {
                        name: 'Stomach',
                        price: '£30',
                        duration: '15 – 20 min',
                        desc: 'Full hair removal across the abdomen area, leaving the skin perfectly clear and smooth.',
                        placeholderLabel: 'Stomach Graphic',
                    },
                ],
            },
            {
                groupName: 'Add-ons',
                isAddOn: true,
                items: [
                    {
                        name: 'Nipple Area',
                        price: '£5',
                        duration: '5 – 10 min',
                        desc: 'Gentle and precise hair removal immediately around the nipple zone.',
                        isAddOn: true,
                        placeholderLabel: 'Nipple Area Graphic',
                    },
                    {
                        name: 'Fingers Only',
                        price: '£10',
                        duration: '5 – 10 min',
                        desc: 'Quick and precise hair removal strictly for the fingers on both hands.',
                        isAddOn: true,
                        placeholderLabel: 'Fingers Graphic',
                    },
                ],
            },
        ],
    },
    {
        id: 'down',
        label: 'Down Body',
        fullLabel: 'Down Body Sugaring',
        Icon: ArrowDown,
        beforeImage: null,
        afterImage: null,
        tagline: 'From your waist to your toes — effortlessly and beautifully smooth.',
        groups: [
            {
                groupName: null,
                items: [
                    {
                        name: 'Full Legs (Includes Toes)',
                        price: '£60',
                        duration: '1 – 1.5 hours',
                        desc: 'Total hair removal from the very top of the thighs down to the tips of your toes. Please note: this service does not include bikini line hair removal.',
                        placeholderLabel: 'Full Legs Graphic',
                    },
                    {
                        name: 'Half Legs (Includes Toes)',
                        price: '£40',
                        duration: '30 – 45 min',
                        desc: 'Your choice of either Lower Legs (from the knee down to the tips of your toes) or Upper Legs (the thighs down to the knee).',
                        placeholderLabel: 'Half Legs Graphic',
                    },
                    {
                        name: 'Buttocks',
                        price: '£25',
                        duration: '15 – 20 min',
                        desc: 'Full hair removal across the buttocks area, leaving the skin perfectly smooth and silky.',
                        placeholderLabel: 'Buttocks Graphic',
                    },
                    {
                        name: 'Lower Back',
                        price: '£25',
                        duration: '15 – 20 min',
                        desc: 'Precise hair removal covering the lower lumbar area, from the waistline down to the top of the buttocks.',
                        placeholderLabel: 'Lower Back Graphic',
                    },
                    {
                        name: 'Lower Back + Buttocks Combo',
                        price: '£40',
                        badge: 'Package Deal',
                        duration: '30 – 40 min',
                        desc: 'A cost-effective treatment combining both the lower back and the buttocks for a completely smooth silhouette.',
                        placeholderLabel: 'Lower Back & Buttocks Graphic',
                    },
                ],
            },
            {
                groupName: 'Add-ons',
                isAddOn: true,
                items: [
                    {
                        name: 'Toes only',
                        price: '£10',
                        duration: '10 min',
                        desc: 'A quick, standalone treatment to remove hair strictly from the tops of the feet and toes.',
                        isAddOn: true,
                        placeholderLabel: 'Toes Graphic',
                    },
                ],
            },
        ],
    },
    {
        id: 'face',
        label: 'Face',
        fullLabel: 'Face Sugaring',
        Icon: Smile,
        beforeImage: null,
        afterImage: null,
        tagline: 'Precise, gentle sugaring for every delicate facial zone.',
        groups: [
            {
                groupName: 'Individual Zones',
                items: [
                    { name: 'Upper Lip', price: '£15', duration: '15–20 min', desc: 'Removal of fine fuzz and coarse hair above the lip.', placeholderLabel: 'Upper Lip Graphic' },
                    { name: 'Chin', price: '£15', duration: '10–15 min', desc: 'Hair removal from the chin and just under the jawline.', placeholderLabel: 'Chin Graphic' },
                    { name: 'Nose Pores', price: '£20', duration: '15-20 min', desc: 'Deep sugar cleanse to clear blackheads from the nose surface.', placeholderLabel: 'Nose Pores Graphic' },
                    { name: 'Nostrils', price: '£15', duration: '15-20 min', desc: 'Removal of all hair inside the nostrils. It is not just about aesthetics, it is about making it much easier for you to breathe.', placeholderLabel: 'Nostrils Graphic' },
                    { name: 'Eyebrows', price: '£30', duration: '30–40 min', desc: 'Tidying around the eyebrows using sugar paste. Creates a clean framing effect that makes your natural brows look sharper and more defined.', placeholderLabel: 'Eyebrows Graphic' },
                    { name: 'Sideburns', price: '£20', duration: '20-25 min', desc: 'Hair removal around the ears and along the jawline.', placeholderLabel: 'Sideburns Graphic' },
                    { name: 'Neck', price: '£15', duration: '15-20 min', desc: 'Removal of unwanted hair on the front and sides of the neck.', placeholderLabel: 'Neck Graphic' },
                    { name: 'Nape Area', price: '£15', duration: '15-20 min', desc: 'Creating a clean, defined hairline. Removes all fine, short hair and peach fuzz to make your haircut or updo look absolutely flawless.', placeholderLabel: 'Nape Area Graphic' },
                ],
            },
            {
                groupName: 'Mini Combos',
                isPackages: true,
                items: [
                    { name: 'Combo 1 — Lower Face Care', price: '£30', duration: '25–30 min', badge: 'Most Popular', desc: '(Upper Lip + Chin) — Our most requested combination for flawless smoothness.', placeholderLabel: 'Lower Face Care Graphic' },
                    { name: 'Combo 2 — Complete Nose Care', price: '£30', duration: '30–35 min', desc: '(Nose Pores + Nostrils) — Deep outer pore cleanse combined with inner hair removal.', placeholderLabel: 'Complete Nose Care Graphic' },
                    { name: 'Combo 3 — T-Zone Treatment', price: '£40', duration: '40–45 min', desc: '(Eyebrows + Nose Pores) — An effective duo package covering expert eyebrow shaping and pore cleansing.', placeholderLabel: 'T-Zone Treatment Graphic' },
                    { name: 'Combo 4 — Perfect Facial Contour', price: '£40', duration: '35–40 min', badge: 'Special Offer', desc: '(Upper Lip + Chin + Sideburns) — A comprehensive package tailored for a completely smooth and neat contour.', placeholderLabel: 'Perfect Facial Contour Graphic' },
                ],
            },
            {
                groupName: 'Premium Packages',
                isPackages: true,
                isPremium: true,
                items: [
                    { name: 'Premium 1 — Full Facial Care', price: '£70', duration: '1.5–2 hrs', desc: '(Full Face + Eyebrows) — Total smoothness across all areas, expert eyebrow shaping, and professional care with a soothing mask.', placeholderLabel: 'Full Facial Care Graphic' },
                    { name: 'Premium 2 — Ultimate Refresh: Face & Nape', price: '£80', duration: '2-2.5 hrs', desc: '(Full Face + Nape Area) — Flawless face, eyebrow shaping, and a defined hairline combined with professional care and a mask.', placeholderLabel: 'Ultimate Refresh Graphic' },
                    { name: 'Premium 3 — Royal Smoothness: Face & Neck', price: '£80', duration: '2-2.5 hrs', desc: '(Full Face + Neck) — Seamless smoothness for the face, eyebrows, and neck area, completed with professional care and a soothing mask.', placeholderLabel: 'Royal Smoothness Graphic' },
                ],
            }
        ],
    },
];

// ─── SERVICE ITEM CARD ───────────────────────────────────────────────────────

function ServiceCard({ item, index, isPremium }) {
    const isPopular = item.badge === 'Most Popular';
    const isPackage = item.badge && !isPopular && !isPremium;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`group relative border rounded-sm transition-all duration-500 hover:shadow-lg flex flex-col ${isPremium
                ? 'bg-primary/10 border-primary/40 shadow-md hover:border-primary/60 hover:shadow-lg'
                : isPopular
                ? 'bg-background border-primary/50 shadow-sm'
                : isPackage
                    ? 'border-primary/30 bg-primary/5'
                    : 'bg-background border-border/50 hover:border-primary/30'
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="group relative bg-background/40 hover:bg-background border border-dashed border-border/60 hover:border-primary/40 rounded-sm p-5 transition-all duration-300 flex flex-col justify-between"
            style={isExpanded ? { zIndex: 50 } : { zIndex: 1 }}
        >
            <div>
                <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="flex items-start gap-1.5">
                        <span className="text-primary font-semibold text-sm leading-none shrink-0 mt-0.5">+</span>
                        <div 
                            className="flex items-center gap-2 cursor-pointer relative"
                            onMouseEnter={() => setIsExpanded(true)}
                            onMouseLeave={() => setIsExpanded(false)}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <h5 className="font-display text-[17px] font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                                {item.name}
                            </h5>
                            {item.extendedDesc && (
                                <Info className={`w-4 h-4 transition-colors shrink-0 ${isExpanded ? 'text-primary' : 'text-muted-foreground/60 group-hover:text-primary'}`} />
                            )}

                            {item.extendedDesc && (
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -5, scale: 0.98 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 top-[calc(100%+0.75rem)] w-[calc(100vw-3rem)] max-w-sm sm:max-w-md z-50 p-5 bg-background text-foreground border border-border shadow-2xl rounded-md text-sm leading-relaxed font-body whitespace-pre-line pointer-events-none"
                                            style={{ zIndex: 100 }}
                                        >
                                            {item.extendedDesc}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
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
        </motion.div>
    );
}



// ─── FACE CARE GUIDE ─────────────────────────────────────────────────────────

function FaceCareGuide() {
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
                        Important Information About Facial Sugaring
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
                                <p>
                                    Facial hair removal requires an incredibly delicate touch. When working with this sensitive area, I use my own signature, highly gentle method. It is much safer and kinder to your skin than traditional techniques.
                                </p>
                                <p>
                                    With 8 years of professional experience, I know exactly how much care this zone deserves. For me, this is never just a simple process of application and removal. It is a mindful sequence of steps tailored precisely to the unique condition of your skin on the day of your visit.
                                </p>
                                <p>
                                    Every session is also a premium skincare treatment. I incorporate luxury professional products, soothing masks, and creams chosen specifically for you. Because of this dedicated care, my treatments take a little longer than what you might find in standard salons. This service is designed for those who value a truly bespoke approach and refuse to settle for anything less than the best for their skin.
                                </p>
                            </div>

                            {/* Section 1 */}
                            <div>
                                <h5 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                                    ✨ The Magic of Sugar Paste: More Than Just Hair Removal
                                </h5>
                                <div className="space-y-4">
                                    <p>
                                        Sugar paste is a truly remarkable material that works wonders on the delicate facial area. It deeply cleanses the skin and clears facial pores from blackheads in a way no other professional product can match. Because of this, my clients usually fall into two categories:
                                    </p>
                                    <ul className="space-y-3 pl-2 list-none">
                                        <li className="relative before:content-[''] before:absolute before:-left-5 before:w-1.5 before:h-1.5 before:bg-foreground before:rounded-full before:top-2 ml-5">
                                            Those who come for flawless smoothness and complete hair removal.
                                        </li>
                                        <li className="relative before:content-[''] before:absolute before:-left-5 before:w-1.5 before:h-1.5 before:bg-foreground before:rounded-full before:top-2 ml-5">
                                            Those who choose this treatment as a deep facial cleanse to instantly restore freshness, youthfulness, and a completely renewed glow.
                                        </li>
                                    </ul>
                                    <p>
                                        The best part? No matter your main goal, you always get the perfect combination of both benefits! This is an absolute favorite treatment among my clients. It leaves you feeling incredibly inspired to care for your skin, and your daily at-home skincare routines (creams, serums) will become significantly more effective, as your deeply purified skin can finally absorb all the nutrients.
                                    </p>
                                    <blockquote className="border-l-2 border-primary/40 pl-4 py-1 my-6 italic text-foreground/80 bg-primary/5 rounded-r-sm p-4">
                                        "I am absolutely in love with this feeling, and I regularly do facial sugaring on myself. Every single time, it is a true 'wow' moment! I look in the mirror and think: 'Is this really my skin? It feels as incredibly soft and tender as my daughter's.' You will absolutely fall in love with your reflection and enjoy every single touch!"
                                    </blockquote>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div>
                                <h5 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
                                    💡 What You Need to Know Before Your Facial Treatment
                                </h5>
                                <div className="space-y-5">
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">Timing your first visit:</strong> If you are booking a Full Face treatment for the very first time, please schedule your appointment 5 to 7 days before any important event. If you have had facial waxing or sugaring before and know how your skin responds, 2 to 3 days in advance is perfect.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">Understanding skin reactions:</strong> Sugaring gently exfoliates the skin, so temporary redness is completely normal. While my signature technique is designed to minimize trauma, a first-time treatment can sometimes trigger tiny white bumps. This is a natural, individual response from your body. They clear up on their own, and I will always guide you on how to make them disappear quickly.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">The power of routine:</strong> With regular appointments, your skin adapts. If you experienced minor breakouts after your first visit, they usually significantly decrease or do not appear at all by the second time.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">Prone to breakouts? Your safety comes first:</strong> Some clients notice a few minor spots after treating even a tiny zone, regardless of whether wax or sugar is used. This is simply how their skin naturally reacts to the extraction process, driven by internal triggers. While professional products minimize this effect, clients who are prone to this usually know their skin well, expect this reaction, and independently choose what they prioritize right now: hair-free skin or managing a brief 1–2 day breakout.<br/><br/>
                                        Please note that I do not work with skin in the active stages of acne or severe post-acne. If your skin is prone to breakouts, we can safely perform a targeted treatment strictly in areas free of inflammation on the day of your visit (such as just the eyebrows, upper lip, or chin). For your ultimate safety, the specific zone being treated must be completely free of active breakouts. If it is just a single, occasional spot (e.g., a hormonal breakout), I will simply and carefully work around it.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p><strong className="text-foreground font-medium">Start small:</strong> If you feel nervous, I highly recommend starting with a smaller zone first. This allows you to experience the treatment, see how beautifully your skin changes, and monitor how your body reacts. We can always add more zones during your next visit!</p>
                                    </div>
                                    <div className="mt-6 bg-secondary/50 rounded-sm p-4 text-primary font-medium flex items-start gap-3">
                                        <span className="text-lg leading-none mt-0.5">💬</span>
                                        <p>Please send me a photo of your skin before booking. I am always happy to consult and guide you! I share this not to overwhelm you, but to ensure you feel confident, safe, and fully informed.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div>
                                <h5 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                                    ✨ Post-Treatment Care & What to Expect
                                </h5>
                                <div className="space-y-4">
                                    <p>
                                        The facial area is very delicate, making a temporary skin reaction completely natural. Everyone is beautifully unique: for some, the skin settles within just 20–30 minutes after regular treatments, while others might need 1.5 to 2 days. To help your skin heal beautifully and prevent any irritation, please follow these simple steps after your visit:
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-5 mt-6">
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">Sun protection:</strong> Always apply SPF before heading outside to protect your fresh skin, regardless of whether it is sunny or cloudy.</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">Take it easy:</strong> If possible, enjoy a quiet, relaxing day after your appointment without rushing through a busy to-do list. Give your skin a day or two of relative calm.</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">Keep it clean:</strong> Avoid touching your face with unwashed hands or your phone screen.</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">Avoid skin friction:</strong> Avoid close contact with beards or rough stubble, as this can easily irritate freshly treated skin.</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">Fresh pillowcase:</strong> Put a clean pillowcase on your bed for the night. A dirty surface is often the hidden reason for breakouts on just one side of the face.</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <p><strong className="text-foreground font-medium">Skip the makeup:</strong> Give your skin a break from makeup until any redness or reaction completely settles.</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-8 space-y-4">
                                        <p className="italic border-l-2 border-primary/40 pl-4 py-1 text-foreground/80">
                                            Please remember: if you ever notice a little breakout or have any questions, don't panic! I am always just a message away and ready to guide you on what to do.
                                        </p>
                                        <div className="bg-primary text-primary-foreground rounded-sm p-4 font-medium flex items-start gap-3">
                                            <span className="text-lg leading-none mt-0.5">💬</span>
                                            <p>If you have any questions left about facial treatments, feel free to drop me a message — I'll be absolutely happy to help!</p>
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

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function ServicesSection() {
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
                            Services & Prices
                        </span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
                        Price <span className="font-semibold italic">List</span>
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
                                Included in every visit
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
                                            <div className={`grid md:grid-cols-2 gap-6 ${group.isPremium ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
                                                {group.items.map((item, i) => (
                                                    <ServiceCard key={i} item={item} index={i} isPremium={group.isPremium} />
                                                ))}
                                            </div>
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
                                About Treatment Durations
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
                                        The time shown next to each service is the <em>maximum expected duration</em>. In your specific case, it may well be much quicker. Every step of my work is focused on meticulous quality and your absolute comfort.
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
                        "Not sure which service is right for you? I'm always here to guide you."
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:bg-primary/90 active:scale-95 transition-all"
                    >
                        Ask Me a Question
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
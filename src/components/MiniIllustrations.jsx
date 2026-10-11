import React from 'react';

// Small line illustrations in the site's cream + gold palette.
const INK = '#2B2622';
const GOLD = '#D8B878';
const BLOB = '#EFE8D6';
const line = { stroke: INK, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };

const Blob = () => (
    <path d="M18 52 C14 28 38 8 64 12 C92 16 112 34 104 62 C98 86 72 104 44 98 C26 94 20 74 18 52 Z" fill={BLOB} />
);

const drawings = {
    // Spotless hygiene — shield with a check
    shield: (
        <>
            <Blob />
            <path d="M60 20 L88 30 V54 C88 74 74 88 60 98 C46 88 32 74 32 54 V30 Z" {...line} fill={GOLD} />
            <path d="M47 58 L57 68 L75 46" {...line} stroke="#fff" strokeWidth={4} />
            <path d="M98 20 L98 30 M93 25 L103 25" {...line} strokeWidth={1.8} />
        </>
    ),
    // Cosy & private — a heart inside a little house
    nest: (
        <>
            <Blob />
            <path d="M26 58 L60 28 L94 58" {...line} />
            <path d="M36 52 V96 H84 V52" {...line} fill="#fff" />
            <path d="M60 86 C44 76 44 62 52 60 C56 59 60 62 60 66 C60 62 64 59 68 60 C76 62 76 76 60 86 Z" {...line} strokeWidth={2} fill={GOLD} />
        </>
    ),
    // Premium products — a jar with a sparkle
    jar: (
        <>
            <Blob />
            <path d="M40 32 H80 V46 H40 Z" {...line} fill={GOLD} />
            <path d="M36 46 H84 V90 C84 95 81 98 76 98 H44 C39 98 36 95 36 90 Z" {...line} fill="#fff" />
            <path d="M48 66 H72" {...line} strokeWidth={2} />
            <path d="M52 78 H68" {...line} strokeWidth={2} />
            <path d="M98 18 C99 25 101 27 108 28 C101 29 99 31 98 38 C97 31 95 29 88 28 C95 27 97 25 98 18 Z" {...line} strokeWidth={1.8} fill="#fff" />
        </>
    ),
    // Less irritation — a calm leaf with a drop
    leaf: (
        <>
            <Blob />
            <path d="M34 90 C28 60 48 34 88 28 C90 62 70 88 34 90 Z" {...line} fill={GOLD} />
            <path d="M34 90 L74 44" {...line} strokeWidth={2} />
            <path d="M96 66 C96 66 88 76 88 82 C88 87 92 90 96 90 C100 90 104 87 104 82 C104 76 96 66 96 66 Z" {...line} strokeWidth={2} fill="#fff" />
        </>
    ),
    // More comfort — a soft cloud with a heart
    cloud: (
        <>
            <Blob />
            <path d="M32 84 C14 84 14 58 34 58 C36 40 60 38 66 54 C82 48 98 60 92 76 C92 82 88 84 82 84 Z" {...line} fill="#fff" />
            <path d="M60 76 C47 68 47 57 54 55 C57 54 60 57 60 60 C60 57 63 54 66 55 C73 57 73 68 60 76 Z" {...line} strokeWidth={2} fill={GOLD} />
        </>
    ),
    // Results that last longer — an hourglass
    hourglass: (
        <>
            <Blob />
            <path d="M38 24 H82 M38 96 H82" {...line} />
            <path d="M44 24 C44 52 60 52 60 60 C60 68 44 68 44 96 M76 24 C76 52 60 52 60 60 C60 68 76 68 76 96" {...line} />
            <path d="M50 86 C54 76 66 76 70 86 Z" fill={GOLD} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
            <path d="M54 34 H66 L60 44 Z" fill={GOLD} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        </>
    ),
    // Care guide — Ideal hair length: ruler with a short strand
    ruler: (
        <>
            <Blob />
            <path d="M44 62 C41 52 48 46 45 34" {...line} strokeWidth={3} />
            <path d="M22 62 H98 V82 H22 Z" {...line} fill={GOLD} />
            <path d="M34 62 V71 M46 62 V74 M58 62 V71 M70 62 V74 M82 62 V71" {...line} strokeWidth={2} />
        </>
    ),
    // Gentle exfoliation — a soft sponge with a sparkle
    scrub: (
        <>
            <Blob />
            <circle cx="58" cy="60" r="28" {...line} fill={GOLD} />
            <circle cx="48" cy="52" r="3" fill="#fff" />
            <circle cx="64" cy="48" r="3" fill="#fff" />
            <circle cx="70" cy="66" r="3" fill="#fff" />
            <circle cx="50" cy="70" r="3" fill="#fff" />
            <path d="M98 18 C99 25 101 27 108 28 C101 29 99 31 98 38 C97 31 95 29 88 28 C95 27 97 25 98 18 Z" {...line} strokeWidth={1.8} fill="#fff" />
        </>
    ),
    // Clean, bare skin — a clean drop
    drop: (
        <>
            <Blob />
            <path d="M60 20 C60 20 36 50 36 68 C36 82 47 94 60 94 C73 94 84 82 84 68 C84 50 60 20 60 20 Z" {...line} fill="#fff" />
            <path d="M48 70 C48 79 54 85 62 86" {...line} stroke={GOLD} strokeWidth={4} />
            <path d="M98 22 L98 32 M93 27 L103 27" {...line} strokeWidth={1.8} />
        </>
    ),
    // Avoid tanning — sun with a slash
    sun: (
        <>
            <Blob />
            <circle cx="60" cy="58" r="17" {...line} fill={GOLD} />
            <path d="M60 24 V32 M60 84 V92 M26 58 H34 M86 58 H94 M36 34 L42 40 M78 76 L84 82 M84 34 L78 40 M42 76 L36 82" {...line} strokeWidth={2.2} />
            <path d="M30 94 L90 22" {...line} stroke="#fff" strokeWidth={9} />
            <path d="M30 94 L90 22" {...line} />
        </>
    ),
    // Breathable clothing — a soft tee
    tee: (
        <>
            <Blob />
            <path d="M44 26 L26 40 L35 55 L44 50 V94 H76 V50 L85 55 L94 40 L76 26 C72 34 48 34 44 26 Z" {...line} fill="#fff" />
            <path d="M44 82 H76" {...line} stroke={GOLD} strokeWidth={5} />
        </>
    ),
    // Avoid heat & exercise — a flame
    flame: (
        <>
            <Blob />
            <path d="M60 18 C66 36 84 44 84 66 C84 82 73 94 60 94 C47 94 36 82 36 66 C36 56 42 50 46 44 C48 52 52 54 54 54 C52 40 54 30 60 18 Z" {...line} fill={GOLD} />
            <path d="M60 62 C64 70 70 72 70 80 C70 86 65 90 60 90 C55 90 50 86 50 80 C50 72 57 70 60 62 Z" {...line} strokeWidth={2} fill="#fff" />
        </>
    ),
    // No harsh products — a bottle with a slash
    bottle: (
        <>
            <Blob />
            <path d="M50 22 H70 V33 H50 Z" {...line} fill={GOLD} />
            <path d="M44 33 H76 V90 C76 94 74 97 70 97 H50 C46 97 44 94 44 90 Z" {...line} fill="#fff" />
            <path d="M51 56 H69 V76 H51 Z" {...line} strokeWidth={2} />
            <path d="M34 94 L88 26" {...line} stroke="#fff" strokeWidth={9} />
            <path d="M34 94 L88 26" {...line} />
        </>
    ),
    // Hydration — a glass of water
    glass: (
        <>
            <Blob />
            <path d="M42.5 52 H77.5 L74 94 H46 Z" fill={GOLD} />
            <path d="M40 28 H80 L74 94 H46 Z" {...line} fill="none" />
            <path d="M42.5 52 H77.5" {...line} strokeWidth={2} />
            <path d="M98 22 L98 32 M93 27 L103 27" {...line} strokeWidth={1.8} />
        </>
    ),
};

export default function MiniIllustration({ name, className = 'w-14 h-14 md:w-16 md:h-16' }) {
    return (
        <svg viewBox="0 0 120 110" className={`shrink-0 ${className}`} aria-hidden="true">
            {drawings[name]}
        </svg>
    );
}

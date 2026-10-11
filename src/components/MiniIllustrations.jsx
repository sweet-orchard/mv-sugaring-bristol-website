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
};

export default function MiniIllustration({ name, className = 'w-14 h-14 md:w-16 md:h-16' }) {
    return (
        <svg viewBox="0 0 120 110" className={`shrink-0 ${className}`} aria-hidden="true">
            {drawings[name]}
        </svg>
    );
}

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const leftLinks = [
    { label: 'About',        href: '#about' },
    { label: 'Why Sugaring', href: '#why-sugaring' },
    { label: 'Prices',       href: '#services' },
    { label: 'Courses',      href: '#courses' },
];

const rightLinks = [
    { label: 'Care Guide', href: '#care-guide' },
    { label: 'Reviews',    href: '#testimonials' },
    { label: 'FAQ',        href: '#faq' },
    { label: 'Contact',    href: '#contact' },
];

const allLinks = [...leftLinks, ...rightLinks];

const LanguageToggle = ({ lang, onChange }) => {
    return (
        <button
            onClick={() => onChange(lang === 'en' ? 'ua' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 transition-all active:scale-95 shadow-sm"
            aria-label="Toggle Language"
            title={lang === 'en' ? "Switch to Ukrainian" : "Switch to English"}
        >
            <span className={`text-[18px] leading-none transition-all duration-300 ${lang === 'en' ? 'opacity-100 scale-110' : 'opacity-40 grayscale scale-90'}`}>🇬🇧</span>
            <span className={`text-[18px] leading-none transition-all duration-300 ${lang === 'ua' ? 'opacity-100 scale-110' : 'opacity-40 grayscale scale-90'}`}>🇺🇦</span>
        </button>
    );
};

export default function Navbar() {
    const [lang, setLangState] = useState('en');
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const handleLangChange = (l) => {
        if (l === 'ua') {
            alert('🇺🇦 Ukrainian version coming soon!\nУкраїнська версія незабаром буде доступна!');
            return;
        }
        setLangState(l);
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Removed unused flag classes

    return (
        <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
            {/* ══ SYMMETRICAL 1-ROW FLOATING BAR ══ */}
            <nav
                className={`
                    mx-auto max-w-7xl rounded-full flex items-center justify-between
                    transition-all duration-300 px-6 py-2 md:py-2.5 relative
                    ${scrolled
                        ? 'bg-background/90 backdrop-blur-xl border border-primary/20 shadow-lg'
                        : 'bg-background/60 backdrop-blur-md border border-border/40 shadow-sm'
                    }
                `}
            >
                {/* Mobile & Tablet Toggle (Left on mobile) */}
                <button
                    onClick={() => setOpen(!open)}
                    className="xl:hidden p-1.5 text-foreground/70 hover:text-primary transition-colors"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                >
                    {open ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>

                {/* Desktop Leftmost: Language Switcher */}
                <div className="hidden xl:block">
                    <LanguageToggle lang={lang} onChange={handleLangChange} />
                </div>

                {/* Left Side Links */}
                <div className="hidden xl:flex items-center gap-5 mr-auto pl-8">
                    {leftLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[11px] tracking-[0.18em] uppercase text-foreground/70 hover:text-primary transition-colors duration-200 font-semibold font-body whitespace-nowrap"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Center: Absolute centered Logo */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                    <a href="#" className="focus:outline-none flex items-center">
                        <img
                            src="/logo.png"
                            alt="Mariia Vatseba"
                            className="h-12 md:h-10 w-auto object-contain hover:opacity-85 transition-opacity"
                        />
                    </a>
                </div>

                {/* Right Side Links */}
                <div className="hidden xl:flex items-center gap-5 ml-auto pr-8">
                    {rightLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[11px] tracking-[0.18em] uppercase text-foreground/70 hover:text-primary transition-colors duration-200 font-semibold font-body whitespace-nowrap"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right: Book Now button & Mobile Language */}
                <div className="flex items-center gap-4">
                    {/* Mobile Language Switcher */}
                    <div className="xl:hidden">
                        <LanguageToggle lang={lang} onChange={handleLangChange} />
                    </div>

                    <a
                        href="#contact"
                        className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-bold rounded-full hover:bg-primary/90 active:scale-95 transition-all shadow-md"
                    >
                        <span>Book Now</span>
                    </a>
                </div>
            </nav>

            {/* ══ MOBILE DRAWER MENU ══ */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="xl:hidden mt-2 mx-auto max-w-7xl bg-background border border-border/50 rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-1.5">
                            {allLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="block py-3 text-[13px] tracking-[0.15em] uppercase text-foreground font-semibold hover:text-primary border-b border-border/30 transition-colors font-body"
                                >
                                    {link.label}
                                </a>
                            ))}

                            {/* Mobile Book CTA */}
                            <div className="flex flex-col gap-4 pt-4 mt-2">
                                <a
                                    href="#contact"
                                    onClick={() => setOpen(false)}
                                    className="w-full flex items-center justify-center py-3.5 bg-primary text-primary-foreground text-[11px] tracking-[0.25em] uppercase font-bold rounded-sm shadow-sm hover:bg-primary/90 transition-all"
                                >
                                    Book Now
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
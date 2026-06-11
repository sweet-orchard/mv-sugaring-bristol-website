import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const leftLinks = [
    { label: 'About',        href: '#about' },
    { label: 'Why Sugaring', href: '#why-sugaring' },
    { label: 'Services',     href: '#services' },
    { label: 'Courses',      href: '#courses' },
];

const rightLinks = [
    { label: 'Care Guide', href: '#care-guide' },
    { label: 'Reviews',    href: '#testimonials' },
    { label: 'FAQ',        href: '#faq' },
    { label: 'Contact',    href: '#contact' },
];

const allLinks = [...leftLinks, ...rightLinks];

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

    const flagActive   = 'text-[24px] xl:text-[16px] leading-none opacity-100 transition-all duration-200 hover:scale-115';
    const flagInactive = 'text-[24px] xl:text-[16px] leading-none opacity-40 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0 hover:scale-115';

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
                <div className="hidden xl:flex items-center gap-2.5 bg-secondary/50 px-3.5 py-1.5 rounded-full border border-border/40">
                    <button
                        onClick={() => handleLangChange('en')}
                        className={lang === 'en' ? flagActive : flagInactive}
                        title="English"
                    >
                        🇬🇧
                    </button>
                    <button
                        onClick={() => handleLangChange('ua')}
                        className={lang === 'ua' ? flagActive : flagInactive}
                        title="Ukrainian — coming soon"
                    >
                        🇺🇦
                    </button>
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

                {/* Right: Book Now button */}
                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 px-5 py-2 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-bold rounded-full hover:bg-primary/90 active:scale-95 transition-all shadow-md"
                    >
                        <Calendar className="w-3.5 h-3.5" />
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

                            {/* Mobile Language + Book CTA */}
                            <div className="flex items-center justify-between pt-4 mt-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-[13px] text-muted-foreground uppercase tracking-wider font-semibold">Language</span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleLangChange('en')} className={lang === 'en' ? flagActive : flagInactive} title="English">🇬🇧</button>
                                        <button onClick={() => handleLangChange('ua')} className={lang === 'ua' ? flagActive : flagInactive} title="Coming soon">🇺🇦</button>
                                    </div>
                                </div>
                                <a
                                    href="#contact"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase font-bold rounded-full hover:bg-primary/90 transition-all shadow-sm"
                                >
                                    <Calendar className="w-3.5 h-3.5" />
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
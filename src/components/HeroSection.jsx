import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { useContent, T } from '../context/ContentContext';

export default function HeroSection() {
    const { t, lang } = useContent();
    const getText = (v) => v?.props?.id ? t(v.props.id) : v;
    
    const [isPlaying, setIsPlaying] = useState(true);
    const desktopVideoRef = useRef(null);
    const mobileVideoRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            desktopVideoRef.current?.pause();
            mobileVideoRef.current?.pause();
        } else {
            desktopVideoRef.current?.play();
            mobileVideoRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
                backgroundSize: '36px 36px'
            }} />



            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen pt-28 pb-20">
                    {/* Left — Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="order-2 lg:order-1"
                    >
                        {/* Desktop Eyebrow */}
                        <div className="hidden lg:flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-primary/60" />
                            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium"><T id="HERO_EYEBROW" /></span>
                        </div>

                        {/* Desktop Headings */}
                        <h1 className="hidden lg:block font-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-foreground mb-3"><T id="HERO_HEADING_LINE_1" /></h1>
                        <h1 className="hidden lg:block font-display text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] text-foreground mb-6"><T id="HERO_HEADING_LINE_2" /></h1>

                        {/* Desktop Text */}
                        <div className="hidden lg:block">
                            <p className="font-display italic text-xl md:text-2xl text-primary/80 mb-6 leading-relaxed max-w-xl"><T id="HERO_QUOTE" /></p>
                            <p className="text-sm font-body text-muted-foreground leading-relaxed max-w-xl mb-3"><T id="HERO_PARAGRAPH_1" /></p>
                            <p className="text-sm font-body text-foreground/70 leading-relaxed max-w-xl mb-10"><T id="HERO_PARAGRAPH_2" /></p>
                        </div>

                        {/* Mobile Text */}
                        <div className="block lg:hidden mb-8">
                            <p className="text-sm font-body text-muted-foreground leading-relaxed max-w-xl"><T id="HERO_MOBILE_TEXT" /></p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, 'contact')}
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:bg-primary/90 transition-all duration-300"
                            ><T id="CONTACT_HEADING" /></a>
                            <a
                                href="#about"
                                onClick={(e) => scrollToSection(e, 'about')}
                                className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
                            ><T id="ABOUT_SECTION_EYEBROW" /></a>
                        </div>
                    </motion.div>

                    {/* Right — Image Placeholder & Mobile Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="order-1 lg:order-2 flex flex-col w-full"
                    >
                        {/* Mobile Eyebrow */}
                        <div className="flex lg:hidden items-center justify-center gap-3 mb-6 w-full">
                            <div className="h-px w-8 bg-primary/60" />
                            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium text-center"><T id="HERO_EYEBROW" /></span>
                            <div className="h-px w-8 bg-primary/60" />
                        </div>

                        <div className="relative aspect-[16/9] lg:aspect-[3/4] max-w-lg mx-auto w-full">
                            {/* Gold frame accent (desktop only or adjust for mobile) */}
                            <div className="hidden lg:block absolute -top-4 -right-4 w-full h-full border border-primary/30 rounded-sm" />

                            {/* Video player */}
                            <div className="relative w-full h-full rounded-sm overflow-hidden bg-gradient-to-br from-secondary via-accent to-secondary">
                                {/* Mobile Dark Overlay */}
                                <div className="absolute inset-0 bg-black/40 lg:bg-transparent z-10 pointer-events-none" />

                                {/* Desktop Video */}
                                <video
                                    ref={desktopVideoRef}
                                    className="hidden md:block w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    src="/herovideo.webm"
                                />
                                {/* Mobile Video */}
                                <video
                                    ref={mobileVideoRef}
                                    className="block md:hidden w-full h-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    src="/herovideo-mobile.webm"
                                />

                                {/* Mobile Headings Overlay */}
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center lg:hidden text-white pointer-events-none px-4">
                                    <h1 className="font-display text-5xl sm:text-6xl font-light leading-[0.95] mb-2 text-center text-white"><T id="HERO_HEADING_LINE_1" /></h1>
                                    <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[0.95] text-center text-white"><T id="HERO_HEADING_LINE_2" /></h1>
                                </div>

                                {/* Play/Pause control button */}
                                <button
                                    onClick={togglePlay}
                                    className="absolute top-4 right-4 z-30 bg-background/80 backdrop-blur-md border border-border/40 hover:bg-background hover:text-primary text-foreground w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md focus:outline-none"
                                    aria-label={isPlaying ? t("HERO_VIDEO_PAUSE_ARIA") : t("HERO_VIDEO_PLAY_ARIA")}
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <a
                        href="#about"
                        onClick={(e) => scrollToSection(e, 'about')}
                        className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-primary transition-colors"
                    >
                        <span className="text-[9px] tracking-[0.3em] pl-[0.3em] uppercase"><T id="HERO_SCROLL_LABEL" /></span>
                        <ChevronDown className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
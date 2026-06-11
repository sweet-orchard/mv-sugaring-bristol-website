import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Pause } from 'lucide-react';

export default function HeroSection() {
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
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-12 bg-primary/60" />
                            <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">Mariia Vatseba</span>
                        </div>

                        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-foreground mb-3">
                            Sugaring
                        </h1>
                        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] text-foreground mb-6">
                            Bristol
                        </h1>

                        <p className="font-display italic text-xl md:text-2xl text-primary/80 mb-6 leading-relaxed max-w-xl">
                            A woman's body holds so much power and energy. I am the person who purifies the body, restoring its lightness, love, tenderness, and an incredible sense of confidence.
                        </p>

                        <p className="text-sm font-body text-muted-foreground leading-relaxed max-w-xl mb-3">
                            I invite you to experience my sugaring treatments — it is a true spa experience because, alongside hair removal, it provides a delicate skin exfoliation. For me, every treatment is all about the woman herself: her transformation, her sensations, her individuality, and the unique beauty of her body, which I enhance through my craft.
                        </p>

                        <p className="text-sm font-body text-foreground/70 leading-relaxed max-w-xl mb-10">
                            I truly love what I do, and I believe that true art can only be created out of love. If this approach resonates with you, I'd love to welcome you ❤️‍🔥
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, 'contact')}
                                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:bg-primary/90 transition-all duration-300"
                            >
                                Book Your Session
                            </a>
                            <a
                                href="#about"
                                onClick={(e) => scrollToSection(e, 'about')}
                                className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:border-primary hover:text-primary transition-all duration-300"
                            >
                                About Me
                            </a>
                        </div>


                    </motion.div>

                    {/* Right — Image Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="order-1 lg:order-2 relative"
                    >
                        <div className="relative aspect-[16/9] lg:aspect-[3/4] max-w-lg mx-auto">
                            {/* Gold frame accent */}
                            <div className="absolute -top-4 -right-4 w-full h-full border border-primary/30 rounded-sm" />

                            {/* Video player */}
                            <div className="relative w-full h-full rounded-sm overflow-hidden bg-gradient-to-br from-secondary via-accent to-secondary">
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

                                {/* Play/Pause control button */}
                                <button
                                    onClick={togglePlay}
                                    className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-md border border-border/40 hover:bg-background hover:text-primary text-foreground w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md focus:outline-none"
                                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
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
                        <span className="text-[9px] tracking-[0.3em] pl-[0.3em] uppercase">Scroll</span>
                        <ChevronDown className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
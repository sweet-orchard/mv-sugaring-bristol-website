import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../context/LangContext';
import translations from '../translations';

const results = [
    { image: '/before-after-pictures/1.png' },
    { image: '/before-after-pictures/2.png' },
    { image: '/before-after-pictures/3.png' },
    { image: '/before-after-pictures/4.png' },
    { image: '/before-after-pictures/5.png' },
    { image: '/before-after-pictures/6.png' },
    { image: '/before-after-pictures/7.png' },
];

export default function BeforeAfterSection() {
    const { lang } = useLang();
    const t = translations[lang].beforeAfter;
    const [activeItem, setActiveItem] = useState(null);
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = current.clientWidth * 0.8; // Scroll by 80% of the container width
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="results" className="py-16 lg:py-32 bg-background border-t border-border/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">
                            {t.eyebrow}
                        </span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
                        {t.heading}
                    </h2>
                    <p className="max-w-xl mx-auto text-sm text-muted-foreground mt-4 font-body leading-relaxed">
                        {t.subtext}
                    </p>
                </motion.div>

                {/* Scrolling Gallery Container */}
                <div className="relative w-full group">
                    {/* Native scrolling container */}
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto w-full flex gap-6 snap-x snap-mandatory pb-8 pt-4 scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {/* Hide scrollbar for webkit */}
                        <style dangerouslySetInnerHTML={{__html: `
                            .overflow-x-auto::-webkit-scrollbar { display: none; }
                        `}} />
                        
                        {results.map((item, index) => (
                            <div
                                key={index}
                                className="w-[85vw] sm:w-[400px] md:w-[500px] shrink-0 snap-center first:ml-[calc(50vw-42.5vw)] sm:first:ml-0"
                            >
                                {/* Clickable Image Container */}
                                <div
                                    onClick={() => setActiveItem(item)}
                                    className="relative aspect-[4/3] rounded-sm overflow-hidden bg-gradient-to-br from-secondary/50 via-accent/25 to-secondary/50 flex items-center justify-center cursor-zoom-in group/item shadow-sm"
                                >
                                    {item.image ? (
                                        <img 
                                            src={item.image} 
                                            alt={`Before & After Result ${index + 1}`} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105" 
                                            loading="lazy" 
                                        />
                                    ) : (
                                        <div className="text-center p-4 flex flex-col items-center gap-2">
                                            <Camera className="w-6 h-6 text-primary/45" />
                                            <span className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-body font-medium">
                                                {t.placeholderLabel}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={() => scroll('left')}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-md border border-border/50 text-primary rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background shadow-lg"
                        aria-label={t.scrollLeft}
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-md border border-border/50 text-primary rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background shadow-lg"
                        aria-label={t.scrollRight}
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setActiveItem(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setActiveItem(null)}
                            className="absolute top-6 right-6 text-white hover:text-primary transition-colors p-2 rounded-full hover:bg-white/10"
                            aria-label={t.closeDetails}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 10 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-5xl max-h-[85vh] w-full flex flex-col items-center gap-4 cursor-default"
                        >
                            <div className="relative bg-background border border-border/20 rounded-sm overflow-hidden p-1.5 shadow-2xl max-w-full">
                                {/* Image or Placeholder */}
                                {activeItem.image ? (
                                    <img
                                        src={activeItem.image}
                                        alt="Before & After Result"
                                        className="max-w-full max-h-[70vh] object-contain rounded-sm"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-[85vw] md:w-[70vw] aspect-[16/9] bg-gradient-to-br from-secondary/50 via-accent/25 to-secondary/50 flex items-center justify-center rounded-sm">
                                        <Camera className="w-10 h-10 text-primary/45" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

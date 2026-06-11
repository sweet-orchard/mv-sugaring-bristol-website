import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X } from 'lucide-react';

const results = [
    { image: '/before-after-pictures/1.png' },
    { image: '/before-after-pictures/2.png' },
    { image: '/before-after-pictures/3.png' },
    { image: '/before-after-pictures/4.png' },
    { image: '/before-after-pictures/5.png' },
    { image: '/before-after-pictures/6.png' },
    { image: '/before-after-pictures/7.png' },
];

const doubledResults = [...results, ...results];

export default function BeforeAfterSection() {
    const [activeItem, setActiveItem] = useState(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationFrameId;
        let isPaused = false;
        let isDragging = false;
        let startX = 0;
        let scrollLeftVal = 0;
        const scrollSpeed = 0.5; // pixels per frame (very smooth and gentle)
        let currentScroll = container.scrollLeft;

        const step = () => {
            if (!isPaused && !isDragging && container) {
                currentScroll += scrollSpeed;
                
                // If we reach the end of the first half, wrap back to 0
                const halfWidth = container.scrollWidth / 2;
                if (currentScroll >= halfWidth) {
                    currentScroll = 0;
                }
                
                container.scrollLeft = currentScroll;
            }
            animationFrameId = requestAnimationFrame(step);
        };

        const handleMouseEnter = () => {
            isPaused = true;
        };

        const handleMouseLeave = () => {
            if (!isDragging) {
                isPaused = false;
                if (container) currentScroll = container.scrollLeft;
            }
        };

        // Desktop Mouse Drag Scroll
        const handleMouseDown = (e) => {
            isDragging = true;
            isPaused = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeftVal = container.scrollLeft;
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.5; // scroll speed multiplier
            container.scrollLeft = scrollLeftVal - walk;
            currentScroll = container.scrollLeft;
        };

        const handleMouseUpOrLeave = () => {
            if (isDragging) {
                isDragging = false;
                isPaused = false;
                if (container) currentScroll = container.scrollLeft;
            }
        };

        // Mobile Touch Gestures
        const handleTouchStart = () => {
            isPaused = true;
        };

        const handleTouchEnd = () => {
            isPaused = false;
            if (container) currentScroll = container.scrollLeft;
        };

        // Attach event listeners
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseup', handleMouseUpOrLeave);
        container.addEventListener('mouseleave', handleMouseUpOrLeave);

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Start animation loop
        animationFrameId = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (container) {
                container.removeEventListener('mouseenter', handleMouseEnter);
                container.removeEventListener('mouseleave', handleMouseLeave);
                container.removeEventListener('mousedown', handleMouseDown);
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseup', handleMouseUpOrLeave);
                container.removeEventListener('mouseleave', handleMouseUpOrLeave);
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, []);

    return (
        <section id="results" className="py-24 lg:py-32 bg-background border-t border-border/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Section Header */}
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
                            Real Results
                        </span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
                        Before & <span className="font-semibold italic">After</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-sm text-muted-foreground mt-4 font-body leading-relaxed">
                        Explore the transformative results of professional sugaring. Drag or swipe to scroll manually, hover to pause, and click any image to view details.
                    </p>
                </motion.div>

                {/* Scrolling Gallery Container */}
                <div className="relative w-full">
                    {/* Fading Edge Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 hidden md:block" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10 hidden md:block" />

                    {/* Overflow container with native scrolling */}
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto w-full no-scrollbar flex gap-6 snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing pb-4"
                    >
                        {doubledResults.map((item, index) => (
                            <div
                                key={index}
                                className="w-[85vw] sm:w-[480px] md:w-[620px] shrink-0 snap-start"
                            >
                                {/* Clickable Image Container */}
                                <div
                                    onClick={() => setActiveItem(item)}
                                    className="relative aspect-[16/9] rounded-sm overflow-hidden bg-gradient-to-br from-secondary/50 via-accent/25 to-secondary/50 flex items-center justify-center cursor-zoom-in"
                                >
                                    {item.image ? (
                                        <img src={item.image} alt="Before & After Result" className="w-full h-full object-cover" loading="lazy" />
                                    ) : (
                                        <div className="text-center p-4 flex flex-col items-center gap-2">
                                            <Camera className="w-6 h-6 text-primary/45" />
                                            <span className="text-[10px] tracking-[0.1em] uppercase text-primary/60 font-body font-medium">
                                                Before & After Photo
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
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
                            aria-label="Close details"
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

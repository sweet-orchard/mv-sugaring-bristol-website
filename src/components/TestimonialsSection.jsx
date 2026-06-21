import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ImageIcon } from 'lucide-react';
import { useLang } from '../context/LangContext';
import translations from '../translations';

const testimonials = [
    {
        id: 1,
        placeholder: 'Client Review Screenshot #1',
        image: '/testemonials/review-1.jpg',
    },
    {
        id: 2,
        placeholder: 'Client Review Screenshot #2',
        image: '/testemonials/review-2.jpg',
    },
    {
        id: 3,
        placeholder: 'Client Review Screenshot #3',
        image: '/testemonials/review-3.jpg',
    },
    {
        id: 4,
        placeholder: 'Client Review Screenshot #4',
        image: '/testemonials/review-4.jpg',
    },
    {
        id: 5,
        placeholder: 'Client Review Screenshot #5',
        image: '/testemonials/review-5.jpg',
    },
    {
        id: 6,
        placeholder: 'Client Review Screenshot #6',
        image: '/testemonials/review-6.JPG',
    },
    {
        id: 7,
        placeholder: 'Client Review Screenshot #7',
        image: '/testemonials/review-7.JPG',
    },
    {
        id: 8,
        placeholder: 'Client Review Screenshot #8',
        image: '/testemonials/review-8.JPG',
    },
    {
        id: 9,
        placeholder: 'Client Review Screenshot #9',
        image: '/testemonials/review-9.JPG',
    },
    {
        id: 10,
        placeholder: 'Client Review Screenshot #10',
        image: '/testemonials/review-10.JPG',
    },
    {
        id: 11,
        placeholder: 'Client Review Screenshot #11',
        image: '/testemonials/review-11.PNG',
    },
    {
        id: 12,
        placeholder: 'Client Review Screenshot #12',
        image: '/testemonials/review-12.PNG',
    },
    {
        id: 13,
        placeholder: 'Client Review Screenshot #13',
        image: '/testemonials/review-13.PNG',
    },
];

export default function TestimonialsSection() {
    const { lang } = useLang();
    const t = translations[lang].testimonials;
    const [[current, direction], setPage] = useState([0, 0]);

    const paginate = (dir) => {
        setPage(([prev]) => [
            (prev + dir + testimonials.length) % testimonials.length,
            dir,
        ]);
    };
    
    const prev = () => paginate(-1);
    const next = () => paginate(1);

    const variants = {
        enter: (dir) => {
            if (dir > 0) {
                return { x: 0, y: 20, scale: 0.95, opacity: 0, zIndex: 0 };
            } else {
                return { x: -800, y: 0, scale: 1, opacity: 0, rotate: -8, zIndex: 10 };
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
                return { x: -800, y: 0, scale: 1, opacity: 0, rotate: -8, zIndex: 10 };
            } else {
                return { x: 0, y: 20, scale: 0.95, opacity: 0, zIndex: 0 };
            }
        },
    };

    return (
        <section id="testimonials" className="py-16 lg:py-32 bg-secondary/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">{t.eyebrow}</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                        {t.heading}
                    </h2>
                </motion.div>

                {/* Carousel */}
                <div className="relative max-w-4xl mx-auto pt-4 pb-2">
                    {/* Visual Stack Cards Behind */}
                    <div className="absolute inset-0 top-4 pointer-events-none flex justify-center z-0">
                        <div className="w-[96%] h-full bg-background border border-border/60 rounded-sm shadow-sm absolute top-4 opacity-60" />
                        <div className="w-[92%] h-full bg-background border border-border/40 rounded-sm shadow-sm absolute top-8 opacity-30" />
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
                            className="bg-background border border-border/50 rounded-sm p-8 lg:p-12 relative z-10 w-full"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                if (offset.x < -60 || velocity.x < -400) {
                                    paginate(1);
                                } else if (offset.x > 60 || velocity.x > 400) {
                                    paginate(-1);
                                }
                            }}
                        >
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                {/* Real Image or Placeholder */}
                                {testimonials[current].image ? (
                                    <div className="aspect-[3/4] rounded-sm overflow-hidden border border-border/30 bg-secondary/10 flex items-center justify-center p-2 pointer-events-none">
                                        <img src={testimonials[current].image} alt="Client review" className="w-full h-full object-contain rounded-sm" loading="lazy" />
                                    </div>
                                ) : (
                                    <div className="aspect-[3/4] bg-gradient-to-br from-secondary via-accent to-secondary rounded-sm flex items-center justify-center border border-border/30 pointer-events-none">
                                        <div className="text-center p-6">
                                            <ImageIcon className="w-8 h-8 text-primary/40 mx-auto mb-3" />
                                            <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-body">{testimonials[current].placeholder}</p>
                                            <p className="text-[10px] text-muted-foreground/60 mt-1">Replace with real client review image</p>
                                        </div>
                                    </div>
                                )}

                                {/* Text */}
                                <div className="pointer-events-none">
                                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                                    <p className="text-sm md:text-base leading-relaxed text-foreground/80 font-body mb-6 mt-4 whitespace-pre-line">
                                        {t[`review${testimonials[current].id}Text`]}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-12 relative z-20">
                    <button onClick={prev} className="w-10 h-10 bg-background rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:text-primary shadow-sm transition-all active:scale-95">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs tracking-[0.2em] text-muted-foreground font-body">
                        {current + 1} / {testimonials.length}
                    </span>
                    <button onClick={next} className="w-10 h-10 bg-background rounded-full border border-border/60 flex items-center justify-center hover:border-primary hover:text-primary shadow-sm transition-all active:scale-95">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Bottom quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-16 max-w-2xl mx-auto"
                >
                    <p className="font-display text-lg italic text-foreground/50">
                        {t.closingQuote}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
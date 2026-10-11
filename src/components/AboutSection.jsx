import React from 'react';
import { motion } from 'framer-motion';
import { Flower, Heart, Grid, Diamond, Sparkles, Music, Star } from 'lucide-react';
import { useContent, T } from '../context/ContentContext';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel';

const aboutImages = [
    '/mariia-about-me-pictures/1.JPG',
    '/mariia-about-me-pictures/2.jpg',
    '/mariia-about-me-pictures/3.JPG',
    '/mariia-about-me-pictures/4.JPG',
    '/mariia-about-me-pictures/5.JPG',
    '/mariia-about-me-pictures/6.JPG',
    '/mariia-about-me-pictures/7.JPG',
    '/mariia-about-me-pictures/8.JPG',
];

const aboutItems = [
    { icon: '🇺🇦', textId: 'NEW_ABOUT_LIST_1' },
    { icon: '❤️', textId: 'NEW_ABOUT_LIST_2' },
    { icon: '👶', textId: 'NEW_ABOUT_LIST_3' },
    { icon: '🎓', textId: 'NEW_ABOUT_LIST_4' },
    { icon: '📚', textId: 'NEW_ABOUT_LIST_5' },
    { icon: '💃', textId: 'NEW_ABOUT_LIST_6' },
    { icon: '🏆', textId: 'NEW_ABOUT_LIST_7' },
];

export default function AboutSection() {
    const { t } = useContent();
    
    return (
        <section id="about" className="py-10 md:py-16 lg:py-24 bg-[#FAF8F3]">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
                
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-10"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-10 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium"><T id="ABOUT_SECTION_EYEBROW" /></span>
                        <div className="h-px w-10 bg-primary/40" />
                    </div>
                    <h2 className="font-display font-semibold text-foreground text-2xl md:text-4xl lg:text-5xl leading-[1.15]"><T id="ABOUT_SECTION_HEADING" /></h2>
                </motion.div>

                {/* Image Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 lg:mb-14"
                >
                    <Carousel
                        opts={{
                            align: "center",
                            loop: true,
                        }}
                        className="w-full max-w-sm mx-auto relative"
                    >
                        <CarouselContent>
                            {aboutImages.map((src, index) => (
                                <CarouselItem key={index}>
                                    <div className="aspect-[3/4] rounded-sm overflow-hidden bg-secondary">
                                        <img
                                            src={src}
                                            alt={`Mariia ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <>
                            <CarouselPrevious className="left-4 bg-background/60 backdrop-blur-md border-border/50 hover:bg-background" />
                            <CarouselNext className="right-4 bg-background/60 backdrop-blur-md border-border/50 hover:bg-background" />
                        </>
                    </Carousel>
                </motion.div>

                {/* Introduction Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 lg:mb-16 text-foreground/80 leading-[1.8] font-body text-[13px] md:text-sm lg:text-[15px] space-y-4"
                >
                    <div>
                        <span><T id="NEW_ABOUT_P1_HI" /></span>
                        <span><T id="NEW_ABOUT_P1" /></span>
                    </div>

                    <p>
                        <strong><T id="NEW_ABOUT_P2_1" /></strong><T id="NEW_ABOUT_P2_2" />
                    </p>

                    <p>
                        <strong><T id="NEW_ABOUT_P3_1" /></strong><T id="NEW_ABOUT_P3_2" />
                    </p>
                    
                    <p>
                        <strong><T id="NEW_ABOUT_P4_1" /></strong><T id="NEW_ABOUT_P4_2" />
                    </p>
                    
                    <p><T id="NEW_ABOUT_P5" /></p>
                    
                    <p><T id="NEW_ABOUT_P6" /></p>
                </motion.div>

                {/* A few things about me list */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-foreground text-background rounded-sm p-6 md:p-10"
                >
                    <div className="flex justify-center mb-5">
                        <div className="h-px w-12 bg-[#D8B878]/50" />
                    </div>
                    <h3 className="font-display font-bold text-center text-background mb-6 md:mb-8 text-lg md:text-xl lg:text-2xl">
                        <T id="NEW_ABOUT_LIST_TITLE" />
                    </h3>

                    <div className="space-y-3 md:space-y-4">
                        {aboutItems.map((item, idx) => (
                            <div key={idx} className="flex gap-3 md:gap-5 items-baseline">
                                <div className="shrink-0 w-7 md:w-9">
                                    <span className="font-display italic text-lg md:text-xl lg:text-2xl text-[#D8B878] font-semibold">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <p className="text-background/80 font-body text-[13px] md:text-sm lg:text-[15px] leading-[1.65]">
                                    <T id={item.textId} />
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-end gap-4 md:gap-5 mt-10 md:mt-12 pt-6 border-t border-background/15">
                        <div className="text-right">
                            <p className="font-display italic text-base md:text-lg text-[#D8B878] leading-none mb-1">
                                <T id="NEW_ABOUT_SIGN_1" />
                            </p>
                            <p className="font-script text-5xl md:text-6xl gold-text-light leading-[1.1] pr-1">
                                <T id="NEW_ABOUT_SIGN_2" />
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
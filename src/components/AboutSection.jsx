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
        <section id="about" className="pt-4 md:pt-14 lg:pt-24 bg-[#FAF8F3]">
            <div className="max-w-3xl lg:max-w-6xl mx-auto px-6 lg:px-10">
                
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-12 lg:mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-10 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium"><T id="ABOUT_SECTION_EYEBROW" /></span>
                        <div className="h-px w-10 bg-primary/40" />
                    </div>
                    <h2 className="font-display font-semibold text-foreground text-2xl md:text-4xl lg:text-5xl leading-[1.15]"><T id="ABOUT_SECTION_HEADING" /></h2>
                </motion.div>

                {/* Main Content: Desktop 2-columns (Images Left, Text Right), Mobile stacked */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
                    
                    {/* Left Column (Desktop): Image Carousel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none lg:sticky lg:top-28 mb-8 lg:mb-0"
                    >
                        <Carousel
                            opts={{
                                align: "center",
                                loop: true,
                            }}
                            className="w-full relative shadow-[0_8px_30px_rgba(179,139,77,0.1)] rounded-sm overflow-hidden"
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

                    {/* Right Column (Desktop): Introduction Text & Signature */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 mb-12 lg:mb-16 text-foreground/85 font-body text-base md:text-base lg:text-[16px] xl:text-[17px] leading-[1.85] sm:leading-[1.9] space-y-5"
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

                        <div className="flex items-center justify-end mt-6 md:mt-8 pt-2">
                            <div className="text-right">
                                <p className="font-display italic text-base md:text-lg text-[#B38B4D] leading-none mb-1">
                                    <T id="NEW_ABOUT_SIGN_1" />
                                </p>
                                <p className="font-script text-5xl md:text-6xl gold-text-strong leading-[1.1] pr-1">
                                    <T id="NEW_ABOUT_SIGN_2" />
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* A few things about me — full-width dark band */}
            <div className="bg-foreground text-background mt-12 lg:mt-16 py-10 md:py-16 lg:py-20">
                <div className="max-w-3xl mx-auto px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
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
                                    <p className="text-background/90 font-body text-[15px] sm:text-base leading-[1.8]">
                                        <T id={item.textId} />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
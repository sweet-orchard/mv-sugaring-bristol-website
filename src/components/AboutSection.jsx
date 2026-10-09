import React from 'react';
import { motion } from 'framer-motion';
import { Flower, Heart, Grid, Diamond, Sparkles, Music, Star } from 'lucide-react';
import { useContent, T } from '../context/ContentContext';
import ScrollButton from './ScrollButton';
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
        <section id="about" className="py-16 lg:py-32 bg-[#FAF8F3]">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
                
                {/* Image Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 lg:mb-24"
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
                    className="mb-20 lg:mb-24 text-foreground/80 leading-[1.8] font-body text-sm md:text-[17px] space-y-6"
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

                    <div className="text-right mt-12 md:mt-16 pr-4">
                        <p className="font-display italic text-xl md:text-2xl gold-text">
                            <T id="NEW_ABOUT_SIGN_1" /><br/>
                            <T id="NEW_ABOUT_SIGN_2" />
                        </p>
                    </div>
                </motion.div>

                {/* A few things about me list */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="flex justify-center mb-8">
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h3 className="font-display text-center text-foreground mb-12 text-xl md:text-2xl">
                        <T id="NEW_ABOUT_LIST_TITLE" />
                    </h3>

                    <div className="space-y-6 md:space-y-8">
                        {aboutItems.map((item, idx) => (
                            <div key={idx} className="flex gap-4 md:gap-6 items-start">
                                <div className="shrink-0 mt-0.5 md:mt-1">
                                    <span className="font-display italic text-xl md:text-2xl text-[#B38B4D] font-semibold">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>
                                <p className="text-foreground/80 font-body pt-1.5 md:pt-2 text-sm md:text-[17px] leading-[1.8]">
                                    <T id={item.textId} />
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <ScrollButton 
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-4 font-body text-xs tracking-[0.2em] uppercase font-medium rounded-sm"
                            textId="HERO_CTA_BOOK_SESSION"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
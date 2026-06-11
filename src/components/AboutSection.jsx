import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Shield, Sparkles } from 'lucide-react';
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

const stats = [
    { number: '8+', label: 'Years Of Experience', icon: Sparkles },
    { number: '9x', label: 'International Championship Winner', icon: Award },
    { number: '1000+', label: 'Happy Clients', icon: Heart },
    { number: '100%', label: 'Smooth Skin Guarantee', icon: Shield },
];

export default function AboutSection() {
    return (
        <section id="about" className="py-24 lg:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">About Me</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
                        <span className="font-semibold italic">Mariia</span> Vasteba
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Image column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full max-w-lg mx-auto"
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
                        {/* Accent line */}
                        <div className="absolute -bottom-4 left-8 right-8 h-px bg-primary/30" />
                    </motion.div>

                    {/* Text column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <p className="text-xs tracking-[0.25em] uppercase text-primary font-medium mb-6">
                            Sugaring Specialist
                        </p>

                        <p className="text-base font-body text-foreground/80 leading-relaxed mb-6">
                            Hi, I'm Mariia 😃 — a sugaring specialist, ukrainian woman, and someone who truly loves what she does. I'm 31, and I'm raising my two beautiful girls, Yeva and Yana, on my own. They are my whole world and my biggest motivation every single day. Our story hasn't always been easy — I arrived in the UK with a one-month-old baby, born during the war in Ukraine. That journey taught me just how precious safety, peace, and taking care of yourself really are.
                        </p>

                        <p className="text-base font-body text-foreground/80 leading-relaxed mb-6">
                            I found sugaring when my eldest was little and I needed a career that let me be there for her. What started as a practical choice quietly turned into the greatest love of my professional life. Eight years later, it is so much more than a job to me. With a background in Finance, Economics, and academic research, I've always cared deeply about doing things properly and explaining them clearly — and that shows in everything I create, from my treatments to my courses.
                        </p>

                        <p className="text-base font-body text-foreground/80 leading-relaxed mb-8">
                            I truly believe that sugaring is a beautiful act of self-care — a little ritual that's just for you. When you come to me, I want you to feel welcome, relaxed, and looked after from the very first moment. It makes me so happy to play even a small part in your confidence and your glow. I'm so glad you're here.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center p-8 bg-secondary/40 border border-border/30 rounded-sm hover:border-primary/30 transition-all duration-300">
                            <stat.icon className="w-5 h-5 text-primary mx-auto mb-4" />
                            <p className="font-display text-4xl font-semibold text-foreground mb-2">{stat.number}</p>
                            <p className="text-[11px] tracking-[0.1em] uppercase text-muted-foreground font-body leading-relaxed">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Second about block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto mt-24 text-center"
                >
                    <h3 className="font-display text-3xl md:text-4xl italic font-light text-foreground mb-8">
                        "I experience it myself, and I will teach your body to feel just as luxurious"
                    </h3>

                    <p className="text-sm font-body text-foreground/70 leading-relaxed mb-6">
                        I have chosen this method for myself every single month for over 8 years. For me, it is all about feeling renewed, fresh, clean, luxurious, and immaculately groomed. It is the exact moment when the entire body resets, a new inner state clicks into place, and I feel ready to take on the world differently.
                    </p>

                    <p className="text-sm font-body text-foreground/70 leading-relaxed mb-6">
                        Furthermore, sugaring is a treatment that alters the structure and quantity of your hair. You lose 30–40% of the density after the very first time, and the hair grows back thinner, lighter, and softer. Over time, it stops growing altogether in certain areas, giving you a natural 'laser effect' without any machine intervention.
                    </p>

                    <p className="text-sm font-body text-foreground/70 leading-relaxed">
                        This is what I value most. Our bodies support us every single day, and I am so happy to give mine the gentle care it deserves. It is this exact feeling of self-love, lightness, and confidence that I share with my clients each and every day.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
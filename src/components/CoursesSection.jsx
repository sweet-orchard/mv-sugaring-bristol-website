import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Globe, BookOpen } from 'lucide-react';
import { useLang } from '../context/LangContext';
import translations from '../translations';

export default function CoursesSection() {
    const { lang } = useLang();
    const t = translations[lang].courses;

    return (
        <section id="courses" className="py-16 lg:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">{t.eyebrow}</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                        {t.headingLine1} <br className="hidden md:block" />
                        <span className="font-semibold italic">{t.headingLine2}</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm font-body text-muted-foreground leading-relaxed">
                        {t.subtext}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* For Professionals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="group bg-secondary/40 border border-border/30 rounded-sm p-8 lg:p-10 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
                    >
                        <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-6">
                            <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.card1Badge}</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{t.card1Title}</h3>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">{t.card1Desc}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                <span>{t.card1Tag1}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{t.card1Tag2}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* For Yourself */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="group bg-secondary/40 border border-border/30 rounded-sm p-8 lg:p-10 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
                    >
                        <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-6">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.card2Badge}</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{t.card2Title}</h3>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">{t.card2Desc}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                <span>{t.card2Tag1}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{t.card2Tag2}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Online Academy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-foreground text-background rounded-sm p-8 lg:p-12"
                >
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Globe className="w-4 h-4 text-primary" />
                                <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{t.onlineBadge}</span>
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl font-light text-background mb-6">
                                {t.onlineHeading}
                            </h3>
                            <p className="text-sm font-body text-background/70 leading-relaxed mb-4">{t.onlineParagraph1}</p>
                            <p className="text-sm font-body text-background/70 leading-relaxed mb-8">{t.onlineParagraph2}</p>

                            <div className="flex gap-8">
                                <div>
                                    <p className="font-display text-3xl font-semibold text-primary">19+</p>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-background/50 mt-1">{t.stat1Label}</p>
                                </div>
                                <div>
                                    <p className="font-display text-3xl font-semibold text-primary">100%</p>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-background/50 mt-1">{t.stat2Label}</p>
                                </div>
                            </div>
                        </div>

                        {/* Course Image */}
                        <div className="aspect-video rounded-sm overflow-hidden border border-background/20 shadow-xl">
                            <img 
                                src="/from-course-picture.jpg" 
                                alt={t.videoAlt} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
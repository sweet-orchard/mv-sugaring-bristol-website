import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Globe, BookOpen } from 'lucide-react';
import { useContent, T } from '../context/ContentContext';

export default function CoursesSection() {
    const { t, lang } = useContent();
    

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
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium"><T id="COURSES_EYEBROW" /></span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6"><T id="COURSES_HEADING_LINE_1" /><br className="hidden md:block" />
                        <span className="font-semibold italic"><T id="COURSES_HEADING_LINE_2" /></span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm font-body text-muted-foreground leading-relaxed"><T id="COURSES_SUBTEXT" /></p>
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
                            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium"><T id="COURSES_CARD_2_BADGE" /></span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-4"><T id="COURSES_CARD_1_TITLE" /></h3>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6"><T id="COURSES_CARD_1_DESC" /></p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                <span><T id="COURSES_CARD_2_TAG_1" /></span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span><T id="COURSES_CARD_1_TAG_2" /></span>
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
                            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium"><T id="COURSES_CARD_2_BADGE" /></span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-4"><T id="COURSES_CARD_2_TITLE" /></h3>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6"><T id="COURSES_CARD_2_DESC" /></p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                <span><T id="COURSES_CARD_2_TAG_1" /></span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span><T id="COURSES_CARD_2_TAG_2" /></span>
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
                                <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium"><T id="COURSES_ONLINE_BADGE" /></span>
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl font-light text-background mb-6"><T id="COURSES_ONLINE_HEADING" /></h3>
                            <p className="text-sm font-body text-background/70 leading-relaxed mb-4"><T id="COURSES_ONLINE_PARAGRAPH_1" /></p>
                            <p className="text-sm font-body text-background/70 leading-relaxed mb-6"><T id="COURSES_ONLINE_PARAGRAPH_2" /></p>

                            <div className="bg-background/5 border border-background/10 rounded-sm p-6 mb-8">
                                <div className="flex items-end gap-3 mb-2">
                                    <span className="font-display text-4xl font-semibold text-primary"><T id="COURSES_ONLINE_PRICE" /></span>
                                    <span className="text-lg text-background/50 line-through mb-1"><T id="COURSES_ONLINE_OLD_PRICE" /></span>
                                    <span className="text-xs font-semibold tracking-wider bg-primary text-background px-2 py-1 rounded-sm mb-1.5 ml-2"><T id="COURSES_ONLINE_DISCOUNT" /></span>
                                </div>
                                <p className="text-sm font-body text-background/80 mb-6 flex items-start gap-2">
                                    <span className="text-primary mt-0.5">✦</span><T id="COURSES_ONLINE_CONSULTATION_OFFER" /></p>
                                <a href="/course" className="w-full bg-primary hover:bg-primary/90 text-background font-medium py-3.5 px-6 rounded-sm transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"><T id="COURSES_LEARN_MORE_BTN" /></a>
                            </div>

                            <div className="flex gap-8">
                                <div>
                                    <p className="font-display text-3xl font-semibold text-primary">19+</p>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-background/50 mt-1"><T id="COURSES_STAT_1_LABEL" /></p>
                                </div>
                                <div>
                                    <p className="font-display text-3xl font-semibold text-primary">100%</p>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-background/50 mt-1"><T id="COURSES_STAT_2_LABEL" /></p>
                                </div>
                            </div>
                        </div>

                        {/* Course Image */}
                        <div className="aspect-video rounded-sm overflow-hidden border border-background/20 shadow-xl">
                            <img 
                                src="/from-course-picture.jpg" 
                                alt={t("COURSES_VIDEO_ALT")} 
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
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Globe, BookOpen } from 'lucide-react';

export default function CoursesSection() {
    return (
        <section id="courses" className="py-24 lg:py-32 bg-background">
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
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">Education & Courses</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                        Want to do this yourself? <br className="hidden md:block" />
                        <span className="font-semibold italic">I'll teach you everything.</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm font-body text-muted-foreground leading-relaxed">
                        My courses offer far more than just dry theory—they are a complete, carefully structured system designed to lead my students directly to success. Teaching is where I truly thrive and come alive.
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
                            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">In-Person · Bristol</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-4">For Professionals</h3>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
                            Heartfelt beginners' courses and advanced masterclasses for practicing therapists looking to elevate their skills to a premium level. Perfect for those starting from zero or experienced specialists who want to reach the next tier.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                <span>One-to-One</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Intensive Training</span>
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
                            <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">In-Person · Bristol</span>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-4">For Yourself</h3>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
                            Cosy training designed for women who want to master the skill of professional sugaring for their personal home care. Because I teach strictly on a one-to-one basis, you will immediately receive only the exact details and techniques that will work flawlessly for your specific skin and hair type.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                <span>One-to-One</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Personalised</span>
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
                                <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">Online Academy</span>
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl font-light text-background mb-6">
                                Personal Sugaring <span className="font-semibold italic">At Home</span>
                            </h3>
                            <p className="text-sm font-body text-background/70 leading-relaxed mb-4">
                                Two years ago, I launched my very first online course: "The Essentials of Personal Sugaring"—specifically created for those who want to master the exact nuances of professional hair removal at home.
                            </p>
                            <p className="text-sm font-body text-background/70 leading-relaxed mb-8">
                                Today, over 19 successful students worldwide have graduated from this course. It is an incredible investment in oneself, and I am absolutely thrilled to see my dream of global education coming to life.
                            </p>

                            <div className="flex gap-8">
                                <div>
                                    <p className="font-display text-3xl font-semibold text-primary">19+</p>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-background/50 mt-1">Global Students</p>
                                </div>
                                <div>
                                    <p className="font-display text-3xl font-semibold text-primary">100%</p>
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-background/50 mt-1">Success Rate</p>
                                </div>
                            </div>
                        </div>

                        {/* Course Image */}
                        <div className="aspect-video rounded-sm overflow-hidden border border-background/20 shadow-xl">
                            <img 
                                src="/from-course-picture.jpg" 
                                alt="Mariia Vatseba teaching a sugaring course" 
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
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import translations from '../translations';
import { CheckCircle, Clock, PlayCircle, Star, ChevronDown, ChevronUp } from 'lucide-react';

export default function CoursePage() {
    const { lang } = useLang();
    const t = translations[lang].coursePage;

    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            
            <main className="flex-grow pt-24 pb-16">
                {/* Hero Section */}
                <section className="px-6 lg:px-10 max-w-5xl mx-auto py-12 lg:py-20 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-sm mb-6"
                    >
                        {t.heroBadge}
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-display text-4xl md:text-6xl font-light mb-6"
                    >
                        {t.heroTitle}
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground font-body max-w-2xl mx-auto mb-10"
                    >
                        {t.heroSubtitle}
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-secondary/30 border border-primary/20 rounded-sm p-8 max-w-md mx-auto relative overflow-hidden"
                    >
                        <div className="mb-6">
                            <div className="flex justify-center items-end gap-3 mb-2">
                                <span className="font-display text-5xl font-semibold text-foreground">{t.price}</span>
                                <span className="text-xl text-muted-foreground line-through mb-1">{t.oldPrice}</span>
                            </div>
                            <div className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-sm border border-primary/20">
                                {t.discountBadge}
                            </div>
                        </div>

                        <a 
                            href="https://buy.stripe.com/test_6oUfZh9xidSn8RZ0zs2ZO00" 
                            className="block w-full bg-primary hover:bg-primary/90 text-background font-medium py-4 rounded-sm transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 mb-4 text-lg"
                        >
                            {t.buyNowBtn}
                        </a>
                        <a href="/#contact" className="text-xs text-primary font-medium hover:underline inline-flex items-center justify-center">
                            {t.questionsLink}
                        </a>
                    </motion.div>
                </section>

                {/* Curriculum */}
                <section className="bg-secondary/10 py-16">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="font-display text-3xl md:text-4xl text-center mb-10">{t.curriculumTitle}</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {t.curriculumItems.map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-background border border-border/40 p-4 rounded-sm flex items-start gap-3 shadow-sm"
                                >
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="font-body text-sm text-foreground/80 leading-relaxed">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20">
                    <div className="max-w-3xl mx-auto px-6">
                        <h2 className="font-display text-3xl md:text-4xl text-center mb-10">{t.faqTitle}</h2>
                        <div className="space-y-4">
                            {t.faqItems.map((faq, idx) => (
                                <div key={idx} className="border border-border/50 rounded-sm overflow-hidden bg-background">
                                    <button 
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-secondary/10 transition-colors"
                                    >
                                        <span className="font-medium text-foreground text-sm">{faq.q}</span>
                                        {openFaq === idx ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-6 pb-4 text-sm text-muted-foreground font-body leading-relaxed"
                                            >
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Support Section */}
                        <div className="mt-16 text-center">
                            <p className="text-muted-foreground font-body text-sm mb-4">
                                {t.supportText}
                            </p>
                            <a 
                                href="/#contact"
                                className="inline-block border border-primary/30 text-primary hover:bg-primary/5 px-6 py-2.5 rounded-sm transition-colors text-sm font-medium tracking-wide"
                            >
                                {t.supportLink}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

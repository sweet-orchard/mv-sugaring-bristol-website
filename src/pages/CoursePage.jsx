import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import translations from '../translations';
import { CheckCircle, PlayCircle, Star, ChevronDown, ChevronUp, X, Mail } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
);

export default function CoursePage() {
    const { lang } = useLang();
    const t = translations[lang].coursePage;

    const [openFaq, setOpenFaq] = useState(null);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
                        <button 
                            onClick={() => setIsContactModalOpen(true)} 
                            className="text-xs text-primary font-medium hover:underline inline-flex items-center justify-center w-full focus:outline-none"
                        >
                            {t.questionsLink}
                        </button>
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

            {/* Contact Modal */}
            <AnimatePresence>
                {isContactModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsContactModalOpen(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative bg-background border border-border/50 shadow-2xl rounded-sm p-8 max-w-sm w-full"
                        >
                            <button 
                                onClick={() => setIsContactModalOpen(false)}
                                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <h3 className="font-display text-2xl font-semibold text-center mb-6">{t.contactModalTitle}</h3>
                            
                            <div className="space-y-4">
                                <a 
                                    href="https://wa.me/447448611080" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/20 transition-colors rounded-sm font-medium"
                                >
                                    <WhatsAppIcon className="w-5 h-5" />
                                    <span>{t.contactModalWhatsApp}</span>
                                </a>
                                
                                <a 
                                    href="mailto:mariia.vatseba@gmail.com"
                                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-primary/10 text-primary hover:bg-primary hover:text-background border border-primary/20 transition-colors rounded-sm font-medium"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>{t.contactModalEmail}</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

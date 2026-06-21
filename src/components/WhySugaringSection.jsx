import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, ShieldCheck, RefreshCw } from 'lucide-react';
import { useLang } from '../context/LangContext';
import translations from '../translations';

const icons = [Leaf, Zap, ShieldCheck, RefreshCw];

export default function WhySugaringSection() {
    const { lang } = useLang();
    const t = translations[lang].why;

    const benefits = [
        { icon: Leaf,       title: t.benefit1Title, desc: t.benefit1Desc },
        { icon: Zap,        title: t.benefit2Title, desc: t.benefit2Desc },
        { icon: ShieldCheck,title: t.benefit3Title, desc: t.benefit3Desc },
        { icon: RefreshCw,  title: t.benefit4Title, desc: t.benefit4Desc },
    ];

    return (
        <section id="why-sugaring" className="py-16 lg:py-32 bg-secondary/30">
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
                        {t.heading.replace('?', '')} <span className="font-semibold italic">?</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-sm font-body text-muted-foreground leading-relaxed">
                        {t.subtext}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group bg-background border border-border/50 rounded-sm p-8 lg:p-10 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <b.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{b.title}</h3>
                            <p className="text-sm font-body text-muted-foreground leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Closing quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <p className="font-display text-xl md:text-2xl italic text-foreground/60 max-w-2xl mx-auto">
                        {t.closingQuote}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
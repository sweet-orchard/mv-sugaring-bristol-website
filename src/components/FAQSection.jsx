import React from 'react';
import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from '../context/LangContext';
import translations from '../translations';

export default function FAQSection() {
    const { lang } = useLang();
    const t = translations[lang].faq;
    
    const faqCategories = [
        {
            category: t.cat1Name,
            items: [
                { q: t.cat1Q1, a: t.cat1A1 },
                { q: t.cat1Q2, a: t.cat1A2 },
                { q: t.cat1Q3, a: t.cat1A3 },
                { q: t.cat1Q4, a: t.cat1A4 },
                { q: t.cat1Q5, a: t.cat1A5 },
            ]
        },
        {
            category: t.cat2Name,
            items: [
                { q: t.cat2Q1, a: t.cat2A1 },
                { q: t.cat2Q2, a: t.cat2A2 },
                { q: t.cat2Q3, a: t.cat2A3 },
                { q: t.cat2Q4, a: t.cat2A4 },
                { q: t.cat2Q5, a: t.cat2A5 },
                { q: t.cat2Q6, a: t.cat2A6 },
                { q: t.cat2Q7, a: t.cat2A7 },
                { q: t.cat2Q8, a: t.cat2A8 },
            ]
        },
        {
            category: t.cat3Name,
            items: [
                { q: t.cat3Q1, a: t.cat3A1 },
                { q: t.cat3Q2, a: t.cat3A2 },
                { q: t.cat3Q3, a: t.cat3A3 },
            ]
        }
    ];

    return (
        <section id="faq" className="py-16 lg:py-32 bg-secondary/30">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">{t.eyebrow}</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
                        {t.heading}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Accordion type="single" collapsible className="space-y-10">
                        {faqCategories.map((cat, catIdx) => (
                            <div key={catIdx}>
                                <h3 className="font-display text-xl text-primary font-semibold mb-4 italic px-2">{cat.category}</h3>
                                <div className="space-y-3">
                                    {cat.items.map((faq, i) => (
                                        <AccordionItem key={i} value={`faq-${catIdx}-${i}`} className="bg-background border border-border/50 rounded-sm px-6 data-[state=open]:border-primary/30 transition-colors">
                                            <AccordionTrigger className="text-sm font-body font-medium text-foreground hover:text-primary text-left py-5 hover:no-underline">
                                                {faq.q}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 whitespace-pre-line">
                                                {faq.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
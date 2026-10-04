import React from 'react';
import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useContent, T } from '../context/ContentContext';

export default function FAQSection() {
    const { t, lang } = useContent();
    
    
    const faqCategories = [
        {
            category: <T id="FAQ_CAT_1_NAME" />,
            items: [
                { q: <T id="FAQ_CAT1_Q1" />, a: <T id="FAQ_CAT1_A1" /> },
                { q: <T id="FAQ_CAT1_Q2" />, a: <T id="FAQ_CAT1_A2" /> },
                { q: <T id="FAQ_CAT1_Q3" />, a: <T id="FAQ_CAT1_A3" /> },
                { q: <T id="FAQ_CAT1_Q4" />, a: <T id="FAQ_CAT1_A4" /> },
                { q: <T id="FAQ_CAT1_Q5" />, a: <T id="FAQ_CAT1_A5" /> },
            ]
        },
        {
            category: <T id="FAQ_CAT_2_NAME" />,
            items: [
                { q: <T id="FAQ_CAT2_Q1" />, a: <T id="FAQ_CAT2_A1" /> },
                { q: <T id="FAQ_CAT2_Q2" />, a: <T id="FAQ_CAT2_A2" /> },
                { q: <T id="FAQ_CAT2_Q3" />, a: <T id="FAQ_CAT2_A3" /> },
                { q: <T id="FAQ_CAT2_Q4" />, a: <T id="FAQ_CAT2_A4" /> },
                { q: <T id="FAQ_CAT2_Q5" />, a: <T id="FAQ_CAT2_A5" /> },
                { q: <T id="FAQ_CAT2_Q6" />, a: <T id="FAQ_CAT2_A6" /> },
                { q: <T id="FAQ_CAT2_Q7" />, a: <T id="FAQ_CAT2_A7" /> },
                { q: <T id="FAQ_CAT2_Q8" />, a: <T id="FAQ_CAT2_A8" /> },
            ]
        },
        {
            category: <T id="FAQ_CAT_3_NAME" />,
            items: [
                { q: <T id="FAQ_CAT3_Q1" />, a: <T id="FAQ_CAT3_A1" /> },
                { q: <T id="FAQ_CAT3_Q2" />, a: <T id="FAQ_CAT3_A2" /> },
                { q: <T id="FAQ_CAT3_Q3" />, a: <T id="FAQ_CAT3_A3" /> },
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
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium"><T id="FOOTER_NAV_FAQ" /></span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-light text-foreground"><T id="FAQ_HEADING" /></h2>
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
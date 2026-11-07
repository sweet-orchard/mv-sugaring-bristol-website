import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useContent, T } from '../context/ContentContext';
import { getFaqGroups } from '../content/faqItems';
import FaqChat from './FaqChat';

export default function FAQSection() {
    const { t, lang } = useContent();
    const getText = (v) => v?.props?.id ? t(v.props.id) : v;
    
    
    const [showList, setShowList] = useState(false);

    const faqCategories = getFaqGroups(lang)
        .map((g) => ({
            category: <T id={g.nameKey} />,
            items: g.items
                .map((it) => ({ id: it.id, q: <T id={it.q} />, a: <T id={it.a} /> })),
        }))
        ;

    return (
        <section id="faq" className="py-10 md:py-16 lg:py-24 bg-secondary/30">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-12 bg-primary/40" />
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium"><T id="FOOTER_NAV_FAQ" /></span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display font-semibold text-foreground text-2xl md:text-4xl lg:text-5xl leading-[1.15]"><T id="FAQ_HEADING" /></h2>
                </motion.div>

                {/* The FAQ as a chat: pick a topic and a question, or type your own */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <FaqChat />
                </motion.div>

                {/* The complete list, for those who prefer to scan all the questions */}
                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => setShowList((v) => !v)}
                        aria-expanded={showList}
                        className="inline-flex items-center gap-2 text-[13px] font-body font-medium text-[#8a6a35] underline underline-offset-[6px] decoration-[#B38B4D]/50 hover:decoration-[#B38B4D] transition-colors"
                    >
                        {t(showList ? 'FAQ_HIDE_LIST' : 'FAQ_VIEW_LIST')}
                        <ChevronDown className={`w-4 h-4 transition-transform ${showList ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {showList && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-10"
                >
                    <Accordion type="single" collapsible className="space-y-10">
                        {faqCategories.map((cat, catIdx) => (
                            <div key={catIdx}>
                                <h3 className="font-display text-primary font-semibold mb-4 italic px-2 text-lg md:text-xl lg:text-2xl">{cat.category}</h3>
                                <div className="space-y-3">
                                    {cat.items.map((faq, i) => (
                                        <AccordionItem key={i} value={`faq-${faq.id}`} className="bg-background border border-border/50 rounded-sm px-6 data-[state=open]:border-primary/30 transition-colors">
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
                )}
            </div>
        </section>
    );
}
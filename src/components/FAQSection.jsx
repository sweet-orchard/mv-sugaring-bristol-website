import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useContent, T } from '../context/ContentContext';
import { getFaqGroups, getFaqItems } from '../content/faqItems';
import { buildEntries, rank } from '../lib/faqSearch';

export default function FAQSection() {
    const { t, lang } = useContent();
    const getText = (v) => v?.props?.id ? t(v.props.id) : v;
    
    
    const [query, setQuery] = useState('');
    const [openItem, setOpenItem] = useState('');

    const entries = useMemo(
        () => buildEntries(getFaqItems(lang), t),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [lang]
    );
    // null = nothing searchable typed (show everything); otherwise the matching ids, best first.
    const results = rank(query, entries);
    const matchIds = results ? new Set(results.map((r) => r.id)) : null;
    const bestId = results && results.length ? results[0].id : '';

    // The best match opens by itself while searching; clearing the search closes it again.
    useEffect(() => {
        setOpenItem(bestId ? `faq-${bestId}` : '');
    }, [bestId]);

    const faqCategories = getFaqGroups(lang)
        .map((g) => ({
            category: <T id={g.nameKey} />,
            items: g.items
                .filter((it) => !matchIds || matchIds.has(it.id))
                .map((it) => ({ id: it.id, q: <T id={it.q} />, a: <T id={it.a} /> })),
        }))
        .filter((g) => g.items.length > 0);

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

                {/* Smart search: finds the best matching question and opens it */}
                <div className="mb-8 md:mb-10">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70 pointer-events-none" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('FAQ_SEARCH_PLACEHOLDER')}
                            maxLength={120}
                            aria-label={t('FAQ_SEARCH_PLACEHOLDER')}
                            className="w-full h-12 pl-11 pr-11 rounded-full bg-background border border-border/60 text-[16px] sm:text-sm font-body text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 shadow-sm transition-colors"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                aria-label={t('FAQ_SEARCH_CLEAR')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    {results && results.length > 0 && (
                        <p className="mt-3 text-xs text-muted-foreground font-body px-2">{t('FAQ_SEARCH_HINT')}</p>
                    )}
                    {results && results.length === 0 && (
                        <div className="mt-4 rounded-sm border border-primary/30 bg-background p-5 text-center space-y-4">
                            <p className="text-sm text-muted-foreground font-body leading-relaxed">{t('FAQ_SEARCH_NO_MATCH')}</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <a
                                    href="https://wa.me/447448611080"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-[#B38B4D] hover:bg-[#9f7a41] text-white text-[11px] tracking-[0.2em] uppercase font-medium rounded-sm transition-colors"
                                >
                                    {t('FAQ_SEARCH_WHATSAPP')}
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    className="text-xs font-body font-medium text-primary underline underline-offset-4"
                                >
                                    {t('FAQ_SEARCH_SHOW_ALL')}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem} className="space-y-10">
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
            </div>
        </section>
    );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { useLang } from '../context/LangContext';
import translations from '../translations';

export default function BeautySpaceSection() {
    const { lang } = useLang();
    const t = translations[lang].space;

    const highlights = [
        { icon: ShieldCheck, title: t.highlight1Title, desc: t.highlight1Desc },
        { icon: Heart,       title: t.highlight2Title, desc: t.highlight2Desc },
        { icon: Sparkles,    title: t.highlight3Title, desc: t.highlight3Desc },
    ];

    return (
        <section id="beauty-space" className="py-12 lg:py-28 bg-secondary/10 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -translate-y-1/2" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left: Content */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">{t.eyebrow}</p>
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6 leading-tight">
                                {t.heading}
                            </h2>
                            <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">{t.paragraph1}</p>
                            <p className="text-sm font-body text-muted-foreground leading-relaxed mb-8">{t.paragraph2}</p>
                        </motion.div>

                        {/* Highlights list */}
                        <div className="space-y-6">
                            {highlights.map((item, idx) => (
                                <motion.div 
                                    key={idx} 
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-body font-semibold text-foreground mb-1">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed font-body">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Images Grid */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 gap-4">
                            
                            {/* Main large image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="col-span-2 aspect-[16/10] rounded-lg overflow-hidden border border-border/30 shadow-md group relative"
                            >
                                <img 
                                    src="/room-pictures/cozy-room.jpg" 
                                    alt={t.imageAlt1} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-xs text-white uppercase tracking-widest font-body">{t.imageHover1}</span>
                                </div>
                            </motion.div>

                            {/* Detail image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="aspect-[4/3] rounded-lg overflow-hidden border border-border/30 shadow-sm group relative"
                            >
                                <img 
                                    src="/room-pictures/premium-products.jpg" 
                                    alt={t.imageAlt2} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-xs text-white uppercase tracking-widest font-body">{t.imageHover2}</span>
                                </div>
                            </motion.div>

                            {/* Seating area image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="aspect-[4/3] rounded-lg overflow-hidden border border-border/30 shadow-sm group relative"
                            >
                                <img 
                                    src="/room-pictures/clean-materials.jpg" 
                                    alt={t.imageAlt3} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-xs text-white uppercase tracking-widest font-body">{t.imageHover3}</span>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, Globe, BookOpen, X, Mail } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
);
import { useContent, T } from '../context/ContentContext';

export default function CoursesSection() {
    const { t, lang } = useContent();
    const getText = (v) => v?.props?.id ? t(v.props.id) : v;
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
                                <button onClick={() => setIsContactModalOpen(true)} className="w-full bg-primary hover:bg-primary/90 text-background font-medium py-3.5 px-6 rounded-sm transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"><T id="COURSES_LEARN_MORE_BTN" /></button>
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
            
            {/* Contact Modal */}
            <AnimatePresence>
                {isContactModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
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
                            
                            <h3 className="font-display text-2xl font-semibold text-center mb-6 text-foreground"><T id="COURSE_CONTACT_MODAL_TITLE" /></h3>
                            
                            <div className="space-y-4">
                                <a 
                                    href="https://wa.me/447448611080" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-[#25D366]/90 border border-[#25D366]/20 transition-colors rounded-sm font-medium"
                                >
                                    <WhatsAppIcon className="w-5 h-5" />
                                    <span><T id="COURSE_CONTACT_MODAL_WHATSAPP" /></span>
                                </a>
                                
                                <a 
                                    href={`mailto:${t('CONTACT_EMAIL_VALUE')?.trim() || 'mariia.vatseba@gmail.com'}`}
                                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-primary/10 text-primary hover:bg-primary hover:text-background border border-primary/20 transition-colors rounded-sm font-medium"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span><T id="COURSE_CONTACT_MODAL_EMAIL" /></span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
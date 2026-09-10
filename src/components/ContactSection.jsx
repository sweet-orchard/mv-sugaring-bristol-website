import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Clock, Send, Phone } from 'lucide-react';
import { useLang } from '../context/LangContext';
import translations from '../translations';

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
);

export default function ContactSection() {
    const { lang } = useLang();
    const t = translations[lang].contact;
    return (
        <section id="contact" className="py-16 lg:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                        {t.heading}
                    </h2>
                    <p className="max-w-xl mx-auto text-sm font-body text-muted-foreground leading-relaxed">
                        {t.subtext}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-8 mb-10">
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-body font-semibold text-foreground mb-1">{t.locationLabel}</h4>
                                    <p className="text-sm text-muted-foreground">{t.locationValue}</p>
                                    {t.locationNote && <p className="text-xs text-muted-foreground/60 mt-1">{t.locationNote}</p>}
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                    <WhatsAppIcon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-body font-semibold text-foreground mb-1">{t.whatsappLabel}</h4>
                                    <a href="https://wa.me/447448611080" className="text-sm text-primary hover:underline">{t.whatsappValue}</a>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-body font-semibold text-foreground mb-1">{t.emailLabel}</h4>
                                    <a href="mailto:mariia.vatseba@gmail.com" className="text-sm text-primary hover:underline">mariia.vatseba@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-body font-semibold text-foreground mb-1">{t.availabilityLabel}</h4>
                                    <p className="text-sm text-muted-foreground">{t.availabilityValue}</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">{t.availabilityNote}</p>
                                </div>
                            </div>


                        </div>

                        {/* Google Maps Embed */}
                        <div className="aspect-video rounded-sm overflow-hidden border border-border/30 relative">
                            {/* To change the map location, replace the 'src' link below with your own Google Maps embed link! */}
                            <iframe
                                src="https://maps.google.com/maps?q=MV+SUGARING+BRISTOL&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-multiply hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="bg-secondary/40 border border-border/30 rounded-sm p-8 lg:p-10">
                            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">{t.formTitle}</h3>
                            <form action="https://formsubmit.co/mariia.vatseba@gmail.com" method="POST" className="space-y-5">
                                {/* FormSubmit Configuration */}
                                <input type="hidden" name="_subject" value="New Inquiry from Website" />
                                <input type="hidden" name="_captcha" value="false" />

                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-2">{t.nameLabel}</label>
                                    <input type="text" name="name" required className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors" placeholder={t.namePlaceholder} />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-2">{t.emailFormLabel}</label>
                                    <input type="email" name="email" required className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors" placeholder={t.emailPlaceholder} />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-2">{t.serviceLabel}</label>
                                    <select name="service" required className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                                        <option value="">{t.serviceDefault}</option>
                                        <optgroup label={t.optgroupBikini}>
                                            <option>{t.optionHollywood}</option>
                                            <option>{t.optionGstring}</option>
                                            <option>{t.optionBasicBikini}</option>
                                        </optgroup>
                                        <optgroup label={t.optgroupUpper}>
                                            <option>{t.optionUnderarms}</option>
                                            <option>{t.optionArms}</option>
                                            <option>{t.optionStomach}</option>
                                        </optgroup>
                                        <optgroup label={t.optgroupDown}>
                                            <option>{t.optionLegs}</option>
                                            <option>{t.optionButtocks}</option>
                                        </optgroup>
                                        <optgroup label={t.optgroupFace}>
                                            <option>{t.optionFaceZones}</option>
                                            <option>{t.optionFaceCombos}</option>
                                        </optgroup>
                                        <optgroup label={t.optgroupCourses}>
                                            <option>{t.optionCoursePro}</option>
                                            <option>{t.optionCourseSelf}</option>
                                            <option>{t.optionCourseOnline}</option>
                                        </optgroup>
                                        <optgroup label={t.optgroupOther}>
                                            <option>{t.optionMultiZone}</option>
                                            <option>{t.optionOther}</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-2">{t.messageLabel}</label>
                                    <textarea name="message" required rows={4} className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder={t.messagePlaceholder} />
                                </div>
                                <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:bg-primary/90 transition-all duration-300">
                                    <Send className="w-4 h-4" />
                                    {t.submitButton}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
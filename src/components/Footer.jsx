import React from 'react';
import { Mail, Heart } from 'lucide-react';

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
);
import { useLang } from '../context/LangContext';
import translations from '../translations';

export default function Footer() {
    const { lang } = useLang();
    const t = translations[lang].footer;

    return (
        <footer className="bg-foreground text-background pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                {/* Main content */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16 mb-10">

                    {/* Brand */}
                    <div className="lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left">
                        <img src="/logo.png" alt="Mariia Vatseba" className="h-24 w-auto object-contain mb-5" />
                        <p className="text-[12px] text-background/55 leading-relaxed font-body tracking-wide max-w-xs lg:max-w-none">
                            {t.brandTagline}
                        </p>
                    </div>

                    {/* Right side: social buttons + links grid */}
                    <div className="lg:flex-1 flex flex-col items-center lg:items-start gap-8">

                        {/* Social buttons */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                            <a href="https://wa.me/447448611080" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-background/20 hover:border-primary hover:bg-primary/10 transition-all text-background/60 hover:text-primary">
                                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                                <span className="text-[11px] font-body tracking-widest uppercase">{t.whatsappButton}</span>
                            </a>
                            <a href="mailto:mariia.vatseba@gmail.com" className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-background/20 hover:border-primary hover:bg-primary/10 transition-all text-background/60 hover:text-primary">
                                <Mail className="w-4 h-4 shrink-0" />
                                <span className="text-[11px] font-body tracking-widest uppercase">{t.emailButton}</span>
                            </a>
                        </div>

                        {/* Links grid */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-center lg:text-left">
                            {/* Explore */}
                            <div className="flex flex-col items-center lg:items-start">
                                <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-3">{t.navGroupExplore}</h4>
                                <div className="flex flex-col gap-2.5">
                                    <a href="#about" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">{t.navAbout}</a>
                                    <a href="#services" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">{t.navServices}</a>
                                    <a href="#courses" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">{t.navCourses}</a>
                                </div>
                            </div>

                            {/* Support */}
                            <div className="flex flex-col items-center lg:items-start">
                                <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-3">{t.navGroupSupport}</h4>
                                <div className="flex flex-col gap-2.5">
                                    <a href="#faq" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">{t.navFaq}</a>
                                    <a href="#care-guide" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">{t.navCareGuide}</a>
                                    <a href="#contact" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">{t.navContact}</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-background/15 mb-6" />

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
                    <p className="text-[10px] text-background/35 font-body tracking-widest uppercase">
                        © {new Date().getFullYear()} Mariia Vatseba. All rights reserved.
                    </p>
                    <p className="text-[10px] text-background/35 font-body flex items-center justify-center gap-1.5 tracking-widest uppercase">
                        {t.madeWithLove} <Heart className="w-3 h-3 text-primary fill-primary animate-pulse" /> {t.madeWithLoveCity}
                    </p>
                </div>
            </div>
        </footer>
    );
}
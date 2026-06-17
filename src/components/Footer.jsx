import React from 'react';
import { Mail, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-foreground text-background pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">

                {/* Main content */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16 mb-10">

                    {/* Brand */}
                    <div className="lg:w-[35%] flex flex-col items-center lg:items-start text-center lg:text-left">
                        <img src="/logo.png" alt="Mariia Vatseba" className="h-24 w-auto object-contain mb-5" />
                        <p className="text-[12px] text-background/55 leading-relaxed font-body tracking-wide max-w-xs lg:max-w-none">
                            With Love to Your Skin. Premium sugaring specialist delivering luxury self-care experiences in Bristol.
                        </p>
                    </div>

                    {/* Right side: social buttons + links grid */}
                    <div className="lg:flex-1 flex flex-col items-center lg:items-start gap-8">

                        {/* Social buttons */}
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                            <a href="mailto:mariia.vatseba@gmail.com" className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-background/20 hover:border-primary hover:bg-primary/10 transition-all text-background/60 hover:text-primary">
                                <Mail className="w-4 h-4 shrink-0" />
                                <span className="text-[11px] font-body tracking-widest uppercase">Email</span>
                            </a>
                        </div>

                        {/* Links grid */}
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-center lg:text-left">
                            {/* Explore */}
                            <div className="flex flex-col items-center lg:items-start">
                                <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-3">Explore</h4>
                                <div className="flex flex-col gap-2.5">
                                    <a href="#about" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">About</a>
                                    <a href="#services" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">Services & Prices</a>
                                    <a href="#courses" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">Courses</a>
                                </div>
                            </div>

                            {/* Support */}
                            <div className="flex flex-col items-center lg:items-start">
                                <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary font-bold mb-3">Support</h4>
                                <div className="flex flex-col gap-2.5">
                                    <a href="#faq" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">FAQ</a>
                                    <a href="#care-guide" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">Care Guide</a>
                                    <a href="#contact" className="text-[13px] text-background/55 hover:text-primary transition-colors font-body">Contact</a>
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
                        Made with <Heart className="w-3 h-3 text-primary fill-primary animate-pulse" /> in Bristol
                    </p>
                </div>
            </div>
        </footer>
    );
}
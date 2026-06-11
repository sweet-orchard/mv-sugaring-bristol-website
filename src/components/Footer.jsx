import React from 'react';
import { Instagram, Mail, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-foreground text-background py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="mb-4">
                            <img
                                src="/logo.png"
                                alt="Mariia Vatseba"
                                className="h-20 w-auto object-contain"
                            />
                        </div>
                        <p className="text-sm text-background/50 leading-relaxed mt-4 font-body">
                            With Love to Your Skin. Premium sugaring specialist delivering luxury self-care experiences in Bristol.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">Quick Links</h4>
                        <div className="space-y-3">
                            {[
                                { label: 'About', href: '#about' },
                                { label: 'Services & Prices', href: '#services' },
                                { label: 'Courses', href: '#courses' },
                                { label: 'FAQ', href: '#faq' },
                                { label: 'Contact', href: '#contact' },
                            ].map(link => (
                                <a key={link.href} href={link.href} className="block text-sm text-background/50 hover:text-primary transition-colors font-body">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-4">Connect</h4>
                        <div className="space-y-3">
                            <a href="mailto:mariia.vatseba@gmail.com" className="flex items-center gap-3 text-sm text-background/50 hover:text-primary transition-colors font-body">
                                <Mail className="w-4 h-4" />
                                mariia.vatseba@gmail.com
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm text-background/50 hover:text-primary transition-colors font-body">
                                <Instagram className="w-4 h-4" />
                                @mariia.vatseba
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-background/10 mb-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-background/30 font-body">
                        © {new Date().getFullYear()} Mariia Vatseba. All rights reserved.
                    </p>
                    <p className="text-xs text-background/30 font-body flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-primary" /> in Bristol
                    </p>
                </div>
            </div>
        </footer>
    );
}
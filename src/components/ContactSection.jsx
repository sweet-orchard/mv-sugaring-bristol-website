import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Clock, Instagram, Send } from 'lucide-react';

export default function ContactSection() {
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
                        <span className="text-xs tracking-[0.3em] uppercase text-primary font-body font-medium">Get in Touch</span>
                        <div className="h-px w-12 bg-primary/40" />
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
                        Book Your <span className="font-semibold italic">Session</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-sm font-body text-muted-foreground leading-relaxed">
                        Ready to experience the ultimate in luxury sugaring? Get in touch to book your appointment or ask any questions.
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
                                    <h4 className="text-sm font-body font-semibold text-foreground mb-1">Location</h4>
                                    <p className="text-sm text-muted-foreground">Bristol, England</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">Exact address shared upon booking</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-body font-semibold text-foreground mb-1">Email</h4>
                                    <a href="mailto:mariia.vatseba@gmail.com" className="text-sm text-primary hover:underline">mariia.vatseba@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-body font-semibold text-foreground mb-1">Availability</h4>
                                    <p className="text-sm text-muted-foreground">By appointment only</p>
                                    <p className="text-xs text-muted-foreground/60 mt-1">Please message to arrange your preferred time</p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                    <Instagram className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-body font-semibold text-foreground mb-1">Follow Me</h4>
                                    <a href="#" className="text-sm text-primary hover:underline">@mariia.vatseba</a>
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
                            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Send a Message</h3>
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-2">Your Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors" placeholder="Sophia Taylor" />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors" placeholder="sophia@example.com" />
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-2">Service of Interest</label>
                                    <select className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                                        <option value="">Select a service...</option>
                                        <optgroup label="Bikini & Intimate Sugaring">
                                            <option>Hollywood / Brazilian</option>
                                            <option>G-String / Extended Bikini</option>
                                            <option>Basic Bikini Line</option>
                                        </optgroup>
                                        <optgroup label="Upper Body Sugaring">
                                            <option>Underarms</option>
                                            <option>Full or Half Arms</option>
                                            <option>Stomach</option>
                                        </optgroup>
                                        <optgroup label="Down Body Sugaring">
                                            <option>Full or Half Legs</option>
                                            <option>Buttocks & Lower Back</option>
                                        </optgroup>
                                        <optgroup label="Face Sugaring">
                                            <option>Individual Face Zones</option>
                                            <option>Face Combos & Premium Packages</option>
                                        </optgroup>
                                        <optgroup label="Courses & Training">
                                            <option>Course: For Professionals</option>
                                            <option>Course: For Yourself</option>
                                            <option>Online Course</option>
                                        </optgroup>
                                        <optgroup label="Other">
                                            <option>Multiple Zones / Custom Package</option>
                                            <option>Other / General Enquiry</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs tracking-[0.15em] uppercase text-muted-foreground font-medium mb-2">Your Message</label>
                                    <textarea rows={4} className="w-full px-4 py-3 bg-background border border-border/50 rounded-sm text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Tell me about your skin or any questions you have..." />
                                </div>
                                <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium rounded-sm hover:bg-primary/90 transition-all duration-300">
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
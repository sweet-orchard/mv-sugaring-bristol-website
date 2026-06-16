import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, Hand, Droplets, Play, Pause } from 'lucide-react';

const features = [
    {
        icon: Flame,
        title: 'Zero Risk of Burns',
        desc: 'Applied at a comfortable room temperature.',
    },
    {
        icon: Hand,
        title: 'A Gentle, Mindful Touch',
        desc: 'My techniques are entirely tailored to you.',
    },
    {
        icon: Droplets,
        title: 'More Than Hair Removal',
        desc: "It's a luxurious SPA-style exfoliation that leaves your skin feeling silky-soft and glowing.",
    },
];

export default function WhatSetsApartSection() {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <section className="py-12 lg:py-28 bg-background">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4">What Sets Me Apart</p>
                        <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-6">
                            A <span className="font-semibold italic">Different Level</span> of Care
                        </h2>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                            I specialise in Sugaring—an ultra-safe, natural method that is incredibly kind to even the most sensitive skin.
                        </p>
                        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-8">
                            Perfect for clients who value privacy, comfort, exceptional care, quality and a cosy atmosphere—choosing nothing less than the best for their skin.
                        </p>

                        <div className="space-y-6">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                        <f.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-body font-semibold text-foreground mb-1">{f.title}</h4>
                                        <p className="text-sm text-muted-foreground">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right video */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="relative aspect-square rounded-sm overflow-hidden bg-gradient-to-br from-secondary via-accent to-secondary shadow-md border border-border/30">
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                                src="/whatsetsmeapartvideo.webm"
                            />
                            {/* Play/Pause control button */}
                            <button
                                onClick={togglePlay}
                                className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-md border border-border/40 hover:bg-background hover:text-primary text-foreground w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md focus:outline-none"
                                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                            >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
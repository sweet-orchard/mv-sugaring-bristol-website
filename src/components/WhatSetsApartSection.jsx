import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, Hand, Droplets, Play, Pause } from 'lucide-react';
import { useContent, T } from '../context/ContentContext';

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
    const { t, lang } = useContent();
    const getText = (v) => v?.props?.id ? t(v.props.id) : v;
    

    const features = [
        { icon: Flame,    title: <T id="APART_FEATURE_1_TITLE" />, desc: <T id="APART_FEATURE_1_DESC" /> },
        { icon: Hand,     title: <T id="APART_FEATURE_2_TITLE" />, desc: <T id="APART_FEATURE_2_DESC" /> },
        { icon: Droplets, title: <T id="APART_FEATURE_3_TITLE" />, desc: <T id="APART_FEATURE_3_DESC" /> },
    ];

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
                        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-4"><T id="APART_EYEBROW" /></p>
                        <h2 className="font-display font-light text-foreground mb-6 text-3xl md:text-5xl lg:text-6xl">
                            <T id="APART_HEADING" render={(text) => <>{text.split(' ').slice(0,1).join(' ')} <span className="font-semibold italic">{text.split(' ').slice(1).join(' ')}</span></>} />
                        </h2>
                        <p className="font-body text-muted-foreground mb-4 text-sm md:text-[17px] leading-[1.8]"><T id="APART_PARAGRAPH_1" /></p>
                        <p className="font-body text-muted-foreground mb-8 text-sm md:text-[17px] leading-[1.8]"><T id="APART_PARAGRAPH_2" /></p>

                        <div className="space-y-6">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-10 h-10 shrink-0 rounded-sm bg-primary/10 flex items-center justify-center">
                                        <f.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-body font-semibold text-foreground mb-1">{f.title}</h4>
                                        <p className="text-muted-foreground text-sm md:text-[17px] leading-[1.8]">{f.desc}</p>
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
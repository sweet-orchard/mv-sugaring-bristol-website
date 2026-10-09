import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GoldenBackground() {
    const { scrollYProgress } = useScroll();

    // Move blobs smoothly based on scroll progress
    const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
    const x1 = useTransform(scrollYProgress, [0, 1], ['-20%', '30%']);
    
    const y2 = useTransform(scrollYProgress, [0, 1], ['100%', '-20%']);
    const x2 = useTransform(scrollYProgress, [0, 1], ['100%', '50%']);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-background">
            <motion.div
                style={{ y: y1, x: x1 }}
                className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-[#B38B4D]/15 blur-[100px] md:blur-[140px]"
            />
            <motion.div
                style={{ y: y2, x: x2 }}
                className="absolute top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-[#B38B4D]/15 blur-[80px] md:blur-[120px]"
            />
        </div>
    );
}

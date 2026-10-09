import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { T } from '../context/ContentContext';

export default function ScrollButton({ href, onClick, className, textId }) {
    const buttonRef = useRef(null);
    
    // Track scroll specifically for this button when it's in the viewport
    const { scrollYProgress } = useScroll({
        target: buttonRef,
        offset: ["start end", "end start"]
    });
    
    // Move the flare from the far left to the far right as you scroll
    const x = useTransform(scrollYProgress, [0, 1], ['-150%', '200%']);

    return (
        <a
            ref={buttonRef}
            href={href}
            onClick={onClick}
            className={`relative overflow-hidden group ${className} !bg-[#B38B4D]`}
        >
            <motion.div 
                className="absolute top-0 bottom-0 w-[100%] z-0 opacity-90"
                style={{
                    background: 'linear-gradient(90deg, rgba(250, 225, 160, 0) 0%, rgba(250, 225, 160, 0.45) 50%, rgba(250, 225, 160, 0) 100%)',
                    x: x,
                    filter: 'blur(12px)',
                    transform: 'skewX(-25deg)'
                }}
            />
            <span className="relative z-10 text-white"><T id={textId} /></span>
        </a>
    );
}

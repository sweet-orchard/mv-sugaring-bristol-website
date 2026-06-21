import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../context/LangContext';
import translations from '../translations';

export default function StickyBookingButton() {
    const { lang } = useLang();
    const t = translations[lang].sticky;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ x: "-50%", y: 100, opacity: 0 }}
                    animate={{ x: "-50%", y: 0, opacity: 1 }}
                    exit={{ x: "-50%", y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 left-1/2 z-50 lg:hidden"
                >
                    <a
                        href="#contact"
                        className="flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-medium rounded-full shadow-xl hover:bg-primary/90 transition-all"
                    >
                        {t.bookNow}
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
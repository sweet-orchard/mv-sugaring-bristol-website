import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useLang } from '../context/LangContext';
import translations from '../translations';
import { CheckCircle } from 'lucide-react';

export default function Success() {
    const { lang } = useLang();
    const t = translations[lang].courses;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-16 flex items-center justify-center px-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg w-full text-center"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
                        {t.successTitle}
                    </h1>
                    <p className="text-muted-foreground font-body leading-relaxed mb-10 max-w-md mx-auto">
                        {t.successDesc}
                    </p>

                    <a 
                        href="https://t.me/+1Hok5FxH2VgxOWVk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-[#0088cc] hover:bg-[#0077b3] text-white font-medium py-4 px-10 rounded-sm transition-all duration-300 transform hover:scale-[1.02] shadow-lg mb-6"
                    >
                        {t.joinTelegramBtn}
                    </a>

                    <div>
                        <a href="/" className="text-sm text-primary hover:underline font-medium">
                            {t.backToHomeBtn}
                        </a>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

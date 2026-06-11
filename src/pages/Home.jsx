import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import WhySugaringSection from '../components/WhySugaringSection';
import WhatSetsApartSection from '../components/WhatSetsApartSection';
import BeautySpaceSection from '../components/BeautySpaceSection';
import CareGuideSection from '../components/CareGuideSection';
import BeforeAfterSection from '../components/BeforeAfterSection';
import ServicesSection from '../components/ServicesSection';
import CoursesSection from '../components/CoursesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import StickyBookingButton from '../components/StickyBookingButton';

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <WhySugaringSection />
            <WhatSetsApartSection />
            <BeautySpaceSection />
            <CareGuideSection />
            <BeforeAfterSection />
            <ServicesSection />
            <CoursesSection />
            <TestimonialsSection />
            {/* <BlogSection /> */}
            <FAQSection />
            <ContactSection />
            <Footer />
            <StickyBookingButton />
        </div>
    );
}
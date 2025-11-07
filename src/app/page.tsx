'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProjectsPreview from '@/components/ProjectsPreview';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
import CopyrightFooter from '@/components/CopyrightFooter';
import BackgroundAnimation from '@/components/BackgroundAnimation';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <ProjectsPreview />
          <ServicesSection />
          <ProcessSection />
          <AboutSection />
          <TestimonialsSection />
          <PricingSection />
        </main>
        <CopyrightFooter />
      </div>
    </div>
  );
}

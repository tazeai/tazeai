'use client';

import { AnimatedBackground } from './_components/animated-background';
import CTASection from './_components/cta-section';
import DemoSection from './_components/demo-section';
import Features from './_components/features';
import Footer from './_components/footer';
import Hero from './_components/hero';
import Navbar from './_components/navbar';
import PricingSection from './_components/pricing-section';
import Testimonials from './_components/testimonials';

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden scroll-smooth">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Hero />
        <Features />
        <DemoSection />
        <PricingSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

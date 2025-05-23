"use client";

import CTASection from "./_components/cta-section";
import DemoSection from "./_components/demo-section";
import Features from "./_components/features";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Navbar from "./_components/navbar";
import PricingSection from "./_components/pricing-section";
import Testimonials from "./_components/testimonials";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
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

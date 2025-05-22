'use client';

import { useTranslation } from 'react-i18next';
import { useSession } from '@tazeai/auth/client';
import Navbar from './_components/navbar';
import Hero from './_components/hero';
import Features from './_components/features';
import DemoSection from './_components/demo-section';
import PricingSection from './_components/pricing-section';
import Testimonials from './_components/testimonials';
import CTASection from './_components/cta-section';
import Footer from './_components/footer';

export default function LandingPage() {
  const { t } = useTranslation();
  const { data: session } = useSession();
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

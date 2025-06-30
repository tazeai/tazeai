'use client';

import { cn } from '@tazeai/ui/lib/utils';
import Footer from './_components/footer';
import Navbar from './_components/navbar';
import HeroMVP from './_components/hero-mvp';
import FeaturesMVP from './_components/features-mvp';
import AIDemo from './_components/ai-demo';

export default function LandingPageMVP() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden scroll-smooth">
      <Navbar />
      <main className="relative z-10 flex-1">
        <HeroMVP />
        <FeaturesMVP />
        <AIDemo />
      </main>
      <Footer />
    </div>
  );
}
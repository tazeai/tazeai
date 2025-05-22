'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Brain, Lightbulb, MessageSquareMore } from 'lucide-react';
import { cn } from '@tazeai/ui/lib/utils';
import { useInView } from '@tazeai/ui/hooks/use-in-view';

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border bg-card p-6 shadow-sm transition-all duration-700',
        'transform hover:shadow-lg hover:-translate-y-1 hover:bg-primary/5',
        isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-medium">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            智能创作的无限可能
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            探索AI驱动的创新功能，释放创作潜能，让灵感自由流动。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<Brain className="h-6 w-6" />}
            title="智能对话"
            description="自然流畅的对话体验，理解上下文，提供精准回应，让交流更有温度。"
            delay={100}
          />
          <Feature
            icon={<Sparkles className="h-6 w-6" />}
            title="创意生成"
            description="突破思维局限，AI助手帮您激发创意灵感，创作独特内容。"
            delay={200}
          />
          <Feature
            icon={<Lightbulb className="h-6 w-6" />}
            title="智能优化"
            description="自动优化文本结构和表达，让您的创作更专业、更有感染力。"
            delay={300}
          />
          <Feature
            icon={<MessageSquareMore className="h-6 w-6" />}
            title="多场景应用"
            description="从写作到营销，从创意到分析，满足您在不同场景的智能创作需求。"
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

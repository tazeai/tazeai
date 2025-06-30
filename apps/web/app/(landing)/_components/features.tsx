'use client';

import {
  Brain,
  Lightbulb,
  MessageSquareMore,
  Sparkles,
} from '@tazeai/ui/components/icons';
import { useInView } from '@tazeai/ui/hooks/use-in-view';
import { cn } from '@tazeai/ui/lib/utils';
import { useRef } from 'react';
import ScrollReveal from './scroll-reveal';

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
};

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <ScrollReveal delay={delay} direction="up" duration={800}>
      <div
        className={cn(
          'group relative rounded-xl border bg-card/50 p-6 shadow-sm transition-all duration-500 backdrop-blur-sm',
          'hover:-translate-y-2 transform hover:bg-primary/5 hover:shadow-xl hover:border-primary/20',
          'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-primary/5 before:to-purple-500/5 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100'
        )}
        ref={ref}
      >
        <div className="relative z-10">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
          <h3 className="mb-3 font-semibold text-xl transition-colors group-hover:text-primary">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </ScrollReveal>
  );
};

const Features = () => {
  return (
    <section
      className="relative bg-gradient-to-b from-muted/30 to-background/50 py-24 backdrop-blur-sm"
      id="features"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal direction="up" duration={1000}>
          <div className="mb-16 space-y-6 text-center">
            <h2 className="bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text font-bold text-3xl text-transparent tracking-tight sm:text-4xl md:text-5xl">
              智能创作的无限可能
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground leading-relaxed">
              探索AI驱动的创新功能，释放创作潜能，让灵感自由流动。
            </p>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            delay={100}
            description="自然流畅的对话体验，理解上下文，提供精准回应，让交流更有温度。"
            icon={<Brain className="h-7 w-7" />}
            title="智能对话"
          />
          <Feature
            delay={200}
            description="突破思维局限，AI助手帮您激发创意灵感，创作独特内容。"
            icon={<Sparkles className="h-7 w-7" />}
            title="创意生成"
          />
          <Feature
            delay={300}
            description="自动优化文本结构和表达，让您的创作更专业、更有感染力。"
            icon={<Lightbulb className="h-7 w-7" />}
            title="智能优化"
          />
          <Feature
            delay={400}
            description="从写作到营销，从创意到分析，满足您在不同场景的智能创作需求。"
            icon={<MessageSquareMore className="h-7 w-7" />}
            title="多场景应用"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

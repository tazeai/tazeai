'use client';

import {
  MessageCircle,
  Cpu,
  Zap,
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
  techDetails: string;
};

const Feature = ({ icon, title, description, delay, techDetails }: FeatureProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
  });

  return (
    <ScrollReveal delay={delay} direction="up" duration={800}>
      <div
        className={cn(
          'group relative rounded-xl border bg-card/50 p-6 shadow-sm transition-all duration-500',
          'hover:-translate-y-1 transform hover:bg-primary/5 hover:shadow-lg hover:border-primary/20'
        )}
        ref={ref}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-3 font-semibold text-lg">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3">{description}</p>
        <div className="text-xs text-muted-foreground/70 font-mono">
          {techDetails}
        </div>
      </div>
    </ScrollReveal>
  );
};

const FeaturesMVP = () => {
  return (
    <section
      className="relative py-16"
      id="features"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal direction="up" duration={1000}>
          <div className="mb-12 space-y-4 text-center">
            <h2 className="font-bold text-2xl tracking-tight sm:text-3xl">
              核心AI能力
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground">
              基于LangChain构建的AI对话系统，支持多模型切换和流式响应
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Feature
            delay={100}
            description="支持OpenAI GPT和DeepSeek模型，可根据需求切换不同的AI provider"
            icon={<Cpu className="h-6 w-6" />}
            title="多模型支持"
            techDetails="OpenAI API + DeepSeek API"
          />
          <Feature
            delay={200}
            description="基于LangChain.js实现的智能对话，支持上下文理解和多轮对话"
            icon={<MessageCircle className="h-6 w-6" />}
            title="智能对话"
            techDetails="LangChain.js + SSE"
          />
          <Feature
            delay={300}
            description="Server-Sent Events实现流式响应，提供实时的对话体验"
            icon={<Zap className="h-6 w-6" />}
            title="流式响应"
            techDetails="Hono + streamSSE"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesMVP;
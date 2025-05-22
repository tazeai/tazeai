"use client";

import {
  Brain,
  Lightbulb,
  MessageSquareMore,
  Sparkles,
} from "@tazeai/ui/components/icons";
import { useInView } from "@tazeai/ui/hooks/use-in-view";
import { cn } from "@tazeai/ui/lib/utils";
import { useRef } from "react";

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
    <div
      className={cn(
        "rounded-xl border bg-card p-6 shadow-sm transition-all duration-700",
        "hover:-translate-y-1 transform hover:bg-primary/5 hover:shadow-lg",
        isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
      )}
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-2 font-medium text-xl">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-muted/50 py-20" id="features">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            智能创作的无限可能
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
            探索AI驱动的创新功能，释放创作潜能，让灵感自由流动。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            delay={100}
            description="自然流畅的对话体验，理解上下文，提供精准回应，让交流更有温度。"
            icon={<Brain className="h-6 w-6" />}
            title="智能对话"
          />
          <Feature
            delay={200}
            description="突破思维局限，AI助手帮您激发创意灵感，创作独特内容。"
            icon={<Sparkles className="h-6 w-6" />}
            title="创意生成"
          />
          <Feature
            delay={300}
            description="自动优化文本结构和表达，让您的创作更专业、更有感染力。"
            icon={<Lightbulb className="h-6 w-6" />}
            title="智能优化"
          />
          <Feature
            delay={400}
            description="从写作到营销，从创意到分析，满足您在不同场景的智能创作需求。"
            icon={<MessageSquareMore className="h-6 w-6" />}
            title="多场景应用"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

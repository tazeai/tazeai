"use client";

import { useRef } from "react";
import { Button } from "@tazeai/ui/components/button";
import { ArrowRight } from "lucide-react";
import { useInView } from "@tazeai/ui/hooks/use-in-view";
import { cn } from "@tazeai/ui/lib/utils";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });

  return (
    <section className="py-20">
      <div
        ref={ref}
        className={cn(
          "container mx-auto max-w-5xl px-4 md:px-6 rounded-3xl bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-8 md:p-12 lg:p-16 relative overflow-hidden transition-all duration-1000",
          isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        )}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-white/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            准备好开启智能创作之旅了吗？
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-primary-foreground/80">
            加入数千位满意的用户，体验AI驱动的创新写作平台。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="text-primary hover:text-primary font-medium group bg-white hover:bg-white/90 shadow-lg"
            >
              免费开始使用
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 border-0 text-white shadow-lg backdrop-blur-sm"
            >
              预约演示
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/70">
            无需信用卡，14天免费试用
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

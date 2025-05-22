"use client";

import { Button } from "@tazeai/ui/components/button";
import { ArrowRight } from "@tazeai/ui/components/icons";
import { useInView } from "@tazeai/ui/hooks/use-in-view";
import { cn } from "@tazeai/ui/lib/utils";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    threshold: 0.5,
  });

  return (
    <section className="py-20">
      <div
        className={cn(
          "container relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/90 p-8 px-4 text-primary-foreground transition-all duration-1000 md:p-12 md:px-6 lg:p-16",
          isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
        )}
        ref={ref}
      >
        {/* Decorative elements */}
        <div className="-translate-y-1/2 absolute top-0 right-0 h-[70%] w-[40%] translate-x-1/4 rounded-full bg-white/10 blur-3xl" />
        <div className="-translate-x-1/4 absolute bottom-0 left-0 h-[50%] w-[30%] translate-y-1/3 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 space-y-6 text-center">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">
            准备好开启智能创作之旅了吗？
          </h2>
          <p className="mx-auto max-w-2xl text-primary-foreground/80 text-xl">
            加入数千位满意的用户，体验AI驱动的创新写作平台。
          </p>
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Button
              className="group bg-white font-medium text-primary shadow-lg hover:bg-white/90 hover:text-primary"
              size="lg"
              variant="secondary"
            >
              免费开始使用
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              className="border-0 bg-white/20 text-white shadow-lg backdrop-blur-sm hover:bg-white/30"
              size="lg"
            >
              预约演示
            </Button>
          </div>
          <p className="text-primary-foreground/70 text-sm">
            无需信用卡，14天免费试用
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

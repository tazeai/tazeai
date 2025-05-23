"use client";

import { useEffect, useState } from "react";
import { Button } from "@tazeai/ui/components/button";
import { ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@tazeai/ui/lib/utils";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");
  const fullText = "创意无限，智能对话";

  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* 动态背景效果 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div
            className={cn(
              "space-y-6 transition-all duration-700 delay-300",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
            )}
          >
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-primary/5 border-primary/10">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              AI驱动的新一代对话体验
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {text}
              <span className="inline-block w-[3px] h-8 bg-primary animate-blink ml-1"></span>
              <span className="text-primary block mt-2">
                智能创作的未来已来
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              突破传统界限，让AI为您的创作赋能。文案生成、内容创作、智能对话，一切皆有可能。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90"
              >
                立即体验
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                查看演示
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="flex items-center pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-primary/10 overflow-hidden"
                  />
                ))}
              </div>
              <p className="ml-4 text-sm text-muted-foreground">
                加入{" "}
                <span className="font-medium text-foreground">10,000+</span>{" "}
                位创作者的智能创作之旅
              </p>
            </div>
          </div>

          <div
            className={cn(
              "relative rounded-lg border backdrop-blur-sm bg-background/30 shadow-lg overflow-hidden transition-all duration-700 delay-500",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
            )}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/10 via-purple-500/10 to-background rounded-lg p-2">
              <div className="h-full w-full rounded-md bg-card p-6 shadow-sm">
                <div className="flex flex-col space-y-4 h-full">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <div className="h-3 w-3 rounded-full bg-pink-500"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="space-y-4 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground animate-pulse">
                          AI正在思考...
                        </p>
                        <div className="flex justify-center space-x-1">
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></span>
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

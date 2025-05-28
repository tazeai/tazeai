"use client";

import { useEffect, useState } from "react";
import { Button } from "@tazeai/ui/components/button";
import { ChevronRight, ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { cn } from "@tazeai/ui/lib/utils";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-32 min-h-screen flex items-center">
      {/* 增强的动态背景效果 */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />

        {/* 动态光球 */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[100px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-[80px] animate-pulse delay-1000" />

        {/* 鼠标跟随光效 */}
        <div
          className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary/20 to-transparent blur-[60px] pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
          }}
        />

        {/* 浮动粒子 */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div
            className={cn(
              "space-y-8 transition-all duration-1000 delay-300",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
            )}
          >
            {/* 增强的标签 */}
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AI驱动的新一代对话体验
              </span>
              <Star className="w-3 h-3 ml-2 text-yellow-500 animate-spin" />
            </div>

            {/* 增强的标题 */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                {text}
              </span>
              <span className="inline-block w-[3px] h-12 bg-gradient-to-b from-primary to-purple-600 animate-pulse ml-1"></span>
              <span className="block mt-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                智能创作的未来已来
              </span>
            </h1>

            {/* 增强的描述 */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[600px] leading-relaxed">
              突破传统界限，让AI为您的创作赋能。
              <span className="text-primary font-medium">文案生成</span>、
              <span className="text-purple-600 font-medium">内容创作</span>、
              <span className="text-pink-600 font-medium">智能对话</span>，
              一切皆有可能。
            </p>

            {/* 增强的按钮组 */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="mr-2 h-5 w-5" />
                立即体验
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 transform hover:scale-105"
              >
                查看演示
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* 增强的社交证明 */}
            <div className="flex items-center pt-6">
              <div className="flex -space-x-3">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-3 border-background bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden ring-2 ring-primary/20 transition-transform hover:scale-110"
                    style={{
                      background: `linear-gradient(${45 + i * 30}deg, hsl(var(--primary)), hsl(var(--chart-${(i % 5) + 1})))`,
                    }}
                  />
                ))}
              </div>
              <div className="ml-6 space-y-1">
                <p className="text-sm font-medium text-foreground">
                  加入{" "}
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    10,000+
                  </span>{" "}
                  位创作者
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span>4.9/5 用户评分</span>
                </div>
              </div>
            </div>
          </div>

          {/* 增强的演示区域 */}
          <div
            className={cn(
              "relative rounded-2xl border backdrop-blur-sm bg-gradient-to-br from-background/50 to-background/30 shadow-2xl overflow-hidden transition-all duration-1000 delay-500 transform hover:scale-105",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
            <div className="relative aspect-video bg-gradient-to-br from-card/80 to-card/60 rounded-2xl p-3 m-3 shadow-inner">
              <div className="h-full w-full rounded-xl bg-card/90 p-8 shadow-lg backdrop-blur-sm">
                <div className="flex flex-col space-y-6 h-full">
                  {/* 增强的窗口控制按钮 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500 animate-pulse delay-100"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse delay-200"></div>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      TazeAI v2.0
                    </div>
                  </div>

                  {/* AI思考动画 */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="space-y-6 text-center">
                      <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 animate-pulse">
                        <Sparkles className="w-10 h-10 text-primary animate-spin" />
                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-lg font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                          AI正在创作中...
                        </p>
                        <div className="flex justify-center space-x-2">
                          <span className="w-3 h-3 bg-primary rounded-full animate-bounce"></span>
                          <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></span>
                          <span className="w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200"></span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          正在分析您的需求并生成内容
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

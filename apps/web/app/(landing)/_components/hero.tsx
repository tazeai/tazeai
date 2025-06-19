'use client';

import { Button } from '@tazeai/ui/components/button';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Star,
  Zap,
} from '@tazeai/ui/components/icons';
import { cn } from '@tazeai/ui/lib/utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const fullText = '创意无限，智能对话';

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
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-20 md:py-32">
      {/* 增强的动态背景效果 */}
      <div className="-z-10 absolute inset-0 overflow-hidden">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />

        {/* 动态光球 */}
        <div className="-translate-y-1/4 absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/4 animate-pulse rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-[120px]" />
        <div className="-translate-x-1/4 absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/4 animate-pulse rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-[100px] delay-700" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[400px] w-[400px] animate-pulse rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-[80px] delay-1000" />

        {/* 鼠标跟随光效 */}
        <div
          className="pointer-events-none absolute h-[300px] w-[300px] rounded-full bg-gradient-to-r from-primary/20 to-transparent blur-[60px] transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
          }}
        />

        {/* 浮动粒子 */}
        {[...Array(20)].map((_, i) => (
          <div
            className="absolute h-1 w-1 animate-pulse rounded-full bg-primary/30"
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className={cn(
              'space-y-8 transition-all delay-300 duration-1000',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            )}
          >
            {/* 增强的标签 */}
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 py-2 font-medium text-sm backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4 animate-pulse text-primary" />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                AI驱动的新一代对话体验
              </span>
              <Star className="ml-2 h-3 w-3 animate-spin text-yellow-500" />
            </div>

            {/* 增强的标题 */}
            <h1 className="font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
                {text}
              </span>
              <span className="ml-1 inline-block h-12 w-[3px] animate-pulse bg-gradient-to-b from-primary to-purple-600" />
              <span className="mt-4 block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                智能创作的未来已来
              </span>
            </h1>

            {/* 增强的描述 */}
            <p className="max-w-[600px] text-muted-foreground text-xl leading-relaxed md:text-2xl">
              突破传统界限，让AI为您的创作赋能。
              <span className="font-medium text-primary">文案生成</span>、
              <span className="font-medium text-purple-600">内容创作</span>、
              <span className="font-medium text-pink-600">智能对话</span>，
              一切皆有可能。
            </p>

            {/* 增强的按钮组 */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <Button
                className="group transform bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-primary/90 hover:to-purple-600/90 hover:shadow-xl"
                size="lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                立即体验
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                className="group transform border-2 transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-primary/5"
                size="lg"
                variant="outline"
              >
                查看演示
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* 增强的社交证明 */}
            <div className="flex items-center pt-6">
              <div className="-space-x-3 flex">
                {[...Array(5)].map((_, i) => (
                  <div
                    className="h-10 w-10 overflow-hidden rounded-full border-3 border-background bg-gradient-to-br from-primary/20 to-purple-500/20 ring-2 ring-primary/20 transition-transform hover:scale-110"
                    key={i}
                    style={{
                      background: `linear-gradient(${45 + i * 30}deg, hsl(var(--primary)), hsl(var(--chart-${(i % 5) + 1})))`,
                    }}
                  />
                ))}
              </div>
              <div className="ml-6 space-y-1">
                <p className="font-medium text-foreground text-sm">
                  加入{' '}
                  <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text font-bold text-2xl text-transparent">
                    10,000+
                  </span>{' '}
                  位创作者
                </p>
                <div className="flex items-center text-muted-foreground text-sm">
                  <div className="mr-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                        key={i}
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
              'relative transform overflow-hidden rounded-2xl border bg-gradient-to-br from-background/50 to-background/30 shadow-2xl backdrop-blur-sm transition-all delay-500 duration-1000 hover:scale-105',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5" />
            <div className="relative m-3 aspect-video rounded-2xl bg-gradient-to-br from-card/80 to-card/60 p-3 shadow-inner">
              <div className="h-full w-full rounded-xl bg-card/90 p-8 shadow-lg backdrop-blur-sm">
                <div className="flex h-full flex-col space-y-6">
                  {/* 增强的窗口控制按钮 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                      <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-500 delay-100" />
                      <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 delay-200" />
                    </div>
                    <div className="font-mono text-muted-foreground text-xs">
                      TazeAI v2.0
                    </div>
                  </div>

                  {/* AI思考动画 */}
                  <div className="flex flex-1 items-center justify-center">
                    <div className="space-y-6 text-center">
                      <div className="relative inline-flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20">
                        <Sparkles className="h-10 w-10 animate-spin text-primary" />
                        <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/30" />
                      </div>
                      <div className="space-y-3">
                        <p className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text font-medium text-lg text-transparent">
                          AI正在创作中...
                        </p>
                        <div className="flex justify-center space-x-2">
                          <span className="h-3 w-3 animate-bounce rounded-full bg-primary" />
                          <span className="h-3 w-3 animate-bounce rounded-full bg-purple-500 delay-100" />
                          <span className="h-3 w-3 animate-bounce rounded-full bg-pink-500 delay-200" />
                        </div>
                        <div className="text-muted-foreground text-sm">
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

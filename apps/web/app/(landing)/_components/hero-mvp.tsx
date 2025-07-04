'use client';

import { Button } from '@tazeai/ui/components/button';
import {
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Zap,
} from '@tazeai/ui/components/icons';
import { cn } from '@tazeai/ui/lib/utils';
import { useEffect, useState } from 'react';

const HeroMVP = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState('');
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const fullText = 'AI对话助手';

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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-20 md:py-32">
      {/* 简化的背景效果 */}
      <div className="-z-10 absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-background" />

        {/* 简化的光效 */}
        <div
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-[40px] transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className={cn(
              'space-y-8 transition-all delay-300 duration-1000',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            )}
          >
            {/* 简化的标签 */}
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-medium text-sm">
              <MessageCircle className="mr-2 h-4 w-4 text-primary" />
              <span className="text-primary">基于LangChain的AI对话</span>
            </div>

            {/* 简化的标题 */}
            <h1 className="font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {text}
              </span>
              <span className="ml-1 inline-block h-12 w-[3px] animate-pulse bg-primary" />
              <span className="mt-4 block text-muted-foreground text-2xl font-normal md:text-3xl">
                支持OpenAI和DeepSeek模型
              </span>
            </h1>

            {/* 务实的描述 */}
            <p className="max-w-[600px] text-muted-foreground text-xl leading-relaxed">
              通过LangChain集成多个AI模型，提供流式对话体验。
              支持模型切换，实时响应。
            </p>

            {/* 简化的按钮组 */}
            <div className="flex flex-col gap-4 pt-6 sm:flex-row">
              <Button
                className="group bg-primary hover:bg-primary/90"
                size="lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                开始对话
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button className="group" size="lg" variant="outline">
                查看API文档
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* 真实的技术栈信息 */}
            <div className="flex items-center gap-6 pt-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>LangChain.js</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>OpenAI API</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>DeepSeek API</span>
              </div>
            </div>
          </div>

          {/* 简化的演示区域 */}
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl border bg-card shadow-lg transition-all delay-500 duration-1000',
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            )}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="font-mono text-muted-foreground text-xs">
                  TazeAI Chat
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-3">
                  <p className="text-sm">用户: 请介绍一下人工智能的发展历程</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3">
                  <p className="text-sm">AI: 人工智能的发展可以追溯到...</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                    <span>正在生成中...</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>模型: DeepSeek-R1</span>
                <span>流式响应</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroMVP;

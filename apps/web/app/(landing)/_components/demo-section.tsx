'use client';

import { Button } from '@tazeai/ui/components/button';
import { Send, Sparkles } from '@tazeai/ui/components/icons';
import { Input } from '@tazeai/ui/components/input';
import { useInView } from '@tazeai/ui/hooks/use-in-view';
import { cn } from '@tazeai/ui/lib/utils';
import { useRef, useState } from 'react';

const DemoSection = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // 模拟AI响应延迟
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt('');
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden py-20" ref={ref}>
      <div className="-z-10 absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 space-y-4 text-center">
          <h2
            className={cn(
              'font-bold text-3xl tracking-tight transition-all duration-700 sm:text-4xl md:text-5xl',
              isInView
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            )}
          >
            体验AI的魔力
          </h2>
          <p
            className={cn(
              'mx-auto max-w-[700px] text-lg text-muted-foreground transition-all delay-100 duration-700',
              isInView
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            )}
          >
            输入任何提示，让AI展示创作的无限可能
          </p>
        </div>

        <div
          className={cn(
            'mx-auto max-w-3xl rounded-2xl border bg-background/80 p-8 shadow-lg backdrop-blur-sm transition-all delay-200 duration-700',
            isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          )}
        >
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                className="py-6 pr-32 text-lg"
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="输入您想要创作的内容..."
                value={prompt}
              />
              <Button
                className="absolute top-2 right-2 bottom-2"
                disabled={!prompt.trim() || isGenerating}
                type="submit"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    开始创作
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">AI助手</div>
                  <div className="text-muted-foreground text-sm">
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <span>思考中</span>
                        <span className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-primary delay-100" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-primary delay-200" />
                        </span>
                      </div>
                    ) : (
                      '我可以帮您创作任何内容，从文案到故事，从诗歌到代码。'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;

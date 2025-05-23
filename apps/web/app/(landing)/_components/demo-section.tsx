"use client";

import { useState, useRef } from "react";
import { Button } from "@tazeai/ui/components/button";
import { Input } from "@tazeai/ui/components/input";
import { Sparkles, Send } from "lucide-react";
import { cn } from "@tazeai/ui/lib/utils";
import { useInView } from "@tazeai/ui/hooks/use-in-view";

const DemoSection = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // 模拟AI响应延迟
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt("");
    }, 2000);
  };

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2
            className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl transition-all duration-700",
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
            )}
          >
            体验AI的魔力
          </h2>
          <p
            className={cn(
              "mx-auto max-w-[700px] text-lg text-muted-foreground transition-all duration-700 delay-100",
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
            )}
          >
            输入任何提示，让AI展示创作的无限可能
          </p>
        </div>

        <div
          className={cn(
            "max-w-3xl mx-auto rounded-2xl border bg-background/80 backdrop-blur-sm p-8 shadow-lg transition-all duration-700 delay-200",
            isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
          )}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="pr-32 py-6 text-lg"
                placeholder="输入您想要创作的内容..."
              />
              <Button
                type="submit"
                className="absolute right-2 top-2 bottom-2"
                disabled={!prompt.trim() || isGenerating}
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
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">AI助手</div>
                  <div className="text-sm text-muted-foreground">
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <span>思考中</span>
                        <span className="flex gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                        </span>
                      </div>
                    ) : (
                      "我可以帮您创作任何内容，从文案到故事，从诗歌到代码。"
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

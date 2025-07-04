'use client';

import { Button } from '@tazeai/ui/components/button';
import { Card } from '@tazeai/ui/components/card';
import { Input } from '@tazeai/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tazeai/ui/components/select';
import { MessageCircle, Send, Cpu, Loader2 } from '@tazeai/ui/components/icons';
import { useState } from 'react';
import ScrollReveal from './scroll-reveal';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const AIDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState<'openai' | 'deepseek'>('deepseek');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/v1/chat/completions?type=${provider}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model:
              provider === 'openai'
                ? 'gpt-3.5-turbo'
                : 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
            messages: [...messages, userMessage].map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            stream: true,
          }),
        }
      );

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                assistantMessage += data.content;
                setMessages((prev) =>
                  prev.map((msg, index) =>
                    index === prev.length - 1
                      ? { ...msg, content: assistantMessage }
                      : msg
                  )
                );
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '抱歉，请求失败。请检查网络连接或稍后再试。',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <ScrollReveal direction="up" duration={1000}>
          <div className="mb-8 space-y-4 text-center">
            <h2 className="font-bold text-2xl tracking-tight sm:text-3xl">
              AI对话演示
            </h2>
            <p className="text-muted-foreground">
              体验真实的AI对话能力，支持模型切换
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" duration={1000} delay={200}>
          <Card className="p-6">
            {/* 模型选择 */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">模型:</span>
              </div>
              <Select
                value={provider}
                onValueChange={(value: 'openai' | 'deepseek') =>
                  setProvider(value)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deepseek">DeepSeek R1</SelectItem>
                  <SelectItem value="openai">OpenAI GPT-3.5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 对话区域 */}
            <div className="mb-4 min-h-[300px] max-h-[400px] overflow-y-auto rounded-lg border bg-background p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                    <p>开始对话吧！</p>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="text-xs font-medium mb-1 opacity-70">
                        {message.role === 'user' ? '你' : `AI (${provider})`}
                      </div>
                      <div className="text-sm whitespace-pre-wrap">
                        {message.content ||
                          (isLoading && index === messages.length - 1
                            ? '正在思考...'
                            : '')}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 输入区域 */}
            <div className="flex gap-2">
              <Input
                placeholder="输入你的问题..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="sm"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* 状态信息 */}
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                当前模型:{' '}
                {provider === 'openai' ? 'OpenAI GPT-3.5' : 'DeepSeek R1'}
              </span>
              <span>流式响应: {isLoading ? '进行中...' : '就绪'}</span>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AIDemo;

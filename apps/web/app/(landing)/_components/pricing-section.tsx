"use client";

import { Check } from "@tazeai/ui/components/icons";
import { Button } from "@tazeai/ui/components/button";
import { cn } from "@tazeai/ui/lib/utils";
import { useRef } from "react";
import { useInView } from "@tazeai/ui/hooks/use-in-view";

const PricingSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const plans = [
    {
      name: "个人版",
      price: "99",
      description: "适合个人创作者和自由职业者",
      features: [
        "每日100次AI对话",
        "基础文本生成",
        "3个AI角色选择",
        "标准客户支持",
      ],
    },
    {
      name: "专业版",
      price: "199",
      description: "适合专业团队和小型企业",
      features: [
        "无限AI对话",
        "高级文本生成",
        "10个AI角色选择",
        "优先客户支持",
        "自定义AI提示词",
        "团队协作功能",
      ],
      popular: true,
    },
    {
      name: "企业版",
      price: "联系我们",
      description: "适合大型企业和机构",
      features: [
        "完全无限制使用",
        "专属AI模型定制",
        "无限AI角色创建",
        "24/7专属支持",
        "API集成支持",
        "企业级数据安全",
        "专属客户经理",
      ],
    },
  ];

  return (
    <section id="pricing" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-primary/5 [mask-image:radial-gradient(transparent_70%,white)]" />

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
            选择适合您的方案
          </h2>
          <p
            className={cn(
              "mx-auto max-w-[700px] text-lg text-muted-foreground transition-all duration-700 delay-100",
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
            )}
          >
            灵活的价格方案，满足不同规模团队的需求
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border bg-background p-8 shadow-lg transition-all duration-700",
                plan.popular && "border-primary/50 shadow-primary/10",
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0",
              )}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  最受欢迎
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="text-primary">
                  <span className="text-4xl font-bold">¥{plan.price}</span>
                  {plan.price !== "联系我们" && (
                    <span className="text-muted-foreground">/月</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-8 space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  开始使用
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

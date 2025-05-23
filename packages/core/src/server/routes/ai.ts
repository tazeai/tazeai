import { Hono } from "hono";
import type { Env } from "../types";
import { type ProviderType, LangChain } from "@tazeai/ai";
import { streamSSE, streamText } from "hono/streaming";

const app = new Hono<Env>();

app.get("/", async (c) => {
  const type = c.req.query("type") || "openai";
  try {
    const manager = new LangChain();
    return streamSSE(c, async (stream) => {
      const prompt = await manager.prompt(
        "请用简洁的语言描述一下 {topic} 的意义。",
        { topic: "人工智能" },
      );
      const model = manager.getProvider(
        type as ProviderType,
        "deepseek-ai/DeepSeek-R1-Distill-Qwen-7B",
      );
      const result = await model!.stream(prompt);
      for await (const chunk of result) {
        console.log("chunk", chunk);
        await stream.writeSSE({
          data: JSON.stringify({
            type: "data",
            data: chunk.content,
          }),
        });
      }
    });
    // return c.json({
    //   result,
    // });
  } catch (error: unknown) {
    return c.json({
      error: (error as Error).message,
    });
  }
});

export default app;

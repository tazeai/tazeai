// import { OpenAI } from "langchain/llms/openai"; // 导入 OpenAI
// import { PromptTemplate } from "langchain/prompts"; // 导入 PromptTemplate
// import { LLMChain } from "langchain/chains"; // 导入 LLMChain
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { ChatDeepSeek } from '@langchain/deepseek';
import { envs } from './envs';

const env = envs();

export enum ProviderType {
  OPENAI = 'openai',
  DEEPSEEK = 'deepseek',
}

// 异步执行链条，并打印生成结果
async function main(type: ProviderType | null = null) {
  try {
    // 定义 Prompt 模板
    const prompt = ChatPromptTemplate.fromTemplate('请用简洁的语言描述一下 {topic} 的意义。');
    if (type === ProviderType.OPENAI) {
      const apiKey = env.OPENAI_API_KEY;
      const llm = new ChatDeepSeek({
        modelName: 'gpt-4o-mini',
        apiKey,
        configuration: {
          apiKey,
          baseURL: env.OPENAI_PROXY_URL,
        },
        temperature: 0.7, // 控制生成的随机性
      });

      const chain = prompt.pipe(llm);
      const result = await chain.invoke({ topic: '人工智能' }); // 传入 topic 参数
      console.log('生成结果：', result.text); // 打印结果
    } else if (type === ProviderType.DEEPSEEK) {
      const apiKey = env.DEEPSEEK_API_KEY;
      const llm = new ChatDeepSeek({
        modelName: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
        apiKey,
        configuration: {
          apiKey,
          baseURL: env.DEEPSEEK_PROXY_URL,
        },
        temperature: 0.7, // 控制生成的随机性
      });

      const chain = prompt.pipe(llm);
      const result = await chain.invoke({ topic: '人工智能' }); // 传入 topic 参数
      console.log('生成结果：', result.text); // 打印结果
      return result;
    }
    return null;
  } catch (error) {
    console.error('处理请求时出错：', error);
    return null;
  }
}

export default main;

import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { ChatDeepSeek } from '@langchain/deepseek';
import { envs } from './envs';

const env = envs();

export enum ProviderType {
  OPENAI = 'openai',
  DEEPSEEK = 'deepseek',
}

export class TazeAIProviderManager {
  constructor() {
    //
  }

  getProvider(type: ProviderType) {
    if (type === ProviderType.OPENAI) {
      const apiKey = env.OPENAI_API_KEY;
      const llm = new ChatOpenAI({
        modelName: 'gpt-4o-mini',
        apiKey,
        configuration: {
          apiKey,
          baseURL: env.OPENAI_PROXY_URL,
        },
        temperature: 0.7,
      });
      return llm;
    } else if (type === ProviderType.DEEPSEEK) {
      const apiKey = env.DEEPSEEK_API_KEY;
      const llm = new ChatDeepSeek({
        modelName: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
        apiKey,
        configuration: {
          apiKey,
          baseURL: env.DEEPSEEK_PROXY_URL,
        },
        temperature: 0.7,
      });
      return llm;
    }
    return null;
  }

  async generate(type: ProviderType, prompt: string, variables: Record<string, string>) {
    const llm = this.getProvider(type);
    if (!llm) {
      throw new Error('Provider not found');
    }
    const promptTemplate = ChatPromptTemplate.fromTemplate(prompt);
    const chain = promptTemplate.pipe(llm);
    const result = await chain.invoke(variables);
    return result;
  }
}

// 异步执行链条，并打印生成结果
async function main(type: ProviderType | null = null) {
  try {
    const manager = new TazeAIProviderManager();
    const result = await manager.generate(type, '请用简洁的语言描述一下 {topic} 的意义。', { topic: '人工智能' });
    console.log('生成结果：', result.text);
    return result;
  } catch (error) {
    console.error('处理请求时出错：', error);
    return null;
  }
}

export default main;

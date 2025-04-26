import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { ChatDeepSeek } from '@langchain/deepseek';
import { UpstashRedisCache } from '@langchain/community/caches/upstash_redis';
import { createRedis } from '@tazeai/cache';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { envs } from './envs';

const env = envs();

export enum ProviderType {
  OPENAI = 'openai',
  DEEPSEEK = 'deepseek',
}

export class ProviderManager {
  private cache: UpstashRedisCache;
  constructor() {
    this.cache = new UpstashRedisCache({
      client: createRedis(),
    });
  }

  getProvider(type: ProviderType, modelName: string) {
    if (type === ProviderType.OPENAI) {
      const apiKey = env.OPENAI_API_KEY;
      console.log('apiKey', apiKey);
      const llm = new ChatOpenAI({
        modelName,
        apiKey,
        configuration: {
          apiKey,
          baseURL: env.OPENAI_PROXY_URL,
        },
        temperature: 0.7,
        streaming: true,
        cache: this.cache,
      });
      return llm;
    } else if (type === ProviderType.DEEPSEEK) {
      const apiKey = env.DEEPSEEK_API_KEY;
      console.log('apiKey', apiKey);
      const llm = new ChatDeepSeek({
        modelName,
        apiKey,
        configuration: {
          apiKey,
          baseURL: env.DEEPSEEK_PROXY_URL,
        },
        temperature: 0.7,
        streaming: true,
        cache: this.cache,
      });
      return llm;
    }
    return null;
  }

  prompt(prompt: string, variables: Record<string, string>) {
    const promptTemplate = ChatPromptTemplate.fromTemplate(prompt);
    // return promptTemplate.pipe(this.getProvider(ProviderType.OPENAI));
    return promptTemplate.invoke(variables);
  }
}

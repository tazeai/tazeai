import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { ChatDeepSeek } from '@langchain/deepseek';
import { envs } from './envs';

const env = envs();

export enum ProviderType {
  OPENAI = 'openai',
  DEEPSEEK = 'deepseek',
}

export class ProviderManager {
  constructor() {
    //
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

  async generate(type: ProviderType, prompt: string, variables: Record<string, string>) {
    const llm = this.getProvider(type);
    if (!llm) {
      throw new Error('Provider not found');
    }
    const promptTemplate = ChatPromptTemplate.fromTemplate(prompt);
    const chain = promptTemplate.pipe(llm);
    const result = await chain.invoke(variables);
    console.log('result', result);
    return result;
  }
}

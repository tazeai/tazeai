import { z } from 'zod';

/**
 * Environment validation utilities
 */
export class EnvValidationError extends Error {
  constructor(message: string, public readonly missingVars: string[]) {
    super(message);
    this.name = 'EnvValidationError';
  }
}

/**
 * Validates that required environment variables are present
 */
export function validateRequiredEnvs(
  requiredVars: string[],
  env: Record<string, string | undefined> = process.env
): void {
  const missing = requiredVars.filter((key) => !env[key]);
  
  if (missing.length > 0) {
    throw new EnvValidationError(
      `Missing required environment variables: ${missing.join(', ')}`,
      missing
    );
  }
}

/**
 * Creates a schema for environment validation
 */
export function createEnvSchema() {
  return {
    // Database
    DATABASE_URL: z.string().url().optional(),
    
    // Redis
    REDIS_URL: z.string().url().optional(),
    
    // Auth
    AUTH_SECRET: z.string().min(32).optional(),
    AUTH_GOOGLE_ID: z.string().optional(),
    AUTH_GOOGLE_SECRET: z.string().optional(),
    AUTH_GITHUB_ID: z.string().optional(),
    AUTH_GITHUB_SECRET: z.string().optional(),
    AUTH_RESEND_KEY: z.string().optional(),
    
    // Analytics
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z.string().optional(),
    
    // Payment
    STRIPE_PUBLIC_KEY: z.string().optional(),
    STRIPE_PRIVATE_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    
    // AI
    OPENAI_API_KEY: z.string().optional(),
    DEEPSEEK_API_KEY: z.string().optional(),
    
    // App
    NEXT_PUBLIC_WEB_URL: z.string().url().default('http://localhost:3000'),
    NEXT_PUBLIC_PROJECT_NAME: z.string().default('TazeAI'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  };
}

/**
 * Validates environment variables against a schema
 */
export function validateEnvSchema<T extends Record<string, z.ZodType>>(
  schema: T,
  env: Record<string, string | undefined> = process.env
): z.infer<z.ZodObject<T>> {
  const envSchema = z.object(schema);
  
  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.errors
        .filter((e) => e.code === 'invalid_type' && e.received === 'undefined')
        .map((e) => e.path.join('.'));
      
      throw new EnvValidationError(
        `Environment validation failed: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
        missing
      );
    }
    throw error;
  }
}

/**
 * Checks if we're in a specific environment
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

/**
 * Gets an environment variable with a fallback
 */
export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  if (value === undefined && fallback === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value ?? fallback!;
}

/**
 * Gets an environment variable as a number
 */
export function getEnvNumber(key: string, fallback?: number): number {
  const value = process.env[key];
  if (value === undefined) {
    if (fallback === undefined) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return fallback;
  }
  
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} is not a valid number: ${value}`);
  }
  
  return parsed;
}

/**
 * Gets an environment variable as a boolean
 */
export function getEnvBoolean(key: string, fallback?: boolean): boolean {
  const value = process.env[key];
  if (value === undefined) {
    if (fallback === undefined) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return fallback;
  }
  
  return value.toLowerCase() === 'true' || value === '1';
}
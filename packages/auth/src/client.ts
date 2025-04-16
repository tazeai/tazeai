import { createAuthClient } from 'better-auth/react';
import {
  magicLinkClient,
  organizationClient,
  apiKeyClient,
  adminClient,
  emailOTPClient,
} from 'better-auth/client/plugins';

import { envs } from './envs';

// Environment variables
const env = envs();

// Create the client
export const client = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [organizationClient(), magicLinkClient(), apiKeyClient(), adminClient(), emailOTPClient()],
});

// Export the client
export const { signIn, signUp, useSession, signOut, admin, emailOtp } = client;

// Export the types
export * from './types';
export * from 'better-auth/react';

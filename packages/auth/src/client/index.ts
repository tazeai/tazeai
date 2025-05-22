import {
  adminClient,
  apiKeyClient,
  emailOTPClient,
  magicLinkClient,
  organizationClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { envs } from '../envs';

// Environment variables
const env = envs();

// Create the client
export const client = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [
    organizationClient(),
    magicLinkClient(),
    apiKeyClient(),
    adminClient(),
    emailOTPClient(),
  ],
});

// Export the client
export const { signIn, signUp, useSession, signOut, admin, emailOtp } = client;

// Export the types
export * from 'better-auth/react';
export * from '../types';
export * from './socials';

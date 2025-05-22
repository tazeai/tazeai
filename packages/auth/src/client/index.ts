import {
  adminClient,
  apiKeyClient,
  emailOTPClient,
  magicLinkClient,
  organizationClient,
  oneTapClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import { envs } from '../envs';

// Environment variables
const env = envs();

const plugins = [
  organizationClient(),
  magicLinkClient(),
  apiKeyClient(),
  adminClient(),
  emailOTPClient(),
  oneTapClient({
    clientId: env.NEXT_PUBLIC_AUTH_GOOGLE_ID!,
  }),
];

// Create the client
export const client = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins,
});

// Export the client
export const { signIn, signUp, useSession, signOut } = client;

// Export the types
export * from 'better-auth/react';
export * from '../types';
export * from './socials';

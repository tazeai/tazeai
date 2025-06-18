import { getSessionCookie } from 'better-auth/cookies';

/**
 * Check if the session cookie is present in the request.
 * @param request - The request to check.
 * @returns True if the session cookie is present, false otherwise.
 */
export const checkSessionCookie = (request: Request) => {
  const sessionCookie = getSessionCookie(request);
  // TODO: Check if the session cookie is valid
  return !!sessionCookie;
};

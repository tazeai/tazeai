import type { ReactNode } from "react";
import { GoogleAnalytics } from "./google";
import { envs } from "./envs";
import { PostHogProvider } from "./posthog/client";
import { VercelAnalytics } from "./vercel";

type AnalyticsProviderProps = {
  readonly children: ReactNode;
};

const { NEXT_PUBLIC_GA_MEASUREMENT_ID } = envs();

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => (
  <PostHogProvider>
    {children}
    {process.env.NODE_ENV === "production" && <VercelAnalytics />}
    {NEXT_PUBLIC_GA_MEASUREMENT_ID && (
      <GoogleAnalytics gaId={NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    )}
  </PostHogProvider>
);

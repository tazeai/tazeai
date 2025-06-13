"use client";

import posthog from "posthog-js";
import { PostHogProvider as PostHogProviderRaw } from "posthog-js/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { envs } from "../envs";

type PostHogProviderProps = {
  readonly children: ReactNode;
};

const initPostHog = () => {
  const env = envs();
  if (
    typeof window === "undefined" ||
    !env.NEXT_PUBLIC_POSTHOG_KEY ||
    process.env.NODE_ENV !== "production"
  )
    return;

  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    disable_session_recording: true,
    autocapture: false,
    capture_pageview: false,
    session_recording: {
      blockSelector: "iframe",
    },
  });
};

export const PostHogProvider = (props: PostHogProviderProps) => {
  useEffect(() => {
    initPostHog();
  }, []);

  return <PostHogProviderRaw client={posthog} {...props} />;
};

export { usePostHog as useAnalytics } from "posthog-js/react";

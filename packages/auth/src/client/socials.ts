import { envs } from "../envs";

const env = envs();

type SocialProvider = {
  provider: "github" | "google";
};

const socialProviders: SocialProvider[] = [];

if (env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED) {
  socialProviders.push({
    provider: "github",
  });
}

if (env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED) {
  socialProviders.push({
    provider: "google",
  });
}

export { socialProviders };

'use client';

import { socialProviders } from '@tazeai/auth/client';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Button } from '@tazeai/ui/components/button';

type SocialProvider = 'github' | 'google';

type SocialProps = {
  isLoading: boolean;
  onClick: (provider: SocialProvider) => void;
};

export function Social({ isLoading, onClick }: SocialProps) {
  const SocialsConfig = {
    github: {
      label: 'Sign up with Github',
      icon: <FaGithub className="size-4" />,
    },
    google: {
      label: 'Sign up with Google',
      icon: <FaGoogle className="size-4" />,
    },
  };

  const socials: {
    provider: SocialProvider;
    icon: React.ReactNode;
    label: string;
  }[] = socialProviders.map(({ provider }) => ({
    provider,
    icon: SocialsConfig[provider].icon,
    label: SocialsConfig[provider].label,
  }));

  return socials?.length ? (
    <>
      <div className="flex flex-col gap-4">
        {socials.map((social) => (
          <Button
            key={social.provider}
            variant="outline"
            className="w-full gap-2"
            disabled={isLoading}
            onClick={() => onClick(social.provider)}
          >
            {social.icon}
            {social.label}
          </Button>
        ))}
      </div>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </>
  ) : null;
}

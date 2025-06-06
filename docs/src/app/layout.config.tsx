import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <GitHubLogoIcon className="w-4 h-4" />
        <span>TazeAI Docs</span>
      </div>
    ),
  },
  links: [
    {
      type: "main",
      text: "GitHub",
      url: "https://github.com/tazeai/tazeai",
      external: true,
      icon: <GitHubLogoIcon className="w-4 h-4" />,
    },
  ],
};

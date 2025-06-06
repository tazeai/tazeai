"use client";

import { Button } from "@tazeai/ui/components/button";
import { GitHubLogoIcon as GitHubLogo } from "@radix-ui/react-icons";

export function EditGitHub({ filePath }: { filePath: string }) {
  return (
    <Button
      onClick={() => {
        window.open(
          `https://github.com/tazeai/tazeai/blob/main/docs/content/docs/${filePath}`,
          "_blank",
        );
      }}
      variant="outline"
      className="w-fit border rounded-xl p-2 font-medium text-sm text-fd-secondary-foreground bg-fd-secondary-background hover:bg-fd-secondary-background/80 mt-8 inline-flex items-center gap-2"
    >
      <GitHubLogo className="w-4 h-4" />
      Edit on GitHub
    </Button>
  );
}

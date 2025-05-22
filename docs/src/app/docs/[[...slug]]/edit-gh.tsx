"use client";

import { GitHubLogoIcon as GitHubLogo } from "@radix-ui/react-icons";
import { Button } from "@tazeai/ui/components/button";

export function EditGitHub({
  filePath,
}: {
  filePath: string;
}) {
  return (
    <Button
      className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border bg-fd-secondary-background p-2 font-medium text-fd-secondary-foreground text-sm hover:bg-fd-secondary-background/80"
      onClick={() => {
        window.open(
          `https://github.com/tazeai/tazeai/blob/main/docs/content/docs/${filePath}`,
          "_blank",
        );
      }}
      variant="outline"
    >
      <GitHubLogo className="h-4 w-4" />
      Edit on GitHub
    </Button>
  );
}

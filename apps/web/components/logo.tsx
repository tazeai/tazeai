import Image, { type ImageProps } from "next/image";

export const Logo = (props: Omit<ImageProps, "src" | "alt">) => {
  return (
    <Image
      alt="TazeAI"
      className="h-6 w-6 rounded-full bg-primary"
      height={24}
      src="/images/logo.png"
      width={24}
      {...props}
    />
  );
};

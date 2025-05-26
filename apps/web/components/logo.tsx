import Image, { ImageProps } from "next/image";

export const Logo = (props: Omit<ImageProps, "src" | "alt">) => {
  return (
    <Image
      src="/images/logo.png"
      alt="TazeAI"
      className="h-6 w-6 bg-primary rounded-full"
      width={24}
      height={24}
      {...props}
    />
  );
};

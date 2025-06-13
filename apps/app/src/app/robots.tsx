import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    host: "https://tazeai.com",
    rules: [
      {
        allow: ["/"],
        disallow: ["/api/*"],
        userAgent: "*",
      },
    ],
  };
};

export default robots;

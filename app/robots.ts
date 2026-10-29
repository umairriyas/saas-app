import type { MetadataRoute } from "next";

// Place at: app/robots.ts  (serves /robots.txt)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/companions/",
          "/my-journey",
          "/sign-in",
          "/sign-up",
          "/api/",
        ],
      },
    ],
    sitemap: "https://www.dixi.edu.lk/sitemap.xml",
  };
}
import type { MetadataRoute } from "next";

// Place at: app/sitemap.ts  (serves /sitemap.xml)
// Only public, indexable pages. /companions/*, /my-journey and /sign-in
// are login-gated and intentionally excluded.
const BASE_URL = "https://www.dixi.edu.lk";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/` },
    { url: `${BASE_URL}/about-us` },
    { url: `${BASE_URL}/contact` },
  ];
}
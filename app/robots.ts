import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // TODO: switch to https://issaahmed.com/sitemap.xml once custom domain is wired
    sitemap: "https://issaahmed-com.vercel.app/sitemap.xml",
  };
}

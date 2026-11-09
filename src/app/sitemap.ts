import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ""); if (!base) return []; return ["", "/privacy-policy", "/legal-notice"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: path ? 0.4 : 1 })); }

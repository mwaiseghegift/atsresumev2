const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atsresumev2.vercel.app";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/builder"],
        disallow: ["/dashboard", "/login", "/register", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

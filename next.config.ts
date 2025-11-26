import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repo = "birthday-project";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGitHubPages ? `/${repo}` : undefined,
  assetPrefix: isGitHubPages ? `/${repo}/` : undefined,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["nodemailer"],
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;

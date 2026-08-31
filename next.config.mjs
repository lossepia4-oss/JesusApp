/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/ask/holy-spirit",
        destination: "/ask/what-is-the-holy-spirit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

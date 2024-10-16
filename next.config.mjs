/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/signIn",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

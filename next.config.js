/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: "/",
        destination: "/movies",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
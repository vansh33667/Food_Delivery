/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'hi', 'gu'],
    defaultLocale: 'en',
  },
}

export default nextConfig

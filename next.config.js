/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // asyncWebAssembly: true
  webpack: function (config, options) {
		config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
		return config;
	},
  swcMinify: false
}

module.exports = nextConfig

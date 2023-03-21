const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
    });
    return config;
  },
};

module.exports = nextConfig;

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export',
  experimental: { esmExternals: 'loose' },
  webpack: (config, options) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: resolve(__dirname, 'node_modules/@shoelace-style/shoelace/dist/assets/'),
            to: resolve(__dirname, 'public/shoelace-assets/assets/')
          }
        ]
      })
    );
    return config;
  },
  images: {
    remotePatterns: [
          {
            protocol: 'http',                      // Specify the protocol
            hostname: 'localhost',  // Add the external hostname
            port: '3000',                                // Optional: Leave empty for default port
            pathname: '/**',       // Specify the path or use '**' to match all sub-paths
          },
    ],
  },
};

export default nextConfig;

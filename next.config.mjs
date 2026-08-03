  /** @type {import('next').NextConfig} */
  const nextConfig = {
    async redirects() {
      return [
        {
          source: '/services',
          destination: '/expertise',
          permanent: true,
        },
        {
          source: '/studio',
          destination: '/about',
          permanent: true,
        },
        {
          source: '/expertise/custom-cms-development',
          destination: '/expertise/custom-software-development',
          permanent: true,
        },
      ];
    },
    experimental: {
      viewTransition: true,
    },
    turbopack: {},
    webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    })
    return config
  },
    reactCompiler: true,
  };

  export default nextConfig;

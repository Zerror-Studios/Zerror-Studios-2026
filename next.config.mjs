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
          destination: '/expertise/software-and-tools',
          permanent: true,
        },
        // Service pages renamed to match their labels (October 2026)
        {
          source: '/expertise/website-development',
          destination: '/expertise/websites',
          permanent: true,
        },
        {
          source: '/expertise/e-commerce',
          destination: '/expertise/ecommerce',
          permanent: true,
        },
        {
          source: '/expertise/custom-software-development',
          destination: '/expertise/software-and-tools',
          permanent: true,
        },
        {
          source: '/expertise/branding-and-marketing',
          destination: '/expertise/branding-marketing-and-seo',
          permanent: true,
        },
        {
          source: '/work/:old(salmaan-khan-films|salmaan-khan|salman-khan-films)',
          destination: '/work/salman-khan',
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

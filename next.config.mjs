/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  const getBaseApiUrl = () => {
    if (isDev) return "http://localhost:3000/api";
    if (isStaging) return "http://localhost:3000/api";
    if (isProd) return "https://f1-coin-2-git-dev-cogitize-team.vercel.app/api";
  };
  const getExternalApiUrl = () => {
    if (isDev) return "https://api.localhost:3001/v2";
    if (isStaging) return "https://api.localhost:3001/v2";
    if (isProd) return "https://api.localhost:3001/v2";
  };

  const config = {
    env: {
      BRANCH_NAME: "dev",
      BRANCH_URL: "https://github.com/13crm/ACRM/tree/dev",
      NEXT_PUBLIC_SOCKET_URL: "https://q5v4lcxj-3001.euw.devtunnels.ms/",
      // NEXT_PUBLIC_SOCKET_URL: "https://api.ws.dev.mirror-reflection.com",
      NEXT_PUBLIC_API_URL: getBaseApiUrl(),
      NEXT_PUBLIC_EXTERNAL_API_URL: getExternalApiUrl(),
    },
    // output: "export",
    reactStrictMode: false,
    images: {
      unoptimized: true,
    },

    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //   madge("src", {
    //     tsConfig: "./tsconfig.json",
    //     webpackConfig: config,
    //     fileExtensions: ["js", "tsx", "ts"],
    //     layout: "dot",
    //     fontSize: "8px",
    //   })
    //     .then((res) => {
    //       console.log("Circular dependencies: ", res.circular());
    //       return res.image("./graph/dependency-graph-dot-v7.png");
    //     })
    //     .then((writtenImagePath) => {
    //       console.log("Image written to " + writtenImagePath);
    //     });

    //   // Important: return the modified config
    //   return config;
    // },
  };

  return withNextIntl(config);
};

export default config;

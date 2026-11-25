import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` writes the whole site to /out,
  // which can be uploaded to cPanel as-is or deployed to Vercel.
  output: "export",
  // /about -> /about/index.html, so clean URLs work on Apache without rewrites.
  trailingSlash: true,
  images: {
    // next/image's built-in optimiser needs a server; images are instead
    // resized to WebP at build time by next-image-export-optimizer.
    loader: "custom",
    imageSizes: [96, 256, 384],
    deviceSizes: [640, 828, 1080, 1440, 1920],
  },
  transpilePackages: ["next-image-export-optimizer"],
  env: {
    nextImageExportOptimizer_imageFolderPath: "public/media",
    nextImageExportOptimizer_exportFolderPath: "out",
    nextImageExportOptimizer_quality: "75",
    nextImageExportOptimizer_storePicturesInWEBP: "true",
    nextImageExportOptimizer_exportFolderName: "optimized",
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
    nextImageExportOptimizer_remoteImageCacheTTL: "0",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

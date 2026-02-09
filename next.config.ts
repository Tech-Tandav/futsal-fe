// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   allowedDevOrigins: ['http://192.168.1.185:3000'],
// };

// export default nextConfig;


import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.1.185:3000"],
  // 👇 THIS FIXES THE ERROR
  turbopack: {},
};

export default withPWA({
  dest: "public",
})(nextConfig);

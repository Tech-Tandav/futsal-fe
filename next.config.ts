import type { NextConfig } from "next";


const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav:true,
  aggressiveFrontEndNavCaching:true,
  reloadOnOnline:true,
  swcMinify:true,
  disable:false,
  workboxOptions:{
    disableDevLogs:true
  }
});

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['http://192.168.1.185:3000'],
  turbopack: {},
};

module.exports =   withPWA(nextConfig);

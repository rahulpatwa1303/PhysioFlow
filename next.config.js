/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(),'.vercel/env.production.local') });
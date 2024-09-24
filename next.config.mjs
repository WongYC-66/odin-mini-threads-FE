/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',   // // export as static sites html, disable when use dynamic (web hosting)
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'placekitten.com',
            port: '',
            pathname: '/50/50'
        }]
    }
}

module.exports = nextConfig

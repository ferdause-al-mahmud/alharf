/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://alharfbd.com',
    generateRobotsTxt: true,
    exclude: ['/api/**', '/dashboard', '/dashboard/**', '/login', '/register', '/profile', '/cart', '/orders', '/orders/**', '/checkout'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://alharfbd.com/api/sitemap.xml' // Point to the dynamic sitemap
        ],
    },
};

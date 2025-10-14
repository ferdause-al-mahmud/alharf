/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://classytouchbd.com',
    generateRobotsTxt: true,
    exclude: ['/api/**', '/dashboard', '/dashboard/**', '/login', '/register', '/profile', '/cart', '/orders', '/orders/**', '/checkout'],
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://classytouchbd.com/api/sitemap.xml' // Point to the dynamic sitemap
        ],
    },
};

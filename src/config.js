module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'token_secret!1qaz',
        accessAge: process.env.ACCESS_AGE || 5 * 5,
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret!1qaz',
        refreshAge: process.env.REFRESH_AGE || 180 * 60 * 60 * 24,
    }
}
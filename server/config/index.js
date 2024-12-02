const { SECRET } = require("../../server/config");

const configEnv = {
    development: {
        PORT: process.env.PORT || 8777,
        DB_CONNECTION_STRING: 'mongodb://localhost:27017/crystal-blog',
        COOKIE_TOKEN_NAME: 'X-Authorization',
        // SECRET: process.env.SECRET,
        SECRET: SECRET,
        ROUND_SALT: 9,
        CORS: {
            origin: ['http://localhost:5173'],
            credentials: true
        },
    },
    production: {
        PORT: process.env.PORT || 80,
        DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
        COOKIE_TOKEN_NAME: process.env.COOKIE_TOKEN_NAME,
        SECRET: process.env.SECRET,
        ROUND_SALT: 9,
        CORS: {
            origin: ['https://crystal-blog.onrender.com/'],
            credentials: true
        },
    }

};

module.exports = configEnv[process.env.NODE_ENV || 'development'];
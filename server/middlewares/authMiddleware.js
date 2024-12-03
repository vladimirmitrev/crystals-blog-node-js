const jwt = require('../lib/jsonwebtoken');
const { SECRET, COOKIE_TOKEN_NAME } = require('../config');

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies[COOKIE_TOKEN_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        res.locals.user = decodedToken;
        
        next();
    } catch (err) {
        res.clearCookie(COOKIE_TOKEN_NAME);
        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }

    next();
}
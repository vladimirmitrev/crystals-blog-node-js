const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const config = require('./index')
const router = require('./routes');
const { authMiddleware } = require('../middlewares/authMiddleware');

module.exports = (app) => {
    app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));
    app.use(cors(config.CORS));
    app.use(express.urlencoded({extended: true})); //or false
    app.use(express.json());
    app.use(cookieParser());
    app.use(authMiddleware);
    app.use(router);
}
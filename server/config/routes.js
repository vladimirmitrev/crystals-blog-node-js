const router = require('express').Router();

const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const crystalController = require('../controllers/crystalController');
const commentController = require('../controllers/commentController');

router.use(homeController);
router.use('/auth', authController);
router.use('/crystal', crystalController);
router.use('/comment', commentController);

module.exports = router;
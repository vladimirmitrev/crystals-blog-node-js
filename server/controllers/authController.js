const router = require('express').Router();
const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const { isAuth , isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const {COOKIE_TOKEN_NAME, SECRET} = require('../config');
const { userPayload } = require('../utils/userPayload')
const jwt = require('../lib/jsonwebtoken');


router.post('/register', async (req, res) => {
    const user = req.body;
    try {
        const createdUser = await authService.register(user);
        const accessToken = await generateToken(createdUser);
    
        res.cookie(COOKIE_TOKEN_NAME, accessToken);
        const userData = userPayload(createdUser);
        res.status(200).send({ userData, accessToken });
        // res.redirect('/');
  
      } catch (error) {
        // console.log(error.message);
        
        res.status(302).send({ message: error.message });
      } 
});

router.post('/login', async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  try {
      const user = await authService.login(email, password);
      const accessToken = await generateToken(user);

      res.cookie(COOKIE_TOKEN_NAME, accessToken, { httpOnly: true });

      const userData = userPayload(user);

      res.status(200).send({ userData, accessToken });

  } catch (error) {
      res.status(404).send({ message: error.message });
  }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_TOKEN_NAME);
    res.status(200).send({ message: 'Successfully logged out' });
});

function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  }

  return jwt.sign(payload, SECRET, {expiresIn: '1d'});
}

module.exports = router;

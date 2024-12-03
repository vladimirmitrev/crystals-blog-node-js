const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../config');

exports.register = async (userData) => {
  if (userData.password !== userData.confirmPassword) {
    throw new Error('Password mismatch!');
  }

  const userEmail = await User.findOne({ email: userData.email });

  if (userEmail) {
    throw new Error('Email already taken!');
  }

  const createdUser = await User.create(userData);

  // console.log(createdUser);

  return createdUser;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password!');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password!');
  }

  return user;
};



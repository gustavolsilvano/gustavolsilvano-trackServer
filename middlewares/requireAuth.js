const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: 'Error',
      message: 'You must be logged in.'
    });
  }

  const splitAuthorization = authorization.split(' ');
  if (splitAuthorization[0] !== 'Bearer')
    return res.status(401).json({
      status: 'Error',
      message: 'You must be logged in.'
    });

  const token = splitAuthorization[1];

  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Error',
        message: 'You must be logged in.'
      });
    }
    const { userId } = payload;

    const user = await User.findById(userId);

    if (!user)
      return res.status(400).json({
        status: 'Error',
        message: 'No user found!'
      });

    req.user = user;
    next();
  });
};

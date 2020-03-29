const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    console.log(user);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.status(200).json({
      status: 'success',
      data: {
        user,
        token
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(422).send(err.message);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).json({
      status: 'Error',
      message: 'Must provide email and password'
    });

  const user = await User.findOne({ email });

  if (!user)
    return res.status(422).json({
      status: 'Error',
      message: 'Invalid password or email'
    });

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.status(200).json({
      status: 'success',
      data: {
        user,
        token
      }
    });
  } catch (err) {
    return res.status(422).json({
      status: 'Error',
      message: 'Invalid password or email'
    });
  }
};

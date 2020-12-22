const User = require('../models/userModel');

exports.signupUser = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: 'This email is already in use.' });
    }
  });

  let newUser = new User({ name, email, password });

  newUser.save((err, success) => {
    if (err) {
      console.log('Error signing up user: ', err);
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'Successfully signed up user. Please sign in.',
    });
  });
};

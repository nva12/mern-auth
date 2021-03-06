const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const sgMail = require('@sendgrid/mail');
const User = require('../models/userModel');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// AUTHENTICATION

// Sign up without email verification
/* exports.signupUser = (req, res) => {
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
}; */

// Sign up with email verification
exports.signupUser = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: 'This email is already in use.' });
    }

    const token = jwt.sign(
      {
        name,
        email,
        password,
      },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '30m' }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
        <p>Please click on the following link to verify your email address and activate your account:</p>
        <p><a href='${process.env.CLIENT_URL}/activate-account/${token}'>Verify this email address</a></p>
        <hr/>
      `,
    };

    sgMail
      .send(emailData)
      .then((sent) => {
        console.log('Signup email sent.');
        return res.json({
          message: `Email has been sent to ${email}. Follow the instructions to activate your account.`,
          token: token,
        });
      })
      .catch((err) => {
        console.log('Error sending account activation email.');
      });
  });
};

exports.activateUserAccount = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decodedToken) {
        if (err) {
          console.log('Error verifying JWT for account activation.');
          return res.status(401).json({
            error: 'Expired link. Please sign up again.',
          });
        }

        const { name, email, password } = jwt.decode(token);

        let newUser = new User({ name, email, password });

        newUser.save((err, success) => {
          if (err) {
            console.log('Error saving user in database: ', err);
            return res.status(401).json({
              error: err,
            });
          }
          return res.json({
            message: 'Successfully signed up user. Please sign in.',
          });
        });
      }
    );
  } else {
    return res.json({
      message: 'Invalid token.',
    });
  }
};

exports.signinUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user found with this email, please signup.',
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Invalid credentials.',
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

// USER PROFILE CRUD

exports.readUser = (req, res) => {
  const userId = req.params.id;

  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'User not found' });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
});

exports.updateUser = (req, res) => {
  const { name, password } = req.body;

  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    if (!name) {
      return res.status(400).json({
        error: 'Name is required',
      });
    } else {
      user.name = name;
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Password must be at least 6 characters long',
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log('User update error', err);
        return res.status(400).json({
          error: 'User update failed',
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;

      res.json(updatedUser);
    });
  });
};

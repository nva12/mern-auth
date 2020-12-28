const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const User = require('../models/userModel');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        <p>Please click on the following link to activate your account:</p>
        <p><a href='${process.env.CLIENT_URL}/auth/activate/${token}'>Activate my account</a></p>
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

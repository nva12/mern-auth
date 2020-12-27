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
        });
      })
      .catch((err) => {
        console.log('Error sending account activation email.');
      });
  });
};

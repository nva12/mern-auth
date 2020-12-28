const express = require('express');
const router = express.Router();

// import controllers
const {
  signupUser,
  activateUserAccount,
  signinUser,
} = require('../controllers/userControllers');

// import validators
const {
  userSignupValidator,
  userSigninValidator,
} = require('../validators/userValidators');
const { validateRequest } = require('../validators/index');

router.post('/signup', userSignupValidator, validateRequest, signupUser);
router.post('/account-activation', activateUserAccount);
router.post('/signin', userSigninValidator, validateRequest, signinUser);

module.exports = router;

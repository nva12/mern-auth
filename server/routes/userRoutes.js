const express = require('express');
const router = express.Router();

// import controllers
const {
  signupUser,
  activateUserAccount,
  signinUser,
  readUser,
  requireSignin,
  updateUser,
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
router.get('/:id', requireSignin, readUser);
router.put('/update', requireSignin, updateUser);

module.exports = router;

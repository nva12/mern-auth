const express = require('express');
const router = express.Router();

// import controllers
const {
  signupUser,
  activateUserAccount,
} = require('../controllers/userControllers');

// import validators
const { userSignupValidator } = require('../validators/userValidators');
const { validateRequest } = require('../validators/index');

router.post('/signup', userSignupValidator, validateRequest, signupUser);
router.post('/account-activation', activateUserAccount);

module.exports = router;

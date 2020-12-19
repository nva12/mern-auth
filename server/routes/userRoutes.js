const express = require('express');
const router = express.Router();

// import controllers
const { signupUser } = require('../controllers/userControllers');

router.get('/signup', signupUser);

module.exports = router;

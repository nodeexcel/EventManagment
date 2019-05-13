const express = require('express');
const router = express.Router();
const UserModel = require('../models/user')

/* Add a new user. */
router.post('/register', async(req, res, next) => {
  let userResponse = await UserModel.register(req.body)
  res.send(userResponse);
});

/* login user. */
router.post('/login', async(req, res, next) => {
  let loginResponse = await UserModel.login(req.body)
  res.send(loginResponse);
});

module.exports = router;

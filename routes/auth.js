const express = require('express');
const db = require('../models');
const { checkPasswordValidity, hashPassword, validatePassword } = require('../controllers/passwordProcessing');

const authRouter = express.Router();

authRouter.put('/api/signup', async (req, res) => {
  const { username, password } = req.headers;
  if (!username || !password) {
    if (!checkPasswordValidity(password)) {
      return res.status(400).send({ status: 400, message: 'password not upto the mark' });
    }
    return res.status(400).send({ status: 400, message: 'username and password required' });
  }

  let passwordHash = await hashPassword(password);
  try {
    await db.users.create({ username: username, password: passwordHash });
    return res.status(201).send({ status: 201, message: 'user created' });
  } catch (err) {
    return res.status(500).send(err);
  }
});

authRouter.get('/api/login', (req, res) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res.status(400).send('username and password required');
  }

  // Check if user exists
  db.users.findOne({ where: { username: username } })
    .then((user) => {
      if (user && validatePassword(password, user.password)) {
        // Create a new session
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.isLoggedIn = true;
        res.status(200).send({ status: 200, message: 'user logged in' });
      } else {
        res.status(404).send({ status: 201, message: 'not found' });
      }
    })
    .catch((err) => {
      console.error('Error logging in:', err);
      res.status(500).send({ status: 500, message: 'internal server error' });
      }
    );
});

authRouter.post('/api/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ status: 500, message: 'internal server error' });
    }
    return res.status(200).send({ status: 200, message: 'user logged out' });
  });
});

module.exports = authRouter;
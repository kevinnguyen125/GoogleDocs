import express from 'express';
import crypto from 'crypto';
import { User } from '../models/models.js';

const router = express.Router();

export default (passport) => {
  // POST Login Request
  router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
      res.json({ success: true });
    },
  );

  // Signup Validation
  const validateSignup = userData => (userData.username && userData.password
    && userData.passwordRepeat && userData.password === userData.passwordRepeat);

  // sha256 Hashing For Passwords
  const hashPassword = (password) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  };

  // POST Signup Request
  router.post('/signup', (req, res) => {
    if (!validateSignup(req.body)) {
      res.json({ success: false });
    } else {
      const user = new User({
        username: req.body.username,
        password: hashPassword(req.body.password),
      });
      user.save()
      .then(() => res.json({ success: true }))
      .catch(() => res.json({ success: false }));
    }
  });

  // GET Logout Request
  router.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: true });
  });

  return router;
};

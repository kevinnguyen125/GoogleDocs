// Server
import http from 'http';
import express from 'express';

// Passport
import passport from 'passport';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { User } from './models/models.js';

import auth from './routes/auth';
import routes from './routes/routes.js';

const app = express();
const server = http.Server(app);

// Hash Function
const hash = crypto.createHash('sha256');
const hashPassword = (password) => {
  hash.update(password);
  return hash.digest('hex');
};

// Passport Methods
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (user.password !== hashPassword(password)) {
      return done(null, false);
    }
    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// For Sessions
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

mongoose.connect(process.env.MONGODB_URI);

app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', routes);

const port = process.env.PORT || 8080;
server.listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);

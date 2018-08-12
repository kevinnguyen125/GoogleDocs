// Server Middleware
import http from 'http';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

// Passport
import passport from 'passport';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/models.js';

// Routes and Sockets
import auth from './routes/auth';
import routes from './routes/routes.js';
import serverSocket from './serverSocket';

// Initializing Server and Sockets
// process.nextTick = setImmediate;
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server, {
  pingTimeout: 1000 * 60 * 30,
});

const port = process.env.PORT || 8080;
server.listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);
serverSocket(io);

// Initializing Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());

// Hash Function
const hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
};

// Passport Methods

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

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
  console.log('Failed to connect to MongoDB.', err);
});

mongoose.connect(process.env.MONGODB_URI);

app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', routes);

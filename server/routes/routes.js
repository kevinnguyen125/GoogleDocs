import express from 'express';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import { Document } from '../models/models.js';

const router = express.Router();

mongoose.connect(process.env.MONGODB_URI);

router.get('/getDocuments', (req, res) => {
  console.log('getDocuments from User:', req.user._id);
  if (req.user) {
    res.redirect(`/api/v1/Document/?query={%22owner%22:%22${req.user._id}%22}&select=title`);
  } else {
    res.status(500).send();
  }
});

restify.serve(router, Document);

export default router;

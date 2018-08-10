import express from 'express';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import { User, Document } from '../models/models.js';

const router = express.Router();

mongoose.connect(process.env.MONGODB_URI);

// Makes sure that user is logged in
router.use('/', (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(404).send();
  }
});

// GET route for user getting list of documents the user owns
router.get('/getDocuments', (req, res) => {
  res.redirect(`/api/v1/Document/?query={%22owner%22:%22${req.user._id}%22}&select=title`);
});

// GET route for user getting list of shared documents of the user
router.get('/sharedDocuments', (req, res) => {
  User.findById(req.user._id)
  .populate('sharedDocuments')
  .exec()
  .then(user => res.json({ sharedDocuments: user.sharedDocuments }))
  .catch(err => res.status(500).send(err));
});

// POST route for user to add a document to their list of shared documents
router.post('/addSharedDoc/:docId', (req, res) => {
  Document.findById(req.params.docId)
  .exec()
  .then((doc) => {
    if (req.body.docPassword === doc.password) {
      doc.collaborators.push(req.user._id);
      return doc.save();
    }
    res.status(404).send('Document password does not match.');
  })
  .then(() => {
    req.user.sharedDocuments.push(req.params.docId);
    return req.user.save();
  })
  .then(() => res.json({ success: true }))
  .catch(err => res.json({ success: false, error: err }));
});

restify.serve(router, Document);

export default router;

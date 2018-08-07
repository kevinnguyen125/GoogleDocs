import express from 'express';
import mongoose from 'mongoose';
import restify from 'express-restify-mongoose';
import { Document } from '../models/models.js';

const router = express.Router();

mongoose.connect(process.env.MONGODB_URI);

restify.serve(router, Document);

export default router;

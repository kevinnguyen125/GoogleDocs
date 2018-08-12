import mongoose from 'mongoose';

// Schemas
const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  sharedDocuments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
  }],
});

const documentSchema = new mongoose.Schema({
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  password: {
    required: true,
    type: String,
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
});

const documentHistorySchema = new mongoose.Schema({
  docId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
  },
  history: [{
    title: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: String,
    },
    dateSaved: {
      required: true,
      type: Date,
    },
  }],
});

// Models
const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);
const DocumentHistory = mongoose.model('DocumentHistory', documentHistorySchema);

export { User, Document, DocumentHistory };

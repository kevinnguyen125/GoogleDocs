import mongoose from 'mongoose';

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!');
});

mongoose.connection.on('error', () => {
  console.log('Failed to connect to MongoDB.');
});

const connect = process.env.MONGODB_URI;
mongoose.connect(connect);

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
});

// Models
const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);

export default { User, Document };

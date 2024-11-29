const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
  });
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String, 
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;


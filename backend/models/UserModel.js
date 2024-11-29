const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    console.error('Stack:', err.stack);
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


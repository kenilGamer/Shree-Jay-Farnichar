const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String, 
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;


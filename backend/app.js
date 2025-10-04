const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const port = 5000;
const User = require('./models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Gallery = require('./models/Gallery');
const https = require('https');
const helmet = require('helmet');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the 'uploads' directory if it doesn't exist
    }
    cb(null, uploadDir); // Specify upload directory
  },
  filename: function (req, file, cb) {
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    console.log('Uploaded filename:', filename); // Debug log to check the file name
    cb(null, filename);
  }
});

// Multer file filter configuration
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log('File uploaded:', file.originalname);  // Debug log to check the file name
    console.log('File MIME type:', file.mimetype);    // Debug log to check the MIME type

    // Allowed file extensions and MIME types
    const allowedExtensions = /\.(jpg|jpeg|png|gif|mp4|mov|avi|mkv|webm|pdf|doc|docx|xls|xlsx|ppt|pptx)$/;
    const allowedMimeTypes = /image\/(jpeg|png|gif)|video\/(mp4|mov|avi|mkv|webm)|application\/(pdf|msword|excel|ppt)$/;

    if (!file.originalname.match(allowedExtensions)) {
      return cb(new Error('Invalid file extension. Only image, video, and document files are allowed.'));
    }

    if (!file.mimetype.match(allowedMimeTypes)) {
      return cb(new Error('Invalid MIME type. Ensure the file is a valid image, video, or document.'));
    }

    cb(null, true);  // Proceed with the upload
  }
});
app.use(cors({
  origin: ['https://shreejayfurniture.store', 'https://www.shreejayfurniture.store', 'http://localhost:5173', 'https://web.shreejayfurniture.store'], // Add the new origin here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization', 'dataType', 'methods', 'serviceStatus', 'token', 'Access-Control-Allow-Origin'],
  credentials: true,
}));

app.use((err, req, res, next) => {
  if (err.code === 'ERR_NETWORK') {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Network Error' });
  } else {
    next(err);
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'sha256-kPx0AsF0oz2kKiZ875xSvv693TBHkQ/0SkMJZnnNpnQ='"], // Example with hash
    // Add other directives as needed
  }
}));

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Get the token from the Authorization header
  
  if (!token) { 
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the same secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Ensure this is the same secret as used in signing
    req.user = decoded;  // Attach the user info to the request object
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(400).json({ message: 'Token is not valid' });
  }
};

// Route for registering a new user
app.post('/register', async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized access' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('authToken', token, {
      httpOnly: true,   // Cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      maxAge: 86400000   // 1 day expiration
    });
    res.status(200).json({ message: 'Login successful', role: user.role, token: token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route for requesting password reset
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    // Save reset token to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`;

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request - Shree Jay Furniture',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You have requested to reset your password. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          </div>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Shree Jay Furniture Store</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for resetting password
app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for adding a new gallery item
app.post('/gallery', verifyToken, upload.fields([{ name: 'image', maxCount: 100 }, { name: 'video', maxCount: 100 }]), async (req, res) => {
  try {
    if (!req.files || (!req.files.image && !req.files.video)) {
      return res.status(400).json({ message: 'No files were uploaded' });
    }

    const image = req.files.image ? req.files.image[0].filename : null;
    const video = req.files.video ? req.files.video[0].filename : null;

    const gallery = new Gallery({
      image,
      video,
      title: req.body.title,
      description: req.body.description
    });
    
    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    console.error('Error adding gallery item:', error); // Log the error for debugging
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Route for getting all gallery items with pagination
app.get('/gallery/:page/:limit', async (req, res) => {
  try {
    const page = parseInt(req.params.page, 10);
    const limit = parseInt(req.params.limit, 10);
    const galleries = await Gallery.find().skip((page - 1) * limit).limit(limit);
    res.status(200).json(galleries);
  } catch (error) {
    console.error('Error fetching galleries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Simple gallery endpoint without pagination for frontend
app.get('/gallery', async (req, res) => {
  try {
    const galleries = await Gallery.find();
    res.status(200).json(galleries);
  } catch (error) {
    console.error('Error fetching galleries:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for updating a gallery item 
app.put('/gallery/:id', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    if (req.files && req.files.image) {
      gallery.image = req.files.image[0].filename;
    }
    if (req.files && req.files.video) {
      gallery.video = req.files.video[0].filename;
    }

    gallery.title = req.body.title || gallery.title;
    gallery.description = req.body.description || gallery.description;
    gallery.category = req.body.category || gallery.category;
    gallery.serviceStatus = req.body.serviceStatus || gallery.serviceStatus;

    await gallery.save();
    res.status(200).json(gallery);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for deleting a gallery item
app.delete('/gallery/:id', verifyToken, async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    if (gallery.image) {
      fs.unlinkSync(`uploads/${gallery.image}`);
    }
    if (gallery.video) {
      fs.unlinkSync(`uploads/${gallery.video}`);
    }
    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// General error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err });
  next("Internal Server Error");
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Starting the server
if (process.env.NODE_ENV === 'production') {
  // Production HTTPS server
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/godcraft.fun/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/godcraft.fun/fullchain.pem'),
  };

  https.createServer(options, app).listen(443, () => {
    console.log("Server is running on https://localhost:443");
  });
} else {
  // Development HTTP server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

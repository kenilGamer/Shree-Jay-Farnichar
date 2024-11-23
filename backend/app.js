const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const port = 3000;
const User = require('./models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Gallery = require('./models/Gallery');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Specify upload directory
  },
  filename: function (req, file, cb) {
    // Using the original file extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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
  origin: ['https://www.shreejayfurniture.store',"http://localhost:5173"], // Adjust according to your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','dataType','methods','serviceStatus'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

// Route for handling file upload
// app.post('/gallery', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
//   const gallery = req.body;
//   // console.log(gallery);
//   const user = await Gallery.findById(gallery._id);
//   await user.save();
  

//   if (!req.files) {
//     return res.status(400).json({ message: 'No files were uploaded.' });
//   }
//   // Check uploaded fields
//   if (req.files.image) {
//     console.log('Image uploaded:', req.files.image);
//     res.status(200).json({ message: 'Image uploaded successfully', image: req.files.image });
//   } else if (req.files.video) {
//     console.log('Video uploaded:', req.files.video);
//     res.status(200).json({ message: 'Video uploaded successfully', video: req.files.video });
//   } else {
//     res.status(200).json({ message: 'Files uploaded successfully' });
//   }
// });

// Route to serve uploaded files
app.get('/gallery/:file', (req, res) => {
  const file = req.params.file;
  const filePath = path.join(__dirname, 'uploads', file);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

// Route for adding a new gallery item
app.post('/gallery', verifyToken, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
  try {
    if (!req.files.image && !req.files.video) {
      return res.status(400).json({ message: 'No files were uploaded' });
    }
    const gallery = new Gallery({
      image: req.files.image ? req.files.image[0].filename : null,
      video: req.files.video ? req.files.video[0].filename : null,
      title: req.body.title,
      description: req.body.description
    });
    await gallery.save();
    console.log(gallery);
    res.status(201).json(gallery);

  } catch (error) {
    console.error('Error adding gallery item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route for getting all gallery items
app.get('/gallery/:page/:limit',verifyToken, async (req, res) => {
  try {
    const galleries = await Gallery.find().skip((req.params.page - 1) * req.params.limit).limit(req.params.limit);
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

    if (req.files.image) {
      gallery.image = req.files.image[0].filename;
    }
    if (req.files.video) {
      gallery.video = req.files.video[0].filename;
    }
    
    gallery.title = req.body.title || gallery.title;
    gallery.description = req.body.description || gallery.description;
    gallery.category = req.body.category || gallery.category;
    // Add code to update serviceStatus
    gallery.serviceStatus = req.body.serviceStatus || gallery.serviceStatus;
    console.log(gallery);
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

    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// General error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Something went wrong' });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

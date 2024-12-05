const multer = require('multer')
const {v4: uuidv4} = require('uuid')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        const uniquename = uuidv4();
      cb(null, uniquename + path.extname(file.originalname));
    } 
  })
  const upload = multer({ storage: storage, limits: { fieldSize: 1024 * 1024 * 5 }, fileFilter: function(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  } }) // Added limits for file size and file filter for image types
  module.exports = upload;
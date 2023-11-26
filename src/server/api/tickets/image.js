const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/server/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// Create multer object
const imageUpload = multer({
  storage: storage,
});
const imageFile = (filename) => {
  const dirname = path.resolve();
  const fullfilepath = path.join(dirname, "src/server/images/" + filename);
  return fullfilepath;
};

module.exports = { imageUpload, imageFile };

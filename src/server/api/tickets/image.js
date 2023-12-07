const multer = require("multer");
const path = require("path");
//Use multer to store image to local file when user Post ticket
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
  const fullfilepath = path.join("src/server/images/" + filename);
  return fullfilepath;
};

module.exports = { imageUpload, imageFile };

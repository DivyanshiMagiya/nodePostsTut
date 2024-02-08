let multer = require("multer");

let upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./postFile");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
module.exports = multer({ storage: upload });

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "../../../uploads/");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e5);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});
var uploadCoverImage = multer({ storage: storage }).single("cover");
module.exports = uploadCoverImage;

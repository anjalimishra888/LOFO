const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(null, "uploads/");
  },

  filename: (
    req,
    file,
    cb
  ) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  }
});

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowed =
    /jpg|jpeg|png|webp/;

  const ext =
    allowed.test(
      path.extname(
        file.originalname
      ).toLowerCase()
    );

  const mime =
    allowed.test(file.mimetype);

  if (ext && mime) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only Images Allowed"
      )
    );
  }
};

module.exports = multer({
  storage,
  fileFilter
});
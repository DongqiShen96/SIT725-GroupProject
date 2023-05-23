var express = require("express");
var router = express.Router();
const multer = require("multer");
const controller = require("../controller/controller");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/api/upload", upload.single("user-info-img"), (req, res) => {
  const imgUrl = "/uploads/" + req.file.filename;
  res.json({ message: "File uploaded successfully", imgUrl: imgUrl });
});

router.post("/api/pet-upload", upload.single("pet-photo-img"), (req, res) => {
  const petimgUrl = "/uploads/" + req.file.filename;
  res.json({ message: "Pet image uploaded successfully", imgUrl: petimgUrl });
});

router.post("/api/userinfo", controller.storeUserInfo);
router.post("/api/petinfo", controller.storePetInfo);

router.get("/api/userinfo", controller.getUserInfo);
router.get("/api/petinfo", controller.getPetInfo);

module.exports = router;

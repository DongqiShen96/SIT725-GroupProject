var express = require('express');
let router = express.Router();
let controller = require('../controller/controller')
const multer = require("multer");

router.post('/api/user', (req, res) => {
    controller.createUser(req, res);
});

router.post('/api/login', (req, res) => {
    controller.loginUser(req,res);
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// Initialize the multer with the configured storage settings
const upload = multer({ storage: storage });
// Upload images of user
router.post("/api/upload", upload.single("user-info-img"), (req, res) => {
  const imgUrl = "/uploads/" + req.file.filename;
  res.json({ message: "File uploaded successfully", imgUrl: imgUrl });
});
// Upload images of pet
router.post("/api/pet-upload", upload.single("pet-photo-img"), (req, res) => {
  const petimgUrl = "/uploads/" + req.file.filename;
  res.json({ message: "Pet image uploaded successfully", imgUrl: petimgUrl });
});
// Storing user and pet information
router.post("/api/userinfo", controller.storeUserInfo);
router.post("/api/petinfo", controller.storePetInfo);
// Obtain user and pet information
router.get("/api/userinfo", controller.getUserInfo);
router.get("/api/petinfo", controller.getPetInfo);

module.exports = router;

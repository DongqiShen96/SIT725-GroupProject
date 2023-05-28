var express = require("express");
let router = express.Router();
let controller = require("../controller/controller");

// Storing user and pet information
router.post("/api/userinfo", controller.storeUserInfo);

router.post("/api/petinfo", controller.storePetInfo);
// Obtain user and pet information
router.get("/api/userinfo", controller.getUserInfo);
router.get("/api/petinfo", controller.getPetInfo);

module.exports = router;

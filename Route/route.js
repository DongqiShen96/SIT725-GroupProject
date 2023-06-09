var express = require("express");
let router = express.Router();
let controller = require('../controller/controller')


// Storing user and pet information
router.post("/api/Users", (req, res) => {
  controller.storeUserInfo(req, res);
});

//Delete one user (used for testing)
router.delete("/api/Users", (req, res) => {
  controller.deleteUser(req, res);
});

router.post("/api/Pets", (req, res) => {
  controller.storePetInfo(req, res);
});

// Obtain user and pet information
router.get("/api/Users", (req, res) => {
  controller.getUserInfo(req, res);
});

router.get("/api/Pets", (req, res) => {
  controller.getPetInfo(req, res);
});

router.post("/api/user", (req, res) => {
  controller.createUser(req, res);
});

// Define API endpoint for login
router.post("/api/login", (req, res) => {
  controller.loginUser(req, res);
});

router.post("/api/Activity", (req, res) => {
  controller.createProjects(req, res);
});

router.get("/api/Activity", (req, res) => {
  controller.getAllProjects(req, res);
});

router.delete("/api/Activity", (req, res) => {
  controller.deleteProject(req, res);
});

router.put("/api/Activity", (req, res) => {
  controller.updateProject(req, res);
});

// this route is for adding calculation history to db.
router.post("/api/History", (req, res) => {
  controller.createHistory(req, res);
});

// Define an API endpoint to retrieve the history data
router.get("/api/History", (req, res) => {
  controller.getHistory(req, res);
});

// Define an API endpoint to retrieve the standard weight and height data
router.get("/api/Standard", (req, res) => {
    controller.getStandard(req, res);
});

module.exports = router;


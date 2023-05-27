var express = require('express');
let router = express.Router();
let controller = require('../controller/controller')

router.post('/api/user', (req, res) => {
    controller.createUser(req, res);
});

router.post('/api/login', (req, res) => {
    controller.loginUser(req,res);
});

router.post('/api/Activity', (req, res) => {
    controller.createProjects(req,res);
});

router.get('/api/Activity', (req, res) => {
    controller.getAllProjects(req,res);
});

router.delete('/api/Activity', (req, res) => {
    controller.deleteProject(req,res);
});

module.exports = router;
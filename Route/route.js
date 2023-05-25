var express = require('express');
let router = express.Router();
let controller = require('../controller/controller')

router.post('/api/user', (req, res) => {
    controller.createUser(req, res);
});

router.get('/api/user',(req,res) => {
    controller.getAllUsers(req,res);
});

module.exports = router;
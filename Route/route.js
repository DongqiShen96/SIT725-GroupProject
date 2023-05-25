var express = require('express');
let router = express.Router();
let controller = require('../controller/controller')

router.post('/api/login', (req, res) => {
    controller.loginUser(req,res);
});

module.exports = router;
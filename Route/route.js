var express = require('express');
let router = express.Router();
let controller = require('../controller/controller')

// this route is for adding calculation history to db.
router.post('/api/login', (req, res) => {
    controller.createHistory(req, res);
});

module.exports = router;
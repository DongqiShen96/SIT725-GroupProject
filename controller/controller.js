let model = require('../model/model');

const createUser = (req,res) => {
    let user = req.body;
    model.createUser(user, (err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'New user added'});
        }
    });
}

const getAllUsers = (req,res) => {
    model.getAllUsers((err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            res.json({statusCode: 200, data: result, message: 'All information of login retrieved'});
        }
    });
}

module.exports = {createUser,getAllUsers}
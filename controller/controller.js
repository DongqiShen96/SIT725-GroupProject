let model = require('../model/model');
var bcrypt = require('bcryptjs');

const createUser = (req,res) => {
    let user = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(formData.password, salt);
    user.password = hash;
    console.log(user.password);
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
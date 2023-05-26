let model = require('../model/model');
var bcrypt = require('bcryptjs');

const createUser = (req,res) => {
    let user = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    //If not exist, add user
    model.checkUser(user.email, (exists) => {
        if (exists) {
            res.json({statusCode: 400, message: 'You already signed up'});
        } else {``
            model.createUser(user, (err, result) => {
                if (err) {
                    res.json({statusCode: 400, message: err});
                } else {
                    res.json({statusCode: 200, data: result, message: 'New user added'});
                }
            });
        }
    });
}

module.exports = {createUser}
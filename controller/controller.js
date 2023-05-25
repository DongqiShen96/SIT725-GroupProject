let model = require('../model/model');
var bcrypt = require('bcryptjs');

const loginUser = (req,res) => {
    let user = req.body;
    model.getUser(user.email, (err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            if(bcrypt.compareSync(user.password, result[0].password)) {
                res.json({statusCode: 200, data: result, message: 'Log in successfully'});
            } else {
                res.json({statusCode: 401, message: 'Wrong username or password, please try agaim'});
            }
        }
    });
}

module.exports = {loginUser}

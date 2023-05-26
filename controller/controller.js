let model = require('../model/model');
var bcrypt = require('bcryptjs');

const loginUser = (req,res) => {
    let user = req.body;
    model.getUser(user.email, (err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            //If user sign-up yet check
            if(result.length > 0){
                if(bcrypt.compareSync(user.password, result[0].password)) {
                    res.json({statusCode: 200, data: result, message: 'Logged in'}); //Correct pw
                } else {
                    res.json({statusCode: 400, message: 'Password does not match'}); //Wrong pw
                }
            } else {
                res.json({statusCode: 400, message: 'User does not exist'}); //User not sign-up yet
            }
        }
    });
}

module.exports = {loginUser}

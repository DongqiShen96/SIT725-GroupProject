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


//user information page
// Processing user information
const storeUserInfo = (req, res) => {
  const userInfo = req.body;
  model.insertOneUser(userInfo, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        data: result,
        message: "Successfully added",
      });
    }
  });
};
// Processing user information
const storePetInfo = (req, res) => {
  const petInfo = req.body;
  model.insertOnePet(petInfo, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({
        statusCode: 200,
        data: result,
        message: "Successfully added",
      });
    }
  });
};
// get of user information
const getUserInfo = (req, res) => {
  model.findUsers((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
};
// get of pet information
const getPetInfo = (req, res) => {
  model.findPets((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
};


module.exports = {createUser, loginUser, storeUserInfo, storePetInfo, getUserInfo, getPetInfo}


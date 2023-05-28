const model = require("../model/model");

// Processing user information
const storeUserInfo = (req, res) => {
  const userInfo = req.body;
  model.findUserByEmail(userInfo.email, (err, user) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
      return;
    }
    if (user) {
      model.updateUserByEmail(userInfo, (err, result) => {
        if (err) {
          res.json({ statusCode: 400, message: err });
        } else {
          res.json({
            statusCode: 200,
            data: result,
            message: "Successfully updated",
          });
        }
      });
    } else {
      // User with the given email does not exist, create a new user
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
    }
  });
};

// Processing pet information
const storePetInfo = (req, res) => {
  const petInfo = req.body;
  model.findPetByEmail(petInfo.email, (err, pet) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
      return;
    }
    if (pet) {
      // Pet with the given name and email already exists, update the pet
      model.updatePetByEmail(petInfo, (err, result) => {
        if (err) {
          res.json({ statusCode: 400, message: err });
        } else {
          res.json({
            statusCode: 200,
            data: result,
            message: "Successfully updated",
          });
        }
      });
    } else {
      // Pet with the given name and email does not exist, create a new pet
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
    }
  });
};

// Get of user information
const getUserInfo = (req, res) => {
  model.findUsers((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
};

// Get of pet information
const getPetInfo = (req, res) => {
  model.findPets((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
};

module.exports = {
  storeUserInfo,
  storePetInfo,
  getUserInfo,
  getPetInfo,
};

const model = require("../model/model");
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

module.exports = { storeUserInfo, storePetInfo, getUserInfo, getPetInfo };

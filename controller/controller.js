const model = require("../model/model");

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

const getUserInfo = (req, res) => {
  model.findUsers((err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successful" });
    }
  });
};

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

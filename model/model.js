const { userCollection, petCollection } = require("../dbConnection");

const insertOneUser = (userInfo, callback) => {
  userCollection.insertOne(userInfo, callback);
};

const insertOnePet = (petInfo, callback) => {
  petCollection.insertOne(petInfo, callback);
};

const findUsers = (callback) => {
  userCollection.find().toArray(callback);
};

const findPets = (callback) => {
  petCollection.find().toArray(callback);
};

module.exports = { insertOneUser, insertOnePet, findUsers, findPets };

const { getUserCollection, getPetCollection } = require("../dbConnection");
// Insert data
const insertOneUser = (userInfo, callback) => {
  getUserCollection().insertOne(userInfo, callback);
};
const insertOnePet = (petInfo, callback) => {
  getPetCollection().insertOne(petInfo, callback);
};

// Search Data
const findUsers = (callback) => {
  if (!getUserCollection()) {
    callback(new Error("Database connection not yet established"), null);
  } else {
    getUserCollection().find().toArray(callback);
  }
};
const findPets = (callback) => {
  if (!getPetCollection()) {
    callback(new Error("Database connection not yet established"), null);
  } else {
    getPetCollection().find().toArray(callback);
  }
};

module.exports = { insertOneUser, insertOnePet, findUsers, findPets };

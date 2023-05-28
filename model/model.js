const client = require("../dbConnection");

// Connection to collections
const getUserCollection = () =>
  client.db("GroupProject").collection("userInfo");
const getPetCollection = () => client.db("GroupProject").collection("petInfo");

// Insert data
const insertOneUser = (userInfo, callback) => {
  getUserCollection().insertOne(userInfo, callback);
};
const insertOnePet = (petInfo, callback) => {
  getPetCollection().insertOne(petInfo, callback);
};

// Update data
const updateUserByEmail = (userInfo, callback) => {
  getUserCollection().updateOne(
    { email: userInfo.email },
    { $set: userInfo },
    callback
  );
};
const updatePetByEmail = (petInfo, callback) => {
  getPetCollection().updateOne(
    { name: petInfo.name, email: petInfo.email },
    { $set: petInfo },
    callback
  );
};

// Search data
const findUsers = (callback) => {
  getUserCollection().find().toArray(callback);
};
const findPets = (callback) => {
  getPetCollection().find().toArray(callback);
};
const findUserByEmail = (email, callback) => {
  getUserCollection().findOne({ email: email }, callback);
};
const findPetByEmail = (email, callback) => {
  getPetCollection().findOne({ email: email }, callback);
};

module.exports = {
  insertOneUser,
  insertOnePet,
  updateUserByEmail,
  updatePetByEmail,
  findUsers,
  findPets,
  findUserByEmail,
  findPetByEmail,
};

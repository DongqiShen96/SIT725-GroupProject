let client = require("../dbConnection");
const ObjectId = require("mongodb").ObjectId;

//GroupProject is the database's name, History is the collection's name.
let historyCollection = client.db("GroupProject").collection("History");
let Activitycollection = client.db("GroupProject").collection("Activity");
let activitySheetCollection = client
  .db("GroupProject")
  .collection("ActivitySheet");
let petsCollection = client.db("GroupProject").collection("Pets");
let usersCollection = client.db("GroupProject").collection("Users");


// Insert data
function insertOneUser(Users, callback) {
  usersCollection.insertOne(Users, callback);
}

function insertOnePet(Pets, callback) {
  petsCollection.insertOne(Pets, callback);
}

// Update data
function updateUserByEmail(Users, callback) {
  usersCollection.updateOne({ email: Users.email }, { $set: Users }, callback);
}

function updatePetByEmail(Pets, callback) {
  petsCollection.updateOne({ email: Pets.email }, { $set: Pets }, callback);
}

// Search data
function findUsers(callback) {
  usersCollection.find().toArray(callback);
}

function findPets(callback) {
  petsCollection.find().toArray(callback);
}

function findUserByEmail(email, callback) {
  usersCollection.findOne({ email: email }, callback);
}

function findPetByEmail(email, callback) {
  petsCollection.findOne({ email: email }, callback);
}

const createUser = (user, callback) => {
  usersCollection.insertOne(user, callback);
};

const checkUser = (email, callback) => {
  usersCollection.find({ email: email }).toArray((err, result) => {
    if (err) throw err;
    callback(result.length > 0);
  });
};

const getUser = (email, callback) => {
  usersCollection.find({ email: email }).toArray((err, result) => {
    if (err) {
      console.log("Error when finding user by email: ", err);
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const insertProjects = (project, callback) => {
  Activitycollection.insertOne(project, callback);
};

const getProjects = (callback) => {
  Activitycollection.find({}).toArray(callback);
};

const remove = (projectId, callback) => {
  Activitycollection.deleteOne({ _id: new ObjectId(projectId) }, callback);
};

const updateProject = (projectId, updateData, callback) => {
  Activitycollection.updateOne(
    { _id: new ObjectId(projectId) },
    { $set: updateData },
    callback
  );
};

// insert calculation history to History collection.
function insertHistory(history, callback) {
  historyCollection.insertOne(history, callback);
}

// Query the database for the history data
function getHistory(callback) {
  historyCollection.find().toArray(callback);
}

module.exports = {
  createUser,
  checkUser,
  getUser,
  insertProjects,
  getProjects,
  remove,
  updateProject,
  insertHistory,
  getHistory,
  insertOneUser,
  insertOnePet,
  updateUserByEmail,
  updatePetByEmail,
  findUsers,
  findPets,
  findUserByEmail,
  findPetByEmail,
};

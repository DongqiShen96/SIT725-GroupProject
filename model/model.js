let client = require('../dbConnection');
const { getUserCollection, getPetCollection } = require("../dbConnection");
//GroupProject is the database's name, History is the collection's name.
let historyCollection = client.db('GroupProject').collection('History');
let activityCollection = client.db('GroupProject').collection('Activity');
let activitySheetCollection = client.db('GroupProject').collection('ActivitySheet');
let petsCollection = client.db('GroupProject').collection('Pets');
let usersCollection = client.db('GroupProject').collection('Users');


const createUser = (user, callback) => {
    usersCollection.insertOne(user, callback);
}

const checkUser = (email,callback) => {
    usersCollection.find({email:email}).toArray((err, result) => {
        if (err) throw err;
        callback(result.length > 0);
    });
}

const getUser = (email, callback) => {
    usersCollection.find({email: email}).toArray((err, result) => {
        if (err) {
            console.log('Error when finding user by email: ', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

//userinformation page
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



module.exports = {createUser,checkUser, getUser, insertOneUser, insertOnePet, findUsers, findPets}

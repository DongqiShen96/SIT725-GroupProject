let client = require('../dbConnection');

//GroupProject is the database's name, History is the collection's name.
let historyCollection = client.db('GroupProject').collection('History');
let activityCollection = client.db('GroupProject').collection('Activity');
let activitySheetCollection = client.db('GroupProject').collection('ActivitySheet');
let petsCollection = client.db('GroupProject').collection('Pets');
let usersCollection = client.db('GroupProject').collection('Users');


const createUser = (user, callback) => {
    usersCollection.insertOne(user, callback);
}

const getAllUsers = (callback) => {
    usersCollection.find().toArray(callback);
}

module.exports = {createUser, getAllUsers}
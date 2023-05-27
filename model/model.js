let client = require('../dbConnection');
const ObjectId = require('mongodb').ObjectId;

//GroupProject is the database's name, History is the collection's name.
let historyCollection = client.db('GroupProject').collection('History');
let Activitycollection = client.db('GroupProject').collection('Activity');
let activitySheetCollection = client.db('GroupProject').collection('ActivitySheet');
let petsCollection = client.db('GroupProject').collection('Pets');
let usersCollection = client.db('GroupProject').collection('Users');


const createUser = (user, callback) => {
    usersCollection.insertOne(user, callback);
}

const checkUser = (email, callback) => {
    usersCollection.find({ email: email }).toArray((err, result) => {
        if (err) throw err;
        callback(result.length > 0);
    });
}

const getUser = (email, callback) => {
    usersCollection.find({ email: email }).toArray((err, result) => {
        if (err) {
            console.log('Error when finding user by email: ', err);
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

const insertProjects = (project, callback) => {
    Activitycollection.insertOne(project, callback);
};

const getProjects = (callback) => {
    Activitycollection.find({}).toArray(callback);
};

const remove = (projectId, callback) => {
    Activitycollection.deleteOne({ _id: new ObjectId(projectId) }, callback);
}

const updateProject = (projectId, updateData, callback) => {
    Activitycollection.updateOne({ _id: new ObjectId(projectId) }, { $set: updateData }, callback);
};

module.exports = { createUser, checkUser, getUser, insertProjects, getProjects, remove,updateProject }
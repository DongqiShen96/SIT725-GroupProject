let model = require("../model/model");
var bcrypt = require("bcryptjs");

// Processing user information
const storeUserInfo = (req, res) => {
  const Users = req.body;
  model.findUserByEmail(Users.email, (err, user) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
      return;
    }
    if (user) {
      model.updateUserByEmail(Users, (err, result) => {
        if (err) {
          res.json({ statusCode: 400, message: err });
        } else {
          res.json({ statusCode: 200, data: result, message: "Successfully updated" });
        }
      });
    } else {
      // User with the given email does not exist, create a new user
      model.insertOneUser(Users, (err, result) => {
        if (err) {
          res.json({ statusCode: 400, message: err });
        } else {
          res.json({ statusCode: 200, data: result, message: "Successfully added" });
        }
      });
    }
  });
};

// Processing pet information
const storePetInfo = (req, res) => {
  const Pets = req.body;
  model.findPetByEmail(Pets.email, (err, pet) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
      return;
    }
    if (pet) {
      // Pet with the given name and email already exists, update the pet
      model.updatePetByEmail(Pets, (err, result) => {
        if (err) {
          res.json({ statusCode: 400, message: err });
        } else {
          res.json({ statusCode: 200, data: result, message: "Successfully updated", });
        }
      });
    } else {
      // Pet with the given name and email does not exist, create a new pet
      model.insertOnePet(Pets, (err, result) => {
        if (err) {
          res.json({ statusCode: 400, message: err });
        } else {
          res.json({ statusCode: 200, data: result, message: "Successfully added" });
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

//Create new user
const createUser = (req, res) => {
  let user = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  //If not exist, add user
  model.checkUser(user.email, (exists) => {
    if (exists) {
      res.json({ statusCode: 400, message: "You already signed up" });
    } else {
      ``;
      model.createUser(user, (err, result) => {
        if (err) {
          res.json({ statusCode: 400, message: err });
        } else {
          res.json({
            statusCode: 200,
            data: result,
            message: "New user added",
          });
        }
      });
    }
  });
};

//Log-in function
const loginUser = (req, res) => {
  let user = req.body;
  model.getUser(user.email, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      //If user sign-up yet check
      if (result.length > 0) {
        if (bcrypt.compareSync(user.password, result[0].password)) {
          res.json({ statusCode: 200, data: result, message: "Logged in" }); //Correct pw
        } else {
          res.json({ statusCode: 400, message: "Password does not match" }); //Wrong pw
        }
      } else {
        res.json({ statusCode: 400, message: "User does not exist" }); //User not sign-up yet
      }
    }
  });
};

const createProjects = (req, res) => {
  let newProject = req.body;
  model.insertProjects(newProject, (error, result) => {
    if (error) {
      res.json({ statusCode: 400, message: error });
    } else {
      res.json({ statusCode: 200, data: result, message: "project successfully added" });
    }
  });
};

const getAllProjects = (req, res) => {
  model.getProjects((error, result) => {
    if (error) {
      res.json({ statusCode: 400, message: error });
    } else {
      res.json({ statusCode: 200, data: result, message: "get all project Successfully" });
    }
  });
};

const deleteProject = (req, res) => {
  let projectId = req.body.id;
  model.remove(projectId, (error, result) => {
    if (error) {
      res.json({ statusCode: 400, message: error });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successfully removed" });
    }
  });
};

const updateProject = (req, res) => {
  let projectId = req.body.id;
  let updatedData = req.body;
  delete updatedData.id; // remove id from the update data

  model.updateProject(projectId, updatedData, (error, result) => {
    if (error) {
      res.json({ statusCode: 400, message: error });
    } else {
      res.json({ statusCode: 200, data: result, message: "Successfully updated" });
    }
  });
};

// insert history to database
const createHistory = (req, res) => {
  let history = req.body;
  model.insertHistory(history, (err, result) => {
    if (!err) {
      res.json({ statusCode: 200, data: result, message: "Added" });
    } else {
      console.error(err);
      res.json({ statusCode: 400, data: err, message: "Failed" });
    }
  });
};

// get different users' calculation history
const getHistory = (req, res) => {
  const userEmail = req.query.email;
  model.retrieveHistory(userEmail, (err, result) => {
    if (err) {
      res.json({ statusCode: 400, message: err });
    } else {
      res.json({ statusCode: 200, data: result, message: "Success" });
    }
  });
};

// get different breeds' standard weight and height
const getStandard = (req, res) => {
    const breed = req.query.breed;
    model.retrieveStandard(breed, (err, result) => {
      if (err) {
        res.json({ statusCode: 400, message: err });
      } else {
        res.json({ statusCode: 200, data: result, message: "Successful get standard" });
      }
    });
  };

module.exports = { createUser, loginUser, createProjects, getAllProjects, deleteProject, updateProject, createHistory, getHistory, getStandard, storeUserInfo, storePetInfo, getUserInfo, getPetInfo };

let model = require('../model/model');
var bcrypt = require('bcryptjs');

const createUser = (req,res) => {
    let user = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;

    //If not exist, add user
    model.checkUser(user.email, (exists) => {
        if (exists) {
            res.json({statusCode: 400, message: 'You already signed up'});
        } else {``
            model.createUser(user, (err, result) => {
                if (err) {
                    res.json({statusCode: 400, message: err});
                } else {
                    res.json({statusCode: 200, data: result, message: 'New user added'});
                }
            });
        }
    });
}

const loginUser = (req,res) => {
    let user = req.body;
    model.getUser(user.email, (err, result) => {
        if (err) {
            res.json({statusCode: 400, message: err});
        } else {
            //If user sign-up yet check
            if(result.length > 0){
                if(bcrypt.compareSync(user.password, result[0].password)) {
                    res.json({statusCode: 200, data: result, message: 'Logged in'}); //Correct pw
                } else {
                    res.json({statusCode: 400, message: 'Password does not match'}); //Wrong pw
                }
            } else {
                res.json({statusCode: 400, message: 'User does not exist'}); //User not sign-up yet
            }
        }
    });
}

const createProjects = (req, res) => {
    let newProject = req.body;
    model.insertProjects(newProject, (error, result) => {
        if (error) {
            res.json({ statusCode: 400, message: error });
        } else {
            res.json({ statusCode: 200, data: result, message: 'project successfully added' });
        }
    });
}

const getAllProjects = (req, res) => {
    model.getProjects((error, result) => {
        if (error) {
            res.json({ statusCode: 400, message: error });
        } else {
            res.json({ statusCode: 200, data: result, message: 'Success' });
        }
    });
}

const deleteProject= (req, res) => {
    let projectId = req.body.id;
    model.remove(projectId, (error, result) => {
        if (error) {
            res.json({ statusCode: 400, message: error });
        } else {
            res.json({ statusCode: 200, data: result, message: 'Successfully removed' });
        }
    });
}

const updateProject = (req, res) => {
    let projectId = req.body.id;
    let updatedData = req.body;
    delete updatedData.id; // remove id from the update data

    model.updateProject(projectId, updatedData, (error, result) => {
        if (error) {
            res.json({ statusCode: 400, message: error });
        } else {
            res.json({ statusCode: 200, data: result, message: 'Successfully updated' });
        }
    });
};

module.exports = {createUser, loginUser,createProjects,getAllProjects,deleteProject,updateProject}
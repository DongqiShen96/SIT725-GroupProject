let expect = require("chai").expect;
let request = require("request");
var bcrypt = require("bcryptjs");
let url = "http://localhost:3000/api/Activity";
let userurl = "http://localhost:3000/api/Users";
let peturl = "http://localhost:3000/api/Pets";


//Ender
//Activity page functionalities testing
describe("Get all activities test", function () {
  it("return status code of 200", function (done) {
    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("return success message", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.message).to.contain("Success");
      done();
    });
  });

  it("return an array", function (done) {
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.data).to.be.a("array");
      done();
    });
  });
});

describe("Post a activity test", function () {
  let newProject = {
    email: "123@gmail.com",
    time: "6:00",
    event: "post Test",
  };

  it("return status code of 200", function (done) {
    request(
      { url: url, method: "POST", json: newProject },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("return successfully added message", function (done) {
    request(
      { url: url, method: "POST", json: newProject },
      function (error, response, body) {
        expect(body.message).to.be.equal("project successfully added");
        done();
      }
    );
  });
});

describe("Update a activity test", function () {
  let projectId = "647465e0aeddc9267e8c3cc6";
  let updatedData = { time: "7:00", event: "Update Description Test" };

  it("return status code of 200", function (done) {
    request(
      { url: url, method: "PUT", json: { id: projectId, ...updatedData } },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("return successfully updated message", function (done) {
    request(
      { url: url, method: "PUT", json: { id: projectId, ...updatedData } },
      function (error, response, body) {
        expect(body.message).to.be.equal("Successfully updated");
        done();
      }
    );
  });
});

describe("Remove activity test", function () {
  let projectId = "647465e0aeddc9267e8c3cc6";

  it("return status code of 200", function (done) {
    request(
      { url: url, method: "DELETE", json: { id: projectId } },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.message).to.be.equal("Successfully removed");
        done();
      }
    );
  });

  it("return successfully removed message", function (done) {
    request(
      { url: url, method: "DELETE", json: { id: projectId } },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.message).to.be.equal("Successfully removed");
        done();
      }
    );
  });
});

describe("Remind Event Start Test", function () {
  // Refactored remindEventStart
  function remindEventStart(currentDate) {
    var storedContentString = localStorage.getItem("storedContent");
    var storedContent = JSON.parse(storedContentString);
    var alertMessage = "";

    for (var i = 0; i < storedContent.length; i++) {
      var eventTime = new Date(storedContent[i].time);
      var timeDifference = eventTime.getTime() - currentDate.getTime();

      if (timeDifference > 0 && timeDifference <= 120000) {
        var eventName = storedContent[i].event;
        var eventStartTime = eventTime;

        if (!storedContent[i].reminded) {
          alertMessage =
            "Event will start at " +
            eventStartTime.getHours() +
            ":" +
            eventStartTime.getMinutes() +
            " Activity " +
            eventName;
          storedContent[i].reminded = true;
        }
      } else {
        if (storedContent[i].reminded) {
          storedContent.splice(i, 1);
          i--;
        }
      }
    }
    localStorage.setItem("storedContent", JSON.stringify(storedContent));
    return alertMessage;
  }

  beforeEach(() => {
    // mock localStorage
    global.localStorage = {
      getItem: function (key) {
        return this[key];
      },
      setItem: function (key, value) {
        this[key] = value;
      },
    };
  });

  it("should return alert message for upcoming event", function () {
    const upcomingEvent = {
      time: new Date(2023, 4, 29, 10, 1, 0).toString(),
      event: "Test Event",
      reminded: false,
    };
    localStorage.setItem("storedContent", JSON.stringify([upcomingEvent]));
    const alertMessage = remindEventStart(new Date(2023, 4, 29, 10, 0, 0));
    expect(alertMessage).to.include(
      "Event will start at 10:1 Activity Test Event"
    );
  });

  it("should not return alert message for past event", function () {
    const pastEvent = {
      time: new Date(2023, 4, 29, 9, 0, 0).toString(),
      event: "Test Event",
      reminded: false,
    };
    localStorage.setItem("storedContent", JSON.stringify([pastEvent]));
    const alertMessage = remindEventStart(new Date(2023, 4, 29, 10, 0, 0));
    expect(alertMessage).to.be.empty;
  });
});

//Roy
//User information page functionalities testing
describe("Get User Information", function () {
  it("returns status code 200", function (done) {
    request(userurl, function (err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("returns successful information", function (done) {
    request(userurl, function (err, response, body) {
      expect(body).to.include("Successful");
      done();
    });
  });

  it("return an array", function (done) {
    request(userurl, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.data).to.be.a("array");
      done();
    });
  });
});

describe("Store and Update User Information", function () {
  it("return status code of 200", function (done) {
    request(userurl, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("returns successful information", function (done) {
    let userInfo = {
      username: "testUser",
      birthday: "1990-01-01",
      gender: "Male",
      email: "123@edu.com",
      phone: "1234567890",
    };
    request.post(
      { url: userurl, form: userInfo },
      function (err, response, body) {
        expect(body).to.include("Successfully updated");
        done();
      }
    );
  });
});

describe("Get Pet Information", function () {
  it("returns status code 200", function (done) {
    request(peturl, function (err, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("returns successful information", function (done) {
    request(peturl, function (err, response, body) {
      expect(body).to.include("Successful");
      done();
    });
  });

  it("return an array", function (done) {
    request(peturl, function (error, response, body) {
      body = JSON.parse(body);
      expect(body.data).to.be.a("array");
      done();
    });
  });
});

describe("Store and Update Pet Information", function () {
  it("return status code of 200", function (done) {
    request(userurl, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("returns successful information", function (done) {
    let petInfo = {
      petName: "Testpet",
      petType: "Dog",
      petBreed: "Golden Retriever",
      petAge: 3,
      petGender: "Male",
      petWeight: 30,
      email: "123@edu.com",
    };
    request.post(
      { url: peturl, form: petInfo },
      function (err, response, body) {
        expect(body).to.include("Successfully updated");
        done();
      }
    );
  });
});

//Tim
//Health Track Page functionalities testing
let getHistoryUrl = 'http://localhost:3000/api/History';
let postHistoryUrl = 'http://localhost:3000/api/History';
let getStandardUrl = 'http://localhost:3000/api/Standard';
let history = {
    name: 'TestInserting',
    breed: 'TestInserting',
    height: 'TestInserting',
    weight: 'TestInserting',
    status: 'TestInserting',
    date: '5/29/2023',
    email: 'TestInserting'
};

describe('test get calculation history', function(){
    it('return status code of 200', function(done){
        request(getHistoryUrl, function(error, response, body){
            expect(response.statusCode).to.equal(200);
            if (error) {
                console.log(error);
            }
            done();
        });
    });

    it('return success message', function(done){
        request(getHistoryUrl, function(error, response, body){
            body = JSON.parse(body);
            expect(body.message).to.contain('Success');
            if (error) {
                console.log(error);
            }
            done();
        });
    });

    it('return an array', function(done){
        request(getHistoryUrl, function(error, response, body){
            body = JSON.parse(body);
            expect(body.data).to.be.a('array');
            if (error) {
                console.log(error);
            }
            done();
        });
    });
});

describe('test insert history', function(){
    it('return status code of 200', function(done){
        request(postHistoryUrl, function(error, response, body){
            expect(response.statusCode).to.equal(200);
            if (error) {
                console.log(error);
            }
            done();
        });
    });
    
    it('insert history to database', function(done){
        request.post({url:postHistoryUrl, form:history}, function(error, response, body){
            body = JSON.parse(body);
            expect(body.message).to.contain('Added');
            done();
        });
    });
}); 

describe('test get standard', function(){
    it('return status code of 200', function(done){
        request(getStandardUrl, function(error, response, body){
            expect(response.statusCode).to.equal(200);
            if (error) {
                console.log(error);
            }
            done();
        });
    });

    it('return successful get standard message', function(done){
        request(getStandardUrl, function(error, response, body){
            body = JSON.parse(body);
            expect(body.message).to.contain('Successful get standard');
            if (error) {
                console.log(error);
            }
            done();
        });
    });
});

//Trung testing design
let loginurl = "http://localhost:3000/api/login";

//User password hashing with the password of "145"
let salt = bcrypt.genSaltSync(10);
let hashed_pw = bcrypt.hashSync("145", salt);

//Testing variable of new user
let test_account = {
  email: "145@gmail.com",
  password: hashed_pw
}

//Testing log-in variable
let login_account = {
  email: "145@gmail.com",
  password: "145"
}

//Testing log-in variable
let login_account_wrongpw = {
  email: "145@gmail.com",
  password: "wrongpassword",
}

//Testing log-in variable
let login_account_notexist = {
  email: "notexisted@gmail.com",
  password: hashed_pw,
}

//Sign-up api testing (get)
describe("sign-up GET request test", function() {
  //Check if the api works
  it("api checking", function(done) {
      request(userurl, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
      });
  });
  //Check if the data returned from user collection
  it("return user data from Users collection", function (done){
      request(userurl, function(error, response, body) {
          body = JSON.parse(body);
          expect(body.data).to.be.a('array');
          done();
      });
  });
});

//Sign-up function and api testing (insert new account)
describe("sign-up POST request test", function() {
  //Check if the user is successfully added
  it("Insert new user after sign-up testing with new email", function(done) {
    // Valid email checking
    let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(test_account.email)) {
        throw new Error('Email is not in valid format');
    }
    request.post({url: userurl, form: test_account}, function(error, response, body) {
        body = JSON.parse(body);
        expect(body.message).to.contain('added');
        done();
    });
  });
});

//Log-in function and api testing 
describe("POST Login test", function() {
  //Check if it's a success login from a valid input
  it("Success log-in testing for valid account", function(done) { 
    request.post({url: loginurl, form: login_account}, function(error, response, body) {
      body = JSON.parse(body);
      expect(body.message).to.contain('Logged in');
      done();
    });
  });
  
  //For a wrong password for any registered account, deny log-in
  it("Detect the wrong password for existed account, deny the login", function(done) { 
    request.post({url: loginurl, form: login_account_wrongpw}, function(error, response, body) {
      body = JSON.parse(body);
      expect(body.message).to.contain('Password does not match');
      done();
    });
  });

  //For a email input that not registered yet, deny log-in
  it("Detect the email that is not registered yet, deny the log-in", function(done) { 
    request.post({url: loginurl, form: login_account_notexist}, function(error, response, body) {
      body = JSON.parse(body);
      expect(body.message).to.contain('User does not exist');
      done();
    });
  });
  //Delete the dummy account from the database after test for successful test in the future
  after(function(done) {
    request.delete({url:userurl, form:test_account}, function(error, response, body) {
        done();
    });
  });
});






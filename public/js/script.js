let user_email;

/*
Trung's work
*/

//Sign-up

//Sign up submit form
const submitFormSignIn = () => {
  let formData = {};
  let email1 = $("#email").val();
  let pw1 = $("#password").val();
  let pw2 = $("#confirm_password").val();

  //email check
  let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email1)) {
    alert("Email is not valid");
    return;
  }

  //Password check
  if (pw1 !== pw2) {
    alert("Not matched");
    return;
  }

  formData.email = $("#email").val();
  formData.password = $("#password").val();
  // Print for test
  console.log("form data: ", formData);
  // Server update
  createUser(formData);
};

//Create new user
const createUser = (user) => {
  $.ajax({
    url: "api/user",
    data: user,
    type: "POST",
    success: (result) => {
      alert(result.message);
      window.location.href = "login.html"; // Redirect to another page
    },
  });
};

$(document).ready(function () {
  $("#signup").click(() => {
    submitFormSignIn();
  });
});

//Login page

//Submit form for login
const submitLoginForm = () => {
  let formData = {};
  let email = $("#email").val();

  //email check
  let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    alert("Email is not valid");
    return;
  }

  formData.email = $("#email").val();
  formData.password = $("#password").val();
  // Print for test
  console.log("form data: ", formData);
  // Server update
  loginUser(formData);
};


//Login function
const loginUser = (user) => {
  $.ajax({
    url: "api/login",
    data: user,
    type: "POST",
    success: (result) => {
      if (result.statusCode === 200) {
        localStorage.setItem("user_email", user.email);
        alert(result.message);
        window.location.href = "main.html"; // Redirect to another page
      } else {
        alert(result.message);
      }
    },
  });
};

$(document).ready(function () {
  $("#login").click(() => {
    submitLoginForm();
  });
});

/*
Tim's work
*/
// when the 'calculate' bottom clicked, get form data from web and do calculate
const calculateForm = () => {
  let formData = {};
  formData.breed = $("#breed").val();
  formData.name = $("#name").val();
  formData.weight = $("#weight").val();
  formData.height = $("#height").val();

  if (formData.breed && formData.name && formData.weight && formData.height) {
    console.log("Form Data Submitted: ", formData);
    doCalculate(formData);
  } else {
    alert("Form data is incomplete. Please fill in all fields.");
  }
};

// get standard weight and height from database and calculate pet's health status and then show the result
const doCalculate = (pet) => {
  let weightMin, weightMax, heightMin, heightMax, weightStatus, heightStatus, html;

  const breed = pet.breed; 
  const url = `/api/Standard?email=${encodeURIComponent(breed)}`;

  $.get(url, (response) => {
    if(response.statusCode === 200){
      weightMin = response.data.weightMin;
      weightMax = response.data.weightMax;
      heightMin = response.data.heightMin;
      heightMax = response.data.heightMax;
    }
  });

  if (parseInt(pet.weight) < weightMin) {
    weightStatus = `${pet.name}'s weight is lower than standard, `;
  } else if (parseInt(pet.weight) > weightMax) {
    weightStatus = `${pet.name} is overweight, `;
  } else {
    weightStatus = `${pet.name}'s weight is normal, `;
  }

  if (parseInt(pet.height) < heightMin) {
    heightStatus = `and ${pet.name}'s height is  lower than standard.`;
  } else if (parseInt(pet.weight) > heightMax) {
    heightStatus = `and ${pet.name}'s height is  higher than standard.`;
  } else {
    heightStatus = `and ${pet.name}'s height is normal.`;
  }

  pet.date = new Date().toLocaleDateString("en-US"); //set the formate of date (5/16/2023);
  pet.status = weightStatus + heightStatus;
  pet.email = localStorage.getItem("user_email");
  html = "<h4>" + pet.status + "</h4>";
  $("#result").append(html);

  addHistory(pet);
};

//uses jQuery's ajax function to send an HTTP POST request to the api/History URL endpoint.
const addHistory = (history) => {
  $.ajax({
    url: "api/History",
    data: history,
    type: "POST",
  });
};

// get history who has the same user email
const searchHistory = () => {
  const userEmail = localStorage.getItem("user_email"); 
  const url = `/api/History?email=${encodeURIComponent(userEmail)}`;

  $.get(url, (response) => {
    if(response.statusCode === 200){
      addTable(response.data);
    }
  });
};

// Adds history who has the corresponding date to the table
const addTable = (items) => {
  let itemToAppend = "";
  let date = new Date();
  let period = $("#period").val();

  switch (period) {
    case "week":
      date.setDate(date.getDate() - 7);
      break;
    case "month":
      date.setDate(date.getDate() - 30);
      break;
    case "three-month":
      date.setDate(date.getDate() - 90);
      break;
    case "all":
      date = new Date("1970-01-01");
      break;
  }

  items.forEach(item => {
    if (new Date(item.date) >= date) {
      itemToAppend += `<tr><td>${item.name}</td><td>${item.breed}</td><td>${item.weight}</td><td>${item.height}</td><td>${item.status}</td><td>${item.date}</td></tr>`;
    }
  });
  document.getElementById("table-body").innerHTML = itemToAppend;
};

// Get the <span> element that closes the modal
$(".close").on("click", function () {
  hideModal("myModal");
});

// When the user clicks the button, open the modal
$("#user-calculate-btn").on("click", function () {
  $("select").formSelect();
  displayModal("myModal");
  updateUserInfo("myModal");
});

$(document).ready(function () {
  $(".materialboxed").materialbox();
  $("select").formSelect();

  $("#calculate").click(() => {
    calculateForm();
  });
  $("#requireHistory").click(() => {
    searchHistory();
  });
});

/*
Roy's work
*/
// Functions to display and hide modals
function displayModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Function to validate phone number
function validatePhoneNumber(phoneNumber) {
  if (phoneNumber) {
    var re = /^\d+$/;
    return re.test(phoneNumber);
  } else {
    return true;
  }
}
//Positioning User Form
$(document).ready(function () {
  $.ajax({
    url: "/api/Users",
    type: "GET",
    success: (result) => {
      if (result && result.data && result.data.length > 0) {
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].email == localStorage.getItem("user_email")) {
            var Users = result.data[i];
          }
        }
        document.querySelector(
          "#username"
        ).innerText = `Name: ${Users.username}`;
        document.querySelector(
          "#birthday"
        ).innerText = `Birthday: ${Users.birthday}`;
        document.querySelector("#gender").innerText = `Gender: ${Users.gender}`;
        document.querySelector("#email").innerText = `Email: ${Users.email}`;
        document.querySelector("#phone").innerText = `Phone: ${Users.phone}`;
      }
    },
    error: (error) => console.log(error),
  });

  //Positioning Pet Form
  $.ajax({
    url: "/api/Pets",
    type: "GET",
    success: (result) => {
      console.log(result);
      if (result && result.data && result.data.length > 0) {
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].email == localStorage.getItem("user_email")) {
            var Pets = result.data[i];
          }
        }
        document.querySelector("#pet-name").innerText = `Name: ${Pets.petName}`;
        document.querySelector("#pet-type").innerText = `Type: ${Pets.petType}`;
        document.querySelector(
          "#pet-breed"
        ).innerText = `Breed: ${Pets.petBreed}`;
        document.querySelector("#pet-age").innerText = `Age: ${Pets.petAge}`;
        document.querySelector(
          "#pet-gender"
        ).innerText = `Gender: ${Pets.petGender}`;
        document.querySelector(
          "#pet-weight"
        ).innerText = `Weight: ${Pets.petWeight}`;
      }
    },
  });
});

// Function to update user information
function updateUserInfo(modalId) {
  document
    .querySelector("#user-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const Users = {
        username: document.querySelector("#user-form #username").value,
        birthday: document.querySelector("#user-form #birthday").value,
        gender: document.querySelector("#user-form #gender").value,
        email: localStorage.getItem("user_email"),
        phone: document.querySelector("#user-form #phone").value,
      };

      if (!validatePhoneNumber(Users.phone)) {
        alert("Please enter a valid phone number.");
        return;
      }
      $.ajax({
        url: "/api/Users",
        type: "POST",
        data: JSON.stringify(Users),
        headers: {
          "Content-Type": "application/json",
        },
        success: (result) => {
          if (result.statusCode === 200) {
            alert("User information has been successfully stored.");
            hideModal(modalId);
          } else {
            console.log(result);
          }
        },
        error: (error) => console.log(error),
      });
    });
}

// Function to update pet information
function updatePetInfo(modalId) {
  document
    .querySelector("#pet-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const Pets = {
        petName: document.querySelector("#pet-form #pet-name").value,
        petType: document.querySelector("#pet-form #pet-type").value,
        petBreed: document.querySelector("#pet-form #pet-breed").value,
        petAge: document.querySelector("#pet-form #pet-age").value,
        petGender: document.querySelector("#pet-form #pet-gender").value,
        petWeight: document.querySelector("#pet-form #pet-weight").value,
        email: localStorage.getItem("user_email"),
      };

      $.ajax({
        url: "/api/Pets",
        type: "POST",
        data: JSON.stringify(Pets),
        headers: {
          "Content-Type": "application/json",
        },
        success: (result) => {
          if (result.statusCode === 200) {
            alert("User information has been successfully stored.");
            hideModal(modalId);
          } else {
            console.log(result);
          }
        },
        error: (error) => console.log(error),
      });
    });
}
// Get the <span> element that closes the modal
$(".close").on("click", function () {
  hideModal("userModal");
  hideModal("petModal");
});

// When the user clicks the button, open the modal
$("#user-edit-btn").on("click", function () {
  $("select").formSelect();
  displayModal("userModal");
  updateUserInfo("userModal");
});

$("#pet-edit-btn").on("click", function () {
  $("select").formSelect();
  displayModal("petModal");
  updatePetInfo("petModal");
});

/*
Ender's work
*/
//create a card container for an activity item
const createCardContainer = (item) => {
  let cardContainer = $("<div>").addClass("col s12 center-align card-container");
  let card = $("<div>").addClass("card medium");
  let cardContent = $("<div>").addClass("card-content");
  let cardRow = $("<div>").addClass("row valign-wrapper");
  let cardTime = $("<div>").addClass("col s4").text(item.time);
  let cardEvent = $("<div>").addClass("col s6").text(item.event);
  let deleteButton = $("<button>").addClass("col s2 delete-btn").text("Delete");
  let editButton = $("<button>").addClass("col s2 edit-btn").text("Edit");

  // Set data attribute to store MongoDB ID of the activity
  cardContainer.data("mongo-id", item._id);

  // Append elements to build the card container
  cardRow.append(cardTime, cardEvent, deleteButton, editButton);
  cardContent.append(cardRow);
  card.append(cardContent);
  cardContainer.append(card);

  return cardContainer;
};

//add activity content to the dataset
const addContentToDataset = (project) => {
  $.post("/api/Activity", project, (result) => {
    location.reload();
  });
};

//get activity content
const getContent = () => {
  const user_email = localStorage.getItem("user_email");
  $.get("/api/Activity", (response) => {
    if (response.statusCode === 200) {
      const activities = response.data;
      const storedContent = activities.filter((activity) => activity.email === user_email);
      storedContent.forEach(addContent);

      // Sort the content by time
      sortContentByTime();

      // Remove previously stored content
      localStorage.removeItem("storedContent");

      // Store new data to LocalStorage
      localStorage.setItem("storedContent", JSON.stringify(storedContent));

      // Call convertTimeToDatesAndStore with the storedContent array
      convertTimeToDatesAndStore(storedContent);
    }
  });
};

//convert time strings to Date objects and store the modified content
const convertTimeToDatesAndStore = (arrayName) => {
  // Convert the time in each object to a Date object
  for (var i = 0; i < arrayName.length; i++) {
    var timeParts = arrayName[i].time.split(":");
    var currentDate = new Date();
    currentDate.setHours(parseInt(timeParts[0], 10));
    currentDate.setMinutes(parseInt(timeParts[1], 10));
    arrayName[i].time = currentDate;

    console.log("Converted time:", arrayName[i].time);
  }

  // Store the modified object array in localStorage
  localStorage.setItem("storedContent", JSON.stringify(arrayName));
}

//update activity content
const updateContent = (projectId, updatedData) => {
  $.ajax({
    url: "/api/Activity",
    type: "PUT",
    data: { id: projectId, ...updatedData },
    success: (result) => {
      if (result.statusCode === 200) {
        location.reload();
      } else {
        console.log(result);
      }
    },
    error: (error) => console.log(error),
  });
};

$(document).ready(function () {
  $("select").formSelect();
  $(".modal").modal();

  getContent();

  $("#addingSubmit").one("click", submitaddingForm);
  $(document).on("click", ".delete-btn", deleteContent);
  $(document).on("click", ".edit-btn", openUpdateForm);
  $("#EditSubmit").click(updateSubmit);
});

//handle submit event of adding form
const submitaddingForm = () => {
  const user_email = localStorage.getItem("user_email");
  let formData = { email: user_email };
  formData.time = $("#time").val();
  formData.event = $("#event").val();

  if (!formData.time || !formData.event) {
    alert("Please fill out both time and event fields.");
    return;
  }

  let cardContainer = createCardContainer(formData);
  $("#card-section").append(cardContainer);
  addContentToDataset(formData);
  $("#modal1").modal("close");
};

//add activity content to the page
const addContent = (item) => {
  let cardContainer = createCardContainer(item);
  $("#card-section").append(cardContainer);
};

//sort activity content by time
const sortContentByTime = () => {
  let $cardSection = $("#card-section");
  let $cards = $cardSection.children(".card-container");

  let sortedCards = $cards.sort((a, b) => {
    let timeA = $(a).find(".row .col.s4").text();
    let timeB = $(b).find(".row .col.s4").text();

    return timeA.localeCompare(timeB);
  });

  $cardSection.append(sortedCards);
};

//delete activity content
const deleteContent = function () {
  let projectId = $(this).closest(".card-container").data("mongo-id");

  $.ajax({
    url: "/api/Activity",
    type: "DELETE",
    data: { id: projectId },
    success: function (result) {
      console.log(result);
      $(this).closest(".card-container").remove();
      location.reload();
    },
    error: function (error) {
      console.log(error);
    },
  });
};

//open the update form for editing activity content
const openUpdateForm = function () {
  let projectId = $(this).closest(".card-container").data("mongo-id");
  let currentTime = $(this).closest(".row").find(".col.s4").text();
  let currentEvent = $(this).closest(".row").find(".col.s6").text();

  $("#modal2 #time").val(currentTime);
  $("#modal2 #event").val(currentEvent);

  $("#modal2").data("project-id", projectId);
  $("#modal2").modal("open");
};

//handle update form submission
const updateSubmit = function () {
  let projectId = $("#modal2").data("project-id");
  let updatedData = {time: $("#modal2 #time").val(),event: $("#modal2 #event").val()};

  if (!updatedData.time || !updatedData.event) {
    alert("Please fill out both time and event fields.");
    return;
  }

  updateContent(projectId, updatedData);
  $("#modal2").modal("close");
};

const socket = io();

//remind upcoming event
function remindEventStart() {
  var storedContentString = localStorage.getItem("storedContent");
  var storedContent = JSON.parse(storedContentString);

  // Get the current date and time
  var currentDate = new Date();

  // Check for upcoming events
  for (var i = 0; i < storedContent.length; i++) {
    var eventTime = new Date(storedContent[i].time); 
    var timeDifference = eventTime.getTime() - currentDate.getTime(); 

    // Check if the event is upcoming (within 2 minutes)
    if (timeDifference > 0 && timeDifference <= 120000) {
      var eventName = storedContent[i].event;
      var eventStartTime = eventTime;

      // Check if the event has already been reminded
      if (!storedContent[i].reminded) {
        alert("Event will start at " + eventStartTime.getHours() + ":" + eventStartTime.getMinutes() + " Activity " + eventName);
        storedContent[i].reminded = true; 
      }
    } else {
      console.log("No upcoming event:");

      // Remove the event if it has already been reminded
      if (storedContent[i].reminded) {
        storedContent.splice(i, 1);
        i--;
      }
    }
  }
  localStorage.setItem("storedContent", JSON.stringify(storedContent)); 
}

// Call remindEventStart every 1 second
setInterval(remindEventStart, 1000); 

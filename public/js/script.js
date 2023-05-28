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
    url: "/api/userinfo",
    type: "GET",
    success: (result) => {
      if (result && result.data && result.data.length > 0) {
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].email == localStorage.getItem("user_email")) {
            var userInfo = result.data[i];
          }
        }
        document.querySelector(
          "#username"
        ).innerText = `Name: ${userInfo.username}`;
        document.querySelector(
          "#birthday"
        ).innerText = `Birthday: ${userInfo.birthday}`;
        document.querySelector(
          "#gender"
        ).innerText = `Gender: ${userInfo.gender}`;
        // let tempEmail = localStorage.getItem("user_email");
        document.querySelector("#email").innerText = `Email: ${userInfo.email}`;
        // document.querySelector("#email").innerText = "Email:" + tempEmail;
      }
    },
    error: (error) => console.log(error),
  });

  //Positioning Pet Form
  $.ajax({
    url: "/api/petinfo",
    type: "GET",
    success: (result) => {
      console.log(result);
      if (result && result.data && result.data.length > 0) {
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].email == localStorage.getItem("user_email")) {
            var petInfo = result.data[i];
          }
        }
        document.querySelector(
          "#pet-name"
        ).innerText = `Name: ${petInfo.petName}`;
        document.querySelector(
          "#pet-type"
        ).innerText = `Type: ${petInfo.petType}`;
        document.querySelector(
          "#pet-breed"
        ).innerText = `Breed: ${petInfo.petBreed}`;
        document.querySelector("#pet-age").innerText = `Age: ${petInfo.petAge}`;
        document.querySelector(
          "#pet-gender"
        ).innerText = `Gender: ${petInfo.petGender}`;
        document.querySelector(
          "#pet-weight"
        ).innerText = `Weight: ${petInfo.petWeight}`;
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
      const userInfo = {
        username: document.querySelector("#user-form #username").value,
        birthday: document.querySelector("#user-form #birthday").value,
        gender: document.querySelector("#user-form #gender").value,
        email: localStorage.getItem("user_email"),
        phone: document.querySelector("#user-form #phone").value,
      };

      if (!validatePhoneNumber(userInfo.phone)) {
        alert("Please enter a valid phone number.");
        return;
      }
      $.ajax({
        url: "/api/userinfo",
        type: "POST",
        data: JSON.stringify(userInfo),
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
      const petInfo = {
        petName: document.querySelector("#pet-form #pet-name").value,
        petType: document.querySelector("#pet-form #pet-type").value,
        petBreed: document.querySelector("#pet-form #pet-breed").value,
        petAge: document.querySelector("#pet-form #pet-age").value,
        petGender: document.querySelector("#pet-form #pet-gender").value,
        petWeight: document.querySelector("#pet-form #pet-weight").value,
        email: localStorage.getItem("user_email"),
      };

      $.ajax({
        url: "/api/petinfo",
        type: "POST",
        data: JSON.stringify(petInfo),
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
  $("#userModal").css("display", "none");
  $("#petModal").css("display", "none");
});

// When the user clicks the button, open the modal
// var userEditBtn = document.querySelector("#user-edit-btn");
// var petEditBtn = document.querySelector("#pet-edit-btn");
$("#user-edit-btn").on("click", function () {
  $("select").formSelect();
  $("#userModal").css("display", "block");
});
$("#pet-edit-btn").on("click", function () {
  $("select").formSelect();
  $("#petModal").css("display", "block");
});

// userEditBtn.addEventListener("click", function () {
//   updateUserInfo("userModal");
// });

// petEditBtn.addEventListener("click", function () {
//   updatePetInfo("petModal");
// });

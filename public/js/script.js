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
  var re = /^\d+$/;
  return re.test(phoneNumber);
}

fetch("/api/userinfo")
  .then((response) => response.json())
  .then((data) => {
    if (data && data.data && data.data.length > 0) {
      const userInfo = data.data[0];
      document.querySelector(
        "#username"
      ).innerText = `Name: ${userInfo.username}`;
      document.querySelector(
        "#birthday"
      ).innerText = `Birthday: ${userInfo.birthday}`;
      document.querySelector(
        "#gender"
      ).innerText = `Gender: ${userInfo.gender}`;
      document.querySelector("#email").innerText = `Email: ${userInfo.email}`;
      document.querySelector(
        "#phone"
      ).innerText = `Phone Number: ${userInfo.phone}`;
      if (userInfo && userInfo.photo) {
        document.querySelector("#photo-preview").src = userInfo.photo;
      }
    }
  });

// Function to update user information
function updateUserInfo(modalId) {
  // displayModal(modalId);
  document
    .querySelector("#user-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const userInfo = {
        username: document.querySelector("#user-form #username").value,
        birthday: document.querySelector("#user-form #birthday").value,
        gender: document.querySelector("#user-form #gender").value,
        email: document.querySelector("#user-form #email").value,
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
  // displayModal(modalId);

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
var userEditBtn = document.querySelector("#user-edit-btn");
var petEditBtn = document.querySelector("#pet-edit-btn");
$("#user-edit-btn").on("click", function () {
  $("select").formSelect();
  $("#userModal").css("display", "block");
});
$("#pet-edit-btn").on("click", function () {
  $("select").formSelect();
  $("#petModal").css("display", "block");
});

userEditBtn.addEventListener("click", function () {
  updateUserInfo("userModal");
});

petEditBtn.addEventListener("click", function () {
  updatePetInfo("petModal");
});

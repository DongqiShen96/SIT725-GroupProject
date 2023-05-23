// Get the modal
var userModal = document.getElementById("userModal");
var petModal = document.getElementById("petModal");

// Get the button that opens the modal
var userBtn = document.getElementById("user-edit-btn");
var petBtn = document.getElementById("pet-edit-btn");

// Get the <span> element that closes the modal
var spans = document.getElementsByClassName("close");

// When the user clicks the button, open the modal
userBtn.onclick = function () {
  userModal.style.display = "block";
};

petBtn.onclick = function () {
  petModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < spans.length; i++) {
  spans[i].onclick = function () {
    if (userModal.style.display === "block") {
      userModal.style.display = "none";
    }
    if (petModal.style.display === "block") {
      petModal.style.display = "none";
    }
  };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == userModal) {
    userModal.style.display = "none";
  }
  if (event.target == petModal) {
    petModal.style.display = "none";
  }
};

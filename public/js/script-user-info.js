// User information
// Add img
let imgUrl;
fetch("/api/userinfo")
  .then((response) => response.json())
  .then((data) => {
    const userInfo = data.data[0];
    if (userInfo && userInfo.photo) {
      document.querySelector("#photo-preview").src = userInfo.photo;
    }
  });
document.getElementById("upload-button").addEventListener("click", function () {
  document.getElementById("photo").click();
});
document.getElementById("photo").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    document.getElementById("photo-preview").src = reader.result;
    // send file to server
    const formData = new FormData();
    formData.append("user-info-img", file);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        imgUrl = data.imgUrl;
        document.querySelector(".user-info-img").src = imgUrl;
      })
      .catch((error) => console.error(error));
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});
// Submit information
document
  .querySelector("#user-submit-btn")
  .addEventListener("click", function () {
    const userInfo = {
      username: document.querySelector("#first-name").value,
      birthday: document.querySelector("#birthday").value,
      gender: document.querySelector("#gender").value,
      email: document.querySelector("#email").value,
      phone: document.querySelector("#phone").value,
      photo: imgUrl,
    };

    fetch("/api/userinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User info:", data);
        alert("User information has been successfully stored.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function submitClick() {
  alert("Thanks for Submit information!");
}

const submitFormSignIn = () => {
  let formData = {};
  let email1 = $('#email').val();
  let pw1 = $('#password').val();
  let pw2 = $('#confirm_password').val();
  
  //email check
  let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if(!emailRegex.test(email1)) {
    alert("Email is not valid");
    return;
  }

  //Pw check
  if (pw1 !== pw2) {
    alert("Not matched")
    return;
  }
  
  formData.email = $('#email').val();
  formData.password = $('#password').val();
  // Print for test
  console.log('form data: ', formData);
  // Server update
  createUser(formData)
}

const createUser = (user) => {
  $.ajax({
      url: 'api/user',
      data: user,
      type: 'POST',
      success: (result) => {
          alert(result.message);
          window.location.href = 'login.html'; // Redirect to another page
      }
  });
}

$(document).ready(function(){
  $('#signup').click(()=>{
    submitFormSignIn();
  })
});

// It's uglily now. I'll store the data to database and retrieve them when do coculation.
const breedData = {
    GoldenRetriever: {
      weight: { min: 25, max: 36 },
      height: { min: 51, max: 61 }
    },
    GermanShepherd: {
      weight: { min: 22, max: 40 },
      height: { min: 55, max: 65 }
    },
    FrenchBulldog: {
      weight: { min: 8, max: 14 },
      height: { min: 28, max: 33 }
    },
    LabradorRetriever: {
      weight: { min: 29, max: 36 },
      height: { min: 55, max: 62 }
    },
    Poodle: {
      weight: { min: 4, max: 8 },
      height: { min: 28, max: 38 }
    },
    BritishShorthair: {
      weight: { min: 4, max: 7 },
      height: { min: 30, max: 33 }
    },
    Persian: {
      weight: { min: 3, max: 7 },
      height: { min: 25, max: 30 }
    },
    Sphynx: {
      weight: { min: 3, max: 5 },
      height: { min: 20, max: 25 }
    },
    Bengal: {
      weight: { min: 4, max: 7 },
      height: { min: 25, max: 36 }
    },
    MaineCoon: {
      weight: { min: 5, max: 11 },
      height: { min: 25, max: 41 }
    },
  };
  


// when the 'formSubmit' bottom clicked, get form data from web and do calculate
const submitForm = () => {
    let formData = {};
    formData.breed = $('#breed').val();
    formData.name = $('#name').val();
    formData.weight = $('#weight').val();
    formData.height = $('#height').val();

    console.log("Form Data Submitted: ", formData);

    doCalculate(formData);
}

// calculate pet's health status and then show the result in modal
const doCalculate = (pet) => {
    let weightStatus, heightStatus, html;

    const weightData = breedData[pet.breed].weight;
    const heightData = breedData[pet.breed].height;

    if (parseInt(pet.weight) < weightData.min){
        weightStatus = `${pet.name}'s weight is lower than standard, `;
    } else if (parseInt(pet.weight) > weightData.max) {
        weightStatus = `${pet.name} is overweight, `;
    } else {
        weightStatus = `${pet.name}'s weight is normal, `;
    }

    if (parseInt(pet.height) < heightData.min){
        heightStatus = `and ${pet.name}'s height is  lower than standard.`;
    } else if (parseInt(pet.weight) >  heightData.max) {
        heightStatus = `and ${pet.name}'s height is  higher than standard.`;
    } else {
        heightStatus = `and ${pet.name}'s height is normal.`;
    }

    pet.date = new Date();
    pet.status = weightStatus + heightStatus;

    html = "<h3>" + pet.status + "</h3>";
    $("#result").append(html);

    //addHistory(pet);
}

$(document).ready(function () {
    $('#formSubmit').click(() => {
        submitForm();
    });
});


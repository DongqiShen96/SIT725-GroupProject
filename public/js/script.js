let user_email;

//Trung's work: Sign-up
const submitFormSignIn = () => {
  let formData = {};
  let email1 = $('#email').val();
  let pw1 = $('#password').val();
  let pw2 = $('#confirm_password').val();

  //email check
  let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email1)) {
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

$(document).ready(function () {
  $('#signup').click(() => {
    submitFormSignIn();
  })
});

//Trung's work - Login
const submitLoginForm = () => {
  let formData = {};
  let email = $('#email').val();

  //email check
  let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    alert("Email is not valid");
    return;
  }

  formData.email = $('#email').val();
  formData.password = $('#password').val();
  // Print for test
  console.log('form data: ', formData);
  // Server update
  loginUser(formData);
}

const loginUser = (user) => {
  $.ajax({
    url: 'api/login',
    data: user,
    type: 'POST',
    success: (result) => {
      if (result.statusCode === 200) {
        localStorage.setItem('user_email', user.email);
        alert(user_email)
        window.location.href = 'main.html'; // Redirect to another page
      } else {
        alert(result.message);
      }
    }
  });
}

$(document).ready(function () {
  $('#login').click(() => {
    submitLoginForm();
  })
});

//I'll store the data to database and retrieve them when do coculation.
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





// calculate pet's health status and then show the result in modal
const doCalculate = (pet) => {
  let weightStatus, heightStatus, html;

  const weightData = breedData[pet.breed].weight;
  const heightData = breedData[pet.breed].height;

  if (parseInt(pet.weight) < weightData.min) {
    weightStatus = `${pet.name}'s weight is lower than standard, `;
  } else if (parseInt(pet.weight) > weightData.max) {
    weightStatus = `${pet.name} is overweight, `;
  } else {
    weightStatus = `${pet.name}'s weight is normal, `;
  }

  if (parseInt(pet.height) < heightData.min) {
    heightStatus = `and ${pet.name}'s height is  lower than standard.`;
  } else if (parseInt(pet.weight) > heightData.max) {
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
  $('.materialboxed').materialbox();
  $('select').formSelect();

  $('#formSubmit').click(() => {
    submitaddingForm();
  });
});

//add activity
const createCardContainer = (item) => {
  let cardContainer = $('<div>').addClass('col s12 center-align card-container');
  let card = $('<div>').addClass('card medium');
  let cardContent = $('<div>').addClass('card-content');
  let cardRow = $('<div>').addClass('row valign-wrapper');
  let cardTime = $('<div>').addClass('col s4').text(item.time);
  let cardEvent = $('<div>').addClass('col s6').text(item.event);
  let deleteButton = $('<button>').addClass('col s2 delete-btn').text('Delete');
  let editButton = $('<button>').addClass('col s2 edit-btn').text('Edit');

  cardContainer.data('mongo-id', item._id);
  cardRow.append(cardTime, cardEvent, deleteButton, editButton);
  cardContent.append(cardRow);
  card.append(cardContent);
  cardContainer.append(card);

  return cardContainer;
};

const addContentToDataset = (project) => {
  $.post('/api/Activity', project, (result) => {
    location.reload();
  });
};

const getContent = () => {
  const user_email = localStorage.getItem('user_email');
  $.get('/api/Activity', (response) => {
    if (response.statusCode === 200) {
      const activities = response.data;
      activities
        .filter(activity => activity.email === user_email)
        .forEach(addContent);
      sortContentByTime();
    }
  });
};

const updateContent = (projectId, updatedData) => {
  $.ajax({
    url: '/api/Activity',
    type: 'PUT',
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
  $('select').formSelect();
  $('.modal').modal();

  getContent();

  $('#addingSubmit').one('click', submitaddingForm);
  $(document).on('click', '.delete-btn', deleteContent);
  $(document).on('click', '.edit-btn', openUpdateForm);
  $('#EditSubmit').click(updateSubmit);
});

const submitaddingForm = () => {
  const user_email = localStorage.getItem('user_email');
  let formData = { email: user_email };
  formData.time = $('#time').val();
  formData.event = $('#event').val();

  if (!formData.time || !formData.event) {
    alert("Please fill out both time and event fields.");
    return;
  }

  let cardContainer = createCardContainer(formData);
  $('#card-section').append(cardContainer);
  addContentToDataset(formData);
  $('#modal1').modal('close');
};

const addContent = (item) => {
  let cardContainer = createCardContainer(item);
  $('#card-section').append(cardContainer);
};

const sortContentByTime = () => {
  let $cardSection = $('#card-section');
  let $cards = $cardSection.children('.card-container');

  let sortedCards = $cards.sort((a, b) => {
    let timeA = $(a).find('.row .col.s4').text();
    let timeB = $(b).find('.row .col.s4').text();

    return timeA.localeCompare(timeB);
  });

  $cardSection.append(sortedCards);
};

//delete activity
const deleteContent = function () {
  let projectId = $(this).closest('.card-container').data('mongo-id');

  $.ajax({
    url: '/api/Activity',
    type: 'DELETE',
    data: { id: projectId },
    success: function (result) {
      console.log(result);
      $(this).closest('.card-container').remove();
      location.reload();
    },
    error: function (error) {
      console.log(error);
    }
  });
};

//update activity
const openUpdateForm = function () {
  let projectId = $(this).closest('.card-container').data('mongo-id');
  let currentTime = $(this).closest('.row').find('.col.s4').text();
  let currentEvent = $(this).closest('.row').find('.col.s6').text();

  $('#modal2 #time').val(currentTime);
  $('#modal2 #event').val(currentEvent);

  $('#modal2').data('project-id', projectId);
  $('#modal2').modal('open');
};

const updateSubmit = function () {
  let projectId = $('#modal2').data('project-id');
  let updatedData = {
    time: $('#modal2 #time').val(),
    event: $('#modal2 #event').val()
  };

  if (!updatedData.time || !updatedData.event) {
    alert("Please fill out both time and event fields.");
    return;
  }

  updateContent(projectId, updatedData);
  $('#modal2').modal('close');
};




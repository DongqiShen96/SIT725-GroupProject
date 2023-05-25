const submitForm = () => {
  let formData = {};
  formData.username = $('#username').val();
  formData.password = $('#password').val();
  // Print for test
  console.log('form data: ', formData);
  // Server update
  createUser(formData)
}

const addCat = (cat) => {
  $.ajax({
      url: 'api/cats',
      data: cat,
      type: 'POST',
      success: (result) => {
          alert(result.message);
          location.reload(); //Page reload
      }
  });
}


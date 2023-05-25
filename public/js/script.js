const submitForm = () => {
  let formData = {};
  formData.username = $('#username').val();
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
          location.reload(); //Page reload
      }
  });
}

$(document).ready(function(){
  $('.materialboxed').materialbox();
  $('.modal').modal();

  getCats();
  $('#formSubmit').click(()=>{
      submitForm();
  })
});
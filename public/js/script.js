const submitForm = () => {
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
          location.reload(); //Page reload
      }
  });
}

$(document).ready(function(){
  $('#signup').click(()=>{
      console.log(1);
      submitForm();
  })
});
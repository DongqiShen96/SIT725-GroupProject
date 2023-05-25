const submitLoginForm = () => {
  let formData = {};
  let email1 = $('#email').val();
  
  //email check
  let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if(!emailRegex.test(email1)) {
    alert("Email is not valid");
    return;
  }

  formData.email1 = $('#email').val();
  formData.password = $('#password').val();
  // Print for test
  console.log('form data: ', formData);
  // Server update
  loginUser(formData)
}

$(document).ready(function(){
  $('#login').click(()=>{
      console.log(1)
      submitLoginForm();
  })
});
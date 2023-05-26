const submitLoginForm = () => {
  let formData = {};
  let email = $('#email').val();
  
  //email check
  let emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if(!emailRegex.test(email)) {
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
        if(result.statusCode === 200) {
            localStorage.setItem('email', result.email); // Save email to localStorage
            alert(result.message);
            window.location.href = 'main.html'; // Redirect to another page
        } else {
            alert(result.message);
        }
    }
  });
}


$(document).ready(function(){
  $('#login').click(()=>{
      submitLoginForm();
  })
});
const registerUser = function (event){ 
    event.preventDefault();
    const username = $('#reg-username').val().trim();
    const password = $('#reg-password').val().trim();
  
    $.post('api/user',{username: username, password: password})
    .then(function(data){
      console.log(data);
    })
  }
  
  $('#register-btn').on('click', registerUser);
  
  /**
   * Login Users
   */
  
  const loginUser = function (event){ 
    event.preventDefault();
    const username = $('#login-username').val().trim();
    const password = $('#login-password').val().trim();
  
    $.post('api/session',{username: username, password: password})
    .then(function(data){
      if(data[0]._id){
        sessionStorage.setItem('token', data[0]._id)
        window.location.href = "index.html";
      }
    })
  }
  
  $('#login-btn').on('click', loginUser);
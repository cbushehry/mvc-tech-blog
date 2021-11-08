async function loginFormHandler(event) {

    event.preventDefault();
    console.log("botton clicked")
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
      if (username !== "" && password !== "") {
  
        if (username && password) {
          const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
              username,
              password
            }),
            headers: { 'Content-Type': 'application/json' }
          });
  
          if (response.ok) {
              // go back to homepage after loggin in
            document.location.replace('/');
          } else {
            // alert(response.statusText);
            alert("Username/password combination does not exist, please try again or sign up instead.");
          }
        }
      } else {
  
        if (username === "" && password === "") {
          alert("Please enter a username and password, then submit")
        } else if (username === "") {
          alert("Please enter a username, then submit")
        } else if (password === "") {
          alert("Please enter a password, then submit")
        } else {
          // Do nothing
        }
  
      }
  }
  
    
    
    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
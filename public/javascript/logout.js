async function logout(event) {
    event.preventDefault();
    
      const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
      });
  
    
      if (response.ok) {
        alert("Logging you out")
        document.location.replace('/');
      } else {
        alert("You are already logged out")
      }
    }
    
    document.querySelector('#logout').addEventListener('click', logout);
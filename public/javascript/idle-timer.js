function idleLogout() {
    var timmer;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer;  // catches touchscreen presses as well      
    window.ontouchstart = resetTimer; // catches touchscreen swipes as well 
    window.onclick = resetTimer;      // catches touchpad clicks as well
    window.onkeydown = resetTimer;   
    window.addEventListener('scroll', resetTimer, true); // 
  
    async function logout() {

        alert("You have been idle for 5 minutes, logging you out.")

        const response = await fetch('/api/users/logout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
          });
      
        
          if (response.ok) {
            //console.log("response of function log out good")
            alert("Logging you out")
            document.location.replace('/');
          } else {
            alert("You are already logged out")

          }

          
   
    }
  
    function resetTimer() {
        clearTimeout(timmer);
        timmer = setTimeout(logout, 300000);  // will automatically log you out in 5 minutes.
    }
  }
  idleLogout();
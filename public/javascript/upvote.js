async function upvoteClickHandler(event) {
    event.preventDefault();
  
    // this is the address bar string used for the id.
    // user id is also required and will come from the back end.
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        //The Location. reload() method reloads the current URL
        document.location.reload();
      } else {
        alert("You are not allowed to upvote twice on same post.")
        //alert(response.statusText);
      }
  }
  
  document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);
async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const contents = document.querySelector('textarea[name="post-contents"]').value.trim();
    console.log("we are here")


    if (title !== "" && contents !== "") {
  
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          contents
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    } else {

      if (title === "" && contents === "") {
        alert("Please enter a title and description, then submit")
      } else if (title === "") {
        alert("Please enter a title, then submit")
      } else if (contents === "") {
        alert("Please enter a description, then submit")
      } else {
        // Do nothing 
      }
    
  }

}


  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
async function editFormHandler(event) {
    event.preventDefault();

  
    const title = document.querySelector('input[name="post-title"]').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const contents = document.querySelector('textarea[name="post-contents"]').value.trim();

    if (title !== "" && contents !== "") {

        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            title,
            contents
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          document.location.replace('/dashboard/');
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
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
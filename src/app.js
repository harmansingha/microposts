import { http } from './http'
import { ui } from './ui';

const REQUEST = 'http://localhost:3000/posts';


document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('#posts').addEventListener('click', deletePost);
document.querySelector('#posts').addEventListener('click', changeEditState);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function cancelEdit(e) {
  e.preventDefault();
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}

function getPosts() {
  http.get(REQUEST)
    .then(posts => ui.showPosts(posts))
    .catch(err => console.log(err))
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  //Validation for fields
  if (title === '' || body === '') {
    ui.showAlert('Please fill all the fields', 'alert alert-danger');
  }
  else {
    const data = {
      title, body
    }

    if (id === '') {
      //Add post
      http.post(REQUEST, data)
        .then(success => {
          ui.clearFields();
          ui.showAlert('Post added', 'alert alert-success')
          getPosts();
        })
        .catch(err => console.log(err));
    }
    else {
      //Update Post
      http.put(`${REQUEST}/${id}`, data)
        .then(success => {
          ui.clearFields();
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    e.preventDefault();
    const id = e.target.parentElement.dataset.id;

    if (confirm('Do you really want to delete?')) {
      http.delete(`${REQUEST}/${id}`)
        .then(data => {
          ui.showAlert('Post delete', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));
    }

  }
}

function changeEditState(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const data = {
      title, body, id
    }

    ui.fillFormFields(data);
  }


}
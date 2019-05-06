class UI {

  constructor() {
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.hiddenId = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';
    posts.forEach((post) => {
      output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
          <i class="fa fa-pencil"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
          <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    });

    this.posts.innerHTML = output;
  }

  //Clear Fields
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  //Show Alert
  showAlert(message, className) {
    this.clearAlert();
    const alertDiv = document.createElement('div');
    alertDiv.className = className;
    alertDiv.append(document.createTextNode(message));

    const conatiner = document.querySelector('.postsContainer');
    const cardBody = document.querySelector('.card-body');
    conatiner.insertBefore(alertDiv, cardBody);

    setTimeout(() => this.clearAlert(), 3000);
  }

  clearAlert() {
    const alertDiv = document.querySelector('.alert');
    if (alertDiv) {
      alertDiv.remove();
    }
  }

  clearHiddenId() {
    this.hiddenId.value = '';
  }

  fillFormFields(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.hiddenId.value = data.id;
    this.changeFormState('edit');
  }

  changeFormState(state) {
    //Delete Cancel Button
    const cancelBtn = document.querySelector('.post-cancel');
    if (cancelBtn) {
      cancelBtn.remove();
    }

    if (state === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      //Add Cancel Button
      const cancelBtn = document.createElement('button');
      cancelBtn.append(document.createTextNode('Cancel'));
      cancelBtn.className = 'post-cancel btn btn-light btn-block';

      const cardBody = document.querySelector('.card-body');
      const formEnd = document.querySelector('.form-end');
      cardBody.insertBefore(cancelBtn, formEnd);
    } else if (state === 'add') {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';



      this.clearFields();
      this.clearHiddenId();
    }
  }
}





export const ui = new UI;
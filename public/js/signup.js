const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};
  
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};
  
const signup = async (name, email, password, passwordConfirm) => {

  const res = await fetch('http://127.0.0.1:8000/api/v1/users/signup', {
    
  // Adding method type
  method: "POST",
    
  // Adding body or contents to send
  body: JSON.stringify({
    name,
    email,
    password,
    passwordConfirm
  }),
    
  // Adding headers to the request
  headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
})
    
  // Converting to JSON
.then(response => response.json())
    
// Displaying results to console
.then(json => {
  //console.log(json);
  if (json.status === 'success') {
    showAlert('success', 'signup successfully!');
    window.setTimeout(() => {
    location.assign('/me');
  }, 1500);
  } else if (json.status === 'fail') {
    showAlert('error', json.message);
  }
  }).catch(() => {
    console.log('error');
  // Catch and display errors
  //showAlert('error', err.message);

});
}
  
  
const signupForm = document.querySelector('.form-signup');

if (signupForm) {
  signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordConfirm').value;
  signup(name, email, password, passwordConfirm);

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('passwordConfirm').value = '';
});
}
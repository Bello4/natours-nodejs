

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

const updateUser = document.getElementById('myForm');
if (updateUser)
updateUser.addEventListener('submit', async function (e) {

  e.preventDefault();

    const formData = new FormData(this);

    const res = await fetch("http://127.0.0.1:8000/api/v1/users/updateMe", {
       
     // Adding method type
     method: "PATCH",
       
     // Adding body or contents to send
     body: formData
       
     // Adding headers to the request
    //  headers: {
    //     "Content-Type": "application/text; charset=UTF-8"
    //     //  "Content-Type": "application/json",
    //     //  "Content-Security-Policy": "default-src 'self';"
    //  }
 })
   
 // Converting to JSON
 .then(response => response.json())
   
 // Displaying results to console
 .then(json => {
  //console.log(json);
   if (json.status === 'success') {
     showAlert('success', 'Data updated successfully!');
    } else {
     showAlert('error', json.message);
    }
  }).catch(err => {
   console.log(err);
     // Catch and display errors
     //showAlert('error', err.message);
     
 });
})
 

const resetPassword = async (passwordCurrent, password, passwordConfirm) => {

  const res = await fetch('http://127.0.0.1:8000/api/v1/users/updateMyPassword', {
     
   // Adding method type
   method: 'PATCH',
     
   // Adding body or contents to send
   body: JSON.stringify({
    passwordCurrent,
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
   showAlert('success', 'Password updated successfully!');
  } else {
   showAlert('error', json.message);
  }
}).catch(() => {
 //console.log('error');
   // Catch and display errors
   //showAlert('error', err.message);
   
});
}

const updatePassword = document.querySelector('.form-user-password');
if (updatePassword) 
updatePassword.addEventListener('submit', async e => {
  e.preventDefault();
  document.querySelector('.btn--save-password').textContent = 'updating...';

  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('passwordconfirm').value;
  await resetPassword(passwordCurrent, password, passwordConfirm);

  document.querySelector('.btn--save-password').textContent = 'Save password';
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('passwordconfirm').value = '';

});

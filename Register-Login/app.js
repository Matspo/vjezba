// Register user info
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const userEmail = document.getElementById("useremail1");
const userPassword = document.getElementById("userpassword1");
const formRegister = document.getElementById("registerform");
const modalRegister = document.getElementById("exampleModal1");
const successAlert = document.querySelector('.alert')
console.log(successAlert)
// Login user info
const formLogin = document.getElementById("loginform");
const userEmailLogin = document.getElementById("useremail2");
const userPasswordLogin = document.getElementById("userpassword2");
const modalLogin = document.getElementById("exampleModal2");
let usersArray = [];
getUsersArray();

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const successMessageSignUp = 'You have successfully Signed Up!'
  const user = {
    name: `${firstName.value}`,
    surname: `${lastName.value}`,
    email: `${userEmail.value}`,
    password: `${userPassword.value}`,
  };
  checkUppercaseName(user.name);
  checkUppercaseSurname(user.surname);
  validateEmail(user.email);
  validatePassword(user.password);
  if (checkregexName && checkregexSurname && validEmail && checkregexPassword) {
    usersArray.push(user);
    saveToLS(usersArray);
    resetForm();
    closeRegisterModal()
    alertSuccess(successMessageSignUp)
    setTimeout(removeAlertSuccess, 3000)
  } 
});
var alertList = document.querySelectorAll('.alert')
alertList.forEach(function (alert) {
  new bootstrap.Alert(alert)
})

function alertSuccess(text) {
  successAlert.classList.remove('fade')
  successAlert.classList.add('show')
  successAlert.innerText = text
}

function removeAlertSuccess() {
  var alertNode = document.querySelector('.alert')
var alert = bootstrap.Alert.getInstance(alertNode)
alert.close()
}

function saveToLS(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function resetForm() {
  firstName.value = "";
  lastName.value = "";
  userEmail.value = "";
  userPassword.value = "";
  firstName.className = "form-control mb-2";
  lastName.className = "form-control mb-2";
  userEmail.className = "form-control";
  userPassword.className = "form-control";
}
function closeRegisterModal() {
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal1")
  );

  modal.hide();
}

function findUser(user) {
  return user.name === "Matija";
}
// console.log(usersArray.find(findUser))

function getUsersArray() {
  const usersArrayLS = localStorage.getItem("users");
  if (usersArrayLS != null) {
    usersArray = JSON.parse(usersArrayLS);
  } else {
    usersArray = [];
  }
}

// Register Form Validation

let checkregexName = "";
let checkregexSurname = "";
let validEmail = "";
let checkregexPassword = "";

function checkUppercaseName(word) {
  const regex = /[A-Z]/;
  checkregexName = regex.test(word[0]);
  if (checkregexName) {
    firstName.className = "form-control mb-2 border border-success";
  } else {
    firstName.className = "form-control mb-2 border border-danger";
  }
}
function checkUppercaseSurname(word) {
  const regex = /[A-Z]/;
  checkregexSurname = regex.test(word[0]);
  if (checkregexSurname) {
    lastName.className = "form-control mb-2 border border-success";
  } else {
    lastName.className = "form-control mb-2 border border-danger";
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  validEmail = re.test(String(email).toLowerCase());
  if (validEmail) {
    userEmail.className = "form-control border border-success";
  } else {
    userEmail.className = "form-control border border-danger";
  }
  return validEmail;
}

function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  checkregexPassword = regex.test(password);

  if (checkregexPassword) {
    userPassword.className = "form-control border border-success";
  } else {
    userPassword.className = "form-control border border-danger";
  }
}

// Login Form Validation
function resetLoginForm() {
  userEmailLogin.value = ''
  userPasswordLogin.value = ''
  userEmailLogin.className = 'form-control'
  userPasswordLogin.className = 'form-control'
}

function closeLoginModal() {
  const modal1 = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal2")
  );

  modal1.hide();
}


formLogin.addEventListener('submit', (e) => {
  const succesMessageLogin = 'You have successfully Logged In!'
  e.preventDefault()
  let matchingEmail = usersArray.find(user => user.email === userEmailLogin.value)
  let matchingPassword = usersArray.find(user => user.password === userPasswordLogin.value)
  if(matchingEmail && matchingPassword) {
    userEmailLogin.className = 'form-control border border-success'
    userPasswordLogin.className = 'form-control border border-success'
    closeLoginModal()
    resetLoginForm()
    alertSuccess(succesMessageLogin)
    setTimeout(removeAlertSuccess, 3000)
  } else if (matchingEmail && !matchingPassword) {
    userEmailLogin.className = 'form-control border border-success'
    userPasswordLogin.className = 'form-control border border-danger'
  } else if(!matchingEmail && matchingPassword) {
    userEmailLogin.className = 'form-control border border-danger'
    userPasswordLogin.className = 'form-control border border-success'
  } else {
    userEmailLogin.className = 'form-control border border-danger'
    userPasswordLogin.className = 'form-control border border-danger'
  }
})

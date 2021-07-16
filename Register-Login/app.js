// Register user info
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const userEmail = document.getElementById("useremail1");
const userPassword = document.getElementById("userpassword1");
const formRegister = document.getElementById("registerform");
const modalRegister = document.getElementById("exampleModal1");


// Login user info
const formLogin = document.getElementById("loginform");
const userEmailLogin = document.getElementById("useremail2");
const userPasswordLogin = document.getElementById("userpassword2");
const modalLogin = document.getElementById("exampleModal2");
let usersArray = [];
getUsersArray();

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
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
  if (checkUppercaseName(user.name) && checkUppercaseSurname(user.surname) && validEmail && checkregexPassword) {
    usersArray.push(user);
    saveToLS(usersArray);
    resetForm();
    closeRegisterModal()
    registerAlert()
  } 
});

function registerAlert() {
  const registerAlert = document.querySelector('.alert')
  registerAlert.classList.add('show')
  setTimeout(() => {
    registerAlert.classList.remove('show')
  }, 3000)
}

function loginAlert() {
  const loginAlert = document.querySelector('.alert1')
  loginAlert.classList.add('show')
  setTimeout(() => {
    loginAlert.classList.remove('show')
  }, 3000)
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

let checkregexName = false;
let checkregexSurname = false;
let validEmail = false;
let checkregexPassword = false;

function checkUppercaseName(word) {
  const regex = /[A-ZČĆŠĐŽ]/;
  checkregexName = regex.test(word[0]);
  if (checkregexName) {
    firstName.className = "form-control mb-2 border border-success";
    return checkregexName
  } else {
    firstName.className = "form-control mb-2 border border-danger";
  }
}
function checkUppercaseSurname(word) {
  const regex = /[A-ZČĆŠĐŽ]/;
  checkregexSurname = regex.test(word[0]);
  if (checkregexSurname) {
    lastName.className = "form-control mb-2 border border-success";
    return checkregexName
  } else {
    lastName.className = "form-control mb-2 border border-danger";
  }
}

function validateEmail(email) {
  const infoText = document.getElementById('emailHelp')
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  validEmail = re.test(String(email).toLowerCase());
  const emailValue = userEmail.value
  const existingEmail = usersArray.find(user => user.email === emailValue)
  if(existingEmail) {
    infoText.innerText = 'Account with the same email already exists.'
  }
  if (validEmail && !existingEmail) {
    userEmail.className = "form-control border border-success";
    return validEmail
  } else {
    userEmail.className = "form-control border border-danger";
    return validEmail = false
  }


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
  e.preventDefault()
  let matching = usersArray.find(user => user.email === userEmailLogin.value && user.password === userPasswordLogin.value)
  let matchingEmail = usersArray.find(user => user.email === userEmailLogin.value)
  let matchingPassword = usersArray.find(user => user.password === userPasswordLogin.value)
  if(matching) {
    userEmailLogin.className = 'form-control border border-success'
    userPasswordLogin.className = 'form-control border border-success'
    closeLoginModal()
    resetLoginForm()
    loginAlert()
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

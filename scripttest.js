const addExpenseBtn = document.querySelector(".add-new-expense-btn");
const expensesContainer = document.querySelector(".expenses-container");
const form = document.querySelector(".expense-form");
const closeFormBtn = document.querySelector(".close-expense-btn");
const saveFormBtn = document.querySelector(".save-expense-btn");
const formExpInput = document.getElementById("exp-name");
const formExpValue = document.getElementById("exp-money");
const formIconBtns = document.querySelectorAll(".form-icon-btn");
const iconsContainer = document.querySelector(".form-icons");
let id = "";
const arr = Array.from(formIconBtns);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const date = new Date();
const day = date.getDate();
const nameOfMonth = monthNames[date.getMonth()];
const year = date.getFullYear();

const arrayOfKeys = Object.keys(localStorage);

renderUI();
function renderUI() {
arrayOfKeys.forEach(key => {
  let item = JSON.parse(localStorage.getItem(`${key}`))
  const expense = document.createElement("div");
      expense.classList.add("expense");
      expense.innerHTML = `
    <div class="expense-description-price">
                <p class="expense-description">${item[0]}</p>
                <input class="expense-price" type="text" readonly value="${item[1]}" />
              </div>
              <div class="expense-category-date">
                ${item[2]}
                <p class="expense-date">${day} ${nameOfMonth}</p>
              </div>
    `;
    const containerModal = document.createElement("div");
    containerModal.classList.add("edit-del-container");
    containerModal.innerHTML = `
  <button class="edit-del-btn edit-btn"><i class="far fa-edit"></i></button>
          <button class="edit-del-btn del-btn"><i class="far fa-trash-alt"></i></button>
  `;

  expense.appendChild(containerModal);
  expensesContainer.appendChild(expense)
  


  expense.addEventListener("mouseover", () => {
    containerModal.style.display = "flex";
  });
  expense.addEventListener("mouseout", () => {
    containerModal.style.display = "none";
  });
  })
  
  const exparr = Array.from(expensesContainer)
console.log(expensesContainer.children[2])
  const expenses = Array.from(document.querySelectorAll(".expense"));
  arrayOfKeys.forEach((key, index) => {
    const exp = expenses[index];
    exp.setAttribute("data-id", `${key}`);
  });

  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((btn) => {
    formExpInput.style.border = "1px solid var(--green)";
    formExpValue.style.border = "1px solid var(--green)";
    btn.addEventListener("click", () => {
      const parentExpense = btn.parentElement.parentElement;
      form.classList.add("active");
      form.children[1].value = parentExpense.children[0].innerText;
      form.children[3].value = parentExpense.children[0].children[1].value;

      arr.forEach((item) => {
        const expenseIcon = item.children[0].classList[1];
        const formIcon = parentExpense.children[1].children[0].classList[1];
        if (expenseIcon === formIcon) {
          item.classList.add("focus");
        } else {
          item.classList.remove("focus");
        }
      });
      parentExpense.remove();
      const idOfParentExpense = parentExpense.dataset.id;
      localStorage.removeItem(`${idOfParentExpense}`);
    });
  });
  
  const delBtns = Array.from(document.querySelectorAll(".del-btn"));
  delBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentExpense = btn.parentElement.parentElement;
      parentExpense.remove();
      const idOfParentExpense = parentExpense.dataset.id;
      localStorage.removeItem(`${idOfParentExpense}`);
    });
  });
}

arr.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeFocus();
    focusedIcon = e.target;
    focusedIcon.classList.add("focus");
  });
});

form.addEventListener("click", (e) => {
  e.preventDefault();
});

addExpenseBtn.addEventListener("click", () => {
  form.classList.add("active");
  refreshForm();
  let focusedIcon = arr[0];
  focusedIcon.classList.add("focus");
});

closeFormBtn.addEventListener("click", () => {
  form.classList.remove("active");
});

// Create edit and del buttons
function createEditDel() {
  const container = document.createElement("div");
  container.classList.add("edit-del-container");
  container.innerHTML = `
  <button class="edit-btn"><i class="far fa-edit"></i></button>
          <button class="del-btn"><i class="far fa-trash-alt"></i></button>
  `;
  expense.appendChild(container);
}
// Save form btn
saveFormBtn.addEventListener("click", () => {
  const expenseName = formExpInput.value;
  const expensePrice = formExpValue.value;
  if (!expenseName && !expensePrice) {
    formExpInput.style.border = "1px solid var(--red)";
    formExpValue.style.border = "1px solid var(--red)";
  } else if (expenseName && !expensePrice) {
    formExpValue.style.border = "1px solid var(--red)";
  } else if (!expenseName && expensePrice) {
    formExpInput.style.border = "1px solid var(--red)";
  } else {
    form.classList.remove("active");

    const expenseName = formExpInput.value;
    const expensePrice = formExpValue.value;
    const expense = document.createElement("div");
    const icon1 = document.querySelector(".focus").innerHTML;
    expense.classList.add("expense");
    id = Date.now();
    expense.setAttribute("data-id", `${id}`);
    const arrayLS = [`${expenseName}`, `${expensePrice}`, `${icon1}`];
    saveToLS(id, arrayLS);
    expense.innerHTML = `
    <div class="expense-description-price">
                <p class="expense-description">${expenseName}</p>
                <input class="expense-price" type="text" readonly value="${expensePrice}" />
              </div>
              <div class="expense-category-date">
                ${icon1}
                <p class="expense-date">${day} ${nameOfMonth}</p>
              </div>
    `;
    const containerModal = document.createElement("div");
    containerModal.classList.add("edit-del-container");
    containerModal.innerHTML = `
  <button class="edit-del-btn edit-btn"><i class="far fa-edit"></i></button>
          <button class="edit-del-btn del-btn"><i class="far fa-trash-alt"></i></button>
  `;
    expense.appendChild(containerModal);
    expensesContainer.appendChild(expense);
    const arrayOfExpenses = Array.from(document.querySelectorAll(".expense"));
    expensesContainer.insertBefore(expense, arrayOfExpenses[0]); 
    expense.addEventListener("mouseover", () => {
      containerModal.style.display = "flex";
    });
    expense.addEventListener("mouseout", () => {
      containerModal.style.display = "none";
    });
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn) => {
      formExpInput.style.border = "1px solid var(--green)";
      formExpValue.style.border = "1px solid var(--green)";
      btn.addEventListener("click", () => {
        const parentExpense = btn.parentElement.parentElement;
        form.classList.add("active");
        form.children[1].value = parentExpense.children[0].innerText;
        form.children[3].value = parentExpense.children[0].children[1].value;

        arr.forEach((item) => {
          const expenseIcon = item.children[0].classList[1];
          const formIcon = parentExpense.children[1].children[0].classList[1];
          if (expenseIcon === formIcon) {
            item.classList.add("focus");
          } else {
            item.classList.remove("focus");
          }
        });
        parentExpense.remove();
        const idOfParentExpense = parentExpense.dataset.id;
        localStorage.removeItem(`${idOfParentExpense}`);
      });
    });

    const delBtns = Array.from(document.querySelectorAll(".del-btn"));
    delBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const parentExpense = btn.parentElement.parentElement;
        parentExpense.remove();
        const idOfParentExpense = parentExpense.dataset.id;
        localStorage.removeItem(`${idOfParentExpense}`);
        console.log(idOfParentExpense);
      });
    });
  }
});

// Remove focus class
function removeFocus() {
  arr.forEach((btn) => {
    btn.classList.remove("focus");
  });
}

// Create expense
/* function createExpense() {
  const expenseName = formExpInput.value;
  const expensePrice = formExpValue.value;
  const expense = document.createElement("div");
  const icon1 = document.querySelector(".focus").innerHTML;
  expense.classList.add("expense");
  id = Date.now();
  expense.setAttribute("data-id", `${id}`);
  const arrayLS = [`${expenseName}`, `${expensePrice}`, `${icon1}`];
  saveToLS(id, arrayLS);
  getItemFromLS(id);
  expense.innerHTML = `
    <div class="expense-description-price">
                <p class="expense-description">${expenseName}</p>
                <input class="expense-price" type="text" readonly value="${expensePrice}" />
              </div>
              <div class="expense-category-date">
                ${icon1}
                <p class="expense-date">${day} ${nameOfMonth}</p>
              </div>
    `;
  const containerModal = document.createElement("div");
  containerModal.classList.add("edit-del-container");
  containerModal.innerHTML = `
  <button class="edit-del-btn edit-btn"><i class="far fa-edit"></i></button>
          <button class="edit-del-btn del-btn"><i class="far fa-trash-alt"></i></button>
  `;
  expense.appendChild(containerModal);
  expensesContainer.appendChild(expense);
  const arrayOfExpenses = Array.from(document.querySelectorAll(".expense"));
  expensesContainer.insertBefore(expense, arrayOfExpenses[0]);
  expense.addEventListener("mouseover", () => {
    containerModal.style.display = "flex";
  });
  expense.addEventListener("mouseout", () => {
    containerModal.style.display = "none";
  });
} */

// Edit expense button
/* function editExpense() {
  const editBtns = document.querySelectorAll(".edit-btn");
  editBtns.forEach((btn) => {
    formExpInput.style.border = "1px solid var(--green)";
    formExpValue.style.border = "1px solid var(--green)";
    btn.addEventListener("click", () => {
      const parentExpense = btn.parentElement.parentElement;
      form.classList.add("active");
      form.children[1].value = parentExpense.children[0].innerText;
      form.children[3].value = parentExpense.children[0].children[1].value;

      arr.forEach((item) => {
        const expenseIcon = item.children[0].classList[1];
        const formIcon = parentExpense.children[1].children[0].classList[1];
        if (expenseIcon === formIcon) {
          item.classList.add("focus");
        } else {
          item.classList.remove("focus");
        }
      });
      parentExpense.remove();
      const idOfParentExpense = parentExpense.dataset.id;
      localStorage.removeItem(`${idOfParentExpense}`);
    });
  });
} */

/* // Delete expense button
function deleteExpense() {
  const delBtns = Array.from(document.querySelectorAll(".del-btn"));
  delBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentExpense = btn.parentElement.parentElement;
      parentExpense.remove();
      const idOfParentExpense = parentExpense.dataset.id;
      localStorage.removeItem(`${idOfParentExpense}`);
      console.log(idOfParentExpense)
    });
  });
} */

// Add id to all expenses
function addId() {
  const arrayOfExpenses = Array.from(document.querySelectorAll(".expense"));
  for (let j = 0; j < arrayOfKeys.length; j++) {
    for (let k = 0; k < arrayOfExpenses.length; k++) {
      arrayOfExpenses[k].dataset.id = arrayOfKeys[j];
    }
  }
}
//Refresh form
function refreshForm() {
  formExpInput.style.border = "1px solid var(--green)";
  formExpValue.style.border = "1px solid var(--green)";
  formExpInput.value = "";
  formExpValue.value = "";
  removeFocus();
}

// Local Storage
function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* function getItemFromLS(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value
} */

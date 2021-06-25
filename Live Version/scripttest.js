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

let expenses = [];
if (localStorage.getItem("expenses") != null) {
  expenses = JSON.parse(localStorage.getItem("expenses"));
}

renderUI();
function renderUI() {
  if (expenses.length === 0) {
    localStorage.removeItem("expenses");
  }
  expenses.forEach((item) => {
    // let item = JSON.parse(localStorage.getItem(`${key}`));
    const expense = document.createElement("div");
    expense.setAttribute("data-id", `${item.id}`);

    expense.classList.add("expense");
    expense.innerHTML = `
    <div class="expense-description-price">
                <p class="expense-description">${item.name}</p>
                <input class="expense-price" type="text" readonly value="${item.price}" />
              </div>
              <div class="expense-category-date">
                ${item.category}
                <p class="expense-date">${item.day} ${item.nameOfMonth}</p>
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

    expense.addEventListener("mouseover", () => {
      containerModal.style.display = "flex";
    });
    expense.addEventListener("mouseout", () => {
      containerModal.style.display = "none";
    });
  });

  /* const expenses = Array.from(document.querySelectorAll(".expense"));
  arrayOfKeys.forEach((key, index) => {
    const exp = expenses[index];
    exp.setAttribute("data-id", `${key}`);
  }); */

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
      const key = localStorage.getItem(localStorage.key(0));
      const items = JSON.parse(key);
      const newItems = items.filter((item) => item.id != idOfParentExpense);
      expenses = newItems;
      localStorage.setItem("expenses", JSON.stringify(newItems));
    });
  });

  const delBtns = Array.from(document.querySelectorAll(".del-btn"));
  delBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentExpense = btn.parentElement.parentElement;
      parentExpense.remove();
      const idOfParentExpense = parentExpense.dataset.id;
      const key = localStorage.getItem(localStorage.key(0));
      const items = JSON.parse(key);
      const newItems = items.filter((item) => item.id != idOfParentExpense);
      expenses = newItems;
      localStorage.setItem("expenses", JSON.stringify(newItems));
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

// let arrayLS = []
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
    // // const arrayOfExpenses = Array.from(document.querySelectorAll(".expense"));
    // expensesContainer.insertBefore(expense, arrayOfExpenses[0]);

    item = {
      id: `${expense.dataset.id}`,
      name: `${expense.children[0].outerText}`,
      price: `${expense.children[0].lastElementChild.defaultValue}`,
      category: `${expense.children[1].childNodes[1].outerHTML}`,
      day: `${day}`,
      nameOfMonth: `${nameOfMonth}`,
    };

    // arrayOfExpenses.forEach(exp => {
    //   arrayLS.push(item)
    // })

    expenses.push(item);

    saveToLS("expenses", expenses);

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
        const key = localStorage.getItem(localStorage.key(0));
        const items = JSON.parse(key);
        const newItems = items.filter((item) => item.id != idOfParentExpense);
        expenses = newItems;
        localStorage.setItem("expenses", JSON.stringify(newItems));
      });
    });

    const delBtns = Array.from(document.querySelectorAll(".del-btn"));
    delBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const parentExpense = btn.parentElement.parentElement;
        parentExpense.remove();
        const idOfParentExpense = parentExpense.dataset.id;
        const key = localStorage.getItem(localStorage.key(0));
        const items = JSON.parse(key);
        const newItems = items.filter((item) => item.id != idOfParentExpense);
        expenses = newItems;
        localStorage.setItem("expenses", JSON.stringify(newItems));
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

const items123 = JSON.parse(localStorage.getItem("key"));

//Income

const addIncomeBtn = document.querySelector(".add-income-btn");
const incomeInputContainer = document.querySelector(".income-input-container");
const closeIncomeInputBtn = document.querySelector(".close-input-btn");
const incomeInput = document.querySelector(".income-input");
const income = document.getElementById("prihodi");
const incomeInputBtn = document.querySelector(".add-input-btn");

addIncomeBtn.addEventListener("click", () => {
  incomeInputContainer.style.display = "flex";
});

closeIncomeInputBtn.addEventListener("click", () => {
  incomeInputContainer.style.display = "none";
  incomeInput.value = "";
});

renderIncome();
function renderIncome() {
  const totalIncome = localStorage.getItem("incomes");
  if (totalIncome != null) {
    income.value = `${totalIncome} KN`;
  } else {
    income.value = `0 KN`;
  }
}

incomeInputBtn.addEventListener("click", () => {
  if (localStorage.getItem("incomes") !== null) {
    const incomeInLS = localStorage.getItem("incomes");
    const totalInc = parseInt(incomeInput.value) + parseInt(incomeInLS);
    localStorage.setItem("incomes", totalInc);
    income.value = `${totalInc} KN`;
  } else {
    income.value =`${incomeInput.value}`
    localStorage.setItem("incomes", income.value);
    income.value = `${incomeInput.value} KN`;
    
  }
  incomeInput.value = "";
});

// Expenses
const totalExpenseValue = document.getElementById("rashodi");
let totalExpense = "";
renderExpenses();
setInterval(renderExpenses, 1);

function renderExpenses() {
  const expArr = [];
  const expensePrices = document.querySelectorAll(".expense-price");
  expensePrices.forEach((price) => {
    expArr.push(parseInt(price.value));
  });
  if (expArr.length !== 0) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    totalExpense = expArr.reduce(reducer);

    totalExpenseValue.value = `${totalExpense} KN`;
  } else {
    totalExpenseValue.value = "0 KN";
  }
}

// Mobile Navbar

const navButtons = document.querySelectorAll(".mobile-nav-btn");
const incomeSide = document.querySelector(".aside-left");
const expenseSide = document.querySelector(".main");
const rightSide = document.querySelector(".aside-right");

navButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.classList.contains("income-btn")) {
      expenseSide.style.display = "none";
      rightSide.style.display = "none";
      incomeSide.style.display = "flex";
    } else if (btn.classList.contains("expenses-btn")) {
      expenseSide.style.display = "flex";
      rightSide.style.display = "none";
      incomeSide.style.display = "none";
    } else {
      expenseSide.style.display = "none";
      rightSide.style.display = "flex";
      incomeSide.style.display = "none";
    }
  });
});

// Percentage Bars
setInterval(bars, 1)


function bars() {
  const bars = document.querySelectorAll(".bar");
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const utensilsPrices = ['0'];
  const billsPrices = ['0'];
  const travelPrices = ['0'];
  const healthPrices = ['0'];
  expenses.forEach((exp) => {
    if (exp.category === '<i class="fas fa-utensils"></i>') {
      utensilsPrices.push(parseInt(exp.price));
    } else if (exp.category === '<i class="fas fa-file-invoice-dollar"></i>') {
      billsPrices.push(parseInt(exp.price));
    } else if (exp.category === '<i class="fas fa-suitcase-rolling"></i>') {
      travelPrices.push(parseInt(exp.price));
    } else {
      healthPrices.push(parseInt(exp.price));
    }
  });
  
  const totalUtensils = utensilsPrices.reduce(reducer);
  const totalBills = billsPrices.reduce(reducer);
  const totalTravel = travelPrices.reduce(reducer);
  const totalHealth = healthPrices.reduce(reducer);
  parseInt(totalExpense);
  
  const percUtensils = Math.round(calcPerc(totalUtensils, totalExpense));
  const percBills = Math.round(calcPerc(totalBills, totalExpense));
  const percTravel = Math.round(calcPerc(totalTravel, totalExpense));
  const percHealth = Math.round(calcPerc(totalHealth, totalExpense));
  
  
  const firstBar = document.querySelector(".first-bar");
  const secondBar = document.querySelector(".second-bar");
  const thirdBar = document.querySelector(".third-bar");
  const fourthBar = document.querySelector(".fourth-bar");
  
  
  firstBar.style.width = `${percUtensils}%`;
  secondBar.style.width = `${percBills}%`;
  thirdBar.style.width = `${percTravel}%`;
  fourthBar.style.width = `${percHealth}%`;
  
  function calcPerc(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }
}


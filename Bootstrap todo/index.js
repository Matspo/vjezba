const newTodoForm = document.getElementById("newTodoForm");
const editTodoForm = document.getElementById("editTodoForm");
let todos = [];
newTodoForm.addEventListener("submit", e => {
  e.preventDefault();
  const newTodo = {
    text: document.getElementById("newTodoInput").value,
    category: document.getElementById("newTodoCategory").value,
    isDone: false
  }

  document.getElementById("newTodoInput").value = "";

  todos.push(newTodo);
  saveTodos();

  renderTodos();
})

editTodoForm.addEventListener("submit", e => {
  e.preventDefault();

  const index = parseInt(document.getElementById("editTodoIndex").value);
  const text = document.getElementById("editTodoInput").value;
  const category = document.getElementById("editTodoCategory").value;

  editTodo(index, text, category);
  saveTodos();
  renderTodos();

  closeEditModal();
})

function renderTodos()
{
  const todoContainer = document.getElementById("todosContainer");
  todoContainer.innerHTML = "";

  if (todos.length == 0) {
    todoContainer.innerHTML = "<p class='text-center'>Nemate niti jedan item na listi</p>";
  }

  todos.forEach((item, index)  => {
    const element = document.createElement("ul");
    element.innerHTML =
    `
    <li class="list-group-item clearfix">
      <input class="form-check-input me-1 float-start" type="checkbox" ${item.isDone ? "checked" : ""} onchange="finishTodo(${index}, event.target.checked)">
      <span class="float-start ms-4 ${item.isDone ? "text-decoration-line-through text-muted" : ""}"><i class="${getIcon(item.category)} me-2"></i> ${item.text}</span>
      <span class="float-end me-4">
        <button type="button" class="btn btn-primary btn-sm py-0" onclick="openEditModal(${index})" ${item.isDone ? "disabled" : ""}><i class="fas fa-edit"></i></button>
        <button type="button" class="btn btn-danger btn-sm py-0" onclick="deleteTodoObject(todos[${index}])"><i class="fas fa-times"></i></button>
      </span>
    </li>
    `;
    todoContainer.appendChild(element.firstElementChild);
  })
}

function getIcon(category) {
  if (category === "personal") {
    return "fas fa-user";
  } else if (category === "business") {
    return "fas fa-briefcase";
  }
}

function finishTodo(index, value) {
  const todo = todos[index];
  todo.isDone = value;

  saveTodos();
  renderTodos();
}

function openEditModal(index) {
  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  const todo = todos[index];
  let modalTitle = document.getElementById("editModalTitle");
  modalTitle.textContent = modalTitle.textContent.split(": ")[0] + ": " + todo.text;
  document.getElementById("editTodoCategory").value = todo.category;
  document.getElementById("editTodoInput").value = todo.text;
  document.getElementById("editTodoIndex").value = index;

  modal.show();
}

function closeEditModal() {
  const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));

  modal.hide();
}

function deleteTodo(index) {
  todos.splice(index, 1);

  saveTodos();
  renderTodos();
}

function deleteTodoObject(todo) {
  const index = todos.indexOf(todo);
  todos.splice(index, 1);

  saveTodos();
  renderTodos();
}

function editTodo(index, text, category) {
  const todo = todos[index];
  todo.text = text;
  todo.category = category;
}

function getTodos() {
  const userArrayLS = localStorage.getItem("todos");
  if (userArrayLS!= null) {
    todos = JSON.parse(userArrayLS);
  } else {
    todos = [];
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


getTodos();
renderTodos();
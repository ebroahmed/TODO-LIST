let todoList = [];
if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
}
let currentFilter = "all";
renderTodo();
function renderTodo() {
  let todoListHTML = "";
  todoList.reverse();
  for (let i = 0; i < todoList.length; i++) {
    const todoObj = todoList[i];
    const name = todoObj.name;
    const isCompleted = todoObj.status === "completed";
    const checkedAttribute = isCompleted ? "checked" : "";
    const textDecoration = isCompleted ? "text-decoration: line-through;" : "";
    if (
      (currentFilter === "pending" && !isCompleted) ||
      (currentFilter === "completed" && isCompleted) ||
      currentFilter === "all"
    ) {
      const html = `
            <div class="todo_list_items">
              <input type="checkbox" class="todo-checkbox" ${checkedAttribute} onclick="toggleCompletion(${i})">
              <input type="text" value="${name}" id = input_value class="output_value" style="${textDecoration}" onkeydown="if(event.key==='Enter'){updateEdit(${i})}" disabled>
              <div class="action">
                <i class="fas fa-edit" onclick="editStatue(${i})"></i>
                <i class="fas fa-trash" onclick="deleteTodo(${i})"></i>
              </div>
            </div>`;
      todoListHTML += html;
    }
  }
  document.querySelector(".todo-list").innerHTML = todoListHTML;
}

const inputName = document.querySelector(".todo-name-input");
function addTodo() {
  const name = inputName.value;
  todoList.push({
    name,
    status: "pending",
  });
  inputName.value = "";
  renderTodo();
  saveTodoLocalStorage();
}

function editStatue(editId) {
  const outEditValue = document.querySelectorAll(".output_value")[editId];
  outEditValue.disabled = false;
  outEditValue.focus();
}

function updateEdit(editValueID) {
  const updateInput = document.querySelectorAll(".output_value")[editValueID];
  const newInput = updateInput.value;
  todoList[editValueID].name = newInput;
  updateInput.disabled = true;
  saveTodoLocalStorage();
}

function deleteTodo(todoIndex) {
  todoList.splice(todoIndex, 1);
  renderTodo();
  saveTodoLocalStorage();
}

function toggleCompletion(todoIndex) {
  todoList[todoIndex].status =
    todoList[todoIndex].status === "completed" ? "pending" : "completed";
  renderTodo();
  saveTodoLocalStorage();
}

function saveTodoLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function filterTasks(filter) {
  currentFilter = filter;
  renderTodo();
}

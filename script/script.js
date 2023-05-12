const SERVER_URL = "http://localhost:5000";

async function serverAddTask(obj) {
  let response = await fetch(SERVER_URL + "/todos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(obj),
  });

  let data = await response.json();
  renderTask(data);
}

async function serverGetTask() {
  let response = await fetch(SERVER_URL + "/todos", {
    method: "GET",
  });
  let data = await response.json();
  renderTask(data);
}

async function serverDeleteAll() {
  let response = await fetch(SERVER_URL + "/todos", {
    method: "DELETE",
  });
  let data = await response.json();
  renderTask(data);
}

async function serverDeleteById(id) {
  let response = await fetch(SERVER_URL + `/todos/${id}`, {
    method: "DELETE",
  });
  let data = await response.json();
  renderTask(data);
}

async function serverGetChecked(id) {
  let response = await fetch(SERVER_URL + `/todos/${id}`, {
    method: "PATCH",
  });
  let data = await response.json();

  renderTask(data);
}

async function serverDeleteChecked() {
  let response = await fetch(SERVER_URL + "/checked", {
    method: "DELETE",
  });
  let data = await response.json();
  if (!data.length) {
    listContainer.style.display = "none";
    document.getElementById("button-wrapper").style.display = "none";
  }
  renderTask(data);
}

async function serverEditTask(id, value) {
  let response = await fetch(SERVER_URL + `/rewrite/${id}`, {
    method: "PATCH",
    body: value,
  });
  let data = await response.json();
  renderTask(data);
}

const form = document.getElementById("task-form"); //получили форму
const listContainer = document.getElementById("list-container"); //получили ul куда будут добавляться задачи

const deleteAllChecked = document.querySelector(".deleteAllChecked");
const deleteAll = document.querySelector(".deleteAll");

//получаем из локалсторадж содержимое ul и записываем в переменную
let taskCollector = localStorage.getItem("listContainer");
//создаем пустой массив, куда будем добавлять объекты задач
let taskList = [];
//если область задачи не пустая, то делаем из строкового представления данных в локалстораж нормальный массив с объектами
if (taskCollector) taskList = JSON.parse(taskCollector);

//функция для отрисовки задач
function createNewTask(obj) {
  listContainer.style.display = "flex";
  document.getElementById("button-wrapper").style.display = "flex";

  //создаем текстовое содержимое задачи
  let itemTask = document.createElement("li");
  let itemTaskText = document.createElement("p");
  itemTaskText.textContent = obj.taskValue;
  itemTask.classList.add("item");
  itemTask.append(itemTaskText);
  if (obj.status) itemTaskText.classList.add("checked");

  //создаем checkbox
  let taskCheck = document.createElement("input");
  taskCheck.setAttribute("type", "checkbox");
  taskCheck.classList.add("checkbox");
  itemTask.append(taskCheck);
  taskCheck.checked = obj.status;
  taskCheck.addEventListener("click", () => {
    itemTaskText.classList.toggle("checked"); //добавляем класс, чтобы при нажатии текст зачеркивался
    serverGetChecked(obj.id);
  });

  //создаем кнопку удаления
  let taskDeleteButton = document.createElement("button");
  taskDeleteButton.textContent = "🗑️";
  taskDeleteButton.classList.add("deleteTask");
  itemTask.append(taskDeleteButton);
  taskDeleteButton.addEventListener("click", () => serverDeleteById(obj.id));

  //создаем кнопку редактирования
  let editButton = document.createElement("button");
  editButton.textContent = "✏️";
  editButton.classList.add("editButton");
  itemTask.append(editButton);
  editButton.addEventListener("click", () => {
    editButton.textContent = "✅";
    if (!document.querySelector(".edit")) {
      let editInput = document.createElement("input");
      editInput.setAttribute("type", "text");
      itemTask.append(editInput);
      editInput.setAttribute("value", obj.taskValue);
      itemTaskText.remove();
      editInput.classList.add("edit");

      editInput.addEventListener("change", () => {
        let newTask = editInput.value;
        serverEditTask(obj.id, newTask);
      });
    } else {
      editInput.classList.remove("edit");
    }
  })


  return itemTask;
}

function renderTask(arr) {
  listContainer.innerHTML = "";
  arr.forEach((el) => {
    listContainer.append(createNewTask(el));
  });
}

serverGetTask();

deleteAllChecked.addEventListener("click", () => {
  serverDeleteChecked();
});

deleteAll.addEventListener("click", () => {
  listContainer.style.display = "none";
  document.getElementById("button-wrapper").style.display = "none";
  serverDeleteAll();
});



form.addEventListener("submit", (evt) => {
  evt.preventDefault(); //убрали перезагрузку страницы при нажатии на форму

  //создаем текстовое содержимое задачи
  let taskText = document.getElementById("inputTask").value;

  let taskObj = {
    taskValue: taskText,
    status: false,
  };


  serverAddTask(taskObj);

  //после добавления задачи в лист поле ввода будет очищаться
  document.getElementById("inputTask").value = "";
});

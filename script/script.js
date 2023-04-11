const form = document.getElementById("task-form"); //получили форму
const listContainer = document.getElementById("list-container"); //получили ul куда будут добавляться задачи

//получаем из локалсторадж содержимое ul и записываем в переменную
let taskCollector = localStorage.getItem("listContainer");
//создаем пустой массив, куда будем добавлять объекты задач
let taskList = [];
//если область задачи не пустая, то делаем из строкового представления данных в локалстораж нормальный массив с объектами
if (taskCollector) taskList = JSON.parse(taskCollector);

//функция для отрисовки задач
function createNewTask(obj) {
  listContainer.style.display = "block";
  document.getElementById("button-wrapper").style.display = "flex";

  //создаем текстовое содержимое задачи
  let itemTask = document.createElement("li");
  let itemTaskText = document.createElement("p");
  itemTaskText.textContent = obj.taskValue;
  itemTask.classList.add("item");
  itemTask.append(itemTaskText);

  //создаем checkbox
  let taskCheck = document.createElement("input");
  taskCheck.setAttribute("type", "checkbox");
  taskCheck.classList.add("checkbox");
  itemTask.append(taskCheck);
  taskCheck.addEventListener("click", () => {
    itemTaskText.classList.toggle("checked"); //добавляем класс, чтобы при нажатии текст зачеркивался

    taskList.forEach((el, index, arr) => {
      if (el.id == obj.id) {
        arr[index].status = !arr[index].status;
      }
      localStorage.setItem("listContainer", JSON.stringify(taskList));
    });
  });

  //создаем кнопку удаления
  let taskDeleteButton = document.createElement("button");
  taskDeleteButton.textContent = "❌";
  taskDeleteButton.classList.add("deleteTask");
  itemTask.append(taskDeleteButton);
  taskDeleteButton.addEventListener("click", () => deleteTask(obj.id));

  return itemTask;
}

// for (const task of taskList) {
//   createNewTask(task);
// }

function renderTask(array) {
  listContainer.innerHTML = '';
  // localStorage.setItem("listContainer", JSON.stringify(taskList));
  array.forEach((el) => {
    listContainer.append(createNewTask(el));
    localStorage.setItem("listContainer", JSON.stringify(taskList));
  });
}

renderTask(taskList)

function deleteTask(id) {
  taskList.filter((el) => el.id !== id);
  renderTask();
}

//создаем функцию для создания уникального id задачи
function getNewId(arr) {
  let max = 0;
  for (const item of arr) {
    if (item.id > max) max = item.id;
  }
  return max + 1;
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault(); //убрали перезагрузку страницы при нажатии на форму

  //создаем текстовое содержимое задачи
  let taskText = document.getElementById("inputTask").value;

  let taskObj = {
    id: getNewId(taskList),
    taskValue: taskText,
    status: false,
  };

  // createNewTask(taskObj);

  //добавляем объект с задачей в массив
  taskList.push(taskObj);

  renderTask(taskList);

  //записывваем с локалстораж массив объектов задач
  // localStorage.setItem("listContainer", JSON.stringify(taskList));

  //после добавления задачи в лист поле ввода будет очищаться
  document.getElementById("inputTask").value = "";
});

// let input = document.getElementById("inputTask").value;

// function createrLi(obj) {

//   let itemTask = document.createElement("li");
//   itemTask.classList.add("item");

//   itemTask.innerHTML = `<input type="checkbox" id="itemCheck">
//                         <p>${obj.value}</p>
//                         <button id="deleteButton">❌</button>`;

// }

// document.getElementById('task-form').addEventListener("submit", (evt) => {
//   evt.preventDefault();
// })

// let someObj = {
//   id: (0.5 - Math.random),
//   taskValue: 'то что введено в input',
//   status: false
// }

// const listContainer = document.getElementById("list-container")

// function drawTaskItem(obj) {
//   let

//   taskItem = document.createElement("li");
//   listContainer.append(taskItem);

// }

// const form = document.querySelector("form");

// const inputBox = document.getElementById("inputTask");
// const listContainer = document.getElementById("list-container");

// const addButton = document.getElementById("addTask");

// addButton.addEventListener('click', addTask1)

// function addTask1(e) {
//   if (inputBox.value == "") {
//     alert ('write smg')
//   }
//   else {
//     listContainer.style.display = "block"
//     let li = document.createElement("li");
//     li.innerHTML = inputBox.value;
//     listContainer.appendChild(li);

//     let deleteLogo = document.createElement("span");
//     deleteLogo.innerHTML = "❌";
//     li.appendChild(deleteLogo)
//   }

//   inputBox.value = ""
// }

// listContainer.addEventListener("click", (evt) => {
//   if (evt.target.tagName == "") {
//     evt.target.classList.toggle("checked");
//   }
//   else if (evt.target.tagName == "span") {
//     evt.target.parentElement.remove();
//   }
// }, false)

// const addTask = (evt) => {
//   evt.preventDefault(); //при нажатии на кнопку в форме страница обновляться не будет

//   // let taskText = document.getElementById("inputTask").value;
//   // console.log(taskText);

//   // const itemTask = document.createElement("li")

//   // const checkTask = document.create
// }

// form.addEventListener('submit', addTask)

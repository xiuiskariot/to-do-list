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

  listContainer.style.display = "block";
  document.getElementById("button-wrapper").style.display = "flex";
 
  //создаем текстовое содержимое задачи
  let itemTask = document.createElement("li");
  let itemTaskText = document.createElement("p");
  itemTaskText.textContent = obj.taskValue;
  itemTask.classList.add("item");
  itemTask.append(itemTaskText);
  if (obj.status) itemTaskText.classList.add("checked")

  //создаем checkbox
  let taskCheck = document.createElement("input");
  taskCheck.setAttribute("type", "checkbox");
  taskCheck.classList.add("checkbox");
  itemTask.append(taskCheck);
  taskCheck.checked = obj.status;
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



function renderTask() {
  listContainer.innerHTML = '';
  // localStorage.setItem("listContainer", JSON.stringify(taskList));
  taskList.forEach((el) => {
    listContainer.append(createNewTask(el));
  });
  localStorage.setItem("listContainer", JSON.stringify(taskList));
}

renderTask(taskList)

function deleteTask(id) {
  taskList = taskList.filter((el) => el.id !== id);
  renderTask();
}

deleteAllChecked.addEventListener('click', () => {
  taskList = taskList.filter(el => el.status !== true)
  if (taskList.length == []) {
      listContainer.style.display = "none";
      document.getElementById("button-wrapper").style.display = "none";
  }
  renderTask()
})


deleteAll.addEventListener('click', () => {
  listContainer.style.display = "none";
  document.getElementById("button-wrapper").style.display = "none";
  taskList = [];
  renderTask();
})




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


  //добавляем объект с задачей в массив
  taskList.push(taskObj);

  renderTask();


  //после добавления задачи в лист поле ввода будет очищаться
  document.getElementById("inputTask").value = "";
});


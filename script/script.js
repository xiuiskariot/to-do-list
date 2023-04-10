const form = document.querySelector("form");

const inputBox = document.getElementById("inputTask");
const listContainer = document.getElementById("list-container");

const addButton = document.getElementById("addTask");

addButton.addEventListener('click', addTask1)

function addTask1(e) {
  if (inputBox.value == "") {
    alert ('write smg')
  }
  else {
    listContainer.style.display = "block"
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let deleteLogo = document.createElement("span");
    deleteLogo.innerHTML = "❌";
    li.appendChild(deleteLogo)
  }

  inputBox.value = ""
}



listContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName == "") {
    evt.target.classList.toggle("checked");
  }
  else if (evt.target.tagName == "span") {
    evt.target.parentElement.remove();
  }
}, false)



const addTask = (evt) => {
  evt.preventDefault(); //при нажатии на кнопку в форме страница обновляться не будет

  // let taskText = document.getElementById("inputTask").value;
  // console.log(taskText);
  
  // const itemTask = document.createElement("li")

  // const checkTask = document.create
} 

form.addEventListener('submit', addTask)
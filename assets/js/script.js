

// qondayyeee

document.body.classList.add("light_mode");

function toggleMode() {
  const body = document.body;

  const currentMode = localStorage.getItem("mode");

  if (currentMode === "light_mode") {
    body.classList.remove("light_mode");
    body.classList.add("dark_mode");
    localStorage.setItem("mode", "dark_mode");
  } else {
    body.classList.remove("dark_mode");
    body.classList.add("light_mode");
    localStorage.setItem("mode", "light_mode");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const currentMode = localStorage.getItem("mode");
  if (currentMode) {
    document.body.classList.add(currentMode);
  }
});


const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  taskBox = document.querySelector(".task-box");
const newTaskInput = document.getElementById("newTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});


addTaskBtn.addEventListener("click", () => {
  if (isEditTask) {
    editTask();
  } else {
    addNewTask();
  }
});

function addNewTask() {
  let userTask = newTaskInput.value.trim();
  if (userTask) {
    todos.push({ name: userTask, status: "pending" });
    newTaskInput.value = "";
    saveAndShow();
  }
}

let isEditTask = false;
let editId;
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];
function saveToLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function showTodo(filter) {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, item) => {
      let completed = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        liTag += `<li class="task">
                            <label class="container_check" for="${item}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${item}" ${completed}><span class="checkmark"></span>
                                <p class="${completed}">${todo.name}</p>
                                
                            </label>

                          <div class="disflex">
                          <div class="div1" onclick="editTodo(${item})"></div>
                            <div class="div2" onclick="removeData(${item})"></div>
                          </div>

                        </li>`;
      }
    });
  }


  taskBox.innerHTML =
    liTag ||
    `<span style=" p display:flex;  margin-left: 8rem;" ><img src="/img/Detective-check-footprint 1.png" alt="">
    <p style="margin-left: 14rem;" >Empty..</p>
    </span>`;
  saveToLocalStorage();
  let checkTask = taskBox.querySelectorAll(".task");

  !checkTask.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");

  taskBox.offsetHeight >= 300
    ? taskBox.classList.add("overflow")
    : taskBox.classList.remove("overflow");

  let editButtons = taskBox.querySelectorAll(".div1");
  editButtons.forEach((editButton, index) => {
    editButton.addEventListener("click", () => {
      editTodo(index);
    });
  });
}

function editTodo(itemId) {
  isEditTask = true;
  editId = itemId;
  openModal();

  let data = getData(itemId);
  newTaskInput.value = data.name;
  document.getElementById("modalTitle").innerText = "EDIT NOTE";

  document.getElementById("newTaskInput").value = data.name;
  document.getElementById("newTaskInput").setAttribute("data-item-id", itemId);
  document.querySelector(".container h1").innerText = "EDIT NOTE";

  document.getElementById("addTaskBtn").onclick = function () {
    let newText = document.getElementById("newTaskInput").value;
    let itemId = document
      .getElementById("newTaskInput")
      .getAttribute("data-item-id");

    editData(itemId, newText);

    closeModal();
    listTodo();
  };
}

function openModal() {
  document.getElementById("id01").style.display = "block";
}

function closeModal() {
  document.getElementById("id01").style.display = "none";
}

function getData(itemId) {
  return todos[itemId];
}

function editData(itemId, newText) {
  todos[itemId].name = newText;
  saveToLocalStorage();
}

showTodo("all");
function showMenu(selectedTask) {
  let menuDiv = selectedTask.parentElement.lastElementChild;
  menuDiv.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      menuDiv.classList.remove("show");
    }
  });
}

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function addNewTask() {
  let userTask = newTaskInput.value.trim();
  if (userTask) {
    let taskInfo = { name: userTask, status: "pending" };
    todos.push(taskInfo);
    newTaskInput.value = "";
    showTodo(document.querySelector("span.active").id);
  }
}

addTaskBtn.addEventListener("click", () => {
  addNewTask();
});

function removeData(id) {
  todos.splice(id, 1);
  showTodo(document.querySelector("span.active").id);
}

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    showTodo(document.querySelector("span.active").id);
  }
});

showTodo("all");


function myFunctional() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};


// function myFunction() {
//   let input, filter, ol, listElements, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   ol = document.getElementById("myUL");

//   listElements = ol.getElementsByTagName("li");

//   for (i = 0; i < listElements.length; i++) {
//     txtValue = listElements[i].textContent || listElements[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       listElements[i].style.display = "";
//     } else {
//       listElements[i].style.display = "none";
//     }
//   }
// }

listTodo();

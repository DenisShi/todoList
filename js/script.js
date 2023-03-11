const items = document.querySelector(".items");
const input = document.querySelector(".input");
const inputForm = document.querySelector("#inputForm");
const message = document.querySelector(".message");
const clearItemsBtn = document.querySelector(".clearItemsBtn");

let tasks = [];

///// render items from localStorage
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach((task) => {
  const itemCssClass = task.done ? "item done" : "item";
  items.insertAdjacentHTML("afterbegin", renderItem(task, itemCssClass));
});

/////

clearItemsBtn.addEventListener("click", () => {
  items.innerHTML = "";
  tasks = [];
  saveTasksToLocalStorage();
});

inputForm.addEventListener("submit", createItem);

items.addEventListener("click", actionItem);

function createItem(e) {
  e.preventDefault();

  const item = {
    id: Date.now(),
    text: input.value,
    done: false,
  };

  tasks.push(item);

  if (input.value.trim() != "") {
    input.focus();
    message.style.display = "none";
    items.insertAdjacentHTML("afterbegin", renderItem(item, "item"));
    saveTasksToLocalStorage();
    input.value = "";
  } else {
    const messageText = "field must not be empty";
    message.style.display = "block";
    message.innerHTML = messageText;
  }
}

function actionItem(e) {
  const parentNode = e.target.closest(".item");

  if (e.target.dataset.action == "delete") {
    tasks = tasks.filter((task) => task.id !== Number(parentNode.id));
    parentNode.remove();
  } else if (e.target.dataset.action == "done") {
    task = tasks.find((item) => item.id === Number(parentNode.id));
    task.done = !task.done;
    parentNode.classList.toggle("done");
  }
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderItem(item, itemCssClass) {
  return `<li class="${itemCssClass}" id='${item.id}'>
  <p>${item.text}</p>
  <div class="icons">
    <button class="item-btn edit-icon" data-action='done'>
      <span class="icon"><ion-icon name="create-outline"></ion-icon></span>
    </button>
    <button class="item-btn delete-icon" data-action='delete'>
      <span class="icon"><ion-icon name="trash-outline"></ion-icon></span>
    </button>
  </div>
  </div>`;
}

const addItemsForm = document.querySelector(".add-items-form");
const itemsList = document.querySelector(".items-list");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(event) {
  event.preventDefault();
  const text = event.target.item.value;
  const item = {
    text: text,
    checked: false,
  };

  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  showItems(items, itemsList);
  addItemsForm.reset();
  document.querySelector(".no-tasks").style.display = "none";
  document.querySelector(".btn").disabled = false;
}

function showItems(tasks, taskList) {
  //   console.log(tasks, taskList);
  taskList.innerHTML = tasks
    .map((task, index) => {
      return `<li>
      <input type='checkbox' id = 'item${index}' data-index = '${index}' ${
        task.checked ? "checked" : ""
      }/>
      <label for ='item${index}'> ${task.text} </label>
      </li>`;
    })
    .join("");
}

function taskCheck(event) {
  //   console.log(event.target);
  const elem = event.target.dataset.index;
  items[elem].checked = !items[elem].checked;
  localStorage.setItem("items", JSON.stringify(items));
  showItems(items, itemsList);
}

addItemsForm.addEventListener("submit", addItem);
itemsList.addEventListener("click", taskCheck);
showItems(items, itemsList);

function clearItemsList() {
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }
  localStorage.clear();
  document.querySelector(".btn").disabled = true;
  document.querySelector(".no-tasks").style.display = "block";
}
document.querySelector(".btn").addEventListener("click", clearItemsList);

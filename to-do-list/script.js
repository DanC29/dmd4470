var newForm = document.getElementById("new_item_form");
var textInput = document.getElementById("todo-list");
var todo = document.getElementById("new_item");
var btn = document.getElementById("btn_save");

newForm.addEventListener("sublmit", function (e) {
  e.preventDefault();
});

btn.addEventListener("click", function (e) {
  e.preventDefault();
  var taskText = todo.value;

  // taskTest goes into li goes into ul
  var items = document.createElement("li");
  var del_btn = document.createElement("button");
  del_btn.innerHTML = "X";
  del_btn.addEventListener("click", items.remove());

  items.innerHTML = taskText;
  items.appendChild(del_btn);
  todo.appendChild(items);
});

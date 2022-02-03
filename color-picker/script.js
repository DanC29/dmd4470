// Store Colors
if (localStorage.storedColor) {
  document.getElementById("colorInput").value = localStorage.storedColor;
  document.body.style.backgroundColor = localStorage.storedColor;
}
// Change Colors
function changeColor() {
  var pickedColor = document.getElementById("colorInput").value;
  localStorage.setItem(
    "storedColor",
    (document.body.style.backgroundColor = pickedColor)
  );
}
// Presets
/* function presetTemplates() {
  var modeSwitch = document.querySelector("body");
  modeSwitch.classList.toggle("preset-mode-1");
} */

/* var bod = document.querySelector("body");
bod.classList.add("dark", "light");

console.log(bod.classList.contains("dark"));

let mode = [bod.classList];
console.log(mode);

function presetTemplates(event) {
  if ((mode = 0)) {
    bod.classList.toggle("dark");
  } else if ((mode = 1)) {
    bod.classList.toggle("light");
  }
} */
var bod = document.querySelector("body");

colorArray = ["orange", "purple"];

function presetTemplates() {
  mode = colorArray.shift(bod.classList);
  colorArray.push(mode);

  var modeSwitch = document.querySelector("body");
  modeSwitch.classList.toggle("preset-mode-1");

  bod.style.backgroundColor = mode;
}

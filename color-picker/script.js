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
function presetTemplates() {
  var modeSwitch = document.getElementById("main-bg");
  modeSwitch.classList.toggle("preset-mode-1");
}

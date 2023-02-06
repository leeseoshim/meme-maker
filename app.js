const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("input#line-width");
const color = document.querySelector("#color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileImage = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

const context = canvas.getContext("2d");

const CANVAS_WITTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WITTH;
canvas.height = CANVAS_HEIGHT;
context.lineWidth = lineWidth.value;
context.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    return;
  }
  context.beginPath();
  context.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  context.lineWidth = event.target.value;
}

function onColorChange(event) {
  context.strokeStyle = event.target.value;
  context.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  context.strokeStyle = colorValue;
  context.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "채우기";
  } else {
    isFilling = true;
    modeBtn.innerText = "그리기";
  }
}

function onCanvasClick() {
  if (isFilling) {
    context.fillRect(0, 0, CANVAS_WITTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  context.fillStyle = "white";
  context.fillRect(0, 0, CANVAS_WITTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  context.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "채우기";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    context.drawImage(image, 0, 0, CANVAS_WITTH, CANVAS_HEIGHT);
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    context.save();
    context.lineWidth = 1;
    context.font = "48px serif";
    context.fillText(text, event.offsetX, event.offsetY);
    context.restore();
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileImage.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

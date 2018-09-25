const mainGrid = document.getElementById('mainGrid');
let gridCells = document.querySelectorAll('.gridBox');
drawGrid(16);

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGrid);
const sizeSlider = document.querySelector('#size');
sizeSlider.addEventListener('change', resizeGrid);
const colorSwitch = document.querySelector('#color');

function draw() {
  let newColor;
  if (colorSwitch.checked == true) {
    newColor = getRandomColor();
  } else {
    newColor = darken(this);
  }
  this.style.background = newColor;
}
function darken(pixel) {
  let oldRed = 255;
  let oldGreen = 255;
  let oldBlue = 255;
  if (pixel.style.backgroundColor) {
    let oldColor = pixel.style.backgroundColor;
    let colorsSplit = oldColor.slice(4,oldColor.length-1).split(", ");
    oldRed = Number(colorsSplit[0]);
    oldGreen = Number(colorsSplit[1]);
    oldBlue = Number(colorsSplit[2]);
  }

  let newRed = Math.floor(oldRed * .9);
  let newGreen = Math.floor(oldGreen * .9);
  let newBlue = Math.floor(oldBlue * .9);
  let newColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
  return newColor;
}

function getRandomColor() {
  let randomColor = "#" + Math.random().toString(16).slice(2,8);
  return randomColor;
}

function resizeGrid() {
  size = this.value;
  deleteGrid();
  drawGrid(size);
}

function resetGrid() {
  gridCells.forEach(gridCell => gridCell.style.background = "#fff");
}
function deleteGrid() {
  gridCells = document.querySelectorAll('.gridBox');
  gridCells.forEach(gridCell => gridCell.remove());
}
function drawGrid(size) {
  let sizing = (500/size).toFixed(2);
  let boxSizing = sizing + "px";
  for (let i = 0; i < (size*size); i++) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('gridBox');
    gridCell.setAttribute("style", `width: ${boxSizing}; height: ${boxSizing}`);
    mainGrid.appendChild(gridCell);
  }
  gridCells = document.querySelectorAll('.gridBox');
  gridCells.forEach(gridCell => gridCell.addEventListener('mouseover', draw));
}

const DEFAULTCOLOR = "#000000";
const DEFAULTMODE = "color";
let DEFAULT_GRID_SIZE = 16;

let currentcolor = DEFAULTCOLOR;

let mode = DEFAULTMODE;
let grid_size = DEFAULT_GRID_SIZE;

let mouseDown = false;
document.querySelector("body").addEventListener("mousedown", () => {
  mouseDown = true;
});
document.querySelector("body").addEventListener("mouseup", () => {
  mouseDown = false;
});

let gridcontainer = document.querySelector<HTMLElement>(".grid-container");

function createGrid(grid_size: number) {
  gridcontainer.style.gridTemplateRows = `repeat(${grid_size},1fr)`;
  gridcontainer.style.gridTemplateColumns = `repeat(${grid_size},1fr)`;
  for (let index = 0; index < grid_size * grid_size; index++) {
    const tile = document.createElement("div");
    tile.addEventListener("mouseover", paint);
    tile.addEventListener("mousedown", paint);

    gridcontainer.append(tile);
  }
}

function paint(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  switch (mode) {
    case "color":
      e.target.style.backgroundColor = currentcolor;
      break;
    case "rainbow":
      const randomR = Math.floor(Math.random() * 256);
      const randomG = Math.floor(Math.random() * 256);
      const randomB = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
      break;
    case "shader":
      break;
    case "eraser":
      e.target.style.backgroundColor = "white";

      break;
    default:
      break;
  }
}
let colorbutton = document.querySelector(".colorpicker");
colorbutton.addEventListener("change", setColor);

function setColor(e) {
  currentcolor = e.target.value;
}
let colorMode = document.querySelector<HTMLElement>("#colorButton");
let rainbowMode = document.querySelector<HTMLElement>("#rainbowButton");
let shaderMode = document.querySelector<HTMLElement>("#shaderButton");
let eraserMode = document.querySelector<HTMLElement>("#eraserButton");

colorMode.addEventListener("click", setMode);
rainbowMode.addEventListener("click", setMode);
shaderMode.addEventListener("click", setMode);
eraserMode.addEventListener("click", setMode);

function setMode(e) {
  mode = e.target.value;
  toggleButtons(mode);
}
function toggleButtons(mode) {
  switch (mode) {
    case "color":
      colorMode.classList.add("active");
      rainbowMode.classList.remove("active");
      shaderMode.classList.remove("active");
      eraserMode.classList.remove("active");
      break;
    case "rainbow":
      colorMode.classList.remove("active");
      rainbowMode.classList.add("active");
      shaderMode.classList.remove("active");
      eraserMode.classList.remove("active");
      break;
    case "shader":
      colorMode.classList.remove("active");
      rainbowMode.classList.remove("active");
      shaderMode.classList.add("active");
      eraserMode.classList.remove("active");
      break;
    case "eraser":
      colorMode.classList.remove("active");
      rainbowMode.classList.remove("active");
      shaderMode.classList.remove("active");
      eraserMode.classList.add("active");
      break;
    default:
      break;
  }
}
let clearButton = document.querySelector<HTMLElement>("#clearButton");
clearButton.addEventListener("click", clearGrid);
/*function clearGrid() {
  removeAllChildNodes(gridcontainer);
  createGrid(grid_size);
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
*/ function clearGrid() {
  let child = gridcontainer.children;
  for (let index = 0; index < child.length; index++) {
    let c = child[index].setAttribute("style", "backgroudColor:white");
  }
}
let sliderBar = document.querySelector<HTMLElement>("#slider-bar");
sliderBar.addEventListener("change", setGridSize);
function setGridSize(e) {
  grid_size = e.target.value;
  setSlider(grid_size);
  clearGrid();
  createGrid(grid_size);
}

function setSlider(size: number) {
  let sliderLabel = document.querySelector<HTMLElement>("#range-label");
  let slider = document.querySelector<HTMLElement>("#slider-bar");
  sliderLabel.textContent = `${size} x ${size}`;
  slider.setAttribute("value", `${size}`);
}

function main() {
  setSlider(grid_size);
  createGrid(grid_size);
}
main();

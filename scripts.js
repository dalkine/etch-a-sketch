var DEFAULTCOLOR = "#000000";
var DEFAULTMODE = "color";
var DEFAULT_GRID_SIZE = 16;
var currentcolor = DEFAULTCOLOR;
var mode = DEFAULTMODE;
var grid_size = DEFAULT_GRID_SIZE;
var mouseDown = false;
document.querySelector("body").addEventListener("mousedown", function () {
    mouseDown = true;
});
document.querySelector("body").addEventListener("mouseup", function () {
    mouseDown = false;
});
var gridcontainer = document.querySelector(".grid-container");
function createGrid(grid_size) {
    gridcontainer.style.gridTemplateRows = "repeat(".concat(grid_size, ",1fr)");
    gridcontainer.style.gridTemplateColumns = "repeat(".concat(grid_size, ",1fr)");
    for (var index = 0; index < grid_size * grid_size; index++) {
        var tile = document.createElement("div");
        tile.addEventListener("mouseover", paint);
        tile.addEventListener("mousedown", paint);
        gridcontainer.append(tile);
    }
}
function paint(e) {
    if (e.type === "mouseover" && !mouseDown)
        return;
    switch (mode) {
        case "color":
            e.target.style.backgroundColor = currentcolor;
            break;
        case "rainbow":
            var randomR = Math.floor(Math.random() * 256);
            var randomG = Math.floor(Math.random() * 256);
            var randomB = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = "rgb(".concat(randomR, ", ").concat(randomG, ", ").concat(randomB, ")");
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
var colorbutton = document.querySelector(".colorpicker");
colorbutton.addEventListener("change", setColor);
function setColor(e) {
    currentcolor = e.target.value;
}
var colorMode = document.querySelector("#colorButton");
var rainbowMode = document.querySelector("#rainbowButton");
var shaderMode = document.querySelector("#shaderButton");
var eraserMode = document.querySelector("#eraserButton");
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
var clearButton = document.querySelector("#clearButton");
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
    var child = gridcontainer.children;
    for (var index = 0; index < child.length; index++) {
        var c = child[index].setAttribute("style", "backgroudColor:white");
    }
}
var sliderBar = document.querySelector("#slider-bar");
sliderBar.addEventListener("change", setGridSize);
function setGridSize(e) {
    grid_size = e.target.value;
    setSlider(grid_size);
    clearGrid();
    createGrid(grid_size);
}
function setSlider(size) {
    var sliderLabel = document.querySelector("#range-label");
    var slider = document.querySelector("#slider-bar");
    sliderLabel.textContent = "".concat(size, " x ").concat(size);
    slider.setAttribute("value", "".concat(size));
}
function main() {
    setSlider(grid_size);
    createGrid(grid_size);
}
main();

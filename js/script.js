const availableColors = {
  RED: "red",
  BLUE: "blue",
  GREEN: "green",
  CYAN: "cyan",
  MAGENTA: "magenta",
  YELLOW: "yellow",
  BROWN: "brown",
  WHITE: "white",
  BLACK: "black",
  GREY: "grey",
  RAINBOW: "rainbow",
};

const GRID_WIDTH = 600;
const GRID_HEIGHT = 600;

const DEFAULT_GRID_SIZE = 16;
let gridSize = DEFAULT_GRID_SIZE;

const DEFAULT_COLOR = availableColors.BLACK;
let color = DEFAULT_COLOR;

const grid = document.querySelector(".grid");
const btnRainbow = document.querySelector(".rainbow");
const gridSizeManipulator = document.querySelector("input[type='range']");
const shader = document.querySelector(".shader");

createGrid(DEFAULT_GRID_SIZE);

const allBlockColors = Array.from(
  document.querySelectorAll(".color-palette button:not(.shader)")
);

let gridItems = grid.querySelectorAll(".grid-item");

Array.from(gridItems).forEach((item) => {
  item.addEventListener("mouseover", addColor);
});

Array.from(gridItems).forEach((item) => {
  item.addEventListener("mousedown", addColor);
});

// Create grid based on user input
gridSizeManipulator.addEventListener("input", (e) => {
  gridSize = e.target.value;

  removeGrid();

  createGrid(gridSize);

  const showGridLines = grid.querySelectorAll(".grid-item");

  showGridLines.forEach((square) => square.classList.add("show-grid-lines"));

  gridItems = grid.querySelectorAll(".grid-item");

  Array.from(gridItems).forEach((item) => {
    item.addEventListener("mouseover", addColor);
  });

  Array.from(gridItems).forEach((item) => {
    item.addEventListener("mousedown", addColor);
  });
});

shader.addEventListener("click", (e) => {
  e.target.classList.add("shader-on");
  grid.style.cursor = `url(../images/shader.png), pointer`;
});

// user should not see any grid lines once the size adjustment has been made
gridSizeManipulator.addEventListener("mouseup", (e) => {
  console.log("MOUSEUP");
  const showGridLines = grid.querySelectorAll(".grid-item");
  showGridLines.forEach((square) => square.classList.remove("show-grid-lines"));
});

allBlockColors.forEach((blockColor) => {
  blockColor.addEventListener("click", (e) => {
    shader.classList.remove("shader-on");
    color = e.target.classList[0];
    e.target.style.backgroundColor = color;
    console.log(e.target.style);

    if (e.target.classList[0] !== color) {
      e.target.style.backgroundColor = availableColors.WHITE;
    }

    grid.style.cursor = `url(../images/${color}.png), pointer`;
  });
});

btnRainbow.addEventListener("click", (e) => {
  color = availableColors.RAINBOW;
});

function createGrid(size) {
  for (let i = 0; i < size; i++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("grid-row", `row-item-${i + 1}`);
    for (let j = 0; j < size; j++) {
      let gridCol = document.createElement("div");
      gridCol.classList.add("grid-item", `col-${j + 1}`);
      gridCol.style.width = `${GRID_WIDTH / size}px`;
      gridCol.style.height = `${GRID_HEIGHT / size}px`;

      gridRow.appendChild(gridCol);
    }

    grid.appendChild(gridRow);
  }
}

function removeGrid() {
  grid.innerHTML = "";
}

function addColor(e) {
  let item = e.target;

  if (shader.classList.contains("shader-on")) {
    item.classList.add("wentover");
  } else {
    item.classList.remove("wentover");
  }

  if (e.buttons === 1) {
    if (item.classList.contains("wentover")) {
      shadeDarker(e, item);
      return;
    }

    switch (color) {
      case "rainbow":
        randomColor(e);
        break;
      case "eraser":
        blockColors(e, "white");
      default:
        blockColors(e, color);
    }

    console.log("from add color", color);
  }
}

function shadeDarker(e, item) {
  let colorArr = e.target.style.backgroundColor.split(/[a-z(,)]/);
  let colorNum = colorArr.filter((index) => index.match(/[0-9]/));
  let red = Math.floor(colorNum[0] / 1.06);
  let green = Math.floor(colorNum[1] / 1.06);
  let blue = Math.floor(colorNum[2] / 1.06);

  item.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  console.log(e.target.style.backgroundColor);
  // item.style.backgroundColor = "#000";
}

function randomColor(e) {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

function blockColors(e, color) {
  e.target.style.backgroundColor = `${convertToRGB(color)}`;
}

function convertToRGB(color) {
  let rgb = "";
  switch (color) {
    case availableColors.RED:
      rgb = "rgb(255, 0, 0)";
      break;
    case availableColors.BLUE:
      rgb = "rgb(, 0, 255)";
      break;
    case availableColors.GREEN:
      rgb = "rgb(0, 255, 0)";
      break;
    case availableColors.CYAN:
      rgb = "rgb(0, 255, 255)";
      break;
    case availableColors.MAGENTA:
      rgb = "rgb(255, 0, 255)";
      break;
    case availableColors.YELLOW:
      rgb = "rgb(255, 255, 0)";
      break;
    case availableColors.BLACK:
      rgb = "rgb(0, 0, 0)";
      break;
    case availableColors.GREY:
      rgb = "rgb(100, 100, 100)";
      break;
    case availableColors.BROWN:
      rgb = "rgb(160, 60, 30)";
      break;
  }

  return rgb;
}

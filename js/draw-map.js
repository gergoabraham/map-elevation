const n = 50; // min 40
let canvas;
let ctx;
let map;
let drawingIntervalId;
let mouseX;
let mouseY;

const minValue = -0.3 * n;
const maxValue = 0.3 * n;
const colorKeys = {
  [maxValue]: '#ffffff', // white snow
  [0.2 * n]: '#9da4ab', // mountain blueish-greyish
  [0.1 * n]: '#3b8017', // darker grass
  '3': '#81d952', // grass
  '1': '#fff08f', // sand
  '0': '#67ddf5', // tropical blue
  [-0.15 * n]: '#000f5e', // dark blue
  [minValue]: '#000000', // black
};
let colorTable;

function init() {
  ({canvas, ctx} = initCanvas());
  initMouseActions(canvas);
  initResetAction();
  map = initMap();
  colorTable = calculateInterpolatedColorTable(colorKeys, minValue, maxValue);
  drawMap(map);
}

function initResetAction() {
  const reset = document.getElementById('reset');
  reset.onclick = () => {
    map = initMap();
    drawMap(map);
  };
}

function initCanvas() {
  const canvas = document.getElementById('the-map');
  canvas.height = 500;
  canvas.width = 500;
  const ctx = canvas.getContext('2d');

  return {canvas, ctx};
}

function initMouseActions(canvas) {
  canvas.onmousedown = startDrawingBasedOnMouseButton;
  canvas.onmousemove = saveMousePosition;
  canvas.onmouseup = stopDrawing;
  canvas.onmouseout = stopDrawing;
  canvas.oncontextmenu = preventContextMenu;
}

function saveMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function startDrawingBasedOnMouseButton(e) {
  if (e.which == 1) {
    startDrawing(elevateMap);
  } else if (e.which == 3) {
    startDrawing(lowerMap);
  }
}

function startDrawing(method) {
  if (!drawingIntervalId) {
    draw(method);
    drawingIntervalId = setInterval(() => draw(method), 50);
  }
}

function stopDrawing(e) {
  clearInterval(drawingIntervalId);
  drawingIntervalId = undefined;
}

function preventContextMenu(e) {
  e.preventDefault();
}

function draw(method) {
  const {x, y} = calculateCoordinates();
  map = method(map, x, y, [minValue, maxValue]);
  drawMap(map);
}

function calculateCoordinates() {
  const canvasBoundingRect = canvas.getBoundingClientRect();
  const xPos = mouseX - canvasBoundingRect.left;
  const yPos = mouseY - canvasBoundingRect.top;

  const elemSizeAtClient = canvas.clientWidth / n;

  const x = Math.floor(xPos / elemSizeAtClient);
  const y = Math.floor(yPos / elemSizeAtClient);

  return {x, y};
}

function initMap() {
  const newMap = [];
  for (let i = 0; i < n; i++) {
    newMap[i] = [];
    for (let j = 0; j < n; j++) {
      newMap[i][j] = 0;
    }
  }
  return newMap;
}

function drawMap(map) {
  const elemSize = canvas.height / n;

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      const color = colorTable[map[x][y]];
      ctx.fillStyle = color;
      ctx.fillRect(x * elemSize, y * elemSize, elemSize, elemSize);
    }
  }
}

document.body.onload = init;

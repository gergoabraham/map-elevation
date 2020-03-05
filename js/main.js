const n = 50; // min 40

let canvas;
let ctx;
let map;
let operationIntervalId;
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
  initResetAction();
  map = initMap();
  ({canvas, ctx} = initCanvas());
  initMouseActions(canvas);
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

function initCanvas() {
  const canvas = document.getElementById('the-map');
  canvas.height = 500;
  canvas.width = 500;
  const ctx = canvas.getContext('2d');

  return {canvas, ctx};
}

function initMouseActions(canvas) {
  canvas.onmousemove = saveMousePosition;
  canvas.oncontextmenu = (e) => e.preventDefault();

  canvas.onmousedown = startOperationBasedOnMouseButton;
  canvas.onmouseup = stopOperation;
  canvas.onmouseout = stopOperation;
}

function saveMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function startOperationBasedOnMouseButton(e) {
  if (e.which == 1) {
    startOperation(elevateMap);
  } else if (e.which == 3) {
    startOperation(lowerMap);
  }
}

function startOperation(method) {
  if (!operationIntervalId) {
    performOperation(method);
    operationIntervalId = setInterval(() => performOperation(method), 50);
  }
}

function stopOperation() {
  clearInterval(operationIntervalId);
  operationIntervalId = undefined;
}

function performOperation(method) {
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

function drawMap(map) {
  const elemSize = canvas.height / n;

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      ctx.fillStyle = colorTable[map[x][y]];
      ctx.fillRect(x * elemSize, y * elemSize, elemSize, elemSize);
    }
  }
}


document.body.onload = init;

const n = 50;
let canvas;
let ctx;
let map;

function init() {
  ({canvas, ctx} = initCanvas());
  map = initMap();
  drawMap(map);
}

function initCanvas() {
  const canvas = document.getElementById('the-map');
  canvas.height = 500;
  canvas.width = 500;
  canvas.onclick = onLeftClick;
  canvas.oncontextmenu = onRightClick;

  const ctx = canvas.getContext('2d');

  return {canvas, ctx};
}

function onLeftClick(e) {
  onClick(e, elevateMap);
}

function onRightClick(e) {
  e.preventDefault();
  onClick(e, lowerMap);
}

function onClick(e, updateMap) {
  const {x, y} = calculateCoordinates(e);
  map = updateMap(map, x, y, [-10, 10]);
  drawMap(map);
}

function calculateCoordinates(e) {
  const canvasBoundingRect = canvas.getBoundingClientRect();
  const xPos = e.clientX - canvasBoundingRect.left;
  const yPos = e.clientY - canvasBoundingRect.top;

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
      const color = getColor(map[x][y]);
      ctx.fillStyle = color;
      ctx.fillRect(x * elemSize, y * elemSize, elemSize, elemSize);
    }
  }
}

function getColor(value) {
  const grayscaleColor = value * 10 + 128;
  const hexValue = grayscaleColor.toString(16);
  return `#${hexValue}${hexValue}${hexValue}`;
}

document.body.onload = init;

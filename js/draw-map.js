const n = 50; // min 40
let canvas;
let ctx;
let map;

const minValue = -0.3 * n;
const maxValue = 0.3 * n;
const colors = {
  [maxValue]: '#ffffff', // white snow
  [0.2 * n]: '#9da4ab', // mountain blueish-greyish
  [0.1 * n]: '#3b8017', // darker grass
  '3': '#81d952', // grass
  '1': '#fff08f', // sand
  '0': '#67ddf5', // tropical blue
  [-0.15 * n]: '#000f5e', // dark blue
  [minValue]: '#000000', // black
};

function init() {
  ({canvas, ctx} = initCanvas());
  map = initMap();
  initColors();
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
  map = updateMap(map, x, y, [minValue, maxValue]);
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
  return colors[value];
}

function initColors() {
  let color0;
  let index0;
  let color1;
  let index1 = minValue;

  for (let i = minValue; i < maxValue + 1; i++) {
    if (colors[i]) {
      color0 = colors[i];
      index0 = i;
    } else {
      if (index1 < i) {
        ({color1, index1} = findNextColor(i, color1, index1));
      }

      const r = interpolateColor(color0, index0, color1, index1, i, 0);
      const g = interpolateColor(color0, index0, color1, index1, i, 1);
      const b = interpolateColor(color0, index0, color1, index1, i, 2);

      colors[i] = `#${r}${g}${b}`;
    }
  }
}

function findNextColor(i, color1, index1) {
  while (!colors[i]) {
    i++;
  }
  color1 = colors[i];
  index1 = i;
  return {color1, index1};
}

function interpolateColor(lastColor, i0, nextColor, i1, i, hexIndex) {
  const color0 = parseInt(lastColor.substr(2 * hexIndex + 1, 2), 16);
  const color1 = parseInt(nextColor.substr(2 * hexIndex + 1, 2), 16);

  const colorValue = (color1 - color0) / (i1 - i0) * (i - i0) + color0;
  const colorHexValue = Math.round(Math.abs(colorValue)).toString(16);
  const hexValueWithLeadingZero = ('0' + colorHexValue).substr(-2);

  return hexValueWithLeadingZero;
}

document.body.onload = init;

if (typeof module != 'undefined') {
  module.exports = {getColor, initColors};
}

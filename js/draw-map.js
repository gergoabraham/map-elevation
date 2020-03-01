const n = 10;
let canvas;
let map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function drawMap(map) {
  const canvas = document.getElementById('the-map');
  const ctx = canvas.getContext('2d');

  const size = canvas.height / n;

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      const val = map[x][y];
      const color = val * 10 + 128;
      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
      ctx.fillRect(x * size, y * size, size, size);
    }
  }
}

function init() {
  drawMap(map);

  canvas = document.getElementById('the-map');

  canvas.height = 500;
  canvas.width = 500;

  canvas.onclick = onLeftClick;
  canvas.oncontextmenu = onRightClick;

  drawMap(map);
}

function onRightClick(e) {
  e.preventDefault();
  onClick(e, lowerMap);
}

function onLeftClick(e) {
  onClick(e, elevateMap);
}

function onClick(e, method) {
  const rect = canvas.getBoundingClientRect();
  const xPos = e.clientX - rect.left;
  const yPos = e.clientY - rect.top;

  const x = Math.floor(xPos / (canvas.clientHeight / n));
  const y = Math.floor(yPos / (canvas.clientHeight / n));

  map = method(map, x, y);

  drawMap(map);
}

document.body.onload = init;

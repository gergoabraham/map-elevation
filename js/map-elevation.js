
function elevateMap(input, x, y) {
  let area = cloneArray(input);

  area[x][y]++;

  const neighborCoordinates = generateNeighborCoordinates(x, y);

  neighborCoordinates.forEach(([nx, ny]) => {
    if (areCoordinatesOkay(nx, ny, area) &&
        isDifferenceTooLarge(area, x, y, nx, ny)) {
      area = elevateMap(area, nx, ny);
    }
  });

  return area;
}

function generateNeighborCoordinates(x, y) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
}

function isDifferenceTooLarge(area, x, y, nx, ny) {
  return area[x][y] - area[nx][ny] > 1;
}

function areCoordinatesOkay(nx, ny, area) {
  return nx >= 0 &&
    ny >= 0 &&
    nx < area.length &&
    ny < area[nx].length;
}

function cloneArray(input) {
  const output = [];
  for (let i = 0; i < input.length; i++) {
    output[i] = [];
    for (let j = 0; j < input[i].length; j++) {
      output[i][j] = input[i][j];
    }
  }
  return output;
}


if (module) {
  module.exports = {elevateMap};
}

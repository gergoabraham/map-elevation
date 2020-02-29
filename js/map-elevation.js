function elevateMap(input, x, y) {
  return modifyMap(input, x, y, (x) => x + 1);
}

function lowerMap(input, x, y) {
  return modifyMap(input, x, y, (x) => x - 1);
}

function modifyMap(input, x, y, modification) {
  let area = cloneArray(input);

  area[x][y] = modification(area[x][y]);

  const neighborCoordinates = generateNeighborCoordinates(x, y);

  neighborCoordinates.forEach(([nx, ny]) => {
    if (areCoordinatesOkay(nx, ny, area) &&
        isDifferenceTooLarge(area, x, y, nx, ny)) {
      area = modifyMap(area, nx, ny, modification);
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
  return Math.abs(area[x][y] - area[nx][ny]) > 1;
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
  module.exports = {elevateMap, lowerMap};
}

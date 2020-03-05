function calculateInterpolatedColorTable(keyColors, minIndex, maxIndex) {
  let color0;
  let index0;
  let color1;
  let index1 = minIndex;
  const interpolatedColors = [];

  for (let i = minIndex; i < maxIndex + 1; i++) {
    if (keyColors[i]) {
      color0 = keyColors[i];
      interpolatedColors[i] = keyColors[i];
      index0 = i;
    } else {
      if (index1 < i) {
        ({color1, index1} = findNextColor(keyColors, i, color1, index1));
      }

      const r = interpolateColor(color0, index0, color1, index1, i, 0);
      const g = interpolateColor(color0, index0, color1, index1, i, 1);
      const b = interpolateColor(color0, index0, color1, index1, i, 2);

      interpolatedColors[i] = `#${r}${g}${b}`;
    }
  }

  return interpolatedColors;
}

function findNextColor(colors, i, color1, index1) {
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

if (typeof module != 'undefined') {
  module.exports = {calculateInterpolatedColorTable};
}

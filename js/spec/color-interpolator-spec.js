const chai = require('chai');
chai.should();

({calculateInterpolatedColorTable} = require('../color-interpolator'));

describe('Color calculator', function() {
  it('should interpolate colors based on set colors', function() {
    const colors = calculateInterpolatedColorTable({
      '-3': '#ffffff',
      '0': '#000000',
      '2': '#050813',
      '5': '#080507',
    }, -3, 5);

    colors[-3].should.equal('#ffffff');
    colors[-2].should.equal('#aaaaaa');
    colors[-1].should.equal('#555555');
    colors[0].should.equal('#000000');
    colors[1].should.equal('#03040a');
    colors[2].should.equal('#050813');
    colors[3].should.equal('#06070f');
    colors[4].should.equal('#07060b');
    colors[5].should.equal('#080507');
  });

  it('shoud be a pure function', function() {
    const input = {
      '0': '#000000',
      '2': '#020202',
    };

    const output = calculateInterpolatedColorTable(input, 0, 2);

    output.should.not.equal(input);
    input.should.not.include({'1': '#010101'});
    output[1].should.equal('#010101');
  });
});
